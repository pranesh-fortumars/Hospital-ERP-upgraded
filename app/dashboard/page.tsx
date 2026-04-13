"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LogOut,
  LayoutDashboard,
  Bell,
  HelpCircle,
  Users,
  Building2,
  Settings,
  Calendar,
  Stethoscope,
  FileText,
  ClipboardList,
  Wallet,
  TestTube,
  FileSpreadsheet,
  Boxes,
  CreditCard,
  ClipboardCheck,
  Briefcase,
  Hospital,
  LineChart,
  ShieldCheck,
  Activity,
  History,
  TrendingUp,
  Monitor,
  Sparkles,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import AdminDashboard from "@/components/dashboards/admin-dashboard"
import DoctorDashboard from "@/components/dashboards/doctor-dashboard"
import ReceptionistDashboard from "@/components/dashboards/receptionist-dashboard"
import PatientDashboard from "@/components/dashboards/patient-dashboard"
import LabDashboard from "@/components/dashboards/lab-dashboard"
import PharmacyDashboard from "@/components/dashboards/pharmacy-dashboard"
import BillingDashboard from "@/components/dashboards/billing-dashboard"
import HRDashboard from "@/components/dashboards/hr-dashboard"

type SidebarItem = {
  label: string
  icon: LucideIcon
  href?: string
  value?: string
}

type SidebarSection = {
  title: string
  items: SidebarItem[]
}

const COMMON_SECTIONS: SidebarSection[] = [
  {
    title: "General",
    items: [
      { label: "Overview", icon: LayoutDashboard },
      { label: "Notifications", icon: Bell },
      { label: "Support", icon: HelpCircle },
    ],
  },
]

const ROLE_SPECIFIC_SECTIONS: Record<string, SidebarSection[]> = {
  admin: [
    {
      title: "Administration",
      items: [
        { label: "Overview", icon: LayoutDashboard, value: "admin-overview" },
        { label: "User Management", icon: Users, value: "admin-users" },
        { label: "Enterprise Analytics", icon: TrendingUp, value: "admin-analytics" },
        { label: "Operations Control", icon: Hospital, value: "admin-operations" },
        { label: "OT & ICU Monitor", icon: Monitor, value: "admin-ot" },
        { label: "Security & Audit", icon: ShieldCheck, value: "admin-audit" },
        { label: "Pharmacy Insights", icon: LineChart, value: "admin-pharmacy" },
        { label: "Staff Insights", icon: Users, value: "admin-staff" },
      ],
    },
  ],
  doctor: [
    {
      title: "Clinical",
      items: [
        { label: "Overview", icon: LayoutDashboard, value: "doctor-overview" },
        { label: "Consultations", icon: Stethoscope, value: "doctor-consultations" },
        { label: "Patient Records", icon: FileText, value: "doctor-patient-records" },
        { label: "Prescriptions", icon: ClipboardList, value: "doctor-prescriptions" },
      ],
    },
  ],
  receptionist: [
    {
      title: "Front Desk",
      items: [
        { label: "Overview", icon: LayoutDashboard, value: "reception-overview" },
        { label: "Appointments", icon: Calendar, value: "reception-appointments" },
      ],
    },
  ],
  patient: [
    {
      title: "My Care",
      items: [
        { label: "Overview", icon: LayoutDashboard, value: "patient-overview" },
        { label: "AI Symptom Checker", icon: Sparkles, value: "patient-symptom-checker" },
        { label: "Appointments", icon: Calendar, value: "patient-appointments" },
        { label: "Remote Monitoring", icon: Activity, value: "patient-rpm" },
        { label: "Medical Records", icon: FileText, value: "patient-records" },
        { label: "Prescriptions", icon: ClipboardList, value: "patient-prescriptions" },
      ],
    },
  ],
  lab_technician: [
    {
      title: "Lab Management",
      items: [
        { label: "Overview", icon: LayoutDashboard, value: "lab-overview" },
        { label: "Lab Tests", icon: ClipboardList, value: "lab-tests" },
        { label: "Lab Inventory", icon: Boxes, value: "lab-inventory" },
      ],
    },
  ],
  pharmacist: [
    {
      title: "Pharmacy",
      items: [
        { label: "Overview", icon: LayoutDashboard, value: "pharmacy-overview" },
        { label: "Prescriptions", icon: ClipboardList, value: "pharmacy-prescriptions" },
        { label: "Inventory", icon: Boxes, value: "pharmacy-inventory" },
      ],
    },
  ],
  billing_officer: [
    {
      title: "Billing",
      items: [
        { label: "Overview", icon: LayoutDashboard, value: "billing-overview" },
        { label: "Invoices", icon: FileSpreadsheet, value: "billing-invoices" },
        { label: "Payments", icon: CreditCard, value: "billing-payments" },
      ],
    },
  ],
  hr_manager: [
    {
      title: "People Ops",
      items: [
        { label: "Overview", icon: LayoutDashboard, value: "hr-overview" },
        { label: "Staff Management", icon: Users, value: "hr-staff" },
      ],
    },
  ],
}

export default function DashboardPage() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("userRole")
    const email = localStorage.getItem("userEmail")

    if (!token || !role) {
      router.push("/login")
      return
    }

    setUserRole(role)
    setUserEmail(email)
    setLoading(false)
  }, [router])

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole")
    const storedEmail = localStorage.getItem("userEmail")
    if (storedRole) {
      setUserRole(storedRole)
    }
    if (storedEmail) {
      setUserEmail(storedEmail)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  useEffect(() => {
    setActiveSection(null)
  }, [userRole])

  const sections = useMemo(() => {
    if (!userRole) return COMMON_SECTIONS
    return [...COMMON_SECTIONS, ...(ROLE_SPECIFIC_SECTIONS[userRole] ?? [])]
  }, [userRole])

  const renderDashboard = () => {
    switch (userRole) {
      case "admin":
        return <AdminDashboard activeSection={activeSection} />
      case "doctor":
        return <DoctorDashboard activeSection={activeSection} />
      case "receptionist":
        return <ReceptionistDashboard activeSection={activeSection} />
      case "patient":
        return <PatientDashboard activeSection={activeSection} />
      case "lab_technician":
        return <LabDashboard activeSection={activeSection} />
      case "pharmacist":
        return <PharmacyDashboard activeSection={activeSection} />
      case "billing_officer":
        return <BillingDashboard activeSection={activeSection} />
      case "hr_manager":
        return <HRDashboard activeSection={activeSection} />
      default:
        return (
          <div className="flex min-h-[60svh] items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Access denied. Please contact the administrator if you believe this is a mistake.
            </p>
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <SidebarProvider className="bg-muted/30">
      <DashboardSidebar
        sections={sections}
        onLogout={handleLogout}
        userEmail={userEmail}
        activeSection={activeSection}
        onSectionSelect={setActiveSection}
      />
      <SidebarInset className="p-4 md:p-6">
        <div className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Hospital ERP Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Manage hospital operations with role-specific tools and insights.
                </p>
              </div>
            </div>
            {userEmail && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="hidden md:inline">Signed in as</span>
                <span className="font-medium text-foreground">{userEmail}</span>
              </div>
            )}
          </div>
          <div className="rounded-lg border bg-background p-4 md:p-6">
            {renderDashboard()}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

type DashboardSidebarProps = {
  sections: SidebarSection[]
  onLogout: () => void
  userEmail: string | null
  activeSection: string | null
  onSectionSelect: (value: string | null) => void
}

function DashboardSidebar({ sections, onLogout, userEmail, activeSection, onSectionSelect }: DashboardSidebarProps) {
  const { isMobile, setOpenMobile } = useSidebar()

  const handleNavigate = (value?: string | null) => {
    onSectionSelect(value ?? null)
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r border-border bg-background">
      <SidebarHeader className="space-y-3">
        <div className="flex items-center gap-2 px-3 py-2">
          <Hospital className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm font-semibold">Hospital ERP</p>
            <p className="text-xs text-muted-foreground">Unified operations platform</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      type="button"
                      className="justify-start"
                      isActive={!!item.value && activeSection === item.value}
                      onClick={() => handleNavigate(item.value)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton type="button" onClick={onLogout} className="justify-start">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {userEmail && (
          <div className="rounded-md border border-border bg-muted/50 px-3 py-2 text-xs">
            <p className="font-medium">Signed in as</p>
            <p className="truncate text-muted-foreground">{userEmail}</p>
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
