"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, TrendingDown, Plus, Edit2, Trash2, X, CheckCircle } from "lucide-react"

interface Prescription {
  id: string
  patientName: string
  medication: string
  quantity: number
  dosage: string
  date: string
  status: "pending" | "filled" | "completed"
  notes: string
}

interface PharmacyInventory {
  id: string
  name: string
  quantity: number
  unit: string
  minStock: number
  price: number
  expiryDate: string
  status: "ok" | "low" | "critical"
}

type PharmacyDashboardProps = {
  activeSection?: string | null
}

type PrescriptionFormData = {
  patientName: string
  medication: string
  quantity: number
  dosage: string
  date: string
  status: Prescription["status"]
  notes: string
}

type InventoryFormData = {
  name: string
  quantity: number
  unit: string
  minStock: number
  price: number
  expiryDate: string
}

export default function PharmacyDashboard({ activeSection = null }: PharmacyDashboardProps) {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: "1",
      patientName: "John Doe",
      medication: "Amoxicillin 500mg",
      quantity: 30,
      dosage: "1 tablet 3x daily",
      date: "2024-10-24",
      status: "pending",
      notes: "For infection",
    },
    {
      id: "2",
      patientName: "Jane Smith",
      medication: "Paracetamol 500mg",
      quantity: 20,
      dosage: "1 tablet as needed",
      date: "2024-10-24",
      status: "filled",
      notes: "For pain relief",
    },
    {
      id: "3",
      patientName: "Mike Johnson",
      medication: "Lisinopril 10mg",
      quantity: 30,
      dosage: "1 tablet daily",
      date: "2024-10-23",
      status: "completed",
      notes: "For hypertension",
    },
  ])

  const [inventory, setInventory] = useState<PharmacyInventory[]>([
    {
      id: "1",
      name: "Amoxicillin 500mg",
      quantity: 5,
      unit: "box",
      minStock: 50,
      price: 150,
      expiryDate: "2025-06-30",
      status: "critical",
    },
    {
      id: "2",
      name: "Paracetamol 500mg",
      quantity: 25,
      unit: "box",
      minStock: 100,
      price: 80,
      expiryDate: "2025-12-31",
      status: "low",
    },
    {
      id: "3",
      name: "Lisinopril 10mg",
      quantity: 200,
      unit: "tablet",
      minStock: 100,
      price: 200,
      expiryDate: "2025-03-31",
      status: "ok",
    },
    {
      id: "4",
      name: "Ibuprofen 400mg",
      quantity: 150,
      unit: "tablet",
      minStock: 100,
      price: 120,
      expiryDate: "2025-09-30",
      status: "ok",
    },
  ])

  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false)
  const [showInventoryModal, setShowInventoryModal] = useState(false)
  const [editingPrescription, setEditingPrescription] = useState<Prescription | null>(null)
  const [editingInventory, setEditingInventory] = useState<PharmacyInventory | null>(null)
  const [prescriptionFormData, setPrescriptionFormData] = useState<PrescriptionFormData>({
    patientName: "",
    medication: "",
    quantity: 0,
    dosage: "",
    date: new Date().toISOString().split("T")[0],
    status: "pending",
    notes: "",
  })
  const [inventoryFormData, setInventoryFormData] = useState<InventoryFormData>({
    name: "",
    quantity: 0,
    unit: "box",
    minStock: 0,
    price: 0,
    expiryDate: "",
  })

  const pendingPrescriptions = prescriptions.filter((p) => p.status === "pending").length
  const filledToday = prescriptions.filter((p) => p.status === "filled").length
  const totalMedications = inventory.reduce((sum, item) => sum + item.quantity, 0)
  const lowStockItems = inventory.filter((i) => i.status !== "ok").length

  const handleOpenPrescriptionModal = (prescription?: Prescription) => {
    if (prescription) {
      setEditingPrescription(prescription)
      setPrescriptionFormData({
        patientName: prescription.patientName,
        medication: prescription.medication,
        quantity: prescription.quantity,
        dosage: prescription.dosage,
        date: prescription.date,
        status: prescription.status,
        notes: prescription.notes,
      })
    } else {
      setEditingPrescription(null)
      setPrescriptionFormData({
        patientName: "",
        medication: "",
        quantity: 0,
        dosage: "",
        date: new Date().toISOString().split("T")[0],
        status: "pending",
        notes: "",
      })
    }
    setShowPrescriptionModal(true)
  }

  const handleOpenInventoryModal = (item?: PharmacyInventory) => {
    if (item) {
      setEditingInventory(item)
      setInventoryFormData({
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        minStock: item.minStock,
        price: item.price,
        expiryDate: item.expiryDate,
      })
    } else {
      setEditingInventory(null)
      setInventoryFormData({
        name: "",
        quantity: 0,
        unit: "box",
        minStock: 0,
        price: 0,
        expiryDate: "",
      })
    }
    setShowInventoryModal(true)
  }

  const handleSavePrescription = () => {
    if (!prescriptionFormData.patientName || !prescriptionFormData.medication) {
      alert("Please fill in all required fields")
      return
    }

    if (editingPrescription) {
      setPrescriptions(
        prescriptions.map((p) => (p.id === editingPrescription.id ? { ...p, ...prescriptionFormData } : p)),
      )
    } else {
      const newPrescription: Prescription = {
        id: Date.now().toString(),
        ...prescriptionFormData,
      }
      setPrescriptions([...prescriptions, newPrescription])
    }
    setShowPrescriptionModal(false)
  }

  const handleSaveInventory = () => {
    if (!inventoryFormData.name || inventoryFormData.quantity < 0) {
      alert("Please fill in all required fields")
      return
    }

    const status =
      inventoryFormData.quantity === 0
        ? "critical"
        : inventoryFormData.quantity < inventoryFormData.minStock
          ? "low"
          : "ok"

    if (editingInventory) {
      setInventory(inventory.map((i) => (i.id === editingInventory.id ? { ...i, ...inventoryFormData, status } : i)))
    } else {
      const newItem: PharmacyInventory = {
        id: Date.now().toString(),
        ...inventoryFormData,
        status,
      }
      setInventory([...inventory, newItem])
    }
    setShowInventoryModal(false)
  }

  const handleDeletePrescription = (id: string) => {
    if (confirm("Delete this prescription?")) {
      setPrescriptions(prescriptions.filter((p) => p.id !== id))
    }
  }

  const handleDeleteInventory = (id: string) => {
    if (confirm("Delete this inventory item?")) {
      setInventory(inventory.filter((i) => i.id !== id))
    }
  }

  const handleFillPrescription = (id: string) => {
    setPrescriptions(prescriptions.map((p) => (p.id === id ? { ...p, status: "filled" } : p)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "filled":
        return "bg-blue-100 text-blue-800"
      case "critical":
        return "bg-red-100 text-red-800"
      case "low":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-foreground"
    }
  }

  const shouldShow = (sectionId: string) => !activeSection || activeSection === sectionId

  return (
    <div className="space-y-8">
      {shouldShow("pharmacy-overview") && (
        <section id="pharmacy-overview" className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Pharmacy Management</h2>
            <p className="text-muted-foreground mt-2">Manage medications, prescriptions, and inventory</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Prescriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingPrescriptions}</div>
                <p className="text-xs text-muted-foreground mt-1">To be filled</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Medications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalMedications}</div>
                <p className="text-xs text-muted-foreground mt-1">In stock</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lowStockItems}</div>
                <p className="text-xs text-muted-foreground mt-1">Needs reorder</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Filled Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{filledToday}</div>
                <p className="text-xs text-muted-foreground mt-1">Prescriptions</p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {shouldShow("pharmacy-prescriptions") && (
        <section id="pharmacy-prescriptions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Prescriptions</CardTitle>
                <CardDescription>Manage prescription orders</CardDescription>
              </div>
              <Button onClick={() => handleOpenPrescriptionModal()} className="gap-2">
                <Plus className="h-4 w-4" />
                New Prescription
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground/90">Patient</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground/90">Medication</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground/90">Quantity</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground/90">Dosage</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground/90">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground/90">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptions.map((prescription) => (
                      <tr key={prescription.id} className="border-b border-gray-100 hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{prescription.patientName}</td>
                        <td className="py-3 px-4">{prescription.medication}</td>
                        <td className="py-3 px-4">{prescription.quantity}</td>
                        <td className="py-3 px-4 text-muted-foreground">{prescription.dosage}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(prescription.status)}`}
                          >
                            {prescription.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            {prescription.status === "pending" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleFillPrescription(prescription.id)}
                                className="h-8 px-2 text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenPrescriptionModal(prescription)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePrescription(prescription.id)}
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
            </CardContent>
          </Card>
        </section>
      )}

      {shouldShow("pharmacy-inventory") && (
        <section id="pharmacy-inventory">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Medication Inventory</CardTitle>
                <CardDescription>Manage stock levels and medications</CardDescription>
              </div>
              <Button onClick={() => handleOpenInventoryModal()} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Medication
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground/90">Medication</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground/90">Quantity</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground/90">Min Stock</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground/90">Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground/90">Expiry</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground/90">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground/90">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{item.name}</td>
                        <td className="py-3 px-4">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="py-3 px-4">{item.minStock}</td>
                        <td className="py-3 px-4">₹{item.price}</td>
                        <td className="py-3 px-4">{item.expiryDate}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}
                          >
                            {item.status === "critical" && <AlertTriangle className="h-3 w-3" />}
                            {item.status === "low" && <TrendingDown className="h-3 w-3" />}
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenInventoryModal(item)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteInventory(item.id)}
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
            </CardContent>
          </Card>
        </section>
      )}

      {showPrescriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingPrescription ? "Edit Prescription" : "New Prescription"}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowPrescriptionModal(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name *</Label>
                <Input
                  id="patientName"
                  value={prescriptionFormData.patientName}
                  onChange={(e) => setPrescriptionFormData({ ...prescriptionFormData, patientName: e.target.value })}
                  placeholder="Enter patient name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medication">Medication *</Label>
                <Input
                  id="medication"
                  value={prescriptionFormData.medication}
                  onChange={(e) => setPrescriptionFormData({ ...prescriptionFormData, medication: e.target.value })}
                  placeholder="Enter medication name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={prescriptionFormData.quantity}
                  onChange={(e) =>
                    setPrescriptionFormData({ ...prescriptionFormData, quantity: Number.parseInt(e.target.value) || 0 })
                  }
                  placeholder="Enter quantity"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  value={prescriptionFormData.dosage}
                  onChange={(e) => setPrescriptionFormData({ ...prescriptionFormData, dosage: e.target.value })}
                  placeholder="e.g., 1 tablet 3x daily"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={prescriptionFormData.date}
                  onChange={(e) => setPrescriptionFormData({ ...prescriptionFormData, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={prescriptionFormData.status}
                  onValueChange={(value) => setPrescriptionFormData({ ...prescriptionFormData, status: value as any })}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="filled">Filled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  value={prescriptionFormData.notes}
                  onChange={(e) => setPrescriptionFormData({ ...prescriptionFormData, notes: e.target.value })}
                  placeholder="Enter notes"
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={2}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowPrescriptionModal(false)}
                  className="flex-1 bg-transparent"
                >
                  Cancel
                </Button>
                <Button onClick={handleSavePrescription} className="flex-1">
                  {editingPrescription ? "Update" : "Create"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showInventoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingInventory ? "Edit Medication" : "Add Medication"}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowInventoryModal(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Medication Name *</Label>
                <Input
                  id="name"
                  value={inventoryFormData.name}
                  onChange={(e) => setInventoryFormData({ ...inventoryFormData, name: e.target.value })}
                  placeholder="Enter medication name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={inventoryFormData.quantity}
                  onChange={(e) =>
                    setInventoryFormData({ ...inventoryFormData, quantity: Number.parseInt(e.target.value) || 0 })
                  }
                  placeholder="Enter quantity"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select
                  value={inventoryFormData.unit}
                  onValueChange={(value) => setInventoryFormData({ ...inventoryFormData, unit: value })}
                >
                  <SelectTrigger id="unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="box">Box</SelectItem>
                    <SelectItem value="ml">Milliliters</SelectItem>
                    <SelectItem value="mg">Milligrams</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="minStock">Minimum Stock Level</Label>
                <Input
                  id="minStock"
                  type="number"
                  value={inventoryFormData.minStock}
                  onChange={(e) =>
                    setInventoryFormData({ ...inventoryFormData, minStock: Number.parseInt(e.target.value) || 0 })
                  }
                  placeholder="Enter minimum stock"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={inventoryFormData.price}
                  onChange={(e) =>
                    setInventoryFormData({ ...inventoryFormData, price: Number.parseInt(e.target.value) || 0 })
                  }
                  placeholder="Enter price"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={inventoryFormData.expiryDate}
                  onChange={(e) => setInventoryFormData({ ...inventoryFormData, expiryDate: e.target.value })}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowInventoryModal(false)}
                  className="flex-1 bg-transparent"
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveInventory} className="flex-1">
                  {editingInventory ? "Update" : "Add"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
