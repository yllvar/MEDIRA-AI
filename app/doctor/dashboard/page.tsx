import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, FileText, Activity, Clock } from "lucide-react"
import { DoctorNav } from "@/components/doctor-nav"

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DoctorNav />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Dr. Johnson</h1>
          <p className="text-muted-foreground">Here's your practice overview for today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">+12 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">3 completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">Lab results & reports</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Wait Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12m</div>
              <p className="text-xs text-muted-foreground">-3m from last week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Your appointments for January 23, 2025</CardDescription>
                </div>
                <Button size="sm" variant="outline" className="bg-transparent">
                  View Calendar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    time: "9:00 AM",
                    patient: "John Doe",
                    type: "Follow-up",
                    status: "completed",
                    reason: "Blood pressure check",
                  },
                  {
                    time: "9:30 AM",
                    patient: "Sarah Miller",
                    type: "New Patient",
                    status: "completed",
                    reason: "Annual physical",
                  },
                  {
                    time: "10:00 AM",
                    patient: "Michael Brown",
                    type: "Consultation",
                    status: "completed",
                    reason: "Chest pain evaluation",
                  },
                  {
                    time: "10:30 AM",
                    patient: "Emily Davis",
                    type: "Follow-up",
                    status: "in-progress",
                    reason: "Medication review",
                  },
                  {
                    time: "11:00 AM",
                    patient: "Robert Wilson",
                    type: "Consultation",
                    status: "upcoming",
                    reason: "Cardiac screening",
                  },
                  {
                    time: "11:30 AM",
                    patient: "Lisa Anderson",
                    type: "Follow-up",
                    status: "upcoming",
                    reason: "Post-surgery checkup",
                  },
                ].map((apt, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-4 border rounded-lg ${
                      apt.status === "in-progress"
                        ? "border-primary bg-primary/5"
                        : apt.status === "completed"
                          ? "border-border bg-muted/30"
                          : "border-border"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[60px]">
                        <p className="text-sm font-semibold">{apt.time}</p>
                      </div>
                      <div>
                        <p className="font-medium">{apt.patient}</p>
                        <p className="text-sm text-muted-foreground">{apt.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          apt.status === "completed"
                            ? "secondary"
                            : apt.status === "in-progress"
                              ? "default"
                              : "outline"
                        }
                      >
                        {apt.type}
                      </Badge>
                      <Button
                        size="sm"
                        variant={apt.status === "in-progress" ? "default" : "outline"}
                        className={apt.status !== "in-progress" ? "bg-transparent" : ""}
                      >
                        {apt.status === "completed" ? "View" : apt.status === "in-progress" ? "Continue" : "Start"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Patients */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
              <CardDescription>Recently accessed records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "John Doe", lastVisit: "Today", condition: "Hypertension", status: "Stable" },
                  { name: "Sarah Miller", lastVisit: "Today", condition: "Healthy", status: "Good" },
                  { name: "Michael Brown", lastVisit: "Yesterday", condition: "Angina", status: "Monitoring" },
                  { name: "Emily Davis", lastVisit: "2 days ago", condition: "Arrhythmia", status: "Stable" },
                ].map((patient, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">{patient.condition}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  View All Patients
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Lab Results to Review",
                  count: 8,
                  icon: FileText,
                  description: "New test results available",
                },
                {
                  title: "Prescription Renewals",
                  count: 5,
                  icon: Activity,
                  description: "Pending approval",
                },
                {
                  title: "Patient Messages",
                  count: 12,
                  icon: Users,
                  description: "Unread messages",
                },
              ].map((item, i) => (
                <div key={i} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="default">{item.count}</Badge>
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    Review
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
