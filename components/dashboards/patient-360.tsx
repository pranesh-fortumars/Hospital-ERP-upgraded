"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Droplets, 
  History, 
  FileText, 
  FlaskConical, 
  ShieldCheck,
  AlertTriangle,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin
} from "lucide-react"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from 'recharts'

const vitalData = [
  { time: '08:00', heartRate: 72, bloodPressure: 120, oxygen: 98, temp: 36.6 },
  { time: '10:00', heartRate: 75, bloodPressure: 122, oxygen: 97, temp: 36.7 },
  { time: '12:00', heartRate: 82, bloodPressure: 125, oxygen: 98, temp: 36.8 },
  { time: '14:00', heartRate: 78, bloodPressure: 121, oxygen: 99, temp: 36.6 },
  { time: '16:00', heartRate: 74, bloodPressure: 119, oxygen: 98, temp: 36.5 },
  { time: '18:00', heartRate: 70, bloodPressure: 118, oxygen: 98, temp: 36.4 },
]

export default function Patient360({ patientId = "P001" }: { patientId?: string }) {
  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="relative">
          <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
             JD
          </div>
          <Badge className="absolute -bottom-2 -right-2 bg-emerald-500 border-2 border-background">Active</Badge>
        </div>
        
        <div className="flex-1 space-y-2">
           <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">John Doe</h2>
              <Badge variant="outline" className="text-muted-foreground whitespace-nowrap">ID: {patientId}</Badge>
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> Diabetic (Type 2)
              </Badge>
           </div>
           
           <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><User className="h-4 w-4" /> 34 yrs, Male</span>
              <span className="flex items-center gap-1"><Droplets className="h-4 w-4" /> O Positive</span>
              <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> +1 (555) 012-3456</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> 123 Healthcare Way, NY</span>
           </div>
        </div>

        <div className="flex gap-2">
           <Card className="bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/50">
              <CardContent className="p-3 text-center">
                 <p className="text-[10px] uppercase font-bold text-emerald-600 mb-1">Last Visit</p>
                 <p className="text-lg font-bold text-emerald-700">Oct 12</p>
              </CardContent>
           </Card>
           <Card className="bg-teal-50/50 dark:bg-teal-950/20 border-teal-200/50">
              <CardContent className="p-3 text-center">
                 <p className="text-[10px] uppercase font-bold text-teal-600 mb-1">Insurance</p>
                 <p className="text-lg font-bold text-teal-700">Verified</p>
              </CardContent>
           </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0">
             <CardTitle className="text-xs font-medium text-muted-foreground">Heart Rate</CardTitle>
             <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent className="py-2">
             <div className="text-2xl font-bold">72 BPM</div>
             <p className="text-[10px] text-green-500 mt-1">Normal Range</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0">
             <CardTitle className="text-xs font-medium text-muted-foreground">Blood Pressure</CardTitle>
             <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent className="py-2">
             <div className="text-2xl font-bold">120/80</div>
             <p className="text-[10px] text-green-500 mt-1">Optimal</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0">
             <CardTitle className="text-xs font-medium text-muted-foreground">Temperature</CardTitle>
             <Thermometer className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent className="py-2">
             <div className="text-2xl font-bold">98.6°F</div>
             <p className="text-[10px] text-green-500 mt-1">Normal</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0">
             <CardTitle className="text-xs font-medium text-muted-foreground">Oxygen Saturation</CardTitle>
             <Droplets className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent className="py-2">
             <div className="text-2xl font-bold">98%</div>
             <p className="text-[10px] text-green-500 mt-1">Healthy</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vitals" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px] bg-muted/50 p-1">
          <TabsTrigger value="vitals" className="gap-2"><Activity className="h-4 w-4" /> RPM Vitals</TabsTrigger>
          <TabsTrigger value="history" className="gap-2"><History className="h-4 w-4" /> History</TabsTrigger>
          <TabsTrigger value="lab" className="gap-2"><FlaskConical className="h-4 w-4" /> Lab Reports</TabsTrigger>
          <TabsTrigger value="insurance" className="gap-2"><ShieldCheck className="h-4 w-4" /> Claims</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vitals" className="mt-4 space-y-4">
          <Card className="glass-card p-6">
             <div className="flex items-center justify-between mb-6">
                <div>
                   <h3 className="text-lg font-bold">Remote Patient Monitoring</h3>
                   <p className="text-xs text-muted-foreground">Real-time vital trends from wearable sync</p>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">Live Syncing</Badge>
             </div>
             <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={vitalData}>
                    <defs>
                      <linearGradient id="colorHeart" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Area type="monotone" dataKey="heartRate" stroke="var(--primary)" fillOpacity={1} fill="url(#colorHeart)" strokeWidth={3} />
                    <Area type="monotone" dataKey="bloodPressure" stroke="#3b82f6" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
           <div className="space-y-4">
              {[
                { date: 'Oct 12, 2024', event: 'Telemedicine Consultation', doctor: 'Dr. Sarah Wilson', type: 'Video', notes: 'Patient reported dizziness. Vital signs within normal range.' },
                { date: 'Sep 28, 2024', event: 'Physical Examination', doctor: 'Dr. James Miller', type: 'In-person', notes: 'Routine checkup. Type 2 Diabetes management ongoing.' },
                { date: 'Aug 15, 2024', event: 'Cardiology Review', doctor: 'Dr. Robert Chen', type: 'Specialist', notes: 'ECG normal. Recommended stress test for next month.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl glass-card">
                   <div className="shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                         <Calendar className="h-5 w-5" />
                      </div>
                   </div>
                   <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                         <h4 className="font-bold text-sm">{item.event}</h4>
                         <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">{item.date}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">Attending: {item.doctor} • {item.type}</p>
                      <p className="text-xs text-gray-700 dark:text-gray-300 bg-muted/30 p-2 rounded-lg">{item.notes}</p>
                   </div>
                </div>
              ))}
           </div>
        </TabsContent>

        <TabsContent value="lab" className="mt-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Complete Blood Count', date: 'Oct 10, 2024', status: 'Completed', result: 'Normal' },
                { title: 'HbA1c (Diabetes)', date: 'Oct 10, 2024', status: 'Completed', result: '6.8% (Borderline)' },
                { title: 'Lipid Profile', date: 'Oct 05, 2024', status: 'Completed', result: 'High Cholesterol' },
                { title: 'Chest X-Ray', date: 'Aug 15, 2024', status: 'Archive', result: 'Clear' },
              ].map((lab, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background/50">
                   <div className="h-10 w-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-600">
                      <FileText className="h-5 w-5" />
                   </div>
                   <div className="flex-1">
                      <h4 className="font-bold text-sm">{lab.title}</h4>
                      <p className="text-[10px] text-muted-foreground">{lab.date}</p>
                   </div>
                   <div className="text-right">
                      <p className={`text-xs font-bold ${lab.result.includes('High') || lab.result.includes('Borderline') ? 'text-orange-500' : 'text-green-500'}`}>
                        {lab.result}
                      </p>
                      <button className="text-[10px] text-primary hover:underline">View Report</button>
                   </div>
                </div>
              ))}
           </div>
        </TabsContent>

        <TabsContent value="insurance" className="mt-4">
           <Card className="glass-card overflow-hidden">
              <div className="bg-primary/10 p-4 border-b border-primary/20 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span className="font-bold">HealthGuard Platinum - #HG-882299</span>
                 </div>
                 <Badge className="bg-green-500 text-white border-0">Primary Payer</Badge>
              </div>
              <CardContent className="p-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                       <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Coverage Status</p>
                       <p className="text-sm font-bold flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-green-500" /> Active (Valid thru 2025)
                       </p>
                    </div>
                    <div>
                       <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Remaining Deductible</p>
                       <p className="text-sm font-bold">$450.00 / $1,000.00</p>
                    </div>
                    <div>
                       <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Prior Auth Status</p>
                       <p className="text-sm font-bold">2 Pending Approvals</p>
                    </div>
                 </div>
                 
                 <div className="mt-8">
                    <h4 className="text-sm font-bold mb-4">Recent Claims History</h4>
                    <div className="space-y-2">
                       {[
                         { id: 'CLM-001', date: 'Oct 12', service: 'Video Consultation', amount: '$75.00', status: 'Processing' },
                         { id: 'CLM-002', date: 'Oct 10', service: 'Lab Panels (Blood)', amount: '$240.00', status: 'Approved' },
                         { id: 'CLM-003', date: 'Sep 28', service: 'Physical Exam', amount: '$150.00', status: 'Settled' },
                       ].map((claim, i) => (
                         <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 text-xs">
                            <span className="font-medium">{claim.id}</span>
                            <span className="text-muted-foreground">{claim.date}</span>
                            <span className="flex-1 px-4">{claim.service}</span>
                            <span className="font-bold">{claim.amount}</span>
                            <Badge variant="outline" className={`ml-4 ${claim.status === 'Approved' ? 'border-green-500 text-green-600' : 'border-orange-500 text-orange-600'}`}>
                               {claim.status}
                            </Badge>
                         </div>
                       ))}
                    </div>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
