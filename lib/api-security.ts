import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

// API authentication middleware
export async function authenticateRequest(request: NextRequest) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    },
  )

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return {
      authenticated: false,
      user: null,
      error: "Unauthorized",
    }
  }

  return {
    authenticated: true,
    user,
    error: null,
  }
}

// Role authorization middleware
export async function authorizeRole(userId: string, allowedRoles: string[]) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    },
  )

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", userId).single()

  if (!profile || !allowedRoles.includes(profile.role)) {
    return {
      authorized: false,
      role: profile?.role || null,
    }
  }

  return {
    authorized: true,
    role: profile.role,
  }
}

// API error handler with security considerations
export function handleAPIError(error: any, context: string) {
  console.error(`[API ERROR] ${context}:`, error)

  // Don't expose internal error details to client
  const isProduction = process.env.NODE_ENV === "production"

  if (isProduction) {
    return NextResponse.json({ error: "An error occurred processing your request" }, { status: 500 })
  } else {
    return NextResponse.json(
      {
        error: "An error occurred processing your request",
        details: error.message,
        context,
      },
      { status: 500 },
    )
  }
}

// CSRF token validation (for forms)
export function generateCSRFToken(): string {
  return crypto.randomUUID()
}

export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken
}

// Request signature validation (for sensitive operations)
export async function validateRequestSignature(payload: string, signature: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "verify",
  ])

  const signatureBuffer = Uint8Array.from(atob(signature), (c) => c.charCodeAt(0))

  return await crypto.subtle.verify("HMAC", key, signatureBuffer, encoder.encode(payload))
}
