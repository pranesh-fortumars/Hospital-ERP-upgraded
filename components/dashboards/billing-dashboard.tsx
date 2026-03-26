"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit2, Trash2, X, CheckCircle, AlertCircle, Download } from "lucide-react"

interface Invoice {
  id: string
  invoiceNumber: string
  patientName: string
  patientId: string
  amount: number
  date: string
  dueDate: string
  status: "paid" | "pending" | "overdue"
  description: string
  items: InvoiceItem[]
}

interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
}

interface Payment {
  id: string
  invoiceId: string
  amount: number
  date: string
  method: "cash" | "card" | "check" | "online"
  status: "completed" | "pending"
  notes: string
}

type BillingDashboardProps = {
  activeSection?: string | null
}

type InvoiceFormData = {
  invoiceNumber: string
  patientName: string
  patientId: string
  amount: number
  date: string
  dueDate: string
  status: Invoice["status"]
  description: string
}

type PaymentFormData = {
  invoiceId: string
  amount: number
  date: string
  method: Payment["method"]
  status: Payment["status"]
  notes: string
}

export default function BillingDashboard({ activeSection = null }: BillingDashboardProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      invoiceNumber: "INV-001",
      patientName: "John Doe",
      patientId: "P001",
      amount: 2500,
      date: "2024-10-20",
      dueDate: "2024-10-27",
      status: "paid",
      description: "Consultation and Lab Tests",
      items: [
        { description: "Doctor Consultation", quantity: 1, unitPrice: 500 },
        { description: "Blood Test", quantity: 1, unitPrice: 1500 },
        { description: "X-Ray", quantity: 1, unitPrice: 500 },
      ],
    },
    {
      id: "2",
      invoiceNumber: "INV-002",
      patientName: "Jane Smith",
      patientId: "P002",
      amount: 1800,
      date: "2024-10-22",
      dueDate: "2024-10-29",
      status: "pending",
      description: "Medication and Follow-up",
      items: [
        { description: "Medications", quantity: 1, unitPrice: 1200 },
        { description: "Follow-up Consultation", quantity: 1, unitPrice: 600 },
      ],
    },
    {
      id: "3",
      invoiceNumber: "INV-003",
      patientName: "Mike Johnson",
      patientId: "P003",
      amount: 3200,
      date: "2024-10-15",
      dueDate: "2024-10-22",
      status: "overdue",
      description: "Surgery and Hospital Stay",
      items: [
        { description: "Surgery", quantity: 1, unitPrice: 2000 },
        { description: "Hospital Stay (2 days)", quantity: 2, unitPrice: 600 },
      ],
    },
  ])

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "1",
      invoiceId: "1",
      amount: 2500,
      date: "2024-10-24",
      method: "card",
      status: "completed",
      notes: "Payment received",
    },
    {
      id: "2",
      invoiceId: "2",
      amount: 1800,
      date: "2024-10-24",
      method: "online",
      status: "pending",
      notes: "Awaiting confirmation",
    },
  ])

  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const [invoiceFormData, setInvoiceFormData] = useState<InvoiceFormData>({
    invoiceNumber: "",
    patientName: "",
    patientId: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    status: "pending",
    description: "",
  })

  const [paymentFormData, setPaymentFormData] = useState<PaymentFormData>({
    invoiceId: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    method: "card",
    status: "completed",
    notes: "",
  })

  const totalRevenue = invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.amount, 0)
  const pendingAmount = invoices.filter((i) => i.status === "pending").reduce((sum, i) => sum + i.amount, 0)
  const overdueAmount = invoices.filter((i) => i.status === "overdue").reduce((sum, i) => sum + i.amount, 0)
  const pendingInvoices = invoices.filter((i) => i.status === "pending").length
  const overdueInvoices = invoices.filter((i) => i.status === "overdue").length

  const filteredInvoices = invoices.filter(
    (i) =>
      i.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.patientId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleOpenInvoiceModal = (invoice?: Invoice) => {
    if (invoice) {
      setEditingInvoice(invoice)
      setInvoiceFormData({
        invoiceNumber: invoice.invoiceNumber,
        patientName: invoice.patientName,
        patientId: invoice.patientId,
        amount: invoice.amount,
        date: invoice.date,
        dueDate: invoice.dueDate,
        status: invoice.status,
        description: invoice.description,
      })
    } else {
      setEditingInvoice(null)
      setInvoiceFormData({
        invoiceNumber: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
        patientName: "",
        patientId: "",
        amount: 0,
        date: new Date().toISOString().split("T")[0],
        dueDate: "",
        status: "pending",
        description: "",
      })
    }
    setShowInvoiceModal(true)
  }

  const handleOpenPaymentModal = (payment?: Payment) => {
    if (payment) {
      setEditingPayment(payment)
      setPaymentFormData({
        invoiceId: payment.invoiceId,
        amount: payment.amount,
        date: payment.date,
        method: payment.method,
        status: payment.status,
        notes: payment.notes,
      })
    } else {
      setEditingPayment(null)
      setPaymentFormData({
        invoiceId: "",
        amount: 0,
        date: new Date().toISOString().split("T")[0],
        method: "card",
        status: "completed",
        notes: "",
      })
    }
    setShowPaymentModal(true)
  }

  const handleSaveInvoice = () => {
    if (!invoiceFormData.patientName || !invoiceFormData.patientId || invoiceFormData.amount <= 0) {
      alert("Please fill in all required fields")
      return
    }

    if (editingInvoice) {
      setInvoices(invoices.map((i) => (i.id === editingInvoice.id ? { ...i, ...invoiceFormData, items: [] } : i)))
    } else {
      const newInvoice: Invoice = {
        id: Date.now().toString(),
        ...invoiceFormData,
        items: [],
      }
      setInvoices([...invoices, newInvoice])
    }
    setShowInvoiceModal(false)
  }

  const handleSavePayment = () => {
    if (!paymentFormData.invoiceId || paymentFormData.amount <= 0) {
      alert("Please fill in all required fields")
      return
    }

    if (editingPayment) {
      setPayments(payments.map((p) => (p.id === editingPayment.id ? { ...p, ...paymentFormData } : p)))
    } else {
      const newPayment: Payment = {
        id: Date.now().toString(),
        ...paymentFormData,
      }
      setPayments([...payments, newPayment])
    }
    setShowPaymentModal(false)
  }

  const handleDeleteInvoice = (id: string) => {
    if (confirm("Delete this invoice?")) {
      setInvoices(invoices.filter((i) => i.id !== id))
    }
  }

  const handleDeletePayment = (id: string) => {
    if (confirm("Delete this payment?")) {
      setPayments(payments.filter((p) => p.id !== id))
    }
  }

  const handleMarkAsPaid = (id: string) => {
    setInvoices(invoices.map((i) => (i.id === id ? { ...i, status: "paid" } : i)))
  }

  const handleDownloadInvoice = (invoice: Invoice) => {
    const content = `INVOICE
Invoice Number: ${invoice.invoiceNumber}
Date: ${invoice.date}
Due Date: ${invoice.dueDate}

Patient: ${invoice.patientName}
Patient ID: ${invoice.patientId}

Description: ${invoice.description}

Amount: ₹${invoice.amount}
Status: ${invoice.status}
`
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content))
    element.setAttribute("download", `${invoice.invoiceNumber}.txt`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const shouldShow = (sectionId: string) => !activeSection || activeSection === sectionId

  return (
    <div className="space-y-8">
      {shouldShow("billing-overview") && (
        <section id="billing-overview" className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Billing & Payments</h2>
            <p className="text-gray-600 mt-2">Manage invoices, payments, and revenue</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-gray-600 mt-1">
                  {invoices.filter((i) => i.status === "paid").length} paid invoices
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Pending Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingInvoices}</div>
                <p className="text-xs text-gray-600 mt-1">₹{pendingAmount.toLocaleString()} due</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Overdue Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overdueInvoices}</div>
                <p className="text-xs text-gray-600 mt-1">₹{overdueAmount.toLocaleString()} overdue</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{invoices.length}</div>
                <p className="text-xs text-gray-600 mt-1">{payments.length} payments received</p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {shouldShow("billing-invoices") && (
        <section id="billing-invoices">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>Manage all patient invoices</CardDescription>
              </div>
              <Button onClick={() => handleOpenInvoiceModal()} className="gap-2">
                <Plus className="h-4 w-4" />
                New Invoice
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search by patient name, ID, or invoice number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Invoice</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Patient</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Due Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInvoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{invoice.invoiceNumber}</td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{invoice.patientName}</p>
                              <p className="text-xs text-gray-600">{invoice.patientId}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium">₹{invoice.amount.toLocaleString()}</td>
                          <td className="py-3 px-4">{invoice.date}</td>
                          <td className="py-3 px-4">{invoice.dueDate}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(invoice.status)}`}
                            >
                              {invoice.status === "paid" && <CheckCircle className="h-3 w-3" />}
                              {invoice.status === "overdue" && <AlertCircle className="h-3 w-3" />}
                              {invoice.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              {invoice.status === "pending" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleMarkAsPaid(invoice.id)}
                                  className="h-8 px-2 text-green-600 hover:text-green-700"
                                  title="Mark as paid"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDownloadInvoice(invoice)}
                                className="h-8 w-8 p-0"
                                title="Download"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleOpenInvoiceModal(invoice)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteInvoice(invoice.id)}
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

                {filteredInvoices.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No invoices found.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {shouldShow("billing-payments") && (
        <section id="billing-payments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Payments</CardTitle>
                <CardDescription>Track all payment transactions</CardDescription>
              </div>
              <Button onClick={() => handleOpenPaymentModal()} className="gap-2">
                <Plus className="h-4 w-4" />
                Record Payment
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Invoice</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Method</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{payment.invoiceId}</td>
                        <td className="py-3 px-4 font-medium">₹{payment.amount.toLocaleString()}</td>
                        <td className="py-3 px-4">{payment.date}</td>
                        <td className="py-3 px-4 capitalize">{payment.method}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(payment.status)}`}
                          >
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenPaymentModal(payment)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePayment(payment.id)}
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

      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingInvoice ? "Edit Invoice" : "Create Invoice"}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowInvoiceModal(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input
                  id="invoiceNumber"
                  value={invoiceFormData.invoiceNumber}
                  onChange={(e) => setInvoiceFormData({ ...invoiceFormData, invoiceNumber: e.target.value })}
                  placeholder="INV-001"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name *</Label>
                <Input
                  id="patientName"
                  value={invoiceFormData.patientName}
                  onChange={(e) => setInvoiceFormData({ ...invoiceFormData, patientName: e.target.value })}
                  placeholder="Enter patient name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID *</Label>
                <Input
                  id="patientId"
                  value={invoiceFormData.patientId}
                  onChange={(e) => setInvoiceFormData({ ...invoiceFormData, patientId: e.target.value })}
                  placeholder="Enter patient ID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹) *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={invoiceFormData.amount}
                  onChange={(e) =>
                    setInvoiceFormData({ ...invoiceFormData, amount: Number.parseInt(e.target.value) || 0 })
                  }
                  placeholder="Enter amount"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Invoice Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={invoiceFormData.date}
                  onChange={(e) => setInvoiceFormData({ ...invoiceFormData, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={invoiceFormData.dueDate}
                  onChange={(e) => setInvoiceFormData({ ...invoiceFormData, dueDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={invoiceFormData.status}
                  onValueChange={(value) => setInvoiceFormData({ ...invoiceFormData, status: value as any })}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={invoiceFormData.description}
                  onChange={(e) => setInvoiceFormData({ ...invoiceFormData, description: e.target.value })}
                  placeholder="Enter invoice description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowInvoiceModal(false)} className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button onClick={handleSaveInvoice} className="flex-1">
                  {editingInvoice ? "Update" : "Create"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingPayment ? "Edit Payment" : "Record Payment"}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowPaymentModal(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invoiceId">Invoice ID *</Label>
                <Select
                  value={paymentFormData.invoiceId}
                  onValueChange={(value) => setPaymentFormData({ ...paymentFormData, invoiceId: value })}
                >
                  <SelectTrigger id="invoiceId">
                    <SelectValue placeholder="Select invoice" />
                  </SelectTrigger>
                  <SelectContent>
                    {invoices.map((inv) => (
                      <SelectItem key={inv.id} value={inv.id}>
                        {inv.invoiceNumber} - {inv.patientName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentAmount">Amount (₹) *</Label>
                <Input
                  id="paymentAmount"
                  type="number"
                  value={paymentFormData.amount}
                  onChange={(e) =>
                    setPaymentFormData({ ...paymentFormData, amount: Number.parseInt(e.target.value) || 0 })
                  }
                  placeholder="Enter amount"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentDate">Payment Date</Label>
                <Input
                  id="paymentDate"
                  type="date"
                  value={paymentFormData.date}
                  onChange={(e) => setPaymentFormData({ ...paymentFormData, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="method">Payment Method</Label>
                <Select
                  value={paymentFormData.method}
                  onValueChange={(value) => setPaymentFormData({ ...paymentFormData, method: value as any })}
                >
                  <SelectTrigger id="method">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="online">Online Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentStatus">Status</Label>
                <Select
                  value={paymentFormData.status}
                  onValueChange={(value) => setPaymentFormData({ ...paymentFormData, status: value as any })}
                >
                  <SelectTrigger id="paymentStatus">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  value={paymentFormData.notes}
                  onChange={(e) => setPaymentFormData({ ...paymentFormData, notes: e.target.value })}
                  placeholder="Enter payment notes"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowPaymentModal(false)} className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button onClick={handleSavePayment} className="flex-1">
                  {editingPayment ? "Update" : "Record"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
