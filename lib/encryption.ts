import crypto from "crypto"

const ALGORITHM = "aes-256-gcm"
const KEY_LENGTH = 32 // 256 bits
const IV_LENGTH = 16 // 128 bits
const AUTH_TAG_LENGTH = 16 // 128 bits

// Get encryption key from environment
function getEncryptionKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY
  if (!key) {
    throw new Error("ENCRYPTION_KEY environment variable is not set")
  }
  if (key.length !== 64) {
    throw new Error("ENCRYPTION_KEY must be 64 hex characters (32 bytes)")
  }
  return Buffer.from(key, "hex")
}

export interface EncryptedData {
  encrypted: string
  iv: string
  authTag: string
}

/**
 * Medical data encryption service
 * Uses AES-256-GCM for authenticated encryption
 */
export class MedicalDataEncryption {
  /**
   * Encrypt sensitive medical data
   */
  static encrypt(data: string): EncryptedData {
    const key = getEncryptionKey()
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

    let encrypted = cipher.update(data, "utf8", "hex")
    encrypted += cipher.final("hex")

    const authTag = cipher.getAuthTag()

    return {
      encrypted,
      iv: iv.toString("hex"),
      authTag: authTag.toString("hex"),
    }
  }

  /**
   * Decrypt medical data
   */
  static decrypt(encryptedData: EncryptedData): string {
    const key = getEncryptionKey()
    const decipher = crypto.createDecipheriv(ALGORITHM, key, Buffer.from(encryptedData.iv, "hex"))

    decipher.setAuthTag(Buffer.from(encryptedData.authTag, "hex"))

    let decrypted = decipher.update(encryptedData.encrypted, "hex", "utf8")
    decrypted += decipher.final("utf8")

    return decrypted
  }

  /**
   * Generate SHA-256 hash for blockchain storage
   */
  static hash(data: string): string {
    return crypto.createHash("sha256").update(data).digest("hex")
  }

  /**
   * Generate secure random token
   */
  static generateToken(length = 32): string {
    return crypto.randomBytes(length).toString("hex")
  }

  /**
   * Verify data integrity using hash
   */
  static verifyIntegrity(data: string, expectedHash: string): boolean {
    const actualHash = this.hash(data)
    return actualHash === expectedHash
  }
}

/**
 * Password hashing utilities (Supabase handles this, but included for reference)
 */
export class PasswordSecurity {
  /**
   * Hash password with bcrypt-like algorithm
   * Note: Supabase Auth handles password hashing automatically
   */
  static async hashPassword(password: string): Promise<string> {
    // This is handled by Supabase Auth
    // Included for documentation purposes
    throw new Error("Password hashing is handled by Supabase Auth")
  }

  /**
   * Verify password strength
   */
  static validatePasswordStrength(password: string): {
    valid: boolean
    errors: string[]
  } {
    const errors: string[] = []

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters")
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter")
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter")
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number")
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push("Password must contain at least one special character")
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }
}
