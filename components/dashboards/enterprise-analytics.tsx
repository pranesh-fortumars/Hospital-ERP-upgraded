"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts'
import { 
  TrendingUp, 
  Users, 
  Video, 
  DollarSign, 
  Activity, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

const revenueData = [
  { month: 'Jan', revenue: 450000, expenses: 320000 },
  { month: 'Feb', revenue: 520000, expenses: 340000 },
  { month: 'Mar', revenue: 480000, expenses: 310000 },
  { month: 'Apr', revenue: 610000, expenses: 380000 },
  { month: 'May', revenue: 590000, expenses: 360000 },
  { month: 'Jun', revenue: 720000, expenses: 410000 },
]

const telemedicineUsage = [
  { month: 'Jan', video: 120, chat: 450 },
  { month: 'Feb', video: 180, chat: 520 },
  { month: 'Mar', video: 250, chat: 480 },
  { month: 'Apr', video: 420, chat: 890 },
  { month: 'May', video: 580, chat: 1200 },
  { month: 'Jun', video: 840, chat: 1540 },
]

const departmentStats = [
  { name: 'Cardiology', value: 85, color: '#10b981' },
  { name: 'Neurology', value: 72, color: '#0ea5e9' },
  { name: 'Orthopedics', value: 94, color: '#6366f1' },
  { name: 'Pediatrics', value: 68, color: '#f59e0b' },
  { name: 'General', value: 91, color: '#ec4899' },
]

const bedOccupancy = [
  { name: 'Occupied', value: 142 },
  { name: 'Available', value: 28 },
  { name: 'Reserved', value: 12 },
]

const COLORS = ['#10b981', '#e2e8f0', '#fbbf24']

export default function EnterpriseAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-bold tracking-tight">Enterprise Intelligence</h2>
            <p className="text-sm text-muted-foreground">Predictive health analytics and hospital operations performance</p>
         </div>
         <Badge variant="outline" className="px-3 py-1 bg-primary/5 text-primary border-primary/20">
            Real-time Sync: Active
         </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPIItem title="Avg. Consultation Time" value="18.4 min" trend="+2.1%" positive={false} icon={Activity} />
        <KPIItem title="Net Profit Margin" value="24.8%" trend="+4.5%" positive={true} icon={DollarSign} />
        <KPIItem title="Patient Satisfaction" value="4.8/5" trend="+0.2" positive={true} icon={Users} />
        <KPIItem title="Telemed Adoption" value="62%" trend="+12%" positive={true} icon={Video} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <Card className="enterprise-card">
          <CardHeader>
             <div className="flex items-center justify-between">
                <div>
                   <CardTitle className="text-lg">Revenue vs Operations Cost</CardTitle>
                   <CardDescription>Monthly financial performance (H1 2024)</CardDescription>
                </div>
                <TrendingUp className="h-5 w-5 text-primary" />
             </div>
          </CardHeader>
          <CardContent>
             <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#revenue)" strokeWidth={3} />
                    <Area type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>

        {/* Telemedicine Growth */}
        <Card className="enterprise-card">
          <CardHeader>
             <div className="flex items-center justify-between">
                <div>
                   <CardTitle className="text-lg">Telemedicine Growth</CardTitle>
                   <CardDescription>Virtual consultations adoption rate</CardDescription>
                </div>
                <Video className="h-5 w-5 text-blue-500" />
             </div>
          </CardHeader>
          <CardContent>
             <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={telemedicineUsage}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="video" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="chat" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Utilization */}
        <Card className="lg:col-span-2 enterprise-card">
          <CardHeader>
             <CardTitle className="text-lg">Department Utilization</CardTitle>
             <CardDescription>Staff & Resource occupancy per specialty</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-6">
                {departmentStats.map((dept) => (
                  <div key={dept.name} className="space-y-2">
                     <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{dept.name}</span>
                        <span className="text-muted-foreground">{dept.value}% occupancy</span>
                     </div>
                     <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000" 
                          style={{ width: `${dept.value}%`, backgroundColor: dept.color }} 
                        />
                     </div>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>

        {/* Bed Management */}
        <Card className="enterprise-card">
          <CardHeader>
             <CardTitle className="text-lg">Facility Capacity</CardTitle>
             <CardDescription>Current bed allocation status</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                      <Pie
                        data={bedOccupancy}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {bedOccupancy.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                   </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="space-y-3 mt-4">
                {bedOccupancy.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                     <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                        <span className="text-muted-foreground">{item.name}</span>
                     </div>
                     <span className="font-bold">{item.value} Units</span>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function KPIItem({ title, value, trend, positive, icon: Icon }: any) {
  return (
    <Card className="enterprise-card overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-5">
         <Icon className="h-12 w-12" />
      </div>
      <CardContent className="p-6">
         <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">{title}</p>
         <div className="flex items-end gap-2">
            <h3 className="text-2xl font-bold">{value}</h3>
            <span className={`text-xs font-bold flex items-center mb-1 ${positive ? 'text-emerald-500' : 'text-red-500'}`}>
               {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
               {trend}
            </span>
         </div>
      </CardContent>
    </Card>
  )
}
