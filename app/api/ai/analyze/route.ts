import { type NextRequest, NextResponse } from "next/server"
import { analyzeMedicalData, type DiagnosticInput } from "@/lib/ai-diagnostics"

export async function POST(request: NextRequest) {
  try {
    const body: DiagnosticInput = await request.json()

    // Validate input
    if (!body.symptoms || body.symptoms.length === 0) {
      return NextResponse.json({ error: "Symptoms are required" }, { status: 400 })
    }

    // Perform AI analysis
    const result = await analyzeMedicalData(body)

    return NextResponse.json({
      success: true,
      result,
    })
  } catch (error) {
    console.error("Error in AI analysis:", error)
    return NextResponse.json({ error: "Failed to perform AI analysis" }, { status: 500 })
  }
}
