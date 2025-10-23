"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, MapPin, Plus, X } from "lucide-react"
import { PatientNav } from "@/components/patient-nav"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function PatientAppointmentsPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <PatientNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Appointments</h1>
              <p className="text-muted-foreground">Manage your healthcare appointments</p>
            </div>
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Book New Appointment</DialogTitle>
                  <DialogDescription>Schedule an appointment with your healthcare provider</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctor">Select Doctor</Label>
                      <Select>
                        <SelectTrigger id="doctor">
                          <SelectValue placeholder="Choose a doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dr-johnson">Dr. Sarah Johnson - Cardiologist</SelectItem>
                          <SelectItem value="dr-chen">Dr. Michael Chen - Dermatologist</SelectItem>
                          <SelectItem value="dr-davis">Dr. Emily Davis - General Practice</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Appointment Type</Label>
                      <Select>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultation">Consultation</SelectItem>
                          <SelectItem value="followup">Follow-up</SelectItem>
                          <SelectItem value="checkup">Annual Checkup</SelectItem>
                          <SelectItem value="urgent">Urgent Care</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Time</Label>
                      <Select>
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-person">In-Person Visit</SelectItem>
                        <SelectItem value="video">Video Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Visit</Label>
                    <Textarea
                      id="reason"
                      placeholder="Briefly describe your symptoms or reason for visit..."
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1" onClick={() => setIsBookingOpen(false)}>
                      Book Appointment
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsBookingOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled healthcare visits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  doctor: "Dr. Sarah Johnson",
                  specialty: "Cardiologist",
                  date: "Jan 25, 2025",
                  time: "10:00 AM",
                  type: "Follow-up",
                  location: "In-Person",
                  address: "Medical Center, 123 Health St",
                  status: "confirmed",
                },
                {
                  doctor: "Dr. Michael Chen",
                  specialty: "Dermatologist",
                  date: "Feb 2, 2025",
                  time: "2:30 PM",
                  type: "Consultation",
                  location: "Video Call",
                  address: "Online",
                  status: "confirmed",
                },
                {
                  doctor: "Dr. Emily Davis",
                  specialty: "General Practice",
                  date: "Feb 15, 2025",
                  time: "9:00 AM",
                  type: "Annual Checkup",
                  location: "In-Person",
                  address: "Wellness Clinic, 456 Care Ave",
                  status: "pending",
                },
              ].map((apt, i) => (
                <div key={i} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{apt.doctor}</h3>
                        <Badge variant={apt.status === "confirmed" ? "default" : "secondary"}>{apt.type}</Badge>
                        <Badge variant={apt.status === "confirmed" ? "default" : "outline"}>
                          {apt.status === "confirmed" ? "Confirmed" : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{apt.specialty}</p>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{apt.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{apt.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {apt.location === "Video Call" ? (
                            <Video className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span>{apt.location}</span>
                        </div>
                      </div>
                      {apt.location === "In-Person" && (
                        <p className="text-sm text-muted-foreground mt-2">{apt.address}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {apt.location === "Video Call" && apt.status === "confirmed" && (
                        <Button size="sm">
                          <Video className="h-4 w-4 mr-2" />
                          Join Call
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Reschedule
                      </Button>
                      <Button variant="ghost" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Past Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Past Appointments</CardTitle>
            <CardDescription>Your appointment history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  doctor: "Dr. Sarah Johnson",
                  specialty: "Cardiologist",
                  date: "Jan 10, 2025",
                  type: "Follow-up",
                  status: "completed",
                },
                {
                  doctor: "Dr. Emily Davis",
                  specialty: "General Practice",
                  date: "Dec 15, 2024",
                  type: "Consultation",
                  status: "completed",
                },
                {
                  doctor: "Dr. Sarah Johnson",
                  specialty: "Cardiologist",
                  date: "Nov 20, 2024",
                  type: "Initial Consultation",
                  status: "completed",
                },
              ].map((apt, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-medium">{apt.doctor}</p>
                      <Badge variant="secondary">{apt.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {apt.specialty} • {apt.date}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    View Summary
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
