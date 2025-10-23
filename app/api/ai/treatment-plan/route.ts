import { type NextRequest, NextResponse } from "next/server"
import { generateTreatmentPlan } from "@/lib/ai-diagnostics"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { diagnosis, patientInfo } = body

    if (!diagnosis || !patientInfo) {
      return NextResponse.json({ error: "Diagnosis and patient info are required" }, { status: 400 })
    }

    // Generate treatment plan
    const treatmentPlan = await generateTreatmentPlan(diagnosis, patientInfo)

    return NextResponse.json({
      success: true,
      treatmentPlan,
    })
  } catch (error) {
    console.error("Error generating treatment plan:", error)
    return NextResponse.json({ error: "Failed to generate treatment plan" }, { status: 500 })
  }
}
