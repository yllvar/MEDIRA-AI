import { type NextRequest, NextResponse } from "next/server"
import { blockchainService } from "@/lib/blockchain"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const patientAddress = searchParams.get("patientAddress")

    if (!patientAddress) {
      return NextResponse.json({ error: "Patient address is required" }, { status: 400 })
    }

    // Fetch audit log from blockchain
    const auditLog = await blockchainService.getAuditLog(patientAddress)

    return NextResponse.json({
      success: true,
      auditLog,
    })
  } catch (error) {
    console.error("Error fetching audit log:", error)
    return NextResponse.json({ error: "Failed to fetch audit log" }, { status: 500 })
  }
}
