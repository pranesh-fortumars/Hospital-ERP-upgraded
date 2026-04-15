"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit2, Trash2, X, AlertCircle, Microscope } from "lucide-react"
import DiagnosticLab from "@/components/dashboards/diagnostic-lab"

interface LabTest {
  id: string
  patientId: string
  patientName: string
  testType: string
  date: string
  status: "pending" | "in-progress" | "completed" | "critical"
  result: string
  notes: string
}

interface LabInventory {
  id: string
  name: string
  quantity: number
  unit: string
  minStock: number
  expiryDate: string
  status: "ok" | "low" | "critical"
}

type LabTestForm = Omit<LabTest, "id">
type LabInventoryForm = Omit<LabInventory, "id" | "status">

type LabDashboardProps = {
  activeSection?: string | null
}

export default function LabDashboard({ activeSection = null }: LabDashboardProps) {
  const [tests, setTests] = useState<LabTest[]>([
    {
      id: "1",
      patientId: "P001",
      patientName: "John Doe",
      testType: "Blood Test",
      date: "2024-10-24",
      status: "pending",
      result: "",
      notes: "Complete blood count",
    },
    {
      id: "2",
      patientId: "P002",
      patientName: "Jane Smith",
      testType: "X-Ray",
      date: "2024-10-24",
      status: "completed",
      result: "Normal",
      notes: "Chest X-ray",
    },
    {
      id: "3",
      patientId: "P003",
      patientName: "Mike Johnson",
      testType: "Urinalysis",
      date: "2024-10-24",
      status: "in-progress",
      result: "",
      notes: "Routine urinalysis",
    },
  ])

  const [inventory, setInventory] = useState<LabInventory[]>([
    {
      id: "1",
      name: "Blood Collection Tubes",
      quantity: 150,
      unit: "pcs",
      minStock: 50,
      expiryDate: "2025-06-30",
      status: "ok",
    },
    {
      id: "2",
      name: "Reagent A",
      quantity: 25,
      unit: "ml",
      minStock: 100,
      expiryDate: "2024-12-31",
      status: "critical",
    },
    { id: "3", name: "Slides", quantity: 45, unit: "pcs", minStock: 100, expiryDate: "2025-12-31", status: "low" },
    {
      id: "4",
      name: "Stain Solution",
      quantity: 200,
      unit: "ml",
      minStock: 100,
      expiryDate: "2025-03-31",
      status: "ok",
    },
  ])

  const [showTestModal, setShowTestModal] = useState(false)
  const [showInventoryModal, setShowInventoryModal] = useState(false)
  const [editingTest, setEditingTest] = useState<LabTest | null>(null)
  const [editingInventory, setEditingInventory] = useState<LabInventory | null>(null)
  const [testFormData, setTestFormData] = useState<LabTestForm>({
    patientId: "",
    patientName: "",
    testType: "Blood Test",
    date: new Date().toISOString().split("T")[0],
    status: "pending",
    result: "",
    notes: "",
  })
  const [inventoryFormData, setInventoryFormData] = useState<LabInventoryForm>({
    name: "",
    quantity: 0,
    unit: "pcs",
    minStock: 0,
    expiryDate: "",
  })

  const pendingTests = tests.filter((t) => t.status === "pending").length
  const completedTests = tests.filter((t) => t.status === "completed").length
  const inProgressTests = tests.filter((t) => t.status === "in-progress").length
  const criticalResults = tests.filter((t) => t.status === "critical").length

  const handleOpenTestModal = (test?: LabTest) => {
    if (test) {
      setEditingTest(test)
      setTestFormData({
        patientId: test.patientId,
        patientName: test.patientName,
        testType: test.testType,
        date: test.date,
        status: test.status,
        result: test.result,
        notes: test.notes,
      })
    } else {
      setEditingTest(null)
      setTestFormData({
        patientId: "",
        patientName: "",
        testType: "Blood Test",
        date: new Date().toISOString().split("T")[0],
        status: "pending",
        result: "",
        notes: "",
      })
    }
    setShowTestModal(true)
  }

  const handleOpenInventoryModal = (item?: LabInventory) => {
    if (item) {
      setEditingInventory(item)
      setInventoryFormData({
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        minStock: item.minStock,
        expiryDate: item.expiryDate,
      })
    } else {
      setEditingInventory(null)
      setInventoryFormData({
        name: "",
        quantity: 0,
        unit: "pcs",
        minStock: 0,
        expiryDate: "",
      })
    }
    setShowInventoryModal(true)
  }

  const handleSaveTest = () => {
    if (!testFormData.patientId || !testFormData.patientName) {
      alert("Please fill in all required fields")
      return
    }

    if (editingTest) {
      setTests(tests.map((t) => (t.id === editingTest.id ? { ...t, ...testFormData } : t)))
    } else {
      const newTest: LabTest = {
        id: Date.now().toString(),
        ...testFormData,
      }
      setTests([...tests, newTest])
    }
    setShowTestModal(false)
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
      const newItem: LabInventory = {
        id: Date.now().toString(),
        ...inventoryFormData,
        status,
      }
      setInventory([...inventory, newItem])
    }
    setShowInventoryModal(false)
  }

  const handleDeleteTest = (id: string) => {
    if (confirm("Delete this test record?")) {
      setTests(tests.filter((t) => t.id !== id))
    }
  }

  const handleDeleteInventory = (id: string) => {
    if (confirm("Delete this inventory item?")) {
      setInventory(inventory.filter((i) => i.id !== id))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
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

  if (activeSection === "lab-overview") {
    return <DiagnosticLab />
  }

  return (
    <div className="space-y-8">
      {shouldShow("lab-overview") && (
        <section id="lab-overview" className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Lab Management</h2>
        <p className="text-muted-foreground mt-2">Manage lab tests, results, and inventory</p>
      </section>
      )}

      {shouldShow("lab-overview") && (
        <section aria-labelledby="lab-overview-stats">
        <div className="mb-4 flex items-center justify-between">
          <h3 id="lab-overview-stats" className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Quick Metrics
          </h3>
          <span className="text-xs text-muted-foreground">Real-time laboratory snapshot</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTests}</div>
              <p className="text-xs text-muted-foreground mt-1">To be processed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTests}</div>
              <p className="text-xs text-muted-foreground mt-1">Results ready</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressTests}</div>
              <p className="text-xs text-muted-foreground mt-1">Being analyzed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Critical Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{criticalResults}</div>
              <p className="text-xs text-muted-foreground mt-1">Needs attention</p>
            </CardContent>
          </Card>
        </div>
      </section>
      )}

      {shouldShow("lab-tests") && (
        <section id="lab-tests" aria-labelledby="lab-tests-heading">
          <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle id="lab-tests-heading">Lab Tests</CardTitle>
              <CardDescription>Manage all lab test records</CardDescription>
            </div>
            <Button onClick={() => handleOpenTestModal()} className="gap-2">
              <Plus className="h-4 w-4" />
              New Test
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground/90">Patient</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/90">Test Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/90">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/90">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/90">Result</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/90">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((test) => (
                    <tr key={test.id} className="border-b border-gray-100 hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{test.patientName}</p>
                          <p className="text-xs text-muted-foreground">{test.patientId}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{test.testType}</td>
                      <td className="py-3 px-4">{test.date}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(test.status)}`}
                        >
                          {test.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{test.result || "-"}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenTestModal(test)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTest(test.id)}
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

      {shouldShow("lab-inventory") && (
        <section id="lab-inventory" aria-labelledby="lab-inventory-heading">
          <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle id="lab-inventory-heading">Lab Inventory</CardTitle>
              <CardDescription>Manage lab supplies and equipment</CardDescription>
            </div>
            <Button onClick={() => handleOpenInventoryModal()} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground/90">Item Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/90">Quantity</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/90">Min Stock</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/90">Expiry Date</th>
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
                      <td className="py-3 px-4">{item.expiryDate}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                            item.status,
                          )}`}
                        >
                          {item.status === "critical" && <AlertCircle className="h-3 w-3" />}
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

      {showTestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingTest ? "Edit Test" : "New Lab Test"}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowTestModal(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID *</Label>
                <Input
                  id="patientId"
                  value={testFormData.patientId}
                  onChange={(e) => setTestFormData({ ...testFormData, patientId: e.target.value })}
                  placeholder="Enter patient ID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name *</Label>
                <Input
                  id="patientName"
                  value={testFormData.patientName}
                  onChange={(e) => setTestFormData({ ...testFormData, patientName: e.target.value })}
                  placeholder="Enter patient name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="testType">Test Type</Label>
                <Select
                  value={testFormData.testType}
                  onValueChange={(value) => setTestFormData({ ...testFormData, testType: value })}
                >
                  <SelectTrigger id="testType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Blood Test">Blood Test</SelectItem>
                    <SelectItem value="X-Ray">X-Ray</SelectItem>
                    <SelectItem value="Urinalysis">Urinalysis</SelectItem>
                    <SelectItem value="ECG">ECG</SelectItem>
                    <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={testFormData.date}
                  onChange={(e) => setTestFormData({ ...testFormData, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={testFormData.status}
                  onValueChange={(value) => setTestFormData({ ...testFormData, status: value as any })}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="result">Result</Label>
                <Input
                  id="result"
                  value={testFormData.result}
                  onChange={(e) => setTestFormData({ ...testFormData, result: e.target.value })}
                  placeholder="Enter test result"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  value={testFormData.notes}
                  onChange={(e) => setTestFormData({ ...testFormData, notes: e.target.value })}
                  placeholder="Enter notes"
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={2}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowTestModal(false)} className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button onClick={handleSaveTest} className="flex-1">
                  {editingTest ? "Update" : "Create"}
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
              <CardTitle>{editingInventory ? "Edit Item" : "Add Inventory Item"}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowInventoryModal(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name *</Label>
                <Input
                  id="name"
                  value={inventoryFormData.name}
                  onChange={(e) => setInventoryFormData({ ...inventoryFormData, name: e.target.value })}
                  placeholder="Enter item name"
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
                    <SelectItem value="pcs">Pieces</SelectItem>
                    <SelectItem value="ml">Milliliters</SelectItem>
                    <SelectItem value="mg">Milligrams</SelectItem>
                    <SelectItem value="box">Box</SelectItem>
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
