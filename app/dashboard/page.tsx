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
  Pill,
  Siren,
  Droplets,
  Beaker,
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
      title: "Enterprise Core",
      items: [
        { label: "Executive Overview", icon: LayoutDashboard, value: "admin-overview" },
        { label: "Entity Analytics", icon: TrendingUp, value: "admin-analytics" },
        { label: "Security & Audit", icon: ShieldCheck, value: "admin-audit" },
        { label: "User Directory", icon: Users, value: "admin-users" },
      ],
    },
    {
      title: "Entity Operations",
      items: [
        { label: "Hospital Ops", icon: Hospital, value: "admin-operations" },
        { label: "OT & ICU Command", icon: Monitor, value: "admin-ot" },
        { label: "Emergency Dispatch", icon: Siren, value: "admin-fleet" },
        { label: "Staff Intelligence", icon: Users, value: "admin-staff" },
      ],
    },
    {
      title: "Clinical Services",
      items: [
        { label: "Pharmacy Inventory", icon: Pill, value: "admin-pharmacy" },
        { label: "Diagnostic Lab", icon: TestTube, value: "admin-lab" },
        { label: "Blood Bank", icon: Droplets, value: "admin-blood" },
        { label: "Clinical Research", icon: Beaker, value: "admin-research" },
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
            <div className="flex items-center gap-4">
              <SidebarTrigger className="h-9 w-9 border border-border bg-background shadow-sm hover:bg-muted" />
              <div>
                <h1 className="text-xl font-bold text-foreground subpixel-antialiased">
                  Hospital Information System <span className="text-primary tracking-tighter">(HIS)</span>
                </h1>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                  Enterprise Operational Command
                </p>
              </div>
            </div>
            {userEmail && (
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-muted/50 border border-border">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-foreground">{userEmail}</span>
              </div>
            )}
          </div>
          <div className="border-t border-border pt-6">
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
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-sidebar-border bg-sidebar shadow-xl">
      <SidebarHeader className="h-16 flex flex-row items-center justify-between px-4 border-b border-sidebar-border/50">
        <div className="flex items-center gap-3 overflow-hidden transition-all duration-300 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center shrink-0">
             <Hospital className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-bold tracking-tight text-white whitespace-nowrap">FORTUMARS HIS</p>
            <p className="text-[9px] font-medium text-sidebar-foreground/60 uppercase tracking-widest whitespace-nowrap">Clinical Network</p>
          </div>
        </div>
        <div className="group-data-[collapsible=icon]:mx-auto transition-all duration-300">
           <SidebarTrigger className="h-7 w-7 rounded-sm hover:bg-sidebar-accent p-0 shrink-0 text-sidebar-foreground" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sections.map((section) => (
          <SidebarGroup key={section.title} className="group-data-[collapsible=icon]:items-center">
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden px-4 mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-sidebar-foreground/40">
               {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.label} className="px-2">
                    <SidebarMenuButton
                      type="button"
                      className="h-9 rounded-md transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
                      isActive={!!item.value && activeSection === item.value}
                      onClick={() => handleNavigate(item.value)}
                      tooltip={item.label}
                    >
                      <item.icon className={`h-4 w-4 shrink-0 ${!!item.value && activeSection === item.value ? 'text-primary' : 'text-sidebar-foreground/70'}`} />
                      <span className="text-sm font-medium tracking-tight group-data-[collapsible=icon]:hidden">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border/30">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              type="button" 
              onClick={onLogout} 
              className="h-9 rounded-md text-red-400 hover:text-red-500 hover:bg-red-500/10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
              tooltip="Logout"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-semibold group-data-[collapsible=icon]:hidden">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {userEmail && (
          <div className="mt-4 rounded-md bg-sidebar-accent/30 p-2.5 overflow-hidden transition-all duration-300 group-data-[collapsible=icon]:h-0 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:mt-0">
            <p className="text-[9px] font-bold uppercase tracking-widest text-sidebar-foreground/40 mb-1">Session</p>
            <p className="truncate font-medium text-xs text-sidebar-foreground/80">{userEmail}</p>
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
