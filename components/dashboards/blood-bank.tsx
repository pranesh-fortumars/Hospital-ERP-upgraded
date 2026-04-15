"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Droplets, 
  Search, 
  History, 
  AlertCircle, 
  Users, 
  Plus,
  Thermometer,
  Clock,
  ArrowRightCircle
} from "lucide-react"

const inventory = [
  { group: 'O+', units: 42, status: 'Optimal', tendency: 'falling' },
  { group: 'O-', units: 12, status: 'Critical', tendency: 'falling' },
  { group: 'A+', units: 28, status: 'Normal', tendency: 'stable' },
  { group: 'B+', units: 31, status: 'Normal', tendency: 'rising' },
  { group: 'AB-', units: 4, status: 'Emergency', tendency: 'stable' },
]

export default function BloodBank() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-bold tracking-tight">Blood Bank & Serology</h2>
           <p className="text-sm text-muted-foreground">Inventory tracking, donor registry, and cold-chain compliance monitoring.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2 border-red-200 text-red-600 hover:bg-red-50">
              <History className="h-4 w-4" /> Cross-match History
           </Button>
           <Button className="gap-2 bg-red-600 text-white hover:bg-red-700">
              <Plus className="h-4 w-4" /> Register Donation
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
         {inventory.map((item) => (
            <Card key={item.group} className="glass-card relative overflow-hidden group">
               <div className={`absolute top-0 right-0 w-16 h-16 opacity-5 -mr-4 -mt-4 transition-transform group-hover:scale-110`}>
                  <Droplets className="w-full h-full" />
               </div>
               <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                     <span className="text-2xl font-black text-slate-800 dark:text-white">{item.group}</span>
                     <Badge variant={item.status === 'Critical' || item.status === 'Emergency' ? 'destructive' : 'outline'} className="text-[10px] py-0">
                        {item.status}
                     </Badge>
                  </div>
                  <div className="flex items-baseline gap-1">
                     <span className="text-3xl font-bold">{item.units}</span>
                     <span className="text-[10px] text-muted-foreground">units</span>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full mt-2 overflow-hidden">
                     <div className={`h-full ${
                        item.status === 'Critical' || item.status === 'Emergency' ? 'bg-red-500' : 'bg-emerald-500'
                     }`} style={{ width: `${(item.units / 50) * 100}%` }} />
                  </div>
               </CardContent>
            </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="lg:col-span-2 glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
               <div>
                  <CardTitle>Recent Cross-match Requests</CardTitle>
                  <CardDescription>Urgent and scheduled serological requests for surgical units.</CardDescription>
               </div>
               <Button variant="ghost" size="sm" className="text-xs font-bold text-primary">View Queue (8)</Button>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-border">
                  {[
                    { id: 'REQ-101', patient: 'Lara Croft', blood: 'O-', source: 'ER - Trauma A', priority: 'Immediate', time: '5m ago' },
                    { id: 'REQ-102', patient: 'Bruce Wayne', blood: 'B+', source: 'OT-04 Surgery', priority: 'Schedule', time: '1h ago' },
                    { id: 'REQ-103', patient: 'Diana Prince', blood: 'A+', source: 'ICU-B Ward', priority: 'Urgent', time: '2h ago' },
                  ].map((req) => (
                    <div key={req.id} className="p-4 hover:bg-muted/30 transition-colors flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
                             req.priority === 'Immediate' ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'bg-muted text-muted-foreground'
                          }`}>
                             {req.blood}
                          </div>
                          <div>
                             <p className="text-sm font-bold">{req.patient}</p>
                             <p className="text-[10px] text-muted-foreground">{req.id} • {req.source}</p>
                          </div>
                       </div>
                       <div className="text-right flex items-center gap-6">
                          <div>
                             <p className={`text-[10px] font-bold ${req.priority === 'Immediate' ? 'text-red-600' : 'text-slate-500'}`}>{req.priority}</p>
                             <p className="text-[10px] text-muted-foreground">{req.time}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowRightCircle className="h-4 w-4 text-primary" /></Button>
                       </div>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         <Card className="glass-card">
            <CardHeader>
               <CardTitle>Storage Compliance</CardTitle>
               <CardDescription>Cold-chain monitoring for main bank and decentralized units.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {[
                 { unit: 'Main Bank Fridge A', temp: '4.2°C', status: 'Optimal' },
                 { unit: 'Platelet Agitator B', temp: '22.1°C', status: 'Optimal' },
                 { unit: 'Plasma Freezer C', temp: '-32.5°C', status: 'Warning' },
               ].map((c, i) => (
                 <div key={i} className="p-4 rounded-xl border border-border bg-background/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Thermometer className={`h-5 w-5 ${c.status === 'Warning' ? 'text-orange-500' : 'text-emerald-500'}`} />
                       <div>
                          <p className="text-xs font-bold">{c.unit}</p>
                          <p className="text-[10px] text-muted-foreground">Range: 2°C - 6°C</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className={`text-sm font-bold ${c.status === 'Warning' ? 'text-orange-500' : 'text-emerald-500'}`}>{c.temp}</p>
                       <p className="text-[10px] text-muted-foreground">{c.status}</p>
                    </div>
                 </div>
               ))}
               
               <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4 mt-4">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-400">
                     <span>Donor Campaign</span>
                     <Badge className="bg-red-500 text-white">Live</Badge>
                  </div>
                  <h4 className="text-lg font-bold">"Save a Life" Drive</h4>
                  <div className="flex items-center gap-3">
                     <Users className="h-8 w-8 text-red-500" />
                     <div>
                        <p className="text-2xl font-bold">142</p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Registrations today</p>
                     </div>
                  </div>
                  <Button className="w-full bg-white text-slate-900 hover:bg-slate-200">View Public Landing</Button>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  )
}
