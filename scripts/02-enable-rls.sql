-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Patient Profiles: Patients can manage their own, doctors can view with access
CREATE POLICY "Patients can view own profile"
  ON public.patient_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Doctors can view patient profiles with access"
  ON public.patient_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.access_grants
      WHERE patient_id = patient_profiles.user_id
        AND doctor_id = auth.uid()
        AND is_active = TRUE
        AND (expires_at IS NULL OR expires_at > NOW())
    )
  );

-- Medical Records: Patients own their records, doctors need access grants
CREATE POLICY "Patients can view own records"
  ON public.medical_records FOR SELECT
  USING (patient_id = auth.uid());

CREATE POLICY "Patients can insert own records"
  ON public.medical_records FOR INSERT
  WITH CHECK (patient_id = auth.uid());

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

-- Access Grants: Patients control who has access
CREATE POLICY "Patients can manage access grants"
  ON public.access_grants FOR ALL
  USING (patient_id = auth.uid());

CREATE POLICY "Doctors can view their access grants"
  ON public.access_grants FOR SELECT
  USING (doctor_id = auth.uid());

-- Appointments: Both parties can view
CREATE POLICY "Patients can view own appointments"
  ON public.appointments FOR SELECT
  USING (patient_id = auth.uid());

CREATE POLICY "Doctors can view own appointments"
  ON public.appointments FOR SELECT
  USING (doctor_id = auth.uid());

CREATE POLICY "Patients can create appointments"
  ON public.appointments FOR INSERT
  WITH CHECK (patient_id = auth.uid());

-- Audit Logs: Users can view their own logs
CREATE POLICY "Users can view own audit logs"
  ON public.audit_logs FOR SELECT
  USING (user_id = auth.uid());
