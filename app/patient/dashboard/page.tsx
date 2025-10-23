import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Shield, Activity, Upload, Download } from "lucide-react"
import { PatientNav } from "@/components/patient-nav"

export default function PatientDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <PatientNav />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John</h1>
          <p className="text-muted-foreground">Manage your medical records and appointments</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Medical Records</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Total documents</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Upcoming</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Access Grants</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Active providers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Health Score</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">Good health</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Medical Records */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Medical Records</CardTitle>
                  <CardDescription>Your latest health documents</CardDescription>
                </div>
                <Button size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Blood Test Results", date: "Jan 15, 2025", type: "Lab Report", status: "Complete" },
                  { title: "Annual Physical Exam", date: "Jan 10, 2025", type: "Checkup", status: "Complete" },
                  { title: "X-Ray - Chest", date: "Dec 28, 2024", type: "Imaging", status: "Complete" },
                  { title: "Prescription - Lisinopril", date: "Dec 20, 2024", type: "Prescription", status: "Active" },
                ].map((record, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{record.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {record.type} • {record.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={record.status === "Active" ? "default" : "secondary"}>{record.status}</Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled visits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { doctor: "Dr. Sarah Johnson", specialty: "Cardiologist", date: "Jan 25, 2025", time: "10:00 AM" },
                  { doctor: "Dr. Michael Chen", specialty: "Dermatologist", date: "Feb 2, 2025", time: "2:30 PM" },
                  { doctor: "Dr. Emily Davis", specialty: "General Practice", date: "Feb 15, 2025", time: "9:00 AM" },
                ].map((apt, i) => (
                  <div key={i} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{apt.doctor}</p>
                        <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                      </div>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {apt.date} at {apt.time}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  View All Appointments
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Access Control Section */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Access Control</CardTitle>
                <CardDescription>Manage who can view your medical records</CardDescription>
              </div>
              <Button size="sm">Grant Access</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Dr. Sarah Johnson", role: "Cardiologist", access: "Full Access", granted: "Jan 1, 2025" },
                { name: "Dr. Michael Chen", role: "Dermatologist", access: "Limited Access", granted: "Dec 15, 2024" },
                {
                  name: "City General Hospital",
                  role: "Healthcare Facility",
                  access: "Emergency Only",
                  granted: "Nov 20, 2024",
                },
              ].map((provider, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{provider.name}</p>
                      <p className="text-sm text-muted-foreground">{provider.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{provider.access}</p>
                      <p className="text-xs text-muted-foreground">Since {provider.granted}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
