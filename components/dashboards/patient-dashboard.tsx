"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Pill, Heart, FileText, Download, Eye, X } from "lucide-react"

interface MedicalRecord {
  id: string
  type: "diagnosis" | "prescription" | "lab_result" | "visit_note"
  title: string
  date: string
  doctor: string
  description: string
  details: string
}

interface Appointment {
  id: string
  date: string
  time: string
  doctor: string
  reason: string
  status: "upcoming" | "completed"
}

type PatientDashboardProps = {
  activeSection?: string | null
}

export default function PatientDashboard({ activeSection = null }: PatientDashboardProps) {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([
    {
      id: "1",
      type: "diagnosis",
      title: "Hypertension Diagnosis",
      date: "2024-10-20",
      doctor: "Dr. Smith",
      description: "High blood pressure detected",
      details: "Blood pressure: 140/90 mmHg. Recommended lifestyle changes and medication.",
    },
    {
      id: "2",
      type: "prescription",
      title: "Lisinopril 10mg",
      date: "2024-10-20",
      doctor: "Dr. Smith",
      description: "Daily medication for hypertension",
      details: "Take one tablet daily in the morning. Refills available.",
    },
    {
      id: "3",
      type: "lab_result",
      title: "Blood Test Results",
      date: "2024-10-15",
      doctor: "Lab Technician",
      description: "Complete blood count and metabolic panel",
      details: "All values within normal range. Cholesterol: 180 mg/dL.",
    },
    {
      id: "4",
      type: "visit_note",
      title: "General Checkup",
      date: "2024-10-10",
      doctor: "Dr. Johnson",
      description: "Annual physical examination",
      details: "Patient in good health. Continue current medications.",
    },
  ])

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      date: "2024-10-25",
      time: "10:00 AM",
      doctor: "Dr. Smith",
      reason: "Follow-up Checkup",
      status: "upcoming",
    },
    {
      id: "2",
      date: "2024-11-05",
      time: "2:00 PM",
      doctor: "Dr. Johnson",
      reason: "Lab Results Review",
      status: "upcoming",
    },
    {
      id: "3",
      date: "2024-10-20",
      time: "11:00 AM",
      doctor: "Dr. Smith",
      reason: "Initial Consultation",
      status: "completed",
    },
  ])

  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null)
  const [showRecordModal, setShowRecordModal] = useState(false)

  const upcomingAppointments = appointments.filter((a) => a.status === "upcoming")
  const activePrescriptions = medicalRecords.filter((r) => r.type === "prescription")
  const labResults = medicalRecords.filter((r) => r.type === "lab_result")

  const getRecordIcon = (type: string) => {
    switch (type) {
      case "prescription":
        return <Pill className="h-5 w-5 text-blue-600" />
      case "lab_result":
        return <FileText className="h-5 w-5 text-purple-600" />
      case "diagnosis":
        return <Heart className="h-5 w-5 text-red-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  const getRecordBadgeColor = (type: string) => {
    switch (type) {
      case "prescription":
        return "bg-blue-100 text-blue-800"
      case "lab_result":
        return "bg-purple-100 text-purple-800"
      case "diagnosis":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleViewRecord = (record: MedicalRecord) => {
    setSelectedRecord(record)
    setShowRecordModal(true)
  }

  const handleDownloadRecord = (record: MedicalRecord) => {
    const content = `${record.title}\nDate: ${record.date}\nDoctor: ${record.doctor}\n\n${record.details}`
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content))
    element.setAttribute("download", `${record.title.replace(/\s+/g, "_")}.txt`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const shouldShow = (sectionId: string) => !activeSection || activeSection === sectionId

  return (
    <div className="space-y-8">
      {shouldShow("patient-overview") && (
        <section id="patient-overview" className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Patient Portal</h2>
            <p className="text-gray-600 mt-2">View your medical records and appointments</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
                <p className="text-xs text-gray-600 mt-1">
                  {upcomingAppointments.length > 0 ? `Next: ${upcomingAppointments[0].date}` : "No upcoming"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Medical Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{medicalRecords.length}</div>
                <p className="text-xs text-gray-600 mt-1">Available</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Prescriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activePrescriptions.length}</div>
                <p className="text-xs text-gray-600 mt-1">Active</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Lab Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{labResults.length}</div>
                <p className="text-xs text-gray-600 mt-1">Recent</p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {shouldShow("patient-appointments") && (
        <section id="patient-appointments">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((apt) => (
                    <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{apt.reason}</p>
                        <p className="text-sm text-gray-600">
                          {apt.date} at {apt.time} with {apt.doctor}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-blue-600">Scheduled</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {shouldShow("patient-records") && (
        <section id="patient-records">
          <Card>
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>Your complete medical history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {medicalRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {getRecordIcon(record.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{record.title}</p>
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-medium ${getRecordBadgeColor(record.type)}`}
                          >
                            {record.type.replace("_", " ")}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {record.date} • {record.doctor}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewRecord(record)}
                        className="h-8 w-8 p-0"
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadRecord(record)}
                        className="h-8 w-8 p-0"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {shouldShow("patient-prescriptions") && (
        <section id="patient-prescriptions">
          <Card>
            <CardHeader>
              <CardTitle>Active Prescriptions</CardTitle>
              <CardDescription>Your current medications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activePrescriptions.length > 0 ? (
                  activePrescriptions.map((rx) => (
                    <div key={rx.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">{rx.title}</p>
                        <p className="text-sm text-gray-600">{rx.description}</p>
                        <p className="text-xs text-gray-500 mt-1">Prescribed by {rx.doctor}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleViewRecord(rx)} className="h-8 px-2">
                        View
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No active prescriptions</p>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {showRecordModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{selectedRecord.title}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowRecordModal(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-600">Type</Label>
                <p className="font-medium">{selectedRecord.type.replace("_", " ")}</p>
              </div>

              <div>
                <Label className="text-gray-600">Date</Label>
                <p className="font-medium">{selectedRecord.date}</p>
              </div>

              <div>
                <Label className="text-gray-600">Doctor</Label>
                <p className="font-medium">{selectedRecord.doctor}</p>
              </div>

              <div>
                <Label className="text-gray-600">Description</Label>
                <p className="font-medium">{selectedRecord.description}</p>
              </div>

              <div>
                <Label className="text-gray-600">Details</Label>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedRecord.details}</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowRecordModal(false)} className="flex-1 bg-transparent">
                  Close
                </Button>
                <Button onClick={() => handleDownloadRecord(selectedRecord)} className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
