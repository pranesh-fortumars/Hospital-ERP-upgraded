"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  FlaskConical, 
  Microscope, 
  Dna, 
  Activity, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  FileSearch,
  Download
} from "lucide-react"

const labTests = [
  { id: 'LAB-9920', patient: 'John Doe', test: 'Complete Blood Count (CBC)', status: 'processing', priority: 'high', collector: 'Tech-01', time: '12 mins ago' },
  { id: 'LAB-9919', patient: 'Sarah Connor', test: 'Lipid Profile', status: 'completed', priority: 'routine', collector: 'Tech-02', time: '1 hr ago' },
  { id: 'LAB-9918', patient: 'Mike Ross', test: 'HBA1C Diabetes Screen', status: 'pending', priority: 'urgent', collector: 'Pending', time: '2 hrs ago' },
  { id: 'LAB-9917', patient: 'Harvey Specter', test: 'Thyroid Panel (T3, T4, TSH)', status: 'processing', priority: 'routine', collector: 'Tech-01', time: '3 hrs ago' },
]

const equipmentStatus = [
  { name: 'Beckman Coulter DXC', status: 'online', workload: '85%', health: 'Good' },
  { name: 'Sysmex XN-3100', status: 'online', workload: '42%', health: 'Excellent' },
  { name: 'Roche Cobas 6000', status: 'maintenance', workload: '0%', health: 'Service - Oct 15' },
]

export default function DiagnosticLab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-bold tracking-tight">Diagnostics & Lab Control</h2>
            <p className="text-sm text-muted-foreground">Automated sample tracking and machine integration</p>
         </div>
         <div className="flex gap-2">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">LIS Integrated</Badge>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">ISO 15189 Compliant</Badge>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPIItem title="Tests Pending" value="12" sub="4 Urgent" icon={Clock} color="text-orange-500" />
        <KPIItem title="Avg. Turnaround" value="4.2h" sub="-15% vs avg" icon={Activity} color="text-blue-500" />
        <KPIItem title="Sample Integrity" value="99.9%" sub="Verified" icon={CheckCircle2} color="text-emerald-500" />
        <KPIItem title="Active Inbound" value="28" sub="Next 1h" icon={FlaskConical} color="text-primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Live Test Monitor */}
         <Card className="lg:col-span-2 glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
               <div>
                  <CardTitle>Live Sample Tracking</CardTitle>
                  <CardDescription>Real-time status of specimen processing</CardDescription>
               </div>
               <Microscope className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {labTests.map((test) => (
                    <div key={test.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-muted/30 border border-border group hover:border-primary/30 transition-all">
                       <div className="flex gap-4 items-start">
                          <div className={`mt-1 h-3 w-3 rounded-full ${
                             test.status === 'completed' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 
                             test.status === 'processing' ? 'bg-blue-500 animate-pulse' : 'bg-orange-500'
                          }`} />
                          <div>
                             <p className="font-bold flex items-center gap-2">
                                {test.patient}
                                {test.priority === 'urgent' && <Badge variant="destructive" className="text-[8px] h-4 py-0 uppercase">Urgent</Badge>}
                                {test.priority === 'high' && <Badge className="bg-orange-500 text-[8px] h-4 py-0 uppercase">High</Badge>}
                             </p>
                             <p className="text-xs text-muted-foreground">{test.test}</p>
                             <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                                <span className="flex items-center gap-1 font-mono uppercase tracking-widest"><FileSearch className="h-3 w-3" /> {test.id}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {test.time}</span>
                             </div>
                          </div>
                       </div>
                       <div className="flex items-center gap-4 mt-4 md:mt-0">
                          <div className="text-right hidden md:block">
                             <p className="text-[10px] font-bold uppercase text-muted-foreground">Assigned Tech</p>
                             <p className="text-xs font-medium">{test.collector}</p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="p-2 rounded-lg bg-background border hover:bg-muted text-muted-foreground" title="View Results"><Dna className="h-4 w-4" /></button>
                             <button className="p-2 rounded-lg bg-background border hover:bg-muted text-muted-foreground" title="Download Report"><Download className="h-4 w-4" /></button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
                <Button variant="outline" className="w-full mt-6 text-xs font-bold text-primary border-primary/10">View All Lab Orders (142)</Button>
            </CardContent>
         </Card>

         {/* Equipment Manager */}
         <Card className="glass-card">
            <CardHeader>
               <CardTitle>LIS & Machines</CardTitle>
               <CardDescription>Networked laboratory equipment status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {equipmentStatus.map((machine) => (
                 <div key={machine.name} className="p-4 rounded-xl bg-background border shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-bold text-gray-700">{machine.name}</span>
                       <Badge className={machine.status === 'online' ? 'bg-emerald-500' : 'bg-red-500'}>
                          {machine.status}
                       </Badge>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                       <span className="text-muted-foreground">Workload: {machine.workload}</span>
                       <span className={machine.health === 'Excellent' ? 'text-emerald-600 font-bold' : 'text-orange-500 font-bold'}>{machine.health}</span>
                    </div>
                    {machine.status === 'online' && (
                       <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: machine.workload }} />
                       </div>
                    )}
                 </div>
               ))}
               <div className="mt-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                     <AlertTriangle className="h-4 w-4 text-blue-600" />
                     <span className="text-xs font-bold text-blue-700">Calibration Alert</span>
                  </div>
                  <p className="text-[10px] text-blue-600/80">Beckman Coulter DXC due for calibration in 48 hours. Auto-scheduled for Sunday night.</p>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  )
}

function KPIItem({ title, value, sub, icon: Icon, color }: any) {
  return (
    <Card className="glass-card">
       <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
             <div className={`p-2 rounded-lg bg-muted text-muted-foreground ${color}`}>
                <Icon className="h-5 w-5" />
             </div>
             <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{title}</span>
          </div>
          <div className="space-y-1">
             <h3 className="text-2xl font-bold">{value}</h3>
             <p className="text-[10px] text-muted-foreground font-medium">{sub}</p>
          </div>
       </CardContent>
    </Card>
  )
}
