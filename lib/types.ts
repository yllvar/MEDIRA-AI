export type UserRole = "patient" | "doctor" | "admin"

export type RecordType = "lab_result" | "imaging" | "prescription" | "diagnosis" | "visit_note"

export interface Profile {
  id: string
  email: string
  full_name: string
  role: UserRole
  wallet_address?: string
  created_at: string
  updated_at: string
}

export interface PatientProfile {
  id: string
  user_id: string
  date_of_birth: string
  gender?: string
  blood_type?: string
  allergies: string[]
  chronic_conditions: string[]
  emergency_contact?: any
  created_at: string
  updated_at: string
}

export interface DoctorProfile {
  id: string
  user_id: string
  license_number: string
  specialization: string[]
  years_of_experience: number
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface MedicalRecord {
  id: string
  patient_id: string
  record_type: RecordType
  title: string
  description?: string
  encrypted_data: string
  encryption_iv: string
  encryption_auth_tag: string
  data_hash: string
  blockchain_tx_hash?: string
  file_urls: string[]
  record_date: string
  uploaded_by: string
  created_at: string
  updated_at: string
}

export interface AccessGrant {
  id: string
  patient_id: string
  doctor_id: string
  is_active: boolean
  expires_at?: string
  blockchain_tx_hash: string
  granted_at: string
  revoked_at?: string
}

export interface Appointment {
  id: string
  patient_id: string
  doctor_id: string
  scheduled_at: string
  duration_minutes: number
  status: "scheduled" | "completed" | "cancelled"
  reason: string
  notes?: string
  created_at: string
  updated_at: string
}
