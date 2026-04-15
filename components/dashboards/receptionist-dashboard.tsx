"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Plus, Edit2, Trash2, X, CheckCircle } from "lucide-react"

interface Appointment {
  id: string
  patientName: string
  patientPhone: string
  doctorName: string
  date: string
  time: string
  reason: string
  status: "scheduled" | "checked-in" | "completed" | "cancelled"
  notes: string
}

type ReceptionistDashboardProps = {
  activeSection?: string | null
}

type AppointmentFormData = {
  patientName: string
  patientPhone: string
  doctorName: string
  date: string
  time: string
  reason: string
  status: Appointment["status"]
  notes: string
}

export default function ReceptionistDashboard({ activeSection = null }: ReceptionistDashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      patientName: "John Doe",
      patientPhone: "555-0101",
      doctorName: "Dr. Smith",
      date: "2024-10-24",
      time: "10:00 AM",
      reason: "General Checkup",
      status: "scheduled",
      notes: "First time patient",
    },
    {
      id: "2",
      patientName: "Jane Smith",
      patientPhone: "555-0102",
      doctorName: "Dr. Johnson",
      date: "2024-10-24",
      time: "11:30 AM",
      reason: "Follow-up",
      status: "checked-in",
      notes: "Follow-up visit",
    },
    {
      id: "3",
      patientName: "Mike Johnson",
      patientPhone: "555-0103",
      doctorName: "Dr. Williams",
      date: "2024-10-24",
      time: "2:00 PM",
      reason: "Consultation",
      status: "completed",
      notes: "Completed successfully",
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)
  const [formData, setFormData] = useState<AppointmentFormData>({
    patientName: "",
    patientPhone: "",
    doctorName: "",
    date: "",
    time: "",
    reason: "",
    status: "scheduled",
    notes: "",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const todayAppointments = appointments.filter((a) => a.date === new Date().toISOString().split("T")[0])
  const checkedInCount = appointments.filter((a) => a.status === "checked-in").length
  const pendingCount = appointments.filter((a) => a.status === "scheduled").length
  const completedCount = appointments.filter((a) => a.status === "completed").length

  const filteredAppointments = appointments.filter(
    (a) =>
      a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.patientPhone.includes(searchTerm) ||
      a.doctorName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleOpenModal = (appointment?: Appointment) => {
    if (appointment) {
      setEditingAppointment(appointment)
      setFormData({
        patientName: appointment.patientName,
        patientPhone: appointment.patientPhone,
        doctorName: appointment.doctorName,
        date: appointment.date,
        time: appointment.time,
        reason: appointment.reason,
        status: appointment.status,
        notes: appointment.notes,
      })
    } else {
      setEditingAppointment(null)
      setFormData({
        patientName: "",
        patientPhone: "",
        doctorName: "",
        date: new Date().toISOString().split("T")[0],
        time: "",
        reason: "",
        status: "scheduled",
        notes: "",
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingAppointment(null)
  }

  const handleSaveAppointment = () => {
    if (!formData.patientName || !formData.patientPhone || !formData.doctorName || !formData.date || !formData.time) {
      alert("Please fill in all required fields")
      return
    }

    if (editingAppointment) {
      setAppointments(appointments.map((a) => (a.id === editingAppointment.id ? { ...a, ...formData } : a)))
    } else {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        ...formData,
      }
      setAppointments([...appointments, newAppointment])
    }

    handleCloseModal()
  }

  const handleDeleteAppointment = (id: string) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      setAppointments(appointments.filter((a) => a.id !== id))
    }
  }

  const handleCheckIn = (id: string) => {
    setAppointments(appointments.map((a) => (a.id === id ? { ...a, status: "checked-in" } : a)))
  }

  const handleCompleteAppointment = (id: string) => {
    setAppointments(appointments.map((a) => (a.id === id ? { ...a, status: "completed" } : a)))
  }

  const shouldShow = (sectionId: string) => !activeSection || activeSection === sectionId

  return (
    <div className="space-y-8">
      {shouldShow("reception-overview") && (
        <section id="reception-overview" className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Receptionist Dashboard</h2>
            <p className="text-muted-foreground mt-2">Manage appointments and patient check-ins</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Today's Check-ins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{checkedInCount}</div>
                <p className="text-xs text-muted-foreground mt-1">Checked in</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingCount}</div>
                <p className="text-xs text-muted-foreground mt-1">Waiting</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completed Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedCount}</div>
                <p className="text-xs text-muted-foreground mt-1">Finished</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{appointments.length}</div>
                <p className="text-xs text-muted-foreground mt-1">All records</p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {shouldShow("reception-appointments") && (
        <section id="reception-appointments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Appointments</CardTitle>
                <CardDescription>Manage all patient appointments</CardDescription>
              </div>
              <Button onClick={() => handleOpenModal()} className="gap-2">
                <Plus className="h-4 w-4" />
                Schedule Appointment
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search by patient name, phone, or doctor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground/90">Patient</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground/90">Phone</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground/90">Doctor</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground/90">Date & Time</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground/90">Reason</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground/90">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground/90">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.map((appointment) => (
                        <tr key={appointment.id} className="border-b border-gray-100 hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">{appointment.patientName}</td>
                          <td className="py-3 px-4 text-muted-foreground">{appointment.patientPhone}</td>
                          <td className="py-3 px-4">{appointment.doctorName}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <div>
                                <p>{appointment.date}</p>
                                <p className="text-xs text-muted-foreground">{appointment.time}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">{appointment.reason}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                                appointment.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : appointment.status === "checked-in"
                                    ? "bg-blue-100 text-blue-800"
                                    : appointment.status === "cancelled"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {appointment.status === "completed" && <CheckCircle className="h-3 w-3" />}
                              {appointment.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              {appointment.status === "scheduled" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCheckIn(appointment.id)}
                                  className="h-8 px-2 text-blue-600 hover:text-blue-700"
                                  title="Check in patient"
                                >
                                  <Clock className="h-4 w-4" />
                                </Button>
                              )}
                              {appointment.status === "checked-in" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCompleteAppointment(appointment.id)}
                                  className="h-8 px-2 text-green-600 hover:text-green-700"
                                  title="Mark as completed"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleOpenModal(appointment)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteAppointment(appointment.id)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredAppointments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No appointments found.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingAppointment ? "Edit Appointment" : "Schedule Appointment"}</CardTitle>
              <Button variant="ghost" size="sm" onClick={handleCloseModal} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name *</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  placeholder="Enter patient name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="patientPhone">Phone Number *</Label>
                <Input
                  id="patientPhone"
                  value={formData.patientPhone}
                  onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctorName">Doctor Name *</Label>
                <Input
                  id="doctorName"
                  value={formData.doctorName}
                  onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                  placeholder="Enter doctor name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Input
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Enter reason for visit"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="checked-in">Checked In</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Enter any notes"
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={2}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={handleCloseModal} className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button onClick={handleSaveAppointment} className="flex-1">
                  {editingAppointment ? "Update Appointment" : "Schedule"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
