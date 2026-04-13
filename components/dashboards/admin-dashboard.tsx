"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Hospital,
  Settings,
  BarChart3,
  Plus,
  Edit2,
  Trash2,
  X,
  TrendingUp,
  DollarSign,
  PackageSearch,
  LineChart,
  ClipboardCheck,
  ShieldAlert,
  History,
  Activity,
  UserCog
} from "lucide-react"
import EnterpriseAnalytics from "@/components/dashboards/enterprise-analytics"
import SecurityAuditLogs from "@/components/dashboards/security-audit-logs"
import HospitalOperations from "@/components/dashboards/hospital-operations"
import OTManagement from "@/components/dashboards/ot-management"

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: "active" | "inactive"
  joinDate: string
}

const ROLES = [
  "admin",
  "doctor",
  "receptionist",
  "patient",
  "lab_technician",
  "pharmacist",
  "billing_officer",
  "hr_manager",
]

const DEPARTMENTS = ["Administration", "Medical", "Reception", "Laboratory", "Pharmacy", "Billing", "HR"]

type AdminDashboardProps = {
  activeSection?: string | null
}

type UserFormData = {
  name: string
  email: string
  role: string
  department: string
  status: "active" | "inactive"
}

export default function AdminDashboard({ activeSection = null }: AdminDashboardProps) {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Dr. John Smith",
      email: "john@hospital.com",
      role: "doctor",
      department: "Medical",
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@hospital.com",
      role: "receptionist",
      department: "Reception",
      status: "active",
      joinDate: "2024-02-20",
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike@hospital.com",
      role: "lab_technician",
      department: "Laboratory",
      status: "active",
      joinDate: "2024-03-10",
    },
    {
      id: "4",
      name: "Emma Wilson",
      email: "emma@hospital.com",
      role: "pharmacist",
      department: "Pharmacy",
      status: "active",
      joinDate: "2024-01-25",
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    role: "doctor",
    department: "Medical",
    status: "active",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const stats = [
    { label: "Total Users", value: users.length.toString(), icon: Users, color: "bg-blue-500" },
    { label: "Total Patients", value: "1,234", icon: Hospital, color: "bg-green-500" },
    { label: "Active Appointments", value: "45", icon: BarChart3, color: "bg-purple-500" },
    { label: "System Settings", value: "Configured", icon: Settings, color: "bg-orange-500" },
  ]

  const pharmacyMetrics = [
    {
      label: "Monthly Sales",
      value: "₹1,24,500",
      change: "+8.6% vs last month",
      icon: DollarSign,
      color: "bg-emerald-500",
    },
    {
      label: "Gross Profit",
      value: "₹38,200",
      change: "+5.1% vs last month",
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    {
      label: "Prescriptions Filled",
      value: "486",
      change: "96% on-time fulfilment",
      icon: PackageSearch,
      color: "bg-indigo-500",
    },
    {
      label: "Inventory Status",
      value: "12 low stock",
      change: "Prioritize antibiotics & insulin",
      icon: LineChart,
      color: "bg-amber-500",
    },
  ]

  const topMedications = [
    { name: "Amoxicillin 500mg", units: 320, revenue: "₹48,000", status: "In Stock" },
    { name: "Metformin 850mg", units: 275, revenue: "₹41,250", status: "Low Stock" },
    { name: "Insulin Glargine", units: 190, revenue: "₹57,000", status: "Critical" },
    { name: "Losartan 50mg", units: 210, revenue: "₹31,500", status: "In Stock" },
  ]

  const pharmacyTeam = [
    { name: "Priya Natarajan", role: "Chief Pharmacist", shift: "General", tenure: "4.5 yrs" },
    { name: "Rahul Verma", role: "Inventory Specialist", shift: "Morning", tenure: "3.2 yrs" },
    { name: "Anita George", role: "Dispensing Pharmacist", shift: "Evening", tenure: "2.1 yrs" },
    { name: "Karan Singh", role: "Pharmacy Assistant", shift: "Rotational", tenure: "1.4 yrs" },
  ]

  const staffSummary = [
    {
      label: "On Duty Today",
      value: "235",
      hint: "94.8% attendance",
      icon: ClipboardCheck,
      color: "bg-indigo-500",
    },
    {
      label: "Open Positions",
      value: "6",
      hint: "Recruitment in progress",
      icon: Users,
      color: "bg-slate-500",
    },
  ]

  const staffDirectory = [
    {
      department: "Medical",
      head: "Dr. Priya Sharma",
      staffCount: 145,
      shifts: "3",
      contact: "priya.sharma@hospital.com",
    },
    {
      department: "Administration",
      head: "Mr. Rohan Patel",
      staffCount: 58,
      shifts: "2",
      contact: "rohan.patel@hospital.com",
    },
    {
      department: "Support",
      head: "Ms. Anita Rao",
      staffCount: 45,
      shifts: "2",
      contact: "anita.rao@hospital.com",
    },
    {
      department: "Laboratory",
      head: "Dr. Nikhil Verma",
      staffCount: 24,
      shifts: "3",
      contact: "nikhil.verma@hospital.com",
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        status: user.status,
      })
    } else {
      setEditingUser(null)
      setFormData({ name: "", email: "", role: "doctor", department: "Medical", status: "active" })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingUser(null)
    setFormData({ name: "", email: "", role: "doctor", department: "Medical", status: "active" })
  }

  const handleSaveUser = () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in all fields")
      return
    }

    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u)))
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        joinDate: new Date().toISOString().split("T")[0],
      }
      setUsers([...users, newUser])
    }

    handleCloseModal()
  }

  const handleDeleteUser = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id))
    }
  }

  const shouldShow = (sectionId: string) => !activeSection || activeSection === sectionId

  if (activeSection === "admin-analytics") {
    return <EnterpriseAnalytics />
  }

  if (activeSection === "admin-audit") {
    return <SecurityAuditLogs />
  }

  if (activeSection === "admin-operations") {
    return <HospitalOperations />
  }

  if (activeSection === "admin-ot") {
    return <OTManagement />
  }

  return (
    <div className="space-y-8">
      {shouldShow("admin-overview") && (
        <section id="admin-overview" className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
            <p className="text-gray-600 mt-2">Manage all hospital operations and users</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {shouldShow("admin-users") && (
        <section id="admin-users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage all system users and their roles</CardDescription>
              </div>
              <Button onClick={() => handleOpenModal()} className="gap-2">
                <Plus className="h-4 w-4" />
                Add User
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search by name, email, or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">{user.name}</td>
                          <td className="py-3 px-4 text-gray-600">{user.email}</td>
                          <td className="py-3 px-4">
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                              {user.role.replace("_", " ")}
                            </span>
                          </td>
                          <td className="py-3 px-4">{user.department}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleOpenModal(user)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
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

                {filteredUsers.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No users found matching your search.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {shouldShow("admin-pharmacy") && (
        <section id="admin-pharmacy" className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Pharmacy Operations</h2>
            <p className="text-gray-600 mt-2">
              Track pharmacy sales performance, profitability, and staffing at a glance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pharmacyMetrics.map((metric) => (
              <Card key={metric.label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{metric.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <p className="text-xs text-gray-600 mt-1">{metric.change}</p>
                    </div>
                    <div className={`${metric.color} rounded-lg p-3`}>
                      <metric.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Top Selling Medications</CardTitle>
                <CardDescription>High-performing inventory items this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">Medication</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">Units Sold</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">Revenue</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topMedications.map((item) => (
                        <tr key={item.name} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{item.name}</td>
                          <td className="py-3 px-4">{item.units}</td>
                          <td className="py-3 px-4">{item.revenue}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${
                                item.status === "Critical"
                                  ? "bg-red-100 text-red-800"
                                  : item.status === "Low Stock"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Pharmacy Team</CardTitle>
                <CardDescription>Current staffing snapshot (view only)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pharmacyTeam.map((member) => (
                    <div
                      key={member.name}
                      className="flex flex-col gap-1 rounded-lg border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                      <div className="flex gap-6 text-sm text-gray-600">
                        <span>
                          <span className="font-medium text-gray-900">Shift:</span> {member.shift}
                        </span>
                        <span>
                          <span className="font-medium text-gray-900">Tenure:</span> {member.tenure}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {shouldShow("admin-staff") && (
        <section id="admin-staff" className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Staff Overview</h2>
            <p className="text-gray-600 mt-2">
              Monitor staffing levels, attendance, and departmental contacts across the hospital.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {staffSummary.map((item) => (
              <Card key={item.label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{item.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{item.value}</div>
                      <p className="text-xs text-gray-600 mt-1">{item.hint}</p>
                    </div>
                    <div className={`${item.color} rounded-lg p-3`}>
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Department Directory</CardTitle>
              <CardDescription>Key contacts and staffing details per department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">Department</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">Head of Department</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">Staff Count</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">Shifts</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffDirectory.map((dept) => (
                      <tr key={dept.department} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{dept.department}</td>
                        <td className="py-3 px-4">{dept.head}</td>
                        <td className="py-3 px-4">{dept.staffCount}</td>
                        <td className="py-3 px-4">{dept.shifts}</td>
                        <td className="py-3 px-4 text-blue-600">{dept.contact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-background/50 backdrop-blur flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingUser ? "Edit User" : "Add New User"}</CardTitle>
              <Button variant="ghost" size="sm" onClick={handleCloseModal} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger id="department">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as "active" | "inactive" })}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={handleCloseModal} className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button onClick={handleSaveUser} className="flex-1">
                  {editingUser ? "Update User" : "Add User"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
