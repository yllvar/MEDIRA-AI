import { z } from "zod"

// Input sanitization utilities
export class InputSanitizer {
  /**
   * Remove potentially dangerous HTML/script tags
   */
  static sanitizeHTML(input: string): string {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+\s*=/gi, "")
  }

  /**
   * Sanitize SQL-like patterns (defense in depth, RLS is primary protection)
   */
  static sanitizeSQL(input: string): string {
    return input.replace(/['";]/g, "").replace(/--/g, "").replace(/\/\*/g, "").replace(/\*\//g, "")
  }

  /**
   * Sanitize general text input
   */
  static sanitizeText(input: string): string {
    return this.sanitizeHTML(input).trim()
  }

  /**
   * Validate and sanitize email
   */
  static sanitizeEmail(email: string): string {
    return email.toLowerCase().trim()
  }

  /**
   * Sanitize medical data (preserve medical terminology)
   */
  static sanitizeMedicalData(input: string): string {
    // Remove scripts but preserve medical notation
    return this.sanitizeHTML(input)
  }
}

// Validation schemas using Zod
export const ValidationSchemas = {
  // User registration
  register: z.object({
    email: z.string().email("Invalid email address").max(255),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128)
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    fullName: z.string().min(2).max(100),
    role: z.enum(["patient", "doctor", "admin"]),
  }),

  // Login
  login: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  }),

  // Medical record upload
  medicalRecord: z.object({
    title: z.string().min(1).max(200),
    description: z.string().max(2000).optional(),
    recordType: z.enum(["lab_result", "imaging", "prescription", "diagnosis", "visit_note"]),
    recordDate: z.string().datetime(),
    data: z.record(z.any()),
    fileUrls: z.array(z.string().url()).optional(),
  }),

  // Appointment booking
  appointment: z.object({
    patientId: z.string().uuid(),
    doctorId: z.string().uuid(),
    scheduledAt: z.string().datetime(),
    durationMinutes: z.number().min(15).max(240),
    reason: z.string().min(5).max(500),
    notes: z.string().max(2000).optional(),
  }),

  // Access grant
  accessGrant: z.object({
    doctorId: z.string().uuid(),
    expiresAt: z.string().datetime().optional(),
  }),

  // AI diagnostic input
  aiDiagnostic: z.object({
    symptoms: z.array(z.string().min(1).max(100)).min(1).max(20),
    vitalSigns: z
      .object({
        bloodPressure: z.string().optional(),
        heartRate: z.number().min(30).max(250).optional(),
        temperature: z.number().min(35).max(42).optional(),
        weight: z.number().min(1).max(500).optional(),
      })
      .optional(),
    medicalHistory: z.array(z.string().max(200)).optional(),
    labResults: z.record(z.union([z.string(), z.number()])).optional(),
    patientAge: z.number().min(0).max(150).optional(),
    patientGender: z.enum(["male", "female", "other"]).optional(),
  }),
}

// Validation helper function
export function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  } else {
    return { success: false, errors: result.error }
  }
}
