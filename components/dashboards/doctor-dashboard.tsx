"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Plus, Edit2, Trash2, X, CheckCircle, Clock, Video, Sparkles, UserCheck } from "lucide-react"
import ConsultationSession from "@/components/telemedicine/consultation-session"
import Patient360 from "@/components/dashboards/patient-360"

interface Consultation {
  id: string
  patientName: string
  patientId: string
  date: string
  time: string
  type: "consultation" | "follow-up" | "checkup"
  status: "scheduled" | "completed" | "cancelled"
  notes: string
  diagnosis: string
  prescription: string
}

type MedicationEntry = {
  name: string
  dosage: string
  frequency: string
  duration: string
}

interface Prescription {
  id: string
  patientId: string
  patientName: string
  medication: string
  dosage: string
  frequency: string
  duration: string
  medications: MedicationEntry[]
  instructions: string
  status: "active" | "completed"
  date: string
}

type DoctorDashboardProps = {
  activeSection?: string | null
}

type ConsultationFormData = {
  patientName: string
  patientId: string
  date: string
  time: string
  type: Consultation["type"]
  status: Consultation["status"]
  notes: string
  diagnosis: string
  prescription: string
}

type PrescriptionFormData = {
  patientId: string
  patientName: string
  medicationInput: string
  dosageInput: string
  frequencyInput: string
  durationInput: string
  medications: { name: string; dosage: string; frequency: string; duration: string }[]
  instructions: string
  status: Prescription["status"]
}

type PatientRecord = {
  id: string
  patientId: string
  patientName: string
  age: number
  gender: "Male" | "Female"
  contact: string
  conditions: string[]
  lastVisit: string
  primaryPhysician: string
  allergies: string[]
  recentPrescriptions: MedicationEntry[]
  notes: string
}

export default function DoctorDashboard({ activeSection = null }: DoctorDashboardProps) {
  const [consultations, setConsultations] = useState<Consultation[]>([
    {
      id: "1",
      patientName: "John Doe",
      patientId: "P001",
      date: "2024-10-24",
      time: "10:00 AM",
      type: "consultation",
      status: "scheduled",
      notes: "Initial consultation",
      diagnosis: "",
      prescription: "",
    },
    {
      id: "2",
      patientName: "Jane Smith",
      patientId: "P002",
      date: "2024-10-24",
      time: "11:30 AM",
      type: "follow-up",
      status: "scheduled",
      notes: "Follow-up visit",
      diagnosis: "",
      prescription: "",
    },
    {
      id: "3",
      patientName: "Mike Johnson",
      patientId: "P003",
      date: "2024-10-24",
      time: "2:00 PM",
      type: "checkup",
      status: "completed",
      notes: "Regular checkup",
      diagnosis: "Hypertension",
      prescription: "Lisinopril 10mg daily",
    },
  ])

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: "rx-1",
      patientId: "P003",
      patientName: "Mike Johnson",
      medication: "Lisinopril 10mg",
      dosage: "1 tablet",
      frequency: "Once daily",
      duration: "30 days",
      medications: [
        {
          name: "Lisinopril 10mg",
          dosage: "1 tablet",
          frequency: "Once daily (morning)",
          duration: "30 days",
        },
      ],
      instructions: "Take after breakfast",
      status: "active",
      date: "2024-10-24",
    },
    {
      id: "rx-2",
      patientId: "P002",
      patientName: "Jane Smith",
      medication: "Metformin 500mg",
      dosage: "1 tablet",
      frequency: "Twice daily",
      duration: "14 days",
      medications: [
        {
          name: "Metformin 500mg",
          dosage: "1 tablet",
          frequency: "Twice daily (morning / evening)",
          duration: "14 days",
        },
      ],
      instructions: "Take with meals",
      status: "completed",
      date: "2024-10-20",
    },
  ])

  const createDefaultPrescriptionForm = (): PrescriptionFormData => ({
    patientId: "",
    patientName: "",
    medicationInput: "",
    dosageInput: "",
    frequencyInput: "",
    durationInput: "",
    medications: [],
    instructions: "",
    status: "active",
  })

  const [newPrescription, setNewPrescription] = useState<PrescriptionFormData>(createDefaultPrescriptionForm())

  const [showModal, setShowModal] = useState(false)
  const [activeTelemedicine, setActiveTelemedicine] = useState<string | null>(null)
  const [viewingPatientId, setViewingPatientId] = useState<string | null>(null)
  const [editingConsultation, setEditingConsultation] = useState<Consultation | null>(null)
  const [formData, setFormData] = useState<ConsultationFormData>({
    patientName: "",
    patientId: "",
    date: "",
    time: "",
    type: "consultation",
    status: "scheduled",
    notes: "",
    diagnosis: "",
    prescription: "",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [patientRecordQuery, setPatientRecordQuery] = useState("")

  const patientMap = new Map<string, { patientId: string; patientName: string }>()
  consultations.forEach((consultation) => {
    patientMap.set(consultation.patientId, {
      patientId: consultation.patientId,
      patientName: consultation.patientName,
    })
  })
  prescriptions.forEach((prescription) => {
    patientMap.set(prescription.patientId, {
      patientId: prescription.patientId,
      patientName: prescription.patientName,
    })
  })

  const patientOptions = Array.from(patientMap.values())

  const activePrescriptionCount = prescriptions.filter((prescription) => prescription.status === "active").length
  const completedPrescriptionCount = prescriptions.filter((prescription) => prescription.status === "completed").length

  const todayConsultations = consultations.filter((c) => c.date === new Date().toISOString().split("T")[0])
  const completedCount = consultations.filter((c) => c.status === "completed").length
  const totalPatients = new Set(consultations.map((c) => c.patientId)).size

  const filteredConsultations = consultations.filter(
    (c) =>
      c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.patientId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleOpenModal = (consultation?: Consultation) => {
    if (consultation) {
      setEditingConsultation(consultation)
      setFormData({
        patientName: consultation.patientName,
        patientId: consultation.patientId,
        date: consultation.date,
        time: consultation.time,
        type: consultation.type,
        status: consultation.status,
        notes: consultation.notes,
        diagnosis: consultation.diagnosis,
        prescription: consultation.prescription,
      })
    } else {
      setEditingConsultation(null)
      setFormData({
        patientName: "",
        patientId: "",
        date: new Date().toISOString().split("T")[0],
        time: "",
        type: "consultation",
        status: "scheduled",
        notes: "",
        diagnosis: "",
        prescription: "",
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingConsultation(null)
  }

  const handleSaveConsultation = () => {
    if (!formData.patientName || !formData.patientId || !formData.date || !formData.time) {
      alert("Please fill in all required fields")
      return
    }

    if (editingConsultation) {
      setConsultations(consultations.map((c) => (c.id === editingConsultation.id ? { ...c, ...formData } : c)))
      toast.success("Consultation updated successfully.")
    } else {
      const newConsultation: Consultation = {
        id: Date.now().toString(),
        ...formData,
      }
      setConsultations([...consultations, newConsultation])
      toast.success("Consultation scheduled successfully.")
    }

    handleCloseModal()
  }

  const handleDeleteConsultation = (id: string) => {
    if (confirm("Are you sure you want to delete this consultation?")) {
      setConsultations(consultations.filter((c) => c.id !== id))
      toast.info("Consultation deleted.")
    }
  }

  const handleCompleteConsultation = (id: string) => {
    setConsultations(consultations.map((c) => (c.id === id ? { ...c, status: "completed" } : c)))
    toast.success("Consultation marked as completed.")
  }

  const handleSelectPrescriptionPatient = (value: string) => {
    const selectedPatient = patientOptions.find((option) => option.patientId === value)
    if (selectedPatient) {
      setNewPrescription((prev) => ({
        ...prev,
        patientId: selectedPatient.patientId,
        patientName: selectedPatient.patientName,
        medications: prev.medications ?? [],
      }))
    }
  }

  const handleAddMedicationToList = () => {
    const medicationName = (newPrescription.medicationInput || "").trim()
    const dosageValue = (newPrescription.dosageInput || "").trim()
    const frequencyValue = (newPrescription.frequencyInput || "").trim()
    const durationValue = (newPrescription.durationInput || "").trim()

    if (!medicationName || !dosageValue || !frequencyValue || !durationValue) {
      alert("Enter medication, dosage, frequency, and duration before adding")
      return
    }

    setNewPrescription((prev) => ({
      ...prev,
      medications: [
        ...(prev.medications ?? []),
        {
          name: medicationName,
          dosage: dosageValue,
          frequency: frequencyValue,
          duration: durationValue,
        },
      ],
      medicationInput: "",
      dosageInput: "",
      frequencyInput: "",
      durationInput: "",
    }))
  }

  const handleRemoveMedicationFromList = (index: number) => {
    setNewPrescription((prev) => ({
      ...prev,
      medications: (prev.medications ?? []).filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  const handleAddPrescription = () => {
    let medicationsList = [...(newPrescription.medications ?? [])]

    const medicationName = (newPrescription.medicationInput || "").trim()
    const dosageValue = (newPrescription.dosageInput || "").trim()
    const frequencyValue = (newPrescription.frequencyInput || "").trim()
    const durationValue = (newPrescription.durationInput || "").trim()

    if (medicationName && dosageValue && frequencyValue && durationValue) {
      medicationsList = [
        ...medicationsList,
        {
          name: medicationName,
          dosage: dosageValue,
          frequency: frequencyValue,
          duration: durationValue,
        },
      ]
    }

    const patientName = (newPrescription.patientName || "").trim()
    const patientId = (newPrescription.patientId || "").trim()

    if (!patientName || !patientId || medicationsList.length === 0) {
      alert("Please provide patient details and at least one medication with dosage")
      return
    }

    const today = new Date().toISOString().split("T")[0]
    const combinedMedication = medicationsList.map((item) => item.name).join(", ")
    const combinedDosage = medicationsList
      .map((item) => `${item.name}: ${item.dosage}`)
      .join(" • ")
    const combinedFrequency = medicationsList
      .map((item) => `${item.name}: ${item.frequency}`)
      .join(" • ")
    const combinedDuration = medicationsList
      .map((item) => `${item.name}: ${item.duration}`)
      .join(" • ")

    const prescription: Prescription = {
      id: Date.now().toString(),
      patientId,
      patientName,
      medication: combinedMedication,
      dosage: combinedDosage,
      frequency: combinedFrequency,
      duration: combinedDuration,
      medications: medicationsList,
      instructions: newPrescription.instructions,
      status: "active",
      date: today,
    }

    setPrescriptions((prev) => [prescription, ...prev])
    setNewPrescription(createDefaultPrescriptionForm())
    toast.success("Prescription generated successfully.", {
      description: "Direct link sent to pharmacy wing.",
    })
  }

  const handleCompletePrescription = (id: string) => {
    setPrescriptions((prev) => prev.map((prescription) => (prescription.id === id ? { ...prescription, status: "completed" } : prescription)))
    toast.success("Prescription marked as completed.")
  }

  const handleDeletePrescription = (id: string) => {
    if (confirm("Remove this prescription?")) {
      setPrescriptions((prev) => prev.filter((prescription) => prescription.id !== id))
      toast.info("Prescription removed.")
    }
  }

  const patientRecords: PatientRecord[] = [
    {
      id: "record-1",
      patientId: "P003",
      patientName: "Mike Johnson",
      age: 52,
      gender: "Male",
      contact: "+91 98765 43210",
      conditions: ["Hypertension"],
      lastVisit: "2024-10-24",
      primaryPhysician: "Dr. Priya Sharma",
      allergies: ["Penicillin"],
      recentPrescriptions: [
        {
          name: "Lisinopril 10mg",
          dosage: "1 tablet",
          frequency: "Once daily (morning)",
          duration: "30 days",
        },
      ],
      notes: "Blood pressure under control. Monitor salt intake.",
    },
    {
      id: "record-2",
      patientId: "P002",
      patientName: "Jane Smith",
      age: 45,
      gender: "Female",
      contact: "+91 91234 56789",
      conditions: ["Type 2 Diabetes", "PCOS"],
      lastVisit: "2024-10-20",
      primaryPhysician: "Dr. Rohan Patel",
      allergies: ["Sulfa drugs"],
      recentPrescriptions: [
        {
          name: "Metformin 500mg",
          dosage: "1 tablet",
          frequency: "Twice daily (morning / evening)",
          duration: "14 days",
        },
        {
          name: "Montac LC",
          dosage: "1 tablet",
          frequency: "Bedtime",
          duration: "7 days",
        },
      ],
      notes: "Maintain diet plan, next HbA1c due in 3 months.",
    },
    {
      id: "record-3",
      patientId: "P001",
      patientName: "John Doe",
      age: 38,
      gender: "Male",
      contact: "+91 90000 12345",
      conditions: ["Asthma"],
      lastVisit: "2024-10-18",
      primaryPhysician: "Dr. Meera Nair",
      allergies: ["Dust mites"],
      recentPrescriptions: [
        {
          name: "Budesonide Inhaler",
          dosage: "2 puffs",
          frequency: "Twice daily",
          duration: "30 days",
        },
      ],
      notes: "Advise regular peak flow monitoring.",
    },
  ]

  const shouldShow = (sectionId: string) => !activeSection || activeSection === sectionId

  if (activeTelemedicine) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <h2 className="text-2xl font-bold flex items-center gap-2">
             <Video className="h-6 w-6 text-primary" /> Telemedicine Consultation
           </h2>
           <Button variant="outline" onClick={() => setActiveTelemedicine(null)}>Exit Session</Button>
        </div>
        <ConsultationSession patientName={activeTelemedicine} onEnd={() => setActiveTelemedicine(null)} />
      </div>
    )
  }

  if (viewingPatientId) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <h2 className="text-2xl font-bold">Patient 360 View</h2>
           <Button variant="outline" onClick={() => setViewingPatientId(null)}>Back to Dashboard</Button>
        </div>
        <Patient360 patientId={viewingPatientId} />
      </div>
    )
  }

  const filteredPatientRecords = patientRecords.filter((record) => {
    if (!patientRecordQuery.trim()) return true
    const query = patientRecordQuery.trim().toLowerCase()
    return (
      record.patientName.toLowerCase().includes(query) || record.patientId.toLowerCase().includes(query)
    )
  })

  return (
    <div className="space-y-8">
      {shouldShow("doctor-overview") && (
        <section id="doctor-overview" className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Doctor Dashboard</h2>
            <p className="text-muted-foreground mt-2">Manage your appointments and patient consultations</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card className="enterprise-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Today's Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{todayConsultations.length}</div>
                <p className="text-xs text-muted-foreground mt-1">{completedCount} completed</p>
              </CardContent>
            </Card>
            <Card className="enterprise-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{consultations.filter((c) => c.status === "scheduled").length}</div>
                <p className="text-xs text-muted-foreground mt-1">To be reviewed</p>
              </CardContent>
            </Card>
            <Card className="enterprise-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{totalPatients}</div>
                <p className="text-xs text-muted-foreground mt-1">Under your care</p>
              </CardContent>
            </Card>
            <Card className="enterprise-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Consultations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{consultations.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Total records</p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {shouldShow("doctor-consultations") && (
        <section id="doctor-consultations">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Consultations</CardTitle>
                <CardDescription>Manage all your patient consultations</CardDescription>
              </div>
              <Button onClick={() => handleOpenModal()} className="gap-2">
                <Plus className="h-4 w-4" />
                New Consultation
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search by patient name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 transition-colors">
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Patient</th>
                        <th className="text-left py-3 px-4 font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Date & Time</th>
                        <th className="text-left py-3 px-4 font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Type</th>
                        <th className="text-left py-3 px-4 font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Status</th>
                        <th className="text-left py-3 px-4 font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Diagnosis</th>
                        <th className="text-left py-3 px-4 font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredConsultations.map((consultation) => (
                        <tr key={consultation.id} className="border-b border-gray-100 hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-bold text-foreground">{consultation.patientName}</p>
                              <p className="text-xs text-muted-foreground">{consultation.patientId}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <div className="text-xs">
                                <p className="font-medium">{consultation.date}</p>
                                <p className="text-muted-foreground">{consultation.time}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                              {consultation.type.replace("_", " ")}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                                consultation.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : consultation.status === "cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {consultation.status === "completed" && <CheckCircle className="h-3 w-3" />}
                              {consultation.status === "scheduled" && <Clock className="h-3 w-3" />}
                              {consultation.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{consultation.diagnosis || "-"}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              {consultation.status === "scheduled" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCompleteConsultation(consultation.id)}
                                  className="h-8 px-2 text-green-600 hover:text-green-700"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setActiveTelemedicine(consultation.patientName)}
                                title="Start Telemedicine"
                                className="h-8 px-2 text-primary hover:text-primary/80"
                              >
                                <Video className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setViewingPatientId(consultation.patientId)}
                                title="View Patient 360"
                                className="h-8 px-2 text-teal-600 hover:text-teal-700"
                              >
                                <UserCheck className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleOpenModal(consultation)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteConsultation(consultation.id)}
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

                {filteredConsultations.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No consultations found.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {shouldShow("doctor-patient-records") && (
        <section id="doctor-patient-records" className="space-y-6">
          <div className="flex flex-col gap-2">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Patient Records</h2>
              <p className="text-muted-foreground mt-2">Review patient demographics, histories, and previous prescriptions.</p>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-bold text-foreground">Search patient records</p>
                <p className="text-xs text-muted-foreground">Filter by name or patient ID to quickly locate history.</p>
              </div>
              <div className="flex w-full gap-3 md:w-auto">
                <Input
                  value={patientRecordQuery}
                  onChange={(e) => setPatientRecordQuery(e.target.value)}
                  placeholder="Search by name or ID"
                  className="flex-1"
                />
                {patientRecordQuery && (
                  <Button variant="ghost" onClick={() => setPatientRecordQuery("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Patients Managed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{patientRecords.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">Active records in your care</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Chronic Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{patientRecords.reduce((acc, record) => acc + record.conditions.length, 0)}</div>
                  <p className="text-xs text-muted-foreground mt-1">Across tracked patients</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground mt-1">Suggested follow-ups this month</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Patient Overview</CardTitle>
              <CardDescription>At-a-glance view of patient history and medication plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-muted/50 transition-colors">
                      <tr className="border-b border-border">
                        <th className="py-3 px-4 text-left font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Patient</th>
                        <th className="py-3 px-4 text-left font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Demographics</th>
                        <th className="py-3 px-4 text-left font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Medical History</th>
                        <th className="py-3 px-4 text-left font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Recent Prescriptions</th>
                        <th className="py-3 px-4 text-left font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Last Visit</th>
                      </tr>
                    </thead>
                  <tbody>
                    {filteredPatientRecords.map((record) => (
                      <tr key={record.id} className="border-b border-gray-100 hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-foreground">{record.patientName}</p>
                            <p className="text-xs text-muted-foreground">ID: {record.patientId}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-xs text-muted-foreground">
                          <p>
                            Age {record.age}, {record.gender}
                          </p>
                          <p>Contact: {record.contact}</p>
                          <p>Primary physician: {record.primaryPhysician}</p>
                          {record.allergies.length > 0 && (
                            <p className="text-red-500">Allergies: {record.allergies.join(", ")}</p>
                          )}
                        </td>
                        <td className="py-3 px-4 text-xs text-muted-foreground">
                          <p className="font-medium text-foreground/90">Conditions</p>
                          <ul className="list-disc ml-4 space-y-1">
                            {record.conditions.map((condition) => (
                              <li key={`${record.id}-${condition}`}>{condition}</li>
                            ))}
                          </ul>
                          <p className="mt-2 text-muted-foreground">Notes: {record.notes}</p>
                        </td>
                        <td className="py-3 px-4 text-xs text-muted-foreground">
                          <div className="space-y-2">
                            {record.recentPrescriptions.map((item, index) => (
                              <div key={`${record.id}-recent-${index}`} className="rounded-md bg-muted/50 p-2">
                                <p className="font-medium text-foreground">{item.name}</p>
                                <p>Dosage: {item.dosage}</p>
                                <p>Frequency: {item.frequency}</p>
                                <p>Duration: {item.duration}</p>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-xs text-muted-foreground">
                          <p>{record.lastVisit}</p>
                          <p className="text-muted-foreground">Next review: {new Date(record.lastVisit).getFullYear()}-12-15</p>
                        </td>
                      </tr>
                    ))}
                    {filteredPatientRecords.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                          No patient records match "{patientRecordQuery}".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {shouldShow("doctor-prescriptions") && (
        <section id="doctor-prescriptions" className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Prescriptions</h2>
            <p className="text-muted-foreground mt-2">Create and manage patient medication plans.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Prescriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activePrescriptionCount}</div>
                <p className="text-xs text-muted-foreground mt-1">Awaiting fulfilment</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedPrescriptionCount}</div>
                <p className="text-xs text-muted-foreground mt-1">Marked as fulfilled</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Patients with Prescriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{patientOptions.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Currently receiving medication plans</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle>Create Prescription</CardTitle>
                <CardDescription>Select a patient and add medication details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prescriptionPatient">Patient</Label>
                  <Select value={newPrescription.patientId} onValueChange={handleSelectPrescriptionPatient}>
                    <SelectTrigger id="prescriptionPatient">
                      <SelectValue placeholder="Select from recent patients" />
                    </SelectTrigger>
                    <SelectContent>
                      {patientOptions.length > 0 ? (
                        patientOptions.map((patient) => (
                          <SelectItem key={patient.patientId} value={patient.patientId}>
                            {patient.patientName} ({patient.patientId})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="" disabled>
                          No patients available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="prescriptionPatientName">Patient Name *</Label>
                    <Input
                      id="prescriptionPatientName"
                      placeholder="Enter patient name"
                      value={newPrescription.patientName}
                      onChange={(e) =>
                        setNewPrescription((prev) => ({
                          ...prev,
                          patientName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prescriptionPatientId">Patient ID *</Label>
                    <Input
                      id="prescriptionPatientId"
                      placeholder="Enter patient ID"
                      value={newPrescription.patientId}
                      onChange={(e) =>
                        setNewPrescription((prev) => ({
                          ...prev,
                          patientId: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="medication">Medication *</Label>
                    <Input
                      id="medication"
                      placeholder="e.g. Amoxicillin"
                      value={newPrescription.medicationInput}
                      onChange={(e) =>
                        setNewPrescription((prev) => ({
                          ...prev,
                          medicationInput: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dosage">Dosage *</Label>
                    <Input
                      id="dosage"
                      placeholder="e.g. 500mg"
                      value={newPrescription.dosageInput}
                      onChange={(e) =>
                        setNewPrescription((prev) => ({
                          ...prev,
                          dosageInput: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="frequencyInput">Frequency *</Label>
                    <Input
                      id="frequencyInput"
                      placeholder="e.g. Twice daily"
                      value={newPrescription.frequencyInput}
                      onChange={(e) =>
                        setNewPrescription((prev) => ({
                          ...prev,
                          frequencyInput: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="durationInput">Duration *</Label>
                    <Input
                      id="durationInput"
                      placeholder="e.g. 10 days"
                      value={newPrescription.durationInput}
                      onChange={(e) =>
                        setNewPrescription((prev) => ({
                          ...prev,
                          durationInput: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={handleAddMedicationToList}>
                    <Plus className="h-4 w-4" />
                    Add medication to list
                  </Button>
                  {(newPrescription.medications?.length ?? 0) > 0 && (
                    <span className="text-xs text-muted-foreground">{newPrescription.medications?.length ?? 0} medication(s) added</span>
                  )}
                </div>

                {(newPrescription.medications?.length ?? 0) > 0 && (
                  <div className="flex flex-wrap gap-2 rounded-xl border border-dashed border-primary/20 bg-primary/5 p-3">
                    {(newPrescription.medications ?? []).map((item, index) => (
                      <div
                        key={`${item.name}-${index}`}
                        className="flex items-center gap-2 rounded-full bg-background/80 backdrop-blur-sm border border-border px-3 py-1.5 text-xs shadow-sm"
                      >
                        <span className="font-bold text-foreground">{item.name}</span>
                        <span className="text-muted-foreground">{item.dosage}</span>
                        <span className="text-muted-foreground/70">{item.frequency}</span>
                        <span className="text-gray-400">{item.duration}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 text-gray-400 hover:text-red-500"
                          onClick={() => handleRemoveMedicationFromList(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="instructions">Instructions</Label>
                  <textarea
                    id="instructions"
                    rows={3}
                    placeholder="Any additional instructions for the patient"
                    className="w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={newPrescription.instructions}
                    onChange={(e) =>
                      setNewPrescription((prev) => ({
                        ...prev,
                        instructions: e.target.value,
                      }))
                    }
                  />
                </div>

                <Button onClick={handleAddPrescription} className="w-full gap-2 bg-primary text-white hover:bg-primary/90 rounded-xl h-11 font-bold shadow-lg shadow-primary/20">
                  <Plus className="h-4 w-4" />
                  Add Prescription
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Prescriptions</CardTitle>
                  <CardDescription>Track prescribed medications and fulfilment</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-3 px-4 text-left font-semibold text-foreground/90">Patient</th>
                        <th className="py-3 px-4 text-left font-semibold text-foreground/90">Medication</th>
                        <th className="py-3 px-4 text-left font-semibold text-foreground/90">Schedule</th>
                        <th className="py-3 px-4 text-left font-semibold text-foreground/90">Status</th>
                        <th className="py-3 px-4 text-left font-semibold text-foreground/90">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescriptions.map((prescription) => (
                        <tr key={prescription.id} className="border-b border-gray-100 hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{prescription.patientName}</p>
                              <p className="text-xs text-muted-foreground">{prescription.patientId}</p>
                              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> {prescription.date}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="space-y-2">
                              {(prescription.medications ?? []).map((item, medIndex) => (
                                <div key={`${prescription.id}-med-${medIndex}`}>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">Dosage: {item.dosage}</p>
                                </div>
                              ))}
                              {(!prescription.medications || prescription.medications.length === 0) && (
                                <div>
                                  <p className="font-medium">{prescription.medication}</p>
                                  <p className="text-xs text-muted-foreground">Dosage: {prescription.dosage}</p>
                                </div>
                              )}
                              {prescription.instructions && (
                                <p className="text-xs text-muted-foreground mt-1">{prescription.instructions}</p>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            <div className="space-y-2">
                              {(prescription.medications ?? []).map((item, medIndex) => (
                                <div key={`${prescription.id}-schedule-${medIndex}`} className="text-xs text-muted-foreground">
                                  <p className="font-medium text-foreground/90">{item.frequency}</p>
                                  <p className="text-muted-foreground">Duration: {item.duration}</p>
                                </div>
                              ))}
                              {(!prescription.medications || prescription.medications.length === 0) && (
                                <div className="text-xs text-muted-foreground">
                                  <p>{prescription.frequency || "As directed"}</p>
                                  <p className="text-muted-foreground">{prescription.duration || "Duration not specified"}</p>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium ${
                                prescription.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {prescription.status === "completed" && <CheckCircle className="h-3 w-3" />}
                              {prescription.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              {prescription.status === "active" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCompletePrescription(prescription.id)}
                                  className="h-8 px-2 text-green-600 hover:text-green-700"
                                  title="Mark as completed"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeletePrescription(prescription.id)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                title="Delete prescription"
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

                {prescriptions.length === 0 && (
                  <div className="py-10 text-center text-muted-foreground">
                    <p>No prescriptions created yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto enterprise-card shadow-2xl border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-background/90 backdrop-blur-md z-10 border-b border-border/50">
              <CardTitle className="text-xl font-bold">{editingConsultation ? "Edit Consultation" : "New Consultation"}</CardTitle>
              <Button variant="ghost" size="sm" onClick={handleCloseModal} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="patientId">Patient ID *</Label>
                  <Input
                    id="patientId"
                    value={formData.patientId}
                    onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                    placeholder="Enter patient ID"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Consultation Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value as any })}
                  >
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="checkup">Checkup</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Enter consultation notes"
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Input
                  id="diagnosis"
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  placeholder="Enter diagnosis"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prescription">Prescription</Label>
                <textarea
                  id="prescription"
                  value={formData.prescription}
                  onChange={(e) => setFormData({ ...formData, prescription: e.target.value })}
                  placeholder="Enter prescription details"
                  className="w-full px-3 py-2 border border-input bg-background/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={handleCloseModal} className="flex-1 rounded-xl h-11 font-bold">
                  Cancel
                </Button>
                <Button onClick={handleSaveConsultation} className="flex-1 bg-primary text-white hover:bg-primary/90 rounded-xl h-11 font-bold shadow-lg shadow-primary/20">
                  {editingConsultation ? "Update Patient Record" : "Create Consultation"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
