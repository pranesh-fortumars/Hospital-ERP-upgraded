"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Monitor, 
  Activity, 
  Clock, 
  User, 
  Settings, 
  Video, 
  AlertCircle,
  Thermometer,
  Wind
} from "lucide-react"

const otStatus = [
  { id: 'OT-01', status: 'In Use', patient: 'James Logan', surgery: 'CABG - Heart Bypass', surgeon: 'Dr. John Smith', duration: '2h 15m', vitals: { hr: 72, bp: '110/80', temp: '36.5' } },
  { id: 'OT-02', status: 'Ready', patient: '-', surgery: '-', surgeon: '-', duration: '0m', vitals: null },
  { id: 'OT-03', status: 'Sterilizing', patient: '-', surgery: '-', surgeon: '-', duration: '45m', vitals: null, progress: 65 },
  { id: 'OT-04', status: 'Scheduled', patient: 'Eva Green', surgery: 'Hip Replacement', surgeon: 'Dr. Mike Chen', duration: 'Next: 14:00', vitals: null },
]

export default function OTManagement() {
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
          <div>
             <h2 className="text-2xl font-bold tracking-tight">Operation Theater Command Center</h2>
             <p className="text-sm text-muted-foreground">Remote OT monitoring and surgical workflow synchronization</p>
          </div>
          <Badge className="bg-red-500/10 text-red-600 border-red-200">
             <Activity className="h-3 w-3 mr-1 animate-pulse" /> Live Remote View Active
          </Badge>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Live OT Monitors */}
         {otStatus.map((ot) => (
           <Card key={ot.id} className={`enterprise-card overflow-hidden transition-all ${ot.status === 'In Use' ? 'ring-2 ring-primary/50 lg:col-span-1' : ''}`}>
              <div className={`h-1.5 w-full ${
                 ot.status === 'In Use' ? 'bg-primary' : 
                 ot.status === 'Sterilizing' ? 'bg-orange-500' : 'bg-muted'
              }`} />
              <CardHeader className="pb-2">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <Monitor className="h-5 w-5 text-primary" />
                       <CardTitle className="text-lg">{ot.id}</CardTitle>
                    </div>
                    <Badge variant={ot.status === 'In Use' ? 'default' : 'secondary'} className={
                       ot.status === 'Sterilizing' ? 'bg-orange-100 text-orange-600 border-none' : ''
                    }>
                       {ot.status}
                    </Badge>
                 </div>
              </CardHeader>
              <CardContent className="space-y-4">
                 {ot.status === 'In Use' ? (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                         <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                               <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                               <p className="text-xs text-muted-foreground">Current Patient</p>
                               <p className="text-sm font-bold">{ot.patient}</p>
                            </div>
                         </div>
                         <div className="p-3 rounded-xl bg-muted/30 border">
                            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest font-bold">Procedure</p>
                            <p className="text-sm font-bold text-foreground">{ot.surgery}</p>
                            <p className="text-[10px] text-primary font-medium mt-1">Surgeon: {ot.surgeon}</p>
                         </div>
                      </div>
                      
                      <div className="space-y-3 bg-slate-900 p-4 rounded-xl text-white">
                         <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Vitals</span>
                            <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                         </div>
                         <div className="grid grid-cols-2 gap-2">
                            <div className="text-center">
                               <p className="text-[10px] text-slate-400">HR</p>
                               <p className="text-xl font-bold text-emerald-400">{ot.vitals?.hr}</p>
                            </div>
                            <div className="text-center">
                               <p className="text-[10px] text-slate-400">BP</p>
                               <p className="text-xl font-bold text-white">{ot.vitals?.bp}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                            <Clock className="h-3 w-3 text-slate-500" />
                            <span className="text-xs font-mono text-slate-300">Elapsed: {ot.duration}</span>
                         </div>
                      </div>
                   </div>
                 ) : ot.status === 'Sterilizing' ? (
                   <div className="space-y-4 py-6 text-center">
                      <Settings className="h-12 w-12 text-orange-500 mx-auto animate-spin" />
                      <div>
                         <p className="text-sm font-bold">Sterilization Cycle in Progress</p>
                         <p className="text-xs text-muted-foreground mt-1">Completion in ~15 mins</p>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden max-w-xs mx-auto">
                         <div className="h-full bg-orange-500 rounded-full" style={{ width: `${ot.progress}%` }} />
                      </div>
                   </div>
                 ) : (
                   <div className="py-8 flex flex-col items-center justify-center border-2 border-dashed rounded-xl border-muted">
                      <p className="text-sm font-medium text-muted-foreground">
                         {ot.status === 'Ready' ? 'Standby - Ready for procedure' : `Scheduled: ${ot.surgery}`}
                      </p>
                      {ot.status === 'Scheduled' && (
                        <p className="text-xs text-primary mt-1 font-bold">{ot.duration}</p>
                      )}
                      <Button variant="ghost" className="mt-4 h-8 text-[10px] uppercase font-bold tracking-widest">Manage Schedule</Button>
                   </div>
                 )}

                 <div className="flex items-center gap-4 pt-4 border-t text-[10px]">
                    <span className="flex items-center gap-1 text-muted-foreground"><Thermometer className="h-3 w-3" /> 22.4°C</span>
                    <span className="flex items-center gap-1 text-muted-foreground"><Wind className="h-3 w-3" /> 45% Humidity</span>
                    <button className="ml-auto text-primary font-bold hover:underline flex items-center gap-1">
                       <Video className="h-3 w-3" /> View Remote Feed
                    </button>
                 </div>
              </CardContent>
           </Card>
         ))}
       </div>

       <Card className="enterprise-card border-none bg-slate-900 text-slate-100 p-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
             <div className="h-32 w-32 rounded-2xl bg-slate-800 flex items-center justify-center p-4 border border-slate-700 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Settings className="h-16 w-16 text-slate-500" />
                <div className="absolute top-2 right-2 h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
             </div>
             <div className="flex-1 space-y-2 text-center md:text-left">
                <h4 className="text-xl font-bold">Central Monitoring Master</h4>
                <p className="text-sm opacity-60">Control multi-view panels, environmental conditions, and remote diagnostic tools for all theaters from a single interface.</p>
                <div className="flex flex-wrap gap-2 pt-4 justify-center md:justify-start">
                   <Badge className="bg-slate-800 text-slate-300">Telemetry: On</Badge>
                   <Badge className="bg-slate-800 text-slate-300">CO2 Levels: Normal</Badge>
                   <Badge className="bg-slate-800 text-slate-300">Anesthesia Feed: Active</Badge>
                </div>
             </div>
             <div className="w-full md:w-auto">
                <Button size="lg" className="w-full md:w-auto bg-primary text-white hover:bg-primary/90 px-8 rounded-2xl shadow-xl shadow-primary/20">
                   Enter Command Panel
                </Button>
             </div>
          </div>
       </Card>
    </div>
  )
}
