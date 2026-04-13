"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Bed, 
  UserCheck, 
  Stethoscope, 
  Clock, 
  AlertCircle,
  Building2,
  Users,
  Calendar,
  Zap
} from "lucide-react"

const wardUtilization = [
  { name: 'General Ward A', total: 50, occupied: 42, type: 'General' },
  { name: 'General Ward B', total: 50, occupied: 38, type: 'General' },
  { name: 'ICU - Level 1', total: 12, occupied: 11, type: 'Critical' },
  { name: 'Pediatrics', total: 20, occupied: 14, type: 'Specialty' },
  { name: 'Emergency Care', total: 15, occupied: 15, type: 'Critical' },
]

const staffStatus = [
  { name: 'Doctors', total: 45, onDuty: 32, onLeave: 5 },
  { name: 'Nurses', total: 120, onDuty: 98, onLeave: 12 },
  { name: 'Support', total: 60, onDuty: 45, onLeave: 8 },
]

export default function HospitalOperations() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h2 className="text-2xl font-bold tracking-tight">Facilities & Operations Control</h2>
            <p className="text-sm text-muted-foreground">Real-time resource allocation and staff availability</p>
         </div>
         <div className="flex gap-2">
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">
               <Zap className="h-3 w-3 mr-1" /> System Optimal
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-600">
               Next Shift: 08:00 PM
            </Badge>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <Card className="glass-card">
            <CardHeader className="py-4">
               <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-primary" />
                  <CardTitle className="text-sm font-bold uppercase">Bed Inventory</CardTitle>
               </div>
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-extrabold text-primary">147 / 185</div>
               <p className="text-xs text-muted-foreground mt-1">79% Total Occupancy</p>
               <div className="mt-4 flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 8 ? 'bg-primary' : 'bg-muted'}`} />
                  ))}
               </div>
            </CardContent>
         </Card>

         <Card className="glass-card">
            <CardHeader className="py-4">
               <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-teal-500" />
                  <CardTitle className="text-sm font-bold uppercase">Staff Attendance</CardTitle>
               </div>
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-extrabold text-teal-600">175 / 225</div>
               <p className="text-xs text-muted-foreground mt-1">On-duty personnel</p>
               <div className="mt-4 flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 7 ? 'bg-teal-500' : 'bg-muted'}`} />
                  ))}
               </div>
            </CardContent>
         </Card>

         <Card className="glass-card">
            <CardHeader className="py-4">
               <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <CardTitle className="text-sm font-bold uppercase">Avg. ER Waiting</CardTitle>
               </div>
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-extrabold text-orange-600">24 min</div>
               <p className="text-xs text-muted-foreground mt-1">Estimated patient queue</p>
               <div className="mt-4 flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 4 ? 'bg-orange-500' : 'bg-muted'}`} />
                  ))}
               </div>
            </CardContent>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card className="glass-card">
            <CardHeader>
               <CardTitle>Ward Occupancy</CardTitle>
               <CardDescription>Detailed bed allocation by department</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               {wardUtilization.map((ward) => (
                 <div key={ward.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                       <div className="flex items-center gap-2">
                          <span className="font-medium">{ward.name}</span>
                          <Badge variant="outline" className={`text-[10px] py-0 ${
                            ward.type === 'Critical' ? 'border-red-200 text-red-600' : 'border-blue-200 text-blue-600'
                          }`}>
                             {ward.type}
                          </Badge>
                       </div>
                       <span className="text-muted-foreground">{ward.occupied} / {ward.total}</span>
                    </div>
                    <Progress 
                      value={(ward.occupied / ward.total) * 100} 
                      className={`h-2 ${ward.occupied === ward.total ? '[&>[data-state=checked]]:bg-red-500' : ''}`}
                    />
                 </div>
               ))}
            </CardContent>
         </Card>

         <Card className="glass-card">
            <CardHeader>
               <CardTitle>Staffing Snapshot</CardTitle>
               <CardDescription>Current workforce distribution</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {staffStatus.map((staff) => (
                    <div key={staff.name} className="p-4 rounded-xl bg-muted/30 border border-border flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center shadow-sm">
                             {staff.name === 'Doctors' ? <Stethoscope className="h-5 w-5 text-primary" /> : <Users className="h-5 w-5 text-teal-500" />}
                          </div>
                          <div>
                             <p className="font-bold">{staff.name}</p>
                             <p className="text-xs text-muted-foreground">{staff.total} Total Registered</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <div className="flex items-center gap-4">
                             <div>
                                <p className="text-xs font-bold text-emerald-600">On Duty</p>
                                <p className="text-lg font-extrabold">{staff.onDuty}</p>
                             </div>
                             <div>
                                <p className="text-xs font-bold text-orange-500">Leave</p>
                                <p className="text-lg font-extrabold">{staff.onLeave}</p>
                             </div>
                          </div>
                       </div>
                    </div>
                  ))}
                  <div className="mt-6 p-4 rounded-xl border border-dashed border-primary/30 bg-primary/5 flex items-center gap-3">
                     <AlertCircle className="h-5 w-5 text-primary" />
                     <p className="text-xs text-primary/80 leading-relaxed font-medium">
                        System alert: ICU staffing below optimal levels for next shift. Auto-requesting emergency back-up from on-call pool.
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <Card className="glass-card bg-primary text-white border-none shadow-xl shadow-primary/20">
            <CardContent className="p-6 flex items-center gap-6">
               <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-white" />
               </div>
               <div>
                  <h3 className="text-lg font-bold">Facility Insights</h3>
                  <p className="text-sm opacity-80">Energy usage and maintenance tracking optimized for 2024 compliance.</p>
               </div>
               <Button className="ml-auto bg-white text-primary hover:bg-white/90 font-bold px-6 h-10 rounded-xl">View Maintenance</Button>
            </CardContent>
         </Card>
      </div>
    </div>
  )
}
