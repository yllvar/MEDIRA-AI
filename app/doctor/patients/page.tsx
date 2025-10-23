import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Users, FileText, Calendar, Shield } from "lucide-react"
import { DoctorNav } from "@/components/doctor-nav"

export default function DoctorPatientsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DoctorNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Patient Records</h1>
          <p className="text-muted-foreground">Access and manage patient medical records</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search patients by name, ID, or condition..." className="pl-10" />
              </div>
              <Button variant="outline" className="bg-transparent">
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Patient List */}
        <div className="grid gap-4">
          {[
            {
              name: "John Doe",
              id: "PT-2024-001",
              age: 45,
              gender: "Male",
              condition: "Hypertension",
              lastVisit: "Jan 23, 2025",
              status: "Active",
              accessLevel: "Full Access",
            },
            {
              name: "Sarah Miller",
              id: "PT-2024-002",
              age: 32,
              gender: "Female",
              condition: "Healthy",
              lastVisit: "Jan 23, 2025",
              status: "Active",
              accessLevel: "Full Access",
            },
            {
              name: "Michael Brown",
              id: "PT-2024-003",
              age: 58,
              gender: "Male",
              condition: "Angina Pectoris",
              lastVisit: "Jan 22, 2025",
              status: "Monitoring",
              accessLevel: "Full Access",
            },
            {
              name: "Emily Davis",
              id: "PT-2024-004",
              age: 41,
              gender: "Female",
              condition: "Cardiac Arrhythmia",
              lastVisit: "Jan 21, 2025",
              status: "Stable",
              accessLevel: "Full Access",
            },
            {
              name: "Robert Wilson",
              id: "PT-2024-005",
              age: 67,
              gender: "Male",
              condition: "Heart Failure",
              lastVisit: "Jan 20, 2025",
              status: "Critical",
              accessLevel: "Full Access",
            },
            {
              name: "Lisa Anderson",
              id: "PT-2024-006",
              age: 39,
              gender: "Female",
              condition: "Post-CABG",
              lastVisit: "Jan 19, 2025",
              status: "Recovery",
              accessLevel: "Full Access",
            },
          ].map((patient, i) => (
            <Card key={i} className="hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-lg">{patient.name}</h3>
                        <Badge
                          variant={
                            patient.status === "Critical"
                              ? "destructive"
                              : patient.status === "Active"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {patient.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>ID: {patient.id}</span>
                        <span>
                          {patient.age}y, {patient.gender}
                        </span>
                        <span>Condition: {patient.condition}</span>
                        <span>Last visit: {patient.lastVisit}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 mr-4">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">{patient.accessLevel}</span>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Records
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
