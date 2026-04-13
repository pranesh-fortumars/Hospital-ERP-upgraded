"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Hospital, ShieldCheck, Stethoscope, Video, Activity } from "lucide-react"

// Demo credentials for all roles
const DEMO_CREDENTIALS = {
  admin: { email: "admin@hospital.com", password: "admin123", role: "admin" },
  doctor: { email: "doctor@hospital.com", password: "doctor123", role: "doctor" },
  receptionist: { email: "receptionist@hospital.com", password: "receptionist123", role: "receptionist" },
  patient: { email: "patient@hospital.com", password: "patient123", role: "patient" },
  lab_technician: { email: "lab@hospital.com", password: "lab123", role: "lab_technician" },
  pharmacist: { email: "pharmacist@hospital.com", password: "pharmacist123", role: "pharmacist" },
  billing_officer: { email: "billing@hospital.com", password: "billing123", role: "billing_officer" },
  hr_manager: { email: "hr@hospital.com", password: "hr123", role: "hr_manager" },
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState("admin")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleDemoLogin = (role: keyof typeof DEMO_CREDENTIALS) => {
    const creds = DEMO_CREDENTIALS[role]
    setEmail(creds.email)
    setPassword(creds.password)
    setSelectedRole(role)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Simulate authentication
      const creds = DEMO_CREDENTIALS[selectedRole as keyof typeof DEMO_CREDENTIALS]

      if (email === creds.email && password === creds.password) {
        // Create a mock JWT token
        const token = btoa(
          JSON.stringify({
            email,
            role: creds.role,
            iat: Date.now(),
          }),
        )

        localStorage.setItem("token", token)
        localStorage.setItem("userRole", creds.role)
        localStorage.setItem("userEmail", email)

        router.push("/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        <div className="hidden lg:block space-y-8 pr-8">
           <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                 <Hospital className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight italic">Antigravity<span className="text-primary not-italic">Health</span></h1>
           </div>
           <div className="space-y-4">
              <h2 className="text-5xl font-extrabold text-white leading-tight">Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Healthcare ERP</span> & Telemedicine</h2>
              <p className="text-slate-400 text-lg leading-relaxed">The unified operating system for modern enterprise hospitals. Integrated AI diagnostics, real-time RPM, and HIPAA-compliant surgical monitoring.</p>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <FeatureItem icon={ShieldCheck} label="HIPAA & FHIR Ready" />
              <FeatureItem icon={Video} label="HD Telemedicine" />
              <FeatureItem icon={Stethoscope} label="AI Diagnostics" />
              <FeatureItem icon={Activity} label="Live Monitoring" />
           </div>
        </div>

        <Card className="glass shadow-2xl border-white/5 bg-slate-900/50 backdrop-blur-2xl">
          <CardHeader className="space-y-2 text-center">
            <div className="lg:hidden flex justify-center mb-4">
               <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <Hospital className="h-7 w-7 text-white" />
               </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">Portal Access</CardTitle>
            <CardDescription className="text-slate-400">Secure entry for authorized personnel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="role" className="text-slate-300 text-xs font-bold uppercase tracking-widest">Select Access Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger id="role" className="bg-slate-800/50 border-white/10 text-slate-100 h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10 text-white">
                    <SelectItem value="admin">Enterprise Admin</SelectItem>
                    <SelectItem value="doctor">Medical Consultant</SelectItem>
                    <SelectItem value="receptionist">Front Desk / HMS</SelectItem>
                    <SelectItem value="patient">Patient Portal</SelectItem>
                    <SelectItem value="lab_technician">Laboratory Services</SelectItem>
                    <SelectItem value="pharmacist">Pharmacy Inventory</SelectItem>
                    <SelectItem value="billing_officer">Revenue Management</SelectItem>
                    <SelectItem value="hr_manager">People & Ops</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 text-xs font-bold uppercase tracking-widest">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@hospital.com"
                  className="bg-slate-800/50 border-white/10 text-white h-11 focus-visible:ring-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300 text-xs font-bold uppercase tracking-widest">Security Code</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-slate-800/50 border-white/10 text-white h-11 focus-visible:ring-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98]" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                     <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                     Authenticating...
                  </div>
                ) : "Secure Login"}
              </Button>
            </form>

            <div className="mt-8 space-y-3">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] text-center">Quick Access Simulation</p>
              <div className="grid grid-cols-4 gap-2">
                {['admin', 'doctor', 'patient', 'hr_manager', 'receptionist', 'pharmacist', 'billing_officer', 'lab_technician'].map((role) => (
                  <button
                    key={role}
                    onClick={() => handleDemoLogin(role as any)}
                    className="p-2 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-400 hover:bg-white/10 hover:text-white transition-all capitalize whitespace-nowrap overflow-hidden"
                  >
                    {role.split('_')[0]}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function FeatureItem({ icon: Icon, label }: any) {
  return (
    <div className="flex items-center gap-2 text-slate-400">
       <div className="h-5 w-5 rounded bg-white/5 flex items-center justify-center">
          <Icon className="h-3 w-3 text-primary" />
       </div>
       <span className="text-sm font-medium">{label}</span>
    </div>
  )
}
