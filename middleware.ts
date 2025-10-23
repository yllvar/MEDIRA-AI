import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Security headers configuration
const securityHeaders = {
  // Content Security Policy
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co https://rpc-mumbai.maticvigil.com https://api.together.xyz wss://*.supabase.co",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "),

  // Prevent clickjacking
  "X-Frame-Options": "DENY",

  // Prevent MIME type sniffing
  "X-Content-Type-Options": "nosniff",

  // Enable XSS protection
  "X-XSS-Protection": "1; mode=block",

  // Referrer policy
  "Referrer-Policy": "strict-origin-when-cross-origin",

  // Permissions policy
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",

  // Strict Transport Security (HTTPS only)
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
}

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100 // 100 requests per minute

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  record.count++
  return true
}

// Audit logging function
async function logSecurityEvent(
  userId: string | null,
  action: string,
  details: Record<string, any>,
  request: NextRequest,
) {
  console.log("[SECURITY]", {
    timestamp: new Date().toISOString(),
    userId,
    action,
    path: request.nextUrl.pathname,
    ip: request.ip || request.headers.get("x-forwarded-for"),
    userAgent: request.headers.get("user-agent"),
    ...details,
  })
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Apply security headers to all responses
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Rate limiting check
  const identifier = request.ip || request.headers.get("x-forwarded-for") || "unknown"
  if (!checkRateLimit(identifier)) {
    await logSecurityEvent(null, "RATE_LIMIT_EXCEEDED", { identifier }, request)
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": "60",
        ...Object.fromEntries(Object.entries(securityHeaders)),
      },
    })
  }

  // Create Supabase client for auth check
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          response.cookies.set({ name, value: "", ...options })
        },
      },
    },
  )

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/register"]
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname)

  // Redirect to login if not authenticated and accessing protected route
  if (!user && !isPublicRoute) {
    await logSecurityEvent(
      null,
      "UNAUTHORIZED_ACCESS_ATTEMPT",
      {
        path: request.nextUrl.pathname,
      },
      request,
    )
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Role-based access control
  if (user) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    const path = request.nextUrl.pathname
    const userRole = profile?.role

    // Check role-based access
    if (path.startsWith("/doctor") && userRole !== "doctor") {
      await logSecurityEvent(
        user.id,
        "UNAUTHORIZED_ROLE_ACCESS",
        {
          requiredRole: "doctor",
          userRole,
          path,
        },
        request,
      )
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }

    if (path.startsWith("/patient") && userRole !== "patient") {
      await logSecurityEvent(
        user.id,
        "UNAUTHORIZED_ROLE_ACCESS",
        {
          requiredRole: "patient",
          userRole,
          path,
        },
        request,
      )
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }

    if (path.startsWith("/admin") && userRole !== "admin") {
      await logSecurityEvent(
        user.id,
        "UNAUTHORIZED_ROLE_ACCESS",
        {
          requiredRole: "admin",
          userRole,
          path,
        },
        request,
      )
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }

    // Log successful access
    await logSecurityEvent(
      user.id,
      "ACCESS_GRANTED",
      {
        path,
        role: userRole,
      },
      request,
    )
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
