"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ShieldAlert, 
  History, 
  Eye, 
  Lock, 
  Activity,
  AlertCircle,
  CheckCircle2,
  AlertTriangle
} from "lucide-react"

const auditLogs = [
  { id: 'LOG-8821', user: 'Dr. Sarah Wilson', action: 'Accessed Patient Record', target: 'John Doe (P001)', time: '2 mins ago', severity: 'low', type: 'Access' },
  { id: 'LOG-8820', user: 'Admin System', action: 'Failed Login Attempt', target: 'IP 192.168.1.45', time: '15 mins ago', severity: 'high', type: 'Security' },
  { id: 'LOG-8819', user: 'HR Manager', action: 'Updated Staff Role', target: 'Mike Chen', time: '1 hr ago', severity: 'medium', type: 'Config' },
  { id: 'LOG-8818', user: 'Dr. John Smith', action: 'Generated Prescription', target: 'Jane Smith (P002)', time: '2 hrs ago', severity: 'low', type: 'Action' },
  { id: 'LOG-8817', user: 'Billing Officer', action: 'Refund Processed', target: 'INV-9921', time: '4 hrs ago', severity: 'medium', type: 'Finance' },
  { id: 'LOG-8816', user: 'System', action: 'Database Backup Completed', target: 'Cloud Storage', time: '12 hrs ago', severity: 'low', type: 'System' },
]

export default function SecurityAuditLogs() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-bold tracking-tight">Security & Compliance</h2>
            <p className="text-sm text-muted-foreground">HIPAA compliant audit trails and system activity monitoring</p>
         </div>
         <div className="flex gap-2">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">HIPAA Ready</Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">FHIR v4.0</Badge>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="enterprise-card">
           <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xs font-medium text-muted-foreground">Failed Logins (24h)</CardTitle>
              <Lock className="h-4 w-4 text-red-500" />
           </CardHeader>
           <CardContent className="py-2">
              <div className="text-2xl font-bold">14</div>
              <p className="text-[10px] text-red-500 mt-1">4 flagged as brute-force</p>
           </CardContent>
        </Card>
        <Card className="enterprise-card">
           <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xs font-medium text-muted-foreground">Sensitive Access</CardTitle>
              <Eye className="h-4 w-4 text-blue-500" />
           </CardHeader>
           <CardContent className="py-2">
              <div className="text-2xl font-bold">482</div>
              <p className="text-[10px] text-green-500 mt-1">All verified within role</p>
           </CardContent>
        </Card>
        <Card className="enterprise-card">
           <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xs font-medium text-muted-foreground">System Health</CardTitle>
              <Activity className="h-4 w-4 text-emerald-500" />
           </CardHeader>
           <CardContent className="py-2">
              <div className="text-2xl font-bold">99.98%</div>
              <p className="text-[10px] text-green-500 mt-1">Next maintenance: Oct 20</p>
           </CardContent>
        </Card>
      </div>

      <Card className="enterprise-card">
        <CardHeader>
           <CardTitle>Global Audit Trail</CardTitle>
           <CardDescription>Comprehensive log of all significant system events</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="space-y-1">
              <div className="grid grid-cols-6 gap-4 py-2 px-4 text-xs font-bold text-muted-foreground border-b uppercase tracking-wider">
                 <div className="col-span-1">ID</div>
                 <div className="col-span-1">User</div>
                 <div className="col-span-1">Event</div>
                 <div className="col-span-1">Target</div>
                 <div className="col-span-1">Timestamp</div>
                 <div className="col-span-1 text-right">Severity</div>
              </div>
              {auditLogs.map((log) => (
                <div key={log.id} className="grid grid-cols-6 gap-4 py-3 px-4 text-sm border-b border-muted/50 hover:bg-muted/20 transition-colors items-center">
                   <div className="font-mono text-[11px] text-muted-foreground">{log.id}</div>
                   <div className="font-medium">{log.user}</div>
                   <div>
                      <Badge variant="secondary" className="text-[10px] font-normal">{log.type}</Badge>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{log.action}</p>
                   </div>
                   <div className="text-xs">{log.target}</div>
                   <div className="text-xs text-muted-foreground">{log.time}</div>
                   <div className="text-right">
                      {log.severity === 'high' && <Badge variant="destructive" className="animate-pulse">High</Badge>}
                      {log.severity === 'medium' && <Badge className="bg-orange-500/10 text-orange-600 border-orange-200">Medium</Badge>}
                      {log.severity === 'low' && <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">Low</Badge>}
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-4 flex justify-center">
              <button className="text-xs text-primary hover:underline font-medium">Export Compliance Report (PDF)</button>
           </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="enterprise-card bg-slate-900 text-slate-100 border-slate-800">
            <CardHeader>
               <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-red-500" />
                  <CardTitle className="text-lg">Security Incidents</CardTitle>
               </div>
            </CardHeader>
            <CardContent>
               <div className="flex items-center gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                  <div>
                     <p className="text-sm font-bold">Unrecognized Login from Sofia, BG</p>
                     <p className="text-xs text-red-100/60">Source IP: 185.12.34.56 • Attempted at 14:22 UTC</p>
                  </div>
                  <button className="ml-auto text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600">Investigate</button>
               </div>
            </CardContent>
         </Card>

         <Card className="enterprise-card">
            <CardHeader>
               <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <CardTitle className="text-lg">Compliance Health</CardTitle>
               </div>
            </CardHeader>
            <CardContent>
               <div className="space-y-3">
                  <ComplianceItem label="Data Encryption (at rest)" status="Healthy" value="AES-256" />
                  <ComplianceItem label="Multi-factor Authentication" status="Configured" value="88% adoption" />
                  <ComplianceItem label="PHI Access Controls" status="Verified" value="Role-Based" />
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  )
}

function ComplianceItem({ label, status, value }: any) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
       <div>
          <p className="text-xs font-bold">{label}</p>
          <p className="text-[10px] text-muted-foreground">{value}</p>
       </div>
       <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 text-[10px]">{status}</Badge>
    </div>
  )
}
