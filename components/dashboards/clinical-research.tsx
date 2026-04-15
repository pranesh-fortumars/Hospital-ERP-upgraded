"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Beaker, 
  Users, 
  Search, 
  FileText, 
  ShieldCheck, 
  Calendar,
  Microscope,
  Info,
  ExternalLink
} from "lucide-react"

const researchStudies = [
  { id: 'STUDY-442', title: 'Phase III: Cardiovascular Gene Therapy', status: 'Recruiting', progress: 65, participants: '240/350', risk: 'Low' },
  { id: 'STUDY-821', title: 'Long-term Effects of mRNA COVID-19 Proxies', status: 'Observation', progress: 88, participants: '1200/1200', risk: 'None' },
  { id: 'STUDY-331', title: 'Phase II: Oncology Targeted Immuno-therapy', status: 'Active', progress: 32, participants: '45/140', risk: 'Moderate' },
]

export default function ClinicalResearch() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-bold tracking-tight">Clinical Research & Trials</h2>
           <p className="text-sm text-muted-foreground">Managing study cohorts, participant compliance, and clinical research data assets.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" /> Ethics Board Portal
           </Button>
           <Button className="gap-2 bg-primary text-white hover:bg-primary/90">
              <Beaker className="h-4 w-4" /> Launch New Study
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {[
           { label: 'Total active studies', value: '14', icon: Beaker },
           { label: 'Participants enrolled', value: '2,840', icon: Users },
           { label: 'Data points collected', value: '1.2M', icon: Microscope },
           { label: 'Compliance Index', value: '99.8%', icon: ShieldCheck },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card className="enterprise-card">
            <CardHeader className="flex flex-row items-center justify-between">
               <div>
                  <CardTitle>Global Study Portfolio</CardTitle>
                  <CardDescription>Multi-wing clinical investigations and progress tracking.</CardDescription>
               </div>
               <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                  <input placeholder="Search Studies..." className="pl-7 pr-3 py-1.5 text-xs bg-muted/50 rounded-lg outline-none focus:ring-1 ring-primary/30" />
               </div>
            </CardHeader>
            <CardContent className="space-y-4">
               {researchStudies.map((study) => (
                 <div key={study.id} className="p-4 rounded-2xl bg-muted/30 border border-border space-y-3">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] font-mono">{study.id}</Badge>
                          <h4 className="font-bold text-sm tracking-tight">{study.title}</h4>
                       </div>
                       <Badge className={`${
                          study.status === 'Recruiting' ? 'bg-blue-500' :
                          study.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-500'
                       } text-white border-0`}>{study.status}</Badge>
                    </div>
                    
                    <div className="space-y-1.5">
                       <div className="flex justify-between text-[10px] font-bold">
                          <span className="text-muted-foreground">Study Progress</span>
                          <span className="text-primary">{study.progress}%</span>
                       </div>
                       <Progress value={study.progress} className="h-1.5" />
                    </div>

                    <div className="flex justify-between items-center text-[10px]">
                       <div className="flex gap-4">
                          <span className="flex items-center gap-1 text-muted-foreground"><Users className="h-3 w-3" /> {study.participants}</span>
                          <span className="flex items-center gap-1 text-muted-foreground"><ShieldCheck className="h-3 w-3" /> {study.risk} Risk</span>
                       </div>
                       <Button variant="ghost" size="sm" className="h-6 text-[10px] font-bold p-0 flex items-center gap-1 hover:bg-transparent text-primary hover:text-primary/70">
                          Manage <ExternalLink className="h-2.5 w-2.5" />
                       </Button>
                    </div>
                 </div>
               ))}
               <Button variant="outline" className="w-full text-xs font-bold py-5 border-dashed border-primary/20 text-primary bg-primary/5 hover:bg-primary/10">View Research Archive (124+ Studies)</Button>
            </CardContent>
         </Card>

         <div className="space-y-6">
            <Card className="enterprise-card">
               <CardHeader>
                  <CardTitle>Next Milestones</CardTitle>
                  <CardDescription>Actionable events for research coordinators.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  {[
                    { event: 'Interim Safety Analysis', study: 'STUDY-331', date: 'Tomorrow, 09:00 AM', priority: 'High' },
                    { event: 'Cohort Enrollment Deadline', study: 'STUDY-442', date: 'Oct 20, 2024', priority: 'Medium' },
                    { event: 'Clinical Data Freeze', study: 'STUDY-821', date: 'Oct 25, 2024', priority: 'Critical' },
                  ].map((milestone, i) => (
                    <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors">
                       <div className="h-10 w-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                          <Calendar className="h-5 w-5" />
                       </div>
                       <div className="flex-1">
                          <div className="flex items-center justify-between">
                             <p className="text-sm font-bold">{milestone.event}</p>
                             <Badge variant="outline" className={`text-[10px] ${
                                milestone.priority === 'Critical' ? 'border-red-500 text-red-600 bg-red-50' :
                                milestone.priority === 'High' ? 'border-orange-500 text-orange-600 bg-orange-50' : ''
                             }`}>{milestone.priority}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{milestone.study} • {milestone.date}</p>
                       </div>
                    </div>
                  ))}
               </CardContent>
            </Card>

            <Card className="enterprise-card bg-slate-900 border-none relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Microscope className="h-24 w-24 text-white" />
               </div>
               <CardContent className="p-8 space-y-4 relative z-10">
                  <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white mb-6 shadow-xl shadow-primary/30">
                     <ShieldCheck className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Advanced IRB Compliance</h3>
                  <p className="text-sm text-slate-400">Your institution is currently 99.8% compliant with Institutional Review Board (IRB) and HIPAA research standards.</p>
                  <div className="pt-4">
                     <Button className="w-full bg-white text-slate-900 hover:bg-slate-200 rounded-xl font-bold">Download Compliance Report</Button>
                     <p className="text-[10px] text-slate-500 text-center mt-3">Next audit scheduled for Dec 15, 2024</p>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  )
}
