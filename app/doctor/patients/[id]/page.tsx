import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Calendar,
  Activity,
  Heart,
  Download,
  Upload,
  Shield,
  Clock,
  AlertCircle,
  TrendingUp,
} from "lucide-react"
import { DoctorNav } from "@/components/doctor-nav"

export default function PatientDetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <DoctorNav />

      <main className="container mx-auto px-4 py-8">
        {/* Patient Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">JD</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold">John Doe</h1>
                    <Badge variant="default">Active Patient</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Full Access Granted</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span>Patient ID: PT-2024-001</span>
                    <span>Age: 45 years</span>
                    <span>Gender: Male</span>
                    <span>Blood Type: O+</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm">
                      <strong>Primary Condition:</strong> Hypertension
                    </span>
                    <span className="text-sm">
                      <strong>Last Visit:</strong> Jan 23, 2025
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Add Record
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vital Signs */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                Blood Pressure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128/82</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                Improved from last visit
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-500" />
                Heart Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72 bpm</div>
              <p className="text-xs text-muted-foreground">Normal range</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="h-4 w-4 text-purple-500" />
                Weight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">185 lbs</div>
              <p className="text-xs text-muted-foreground">BMI: 25.1</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                Risk Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Moderate</div>
              <p className="text-xs text-muted-foreground">Cardiovascular risk</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="records" className="space-y-4">
          <TabsList>
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="history">Visit History</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="labs">Lab Results</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Medical Records</CardTitle>
                <CardDescription>Patient's medical documents and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      title: "Blood Test Results - Lipid Panel",
                      date: "Jan 15, 2025",
                      type: "Lab Report",
                      doctor: "Dr. Sarah Johnson",
                    },
                    {
                      title: "Annual Physical Examination",
                      date: "Jan 10, 2025",
                      type: "Checkup Report",
                      doctor: "Dr. Sarah Johnson",
                    },
                    {
                      title: "Chest X-Ray",
                      date: "Dec 28, 2024",
                      type: "Imaging",
                      doctor: "Dr. Michael Chen",
                    },
                    {
                      title: "ECG Report",
                      date: "Dec 20, 2024",
                      type: "Diagnostic Test",
                      doctor: "Dr. Sarah Johnson",
                    },
                    {
                      title: "Prescription - Lisinopril 10mg",
                      date: "Dec 20, 2024",
                      type: "Prescription",
                      doctor: "Dr. Sarah Johnson",
                    },
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
                            {record.type} • {record.date} • {record.doctor}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Visit History</CardTitle>
                <CardDescription>Previous appointments and consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      date: "Jan 23, 2025",
                      type: "Follow-up",
                      reason: "Blood pressure monitoring",
                      notes: "BP improved, continue current medication",
                    },
                    {
                      date: "Jan 10, 2025",
                      type: "Annual Physical",
                      reason: "Routine checkup",
                      notes: "Overall health good, lipid panel ordered",
                    },
                    {
                      date: "Dec 20, 2024",
                      type: "Consultation",
                      reason: "Hypertension management",
                      notes: "Started Lisinopril 10mg daily",
                    },
                  ].map((visit, i) => (
                    <div key={i} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{visit.date}</p>
                            <Badge variant="secondary">{visit.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{visit.reason}</p>
                          <p className="text-sm">{visit.notes}</p>
                        </div>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
                <CardDescription>Active prescriptions and treatments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      name: "Lisinopril",
                      dosage: "10mg",
                      frequency: "Once daily",
                      prescribed: "Dec 20, 2024",
                      status: "Active",
                    },
                    {
                      name: "Aspirin",
                      dosage: "81mg",
                      frequency: "Once daily",
                      prescribed: "Dec 20, 2024",
                      status: "Active",
                    },
                  ].map((med, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-semibold">
                          {med.name} {med.dosage}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {med.frequency} • Prescribed: {med.prescribed}
                        </p>
                      </div>
                      <Badge variant="default">{med.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="labs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Laboratory Results</CardTitle>
                <CardDescription>Recent test results and diagnostics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-semibold">Lipid Panel</p>
                        <p className="text-sm text-muted-foreground">Jan 15, 2025</p>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Cholesterol</p>
                        <p className="font-semibold">195 mg/dL</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">LDL</p>
                        <p className="font-semibold">120 mg/dL</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">HDL</p>
                        <p className="font-semibold">55 mg/dL</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Triglycerides</p>
                        <p className="font-semibold">100 mg/dL</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
