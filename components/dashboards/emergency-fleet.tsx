"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Truck, 
  MapPin, 
  PhoneCall, 
  Siren, 
  Clock, 
  User, 
  Navigation,
  Activity,
  AlertCircle,
  MoreHorizontal
} from "lucide-react"

const ambulanceFleet = [
  { id: 'AMB-101', type: 'ALS (Advanced)', status: 'On Mission', location: '12th Ave & Park', eta: '4 mins', patient: 'Mrs. Gable' },
  { id: 'AMB-102', type: 'BLS (Basic)', status: 'Standby', location: 'Station A', eta: '-', patient: '-' },
  { id: 'AMB-103', type: 'ALS (Advanced)', status: 'En Route', location: 'Central HWY', eta: '12 mins', patient: 'Critical - MVC' },
  { id: 'AMB-104', type: 'Critical Care', status: 'Maintenance', location: 'Service Center', eta: '-', patient: '-' },
]

export default function EmergencyFleet() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-bold tracking-tight text-foreground">Emergency Fleet & Dispatch</h2>
           <p className="text-sm text-muted-foreground">Real-time ambulance tracking, response time analytics, and emergency dispatch control.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 border border-red-200">
              <Siren className="h-4 w-4 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">3 Active Emergencies</span>
           </div>
           <Button className="bg-red-600 hover:bg-red-700 text-white gap-2 h-10 px-6 rounded-xl font-bold tracking-tight shadow-lg shadow-red-200">
              <PhoneCall className="h-4 w-4" /> Dispatch Unit
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Live Map / View Area */}
         <Card className="lg:col-span-2 enterprise-card overflow-hidden">
            <CardHeader className="bg-slate-900 text-white p-6 border-none">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <Navigation className="h-5 w-5 text-teal-400" />
                     <CardTitle className="text-lg">Fleet Live Monitor</CardTitle>
                  </div>
                  <Badge className="bg-teal-500 text-white border-0">Live Telemetry</Badge>
               </div>
            </CardHeader>
            <CardContent className="p-0 relative bg-muted/30 h-[500px] flex items-center justify-center border-t overflow-hidden">
               {/* Mock Map Background - CSS Pattern instead of broken URL */}
               <div className="absolute inset-0 opacity-10 pointer-events-none bg-mesh" />
               <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
               
               {/* Static Map Markers for Demo */}
               <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                  <div className="w-full h-full border-4 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                     <MapPin className="h-10 w-10 text-red-500 mb-4 animate-bounce" />
                     <p className="font-bold text-muted-foreground dark:text-slate-300">Intelligent Geo-Fencing Active</p>
                     <p className="text-xs text-muted-foreground mt-1 text-center max-w-xs">Connecting to hospital GPS network... Real-time vehicle coordinates rendered via WebSocket.</p>
                     <div className="mt-8 flex gap-4">
                        <FleetStats label="Fleet Active" value="85%" color="teal" />
                        <FleetStats label="Resp. Time" value="7.2m" color="red" />
                        <FleetStats label="Fuel Avg" value="92%" color="blue" />
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>

         <div className="space-y-4">
            <Card className="enterprise-card">
               <CardHeader className="pb-4 border-b">
                  <CardTitle className="text-base">Quick Status List</CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="divide-y divide-border">
                     {ambulanceFleet.map((amb) => (
                        <div key={amb.id} className="p-4 hover:bg-muted/30 transition-colors flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                                 amb.status === 'On Mission' ? 'bg-orange-500/10 text-orange-600' :
                                 amb.status === 'Standby' ? 'bg-emerald-500/10 text-emerald-600' :
                                 amb.status === 'En Route' ? 'bg-blue-500/10 text-blue-600' : 'bg-slate-200 text-slate-500'
                              }`}>
                                 <Truck className="h-5 w-5" />
                              </div>
                              <div>
                                 <p className="text-sm font-bold">{amb.id}</p>
                                 <p className="text-[10px] text-muted-foreground">{amb.type}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <Badge variant="outline" className={`text-[10px] ${
                                 amb.status === 'On Mission' ? 'text-orange-600 border-orange-200' :
                                 amb.status === 'Standby' ? 'text-emerald-600 border-emerald-200' :
                                 amb.status === 'En Route' ? 'text-blue-600 border-blue-200' : 'text-slate-500'
                              }`}>
                                 {amb.status}
                              </Badge>
                              {amb.eta !== '-' && (
                                 <p className="text-[10px] font-bold text-slate-500 mt-1 flex items-center justify-end gap-1">
                                    <Clock className="h-2.5 w-2.5" /> ETA: {amb.eta}
                                 </p>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>

            <Card className="enterprise-card bg-slate-900 border-none">
               <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-red-400">
                     <AlertCircle className="h-5 w-5" />
                     <h4 className="font-bold text-white uppercase text-xs tracking-widest">Emergency Broadcast</h4>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Incoming Trauma #TR-9921</span>
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                           <Activity className="h-6 w-6 text-red-400" />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-slate-100">Multiple Vehicle Collision</p>
                           <p className="text-[10px] text-slate-400">Interstate 80 East, Exit 24</p>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-2 pt-2">
                        <Button size="sm" variant="outline" className="text-[10px] bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800">Assign AMB-105</Button>
                        <Button size="sm" className="text-[10px] bg-red-600 hover:bg-red-700">Open Session</Button>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {[
           { label: 'Avg Dispatch Time', value: '42s', icon: Siren },
           { label: 'Active Missions', value: '3', icon: Activity },
           { label: 'Available Units', value: '5', icon: Truck },
           { label: 'Incident Radius', value: '14km', icon: MapPin },
         ].map((stat, i) => (
            <Card key={i} className="enterprise-card">
               <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                     <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-tight">{stat.label}</p>
                     <p className="text-xl font-bold">{stat.value}</p>
                  </div>
               </CardContent>
            </Card>
         ))}
      </div>
    </div>
  )
}

function FleetStats({ label, value, color }: any) {
   const colors = {
      teal: 'text-teal-500',
      red: 'text-red-500',
      blue: 'text-blue-500'
   }
   return (
      <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-border min-w-[100px]">
         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono mb-1">{label}</p>
         <p className={`text-2xl font-bold ${colors[color as keyof typeof colors]}`}>{value}</p>
      </div>
   )
}
