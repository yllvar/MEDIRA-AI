import { type NextRequest, NextResponse } from "next/server"
import { blockchainService } from "@/lib/blockchain"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { patientAddress, providerAddress } = body

    if (!patientAddress || !providerAddress) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Revoke access on blockchain
    const transactionHash = await blockchainService.revokeAccess(patientAddress, providerAddress)

    // Log the revocation
    await blockchainService.logAccess(patientAddress, providerAddress, "revoke")

    return NextResponse.json({
      success: true,
      transactionHash,
      message: "Access revoked successfully",
    })
  } catch (error) {
    console.error("Error revoking access:", error)
    return NextResponse.json({ error: "Failed to revoke access" }, { status: 500 })
  }
}
