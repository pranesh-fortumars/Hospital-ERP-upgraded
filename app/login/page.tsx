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
            <CardTitle className="text-2xl">Hospital ERP System</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
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
                <Label htmlFor="role">Select Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="receptionist">Receptionist</SelectItem>
                    <SelectItem value="patient">Patient</SelectItem>
                    <SelectItem value="lab_technician">Lab Technician</SelectItem>
                    <SelectItem value="pharmacist">Pharmacist</SelectItem>
                    <SelectItem value="billing_officer">Billing Officer</SelectItem>
                    <SelectItem value="hr_manager">HR Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 space-y-2">
              <p className="text-sm font-semibold text-gray-700">Demo Credentials:</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(DEMO_CREDENTIALS).map(([role, creds]) => (
                  <Button
                    key={role}
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin(role as keyof typeof DEMO_CREDENTIALS)}
                    className="text-xs"
                  >
                    {role.replace("_", " ")}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Use demo buttons above to quickly login with any role</p>
        </div>
      </div>
    </div>
  )
}
