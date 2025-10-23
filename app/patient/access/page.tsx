import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Plus, ExternalLink, Clock } from "lucide-react"
import { PatientNav } from "@/components/patient-nav"

export default function AccessControlPage() {
  return (
    <div className="min-h-screen bg-background">
      <PatientNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Access Control</h1>
          <p className="text-muted-foreground">
            Manage who can view your medical records using blockchain-secured permissions
          </p>
        </div>

        {/* Blockchain Status */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Blockchain Protection Active</p>
                  <p className="text-sm text-muted-foreground">All access grants are secured on Polygon network</p>
                </div>
              </div>
              <Badge variant="default" className="bg-green-500">
                Connected
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Access Grants */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Access Grants</CardTitle>
                  <CardDescription>Healthcare providers with access to your records</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Grant Access
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Dr. Sarah Johnson",
                    role: "Cardiologist",
                    address: "0x742d...0bEb",
                    access: "Full Access",
                    granted: "Jan 1, 2025",
                    expires: "Jan 1, 2026",
                    txHash: "0xabc123...",
                  },
                  {
                    name: "Dr. Michael Chen",
                    role: "Dermatologist",
                    address: "0x8f3a...2cD9",
                    access: "Limited Access",
                    granted: "Dec 15, 2024",
                    expires: "Jun 15, 2025",
                    txHash: "0xdef456...",
                  },
                  {
                    name: "City General Hospital",
                    role: "Healthcare Facility",
                    address: "0x1b4e...7fA2",
                    access: "Emergency Only",
                    granted: "Nov 20, 2024",
                    expires: "Never",
                    txHash: "0xghi789...",
                  },
                  {
                    name: "Dr. Emily Davis",
                    role: "General Practice",
                    address: "0x9c2f...4eB1",
                    access: "Full Access",
                    granted: "Oct 5, 2024",
                    expires: "Oct 5, 2025",
                    txHash: "0xjkl012...",
                  },
                ].map((provider, i) => (
                  <div key={i} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{provider.name}</p>
                          <p className="text-sm text-muted-foreground">{provider.role}</p>
                          <p className="text-xs text-muted-foreground font-mono mt-1">{provider.address}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          provider.access === "Full Access"
                            ? "default"
                            : provider.access === "Limited Access"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {provider.access}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span>Granted: {provider.granted}</span>
                        <span>Expires: {provider.expires}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View TX
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 bg-transparent">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Blockchain Audit Log */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Log</CardTitle>
              <CardDescription>Recent blockchain transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: "Access Granted", provider: "Dr. Johnson", time: "2 hours ago", type: "grant" },
                  { action: "Record Viewed", provider: "Dr. Chen", time: "5 hours ago", type: "view" },
                  { action: "Access Granted", provider: "City General", time: "1 day ago", type: "grant" },
                  { action: "Record Updated", provider: "Dr. Davis", time: "2 days ago", type: "update" },
                  { action: "Access Revoked", provider: "Dr. Smith", time: "3 days ago", type: "revoke" },
                ].map((log, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        log.type === "grant"
                          ? "bg-green-500/10 text-green-500"
                          : log.type === "revoke"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-blue-500/10 text-blue-500"
                      }`}
                    >
                      <Shield className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{log.action}</p>
                      <p className="text-xs text-muted-foreground">{log.provider}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {log.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                View Full History
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How Blockchain Security Works</CardTitle>
            <CardDescription>Understanding your data protection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Immutable Records</h3>
                <p className="text-sm text-muted-foreground">
                  Every access grant is recorded on the Polygon blockchain, creating a permanent, tamper-proof audit
                  trail.
                </p>
              </div>
              <div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Patient Control</h3>
                <p className="text-sm text-muted-foreground">
                  You have complete control over who can access your data. Grant or revoke access at any time with
                  blockchain verification.
                </p>
              </div>
              <div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Transparent Auditing</h3>
                <p className="text-sm text-muted-foreground">
                  View every access event in real-time. All transactions are publicly verifiable on the blockchain
                  explorer.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
