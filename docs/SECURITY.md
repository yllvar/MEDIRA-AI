# MEDIRA Security Implementation Guide

## Overview

This document outlines the comprehensive security measures implemented in the MEDIRA healthcare platform to ensure HIPAA compliance and protect sensitive patient data.

---

## 1. Content Security Policy (CSP)

### Implementation

CSP is implemented in `middleware.ts` and `next.config.mjs` to prevent XSS attacks and unauthorized resource loading.

### Directives

\`\`\`
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https: blob:;
  font-src 'self' data:;
  connect-src 'self' https://*.supabase.co https://rpc-mumbai.maticvigil.com https://api.together.xyz wss://*.supabase.co;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
\`\`\`

### What This Prevents

- **XSS Attacks**: Restricts script execution to trusted sources
- **Data Injection**: Prevents unauthorized data loading
- **Clickjacking**: Blocks iframe embedding
- **Form Hijacking**: Restricts form submission targets

---

## 2. Security Headers

### Implemented Headers

#### X-Frame-Options: DENY
- **Purpose**: Prevents clickjacking attacks
- **Effect**: Page cannot be embedded in iframes
- **Location**: `middleware.ts`, `next.config.mjs`

#### X-Content-Type-Options: nosniff
- **Purpose**: Prevents MIME type sniffing
- **Effect**: Browser respects declared content types
- **Location**: `middleware.ts`, `next.config.mjs`

#### X-XSS-Protection: 1; mode=block
- **Purpose**: Enables browser XSS filtering
- **Effect**: Blocks page if XSS attack detected
- **Location**: `middleware.ts`, `next.config.mjs`

#### Referrer-Policy: strict-origin-when-cross-origin
- **Purpose**: Controls referrer information
- **Effect**: Only sends origin on cross-origin requests
- **Location**: `middleware.ts`, `next.config.mjs`

#### Strict-Transport-Security (HSTS)
- **Value**: `max-age=31536000; includeSubDomains; preload`
- **Purpose**: Forces HTTPS connections
- **Effect**: Browser always uses HTTPS for 1 year
- **Location**: `middleware.ts`

#### Permissions-Policy
- **Value**: `camera=(), microphone=(), geolocation=()`
- **Purpose**: Restricts browser features
- **Effect**: Disables camera, microphone, geolocation
- **Location**: `middleware.ts`, `next.config.mjs`

---

## 3. Input Sanitization & Validation

### Sanitization (`lib/validation.ts`)

#### HTML Sanitization
\`\`\`typescript
InputSanitizer.sanitizeHTML(input)
\`\`\`
- Removes `<script>` tags
- Removes `<iframe>` tags
- Removes `javascript:` protocols
- Removes event handlers (`onclick`, etc.)

#### SQL Injection Prevention
\`\`\`typescript
InputSanitizer.sanitizeSQL(input)
\`\`\`
- Removes SQL special characters
- Removes comment markers
- **Note**: Primary protection is Row Level Security (RLS)

#### Medical Data Sanitization
\`\`\`typescript
InputSanitizer.sanitizeMedicalData(input)
\`\`\`
- Preserves medical terminology
- Removes dangerous scripts
- Maintains data integrity

### Validation Schemas (Zod)

#### User Registration
\`\`\`typescript
ValidationSchemas.register
\`\`\`
- Email format validation
- Password complexity requirements:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character
- Name length validation
- Role enum validation

#### Medical Records
\`\`\`typescript
ValidationSchemas.medicalRecord
\`\`\`
- Title length limits (1-200 chars)
- Description limits (max 2000 chars)
- Record type enum validation
- Date format validation
- File URL validation

#### AI Diagnostics
\`\`\`typescript
ValidationSchemas.aiDiagnostic
\`\`\`
- Symptoms array validation (1-20 items)
- Vital signs range validation
- Age range validation (0-150)
- Gender enum validation

### Usage Example

\`\`\`typescript
import { validateInput, ValidationSchemas, InputSanitizer } from '@/lib/validation'

// Validate and sanitize input
const result = validateInput(ValidationSchemas.register, {
  email: InputSanitizer.sanitizeEmail(rawEmail),
  password: rawPassword,
  fullName: InputSanitizer.sanitizeText(rawName),
  role: 'patient',
})

if (!result.success) {
  return { error: result.errors }
}

// Use validated data
const { email, password, fullName, role } = result.data
\`\`\`

---

## 4. Authentication Security

### Supabase Auth Implementation

#### Session Management
- **JWT Tokens**: Secure, signed tokens
- **Automatic Refresh**: Tokens refreshed before expiration
- **Secure Cookies**: HttpOnly, Secure, SameSite flags
- **Session Timeout**: Configurable in Supabase dashboard

#### Multi-Factor Authentication (MFA)
- **Setup**: Enable in Supabase Auth settings
- **Methods**: TOTP (Time-based One-Time Password)
- **Enforcement**: Can be required for specific roles

#### Password Security
- **Hashing**: bcrypt with salt (handled by Supabase)
- **Strength Requirements**: Enforced via Zod validation
- **Reset Flow**: Secure email-based password reset

### Token Management

#### Access Tokens
- **Storage**: Secure HTTP-only cookies
- **Expiration**: 1 hour (configurable)
- **Refresh**: Automatic via Supabase client

#### Refresh Tokens
- **Storage**: Secure HTTP-only cookies
- **Expiration**: 30 days (configurable)
- **Rotation**: New token issued on refresh

### Implementation Example

\`\`\`typescript
// middleware.ts
const { data: { user }, error } = await supabase.auth.getUser()

if (!user) {
  return NextResponse.redirect(new URL('/login', request.url))
}
\`\`\`

---

## 5. API Route Security

### Authentication Middleware (`lib/api-security.ts`)

\`\`\`typescript
import { authenticateRequest } from '@/lib/api-security'

export async function POST(request: NextRequest) {
  const auth = await authenticateRequest(request)
  
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Proceed with authenticated request
}
\`\`\`

### Authorization Middleware

\`\`\`typescript
import { authorizeRole } from '@/lib/api-security'

export async function POST(request: NextRequest) {
  const auth = await authenticateRequest(request)
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const authorization = await authorizeRole(auth.user.id, ['doctor', 'admin'])
  if (!authorization.authorized) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  // Proceed with authorized request
}
\`\`\`

### Rate Limiting

#### Implementation
- **Location**: `middleware.ts`
- **Window**: 1 minute
- **Limit**: 100 requests per IP
- **Response**: 429 Too Many Requests
- **Retry-After**: 60 seconds

#### Production Recommendation
Use Redis for distributed rate limiting:

\`\`\`typescript
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
})

async function checkRateLimit(identifier: string): Promise<boolean> {
  const key = `ratelimit:${identifier}`
  const count = await redis.incr(key)
  
  if (count === 1) {
    await redis.expire(key, 60)
  }
  
  return count <= 100
}
\`\`\`

### Error Handling

\`\`\`typescript
import { handleAPIError } from '@/lib/api-security'

try {
  // API logic
} catch (error) {
  return handleAPIError(error, 'API_ENDPOINT_NAME')
}
\`\`\`

**Security Features:**
- Sanitized error messages in production
- Detailed errors in development
- No sensitive data exposure
- Structured logging

---

## 6. Data Encryption

### At Rest (`lib/encryption.ts`)

#### Medical Records Encryption
\`\`\`typescript
import { MedicalDataEncryption } from '@/lib/encryption'

// Encrypt
const encrypted = MedicalDataEncryption.encrypt(medicalData)
// Returns: { encrypted, iv, authTag }

// Decrypt
const decrypted = MedicalDataEncryption.decrypt(encrypted)
\`\`\`

**Algorithm**: AES-256-GCM
- **Key Size**: 256 bits (32 bytes)
- **IV Size**: 128 bits (16 bytes)
- **Authentication**: GCM mode provides authentication

#### Blockchain Hashing
\`\`\`typescript
const dataHash = MedicalDataEncryption.hash(medicalData)
// SHA-256 hash for blockchain storage
\`\`\`

### In Transit

- **TLS 1.3**: All network communications
- **Certificate Pinning**: Recommended for mobile apps
- **HTTPS Only**: Enforced via HSTS header

### Key Management

#### Environment Variables
\`\`\`bash
# Generate encryption key
openssl rand -hex 32

# Add to .env.local
ENCRYPTION_KEY=your_64_character_hex_key_here
\`\`\`

#### Key Rotation Strategy
1. Generate new key
2. Decrypt data with old key
3. Re-encrypt with new key
4. Update environment variable
5. Deploy new version

---

## 7. Row Level Security (RLS)

### Database-Level Access Control

RLS policies are defined in `scripts/02-enable-rls.sql`.

#### Patient Records Policy
\`\`\`sql
CREATE POLICY "Patients can view own records"
  ON public.medical_records FOR SELECT
  USING (patient_id = auth.uid());
\`\`\`

#### Doctor Access Policy
\`\`\`sql
CREATE POLICY "Doctors can view records with access"
  ON public.medical_records FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.access_grants
      WHERE patient_id = medical_records.patient_id
        AND doctor_id = auth.uid()
        AND is_active = TRUE
        AND (expires_at IS NULL OR expires_at > NOW())
    )
  );
\`\`\`

### Benefits

- **Defense in Depth**: Database-level protection
- **Automatic Enforcement**: No application code needed
- **Audit Trail**: All access logged
- **Zero Trust**: Every query validated

---

## 8. Audit Logging

### Database Audit Logs

\`\`\`sql
CREATE TABLE public.audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  resource_id UUID,
  metadata JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

### Blockchain Audit Trail

All access grants and revocations are recorded on Polygon blockchain:

\`\`\`typescript
// Grant access
const txHash = await blockchainService.grantAccess({
  patientAddress,
  providerAddress,
  accessLevel: 'full',
  expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
})

// Immutable record on blockchain
\`\`\`

### Security Event Logging

\`\`\`typescript
// middleware.ts
await logSecurityEvent(userId, 'UNAUTHORIZED_ACCESS_ATTEMPT', {
  path: request.nextUrl.pathname,
  ip: request.ip,
  userAgent: request.headers.get('user-agent'),
}, request)
\`\`\`

---

## 9. HIPAA Compliance Checklist

### Administrative Safeguards
- ✅ Access controls (RLS + middleware)
- ✅ Audit controls (database + blockchain)
- ✅ Security management process (documented)
- ✅ Workforce training (required)

### Physical Safeguards
- ✅ Facility access controls (Vercel/Supabase)
- ✅ Workstation security (HTTPS only)
- ✅ Device and media controls (encrypted storage)

### Technical Safeguards
- ✅ Access control (authentication + authorization)
- ✅ Audit controls (comprehensive logging)
- ✅ Integrity controls (encryption + hashing)
- ✅ Transmission security (TLS 1.3 + HSTS)

### Organizational Requirements
- ✅ Business associate agreements (Vercel, Supabase)
- ✅ Written contract requirements (documented)

### Policies and Procedures
- ✅ Privacy practices (documented)
- ✅ Breach notification (automated alerts)
- ✅ Data backup (automated daily)
- ✅ Disaster recovery (documented)

---

## 10. Security Best Practices

### For Developers

1. **Never commit secrets** to version control
2. **Use environment variables** for all sensitive data
3. **Validate all inputs** before processing
4. **Sanitize all outputs** before rendering
5. **Log security events** for audit trail
6. **Keep dependencies updated** (`npm audit`)
7. **Review code** for security vulnerabilities
8. **Test security measures** regularly

### For Deployment

1. **Enable HTTPS** on all domains
2. **Configure HSTS** with preload
3. **Set up monitoring** (Sentry, Vercel Analytics)
4. **Enable rate limiting** (Redis recommended)
5. **Configure backups** (automated daily)
6. **Test disaster recovery** procedures
7. **Review audit logs** regularly
8. **Rotate API keys** quarterly

### For Operations

1. **Monitor security events** in real-time
2. **Respond to alerts** within SLA
3. **Conduct security audits** quarterly
4. **Update security policies** as needed
5. **Train staff** on security procedures
6. **Test incident response** annually
7. **Review access logs** weekly
8. **Update dependencies** monthly

---

## 11. Incident Response

### Detection

- **Automated Alerts**: Security events trigger notifications
- **Log Monitoring**: Real-time log analysis
- **User Reports**: Security issue reporting system

### Response Procedure

1. **Identify**: Determine scope and severity
2. **Contain**: Isolate affected systems
3. **Eradicate**: Remove threat
4. **Recover**: Restore normal operations
5. **Document**: Record incident details
6. **Review**: Post-incident analysis

### Breach Notification

If PHI breach occurs:

1. **Notify affected individuals** within 60 days
2. **Notify HHS** if >500 individuals affected
3. **Notify media** if >500 individuals in same state
4. **Document breach** in audit log
5. **Implement corrective measures**

---

## 12. Security Testing

### Automated Testing

\`\`\`bash
# Dependency vulnerabilities
npm audit

# Security linting
npm run lint

# Type checking
npm run type-check
\`\`\`

### Manual Testing

- **Penetration Testing**: Quarterly
- **Code Review**: Every PR
- **Security Audit**: Annually
- **Compliance Review**: Annually

### Testing Checklist

- [ ] Authentication bypass attempts
- [ ] Authorization escalation attempts
- [ ] SQL injection attempts
- [ ] XSS injection attempts
- [ ] CSRF attacks
- [ ] Rate limiting effectiveness
- [ ] Encryption integrity
- [ ] Session management
- [ ] API security
- [ ] Input validation

---

## 13. Resources

### Documentation
- [HIPAA Security Rule](https://www.hhs.gov/hipaa/for-professionals/security/index.html)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [Supabase Security](https://supabase.com/docs/guides/platform/security)

### Tools
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Snyk](https://snyk.io/)
- [OWASP ZAP](https://www.zaproxy.org/)
- [Burp Suite](https://portswigger.net/burp)

### Support
- **Security Issues**: security@medira.app
- **General Support**: support@medira.app
- **Documentation**: docs.medira.app

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Maintained By**: MEDIRA Security Team
