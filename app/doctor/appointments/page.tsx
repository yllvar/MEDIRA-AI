"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Video, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { DoctorNav } from "@/components/doctor-nav"
import { Calendar } from "@/components/ui/calendar"

export default function DoctorAppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="min-h-screen bg-background">
      <DoctorNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Appointments</h1>
          <p className="text-muted-foreground">Manage your appointment schedule</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-muted-foreground">Available</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-muted-foreground">Scheduled</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-muted-foreground">Blocked</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>January 23, 2025</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    time: "9:00 AM",
                    patient: "John Doe",
                    type: "Follow-up",
                    location: "In-Person",
                    reason: "Blood pressure check",
                    status: "completed",
                  },
                  {
                    time: "9:30 AM",
                    patient: "Sarah Miller",
                    type: "New Patient",
                    location: "In-Person",
                    reason: "Annual physical",
                    status: "completed",
                  },
                  {
                    time: "10:00 AM",
                    patient: "Michael Brown",
                    type: "Consultation",
                    location: "In-Person",
                    reason: "Chest pain evaluation",
                    status: "completed",
                  },
                  {
                    time: "10:30 AM",
                    patient: "Emily Davis",
                    type: "Follow-up",
                    location: "Video Call",
                    reason: "Medication review",
                    status: "in-progress",
                  },
                  {
                    time: "11:00 AM",
                    patient: "Robert Wilson",
                    type: "Consultation",
                    location: "In-Person",
                    reason: "Cardiac screening",
                    status: "upcoming",
                  },
                  {
                    time: "11:30 AM",
                    patient: "Lisa Anderson",
                    type: "Follow-up",
                    location: "In-Person",
                    reason: "Post-surgery checkup",
                    status: "upcoming",
                  },
                  {
                    time: "2:00 PM",
                    patient: "David Martinez",
                    type: "Consultation",
                    location: "Video Call",
                    reason: "Hypertension management",
                    status: "upcoming",
                  },
                  {
                    time: "2:30 PM",
                    patient: "Jennifer Lee",
                    type: "Follow-up",
                    location: "In-Person",
                    reason: "Lab results review",
                    status: "upcoming",
                  },
                ].map((apt, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-4 border rounded-lg ${
                      apt.status === "in-progress"
                        ? "border-primary bg-primary/5"
                        : apt.status === "completed"
                          ? "border-border bg-muted/30 opacity-60"
                          : "border-border"
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-center min-w-[70px]">
                        <p className="text-sm font-semibold">{apt.time}</p>
                        <p className="text-xs text-muted-foreground">30 min</p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{apt.patient}</p>
                          <Badge variant={apt.status === "in-progress" ? "default" : "secondary"}>{apt.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{apt.reason}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {apt.location === "Video Call" ? (
                            <Video className="h-3 w-3 text-muted-foreground" />
                          ) : (
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                          )}
                          <span className="text-xs text-muted-foreground">{apt.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {apt.status === "in-progress" && (
                        <Button size="sm">
                          {apt.location === "Video Call" ? (
                            <>
                              <Video className="h-4 w-4 mr-2" />
                              Join
                            </>
                          ) : (
                            "Continue"
                          )}
                        </Button>
                      )}
                      {apt.status === "upcoming" && (
                        <Button size="sm" variant="outline" className="bg-transparent">
                          {apt.location === "Video Call" ? "Start Call" : "Start Visit"}
                        </Button>
                      )}
                      {apt.status === "completed" && (
                        <Button size="sm" variant="ghost">
                          View Notes
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointment Requests */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Pending Appointment Requests</CardTitle>
            <CardDescription>New appointment requests awaiting confirmation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  patient: "Thomas Anderson",
                  requestedDate: "Jan 26, 2025",
                  requestedTime: "10:00 AM",
                  type: "Consultation",
                  reason: "Irregular heartbeat concerns",
                },
                {
                  patient: "Maria Garcia",
                  requestedDate: "Jan 27, 2025",
                  requestedTime: "2:00 PM",
                  type: "Follow-up",
                  reason: "Medication side effects",
                },
              ].map((req, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-medium">{req.patient}</p>
                      <Badge variant="outline">{req.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{req.reason}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{req.requestedDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{req.requestedTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">Approve</Button>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Reschedule
                    </Button>
                    <Button size="sm" variant="ghost">
                      Decline
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
