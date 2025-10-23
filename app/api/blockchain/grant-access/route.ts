import { type NextRequest, NextResponse } from "next/server"
import { blockchainService } from "@/lib/blockchain"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { patientAddress, providerAddress, accessLevel, expiresAt, recordIds } = body

    // Validate input
    if (!patientAddress || !providerAddress || !accessLevel) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Grant access on blockchain
    const transactionHash = await blockchainService.grantAccess({
      patientAddress,
      providerAddress,
      accessLevel,
      grantedAt: Date.now(),
      expiresAt,
      recordIds,
    })

    // Log the access grant
    await blockchainService.logAccess(patientAddress, providerAddress, "grant")

    return NextResponse.json({
      success: true,
      transactionHash,
      message: "Access granted successfully",
    })
  } catch (error) {
    console.error("Error granting access:", error)
    return NextResponse.json({ error: "Failed to grant access" }, { status: 500 })
  }
}
