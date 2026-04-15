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
import { 
  AlertCircle, 
  Stethoscope, 
  ShieldCheck, 
  Activity, 
  Building2,
  Users,
  TestTube,
  Pill,
  CreditCard,
  ChefHat
} from "lucide-react"

const DEMO_CREDENTIALS = {
  admin: { email: "admin@hospital.com", password: "admin123", role: "admin", icon: ShieldCheck },
  doctor: { email: "doctor@hospital.com", password: "doctor123", role: "doctor", icon: Stethoscope },
  receptionist: { email: "receptionist@hospital.com", password: "receptionist123", role: "receptionist", icon: Building2 },
  patient: { email: "patient@hospital.com", password: "patient123", role: "patient", icon: Users },
  lab_technician: { email: "lab@hospital.com", password: "lab123", role: "lab_technician", icon: TestTube },
  pharmacist: { email: "pharmacist@hospital.com", password: "pharmacist123", role: "pharmacist", icon: Pill },
  billing_officer: { email: "billing@hospital.com", password: "billing123", role: "billing_officer", icon: CreditCard },
  hr_manager: { email: "hr@hospital.com", password: "hr123", role: "hr_manager", icon: Users },
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

  if (!mounted) return null

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
      const creds = DEMO_CREDENTIALS[selectedRole as keyof typeof DEMO_CREDENTIALS]
      if (email === creds.email && password === creds.password) {
        const token = btoa(JSON.stringify({ email, role: creds.role, iat: Date.now() }))
        localStorage.setItem("token", token)
        localStorage.setItem("userRole", creds.role)
        localStorage.setItem("userEmail", email)
        router.push("/dashboard")
      } else {
        setError("Invalid credentials for the selected role")
      }
    } catch (err) {
      setError("Authentication failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-mesh">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-200/30 rounded-full blur-[120px] animation-delay-2000" />
      
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Branding Side - Hidden on Mobile */}
        <div className="hidden lg:flex flex-col space-y-8 p-6">
           <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20">
                 <Activity className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-black tracking-tighter text-slate-800">FORTUMARS <span className="text-primary">ERP</span></h1>
           </div>
           
           <div className="space-y-4">
              <h2 className="text-4xl font-bold leading-tight text-slate-900">
                 The Enterprise <br />
                 Healthcare <span className="text-primary italic">Command Center.</span>
              </h2>
              <p className="text-slate-600 max-w-sm leading-relaxed">
                 Manage patient vitals, clinical workflows, and revenue cycles with an AI-driven interface designed for modern medical institutions.
              </p>
           </div>

           <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { label: 'Patient 360', desc: 'Holistic vitals tracking' },
                { label: 'Real-time OT', desc: 'Remote surgical monitor' },
                { label: 'Cloud Pharmacy', desc: 'Automated drug dispensing' },
                { label: 'Finance Hub', desc: 'Revenue cycle automation' }
              ].map((feature, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-sm">
                   <p className="text-sm font-bold text-slate-800">{feature.label}</p>
                   <p className="text-[10px] text-slate-500 mt-0.5">{feature.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Login Form Side */}
        <div className="w-full max-w-md mx-auto">
          <Card className="glass-card shadow-2xl border-white/60">
            <CardHeader className="text-center space-y-2 pb-2">
              <div className="lg:hidden flex justify-center mb-4">
                 <Activity className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl font-black tracking-tight text-slate-800 uppercase">System Access</CardTitle>
              <CardDescription className="text-sm text-slate-500 font-medium">Please authenticate to continue to the portal</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                  <Alert variant="destructive" className="rounded-2xl border-red-100 bg-red-50 text-red-600 py-3">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs font-bold">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Wing Access Role</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="h-12 rounded-xl bg-white/50 border-white/40 focus:ring-primary/50 text-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-white/60 bg-white/90 backdrop-blur-md">
                      <SelectItem value="admin">Enterprise Admin (Full Access)</SelectItem>
                      <SelectItem value="doctor">Medical Consultant (Clinical)</SelectItem>
                      <SelectItem value="receptionist">Reception & Front Desk</SelectItem>
                      <SelectItem value="patient">Patient Health Portal</SelectItem>
                      <SelectItem value="lab_technician">Laboratory Services Wing</SelectItem>
                      <SelectItem value="pharmacist">Pharmacy & Inventory</SelectItem>
                      <SelectItem value="billing_officer">Revenue Management</SelectItem>
                      <SelectItem value="hr_manager">People & Staffing Ops</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Account Identifier</Label>
                  <Input
                    type="email"
                    placeholder="email@fortumars.com"
                    className="h-12 rounded-xl bg-white/50 border-white/40 focus:ring-primary/50 text-slate-700 font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                   <div className="flex justify-between items-center ml-1">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Security Clearance</Label>
                   </div>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-12 rounded-xl bg-white/50 border-white/40 focus:ring-primary/50 text-slate-700 font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" disabled={loading}>
                  {loading ? "AUTHENTICATING..." : "START SYSTEM"}
                </Button>
              </form>

              <div className="mt-10">
                <div className="relative">
                   <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200" /></div>
                   <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-3 text-slate-400 font-black tracking-widest">Rapid Sandbox Access</span></div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2 mt-6">
                  {Object.entries(DEMO_CREDENTIALS).map(([role, creds]) => (
                    <Button
                      key={role}
                      variant="outline"
                      size="sm"
                      onClick={() => handleDemoLogin(role as any)}
                      className="group h-10 rounded-xl flex items-center justify-start gap-2 bg-white/20 hover:bg-white hover:border-primary border-white transition-all overflow-hidden relative"
                    >
                      <creds.icon className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                      <span className="text-[10px] font-bold capitalize text-slate-600 group-hover:text-slate-900">{role.replace("_", " ")}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center space-y-1">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enterprise Edition v2.4.1</p>
             <p className="text-[10px] text-slate-400">© 2024 Fortumars Health Systems. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
