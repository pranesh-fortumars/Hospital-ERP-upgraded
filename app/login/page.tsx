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
import { AlertCircle } from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold">Hospital ERP System</CardTitle>
            <CardDescription>Sign in to your healthcare account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="role">Select Access Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger id="role" className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
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
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@hospital.com"
                  className="bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Security Code</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11" disabled={loading}>
                {loading ? "Authenticating..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-8 space-y-3">
              <p className="text-sm font-semibold text-gray-700">Demo Access:</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(DEMO_CREDENTIALS).map((role) => (
                  <Button
                    key={role}
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin(role as any)}
                    className="text-xs h-8 capitalize"
                  >
                    {role.replace("_", " ")}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Managed Hospital Information System (HIS)</p>
        </div>
      </div>
    </div>
  )
}
