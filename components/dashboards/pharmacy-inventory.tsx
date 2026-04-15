"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Pill, 
  Search, 
  AlertTriangle, 
  ArrowUpRight, 
  Box, 
  History,
  TrendingUp,
  Clock,
  MoreVertical
} from "lucide-react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts'

const stockData = [
  { name: 'Antibiotics', amount: 450, status: 'In Stock' },
  { name: 'Analgesics', amount: 320, status: 'Low Stock' },
  { name: 'Insulin', amount: 150, status: 'Critical' },
  { name: 'Vitamins', amount: 600, status: 'Overstock' },
  { name: 'Antivirals', amount: 280, status: 'In Stock' },
]

const recentTransactions = [
  { id: 'TX-4401', drug: 'Amoxicillin 500mg', quantity: -20, date: '10 mins ago', user: 'Pharm. Jane S.' },
  { id: 'TX-4402', drug: 'Insulin Glargine', quantity: +50, date: '1 hour ago', user: 'Admin' },
  { id: 'TX-4403', drug: 'Paracetamol 650mg', quantity: -100, date: '2 hours ago', user: 'Pharm. Mike D.' },
]

export default function PharmacyInventory() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-bold tracking-tight">Pharmacy Enterprise Inventory</h2>
           <p className="text-sm text-muted-foreground">Automated drug tracking, shelf-life alerts, and procurement intelligence.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2">
              <History className="h-4 w-4" /> Transactions
           </Button>
           <Button className="gap-2 bg-primary text-white hover:bg-primary/90">
              <Pill className="h-4 w-4" /> Register New Drug
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <Card className="enterprise-card">
            <CardHeader className="pb-2">
               <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Total Inventory Value</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">$124,500.00</div>
               <div className="flex items-center gap-1 text-green-500 text-[10px] mt-1">
                  <TrendingUp className="h-3 w-3" /> +12% from last month
               </div>
            </CardContent>
         </Card>
         <Card className="enterprise-card">
            <CardHeader className="pb-2">
               <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Expiring Soon (30 days)</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold text-orange-500">14 Items</div>
               <div className="flex items-center gap-1 text-orange-500 text-[10px] mt-1 font-bold">
                  <AlertTriangle className="h-3 w-3" /> Action required
               </div>
            </CardContent>
         </Card>
         <Card className="enterprise-card">
            <CardHeader className="pb-2">
               <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Pending Procurement</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold text-blue-500">8 Orders</div>
               <div className="text-[10px] text-muted-foreground mt-1">Next delivery expected: Tomorrow</div>
            </CardContent>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="lg:col-span-2 enterprise-card">
            <CardHeader className="flex flex-row items-center justify-between">
               <div>
                  <CardTitle>Inventory levels by Category</CardTitle>
                  <CardDescription>Visualizing stock counts for decision support.</CardDescription>
               </div>
               <SelectCategory />
            </CardHeader>
            <CardContent>
               <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={stockData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                        <Tooltip 
                           cursor={{fill: 'var(--primary)', opacity: 0.1}}
                           contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                           {stockData.map((entry, index) => (
                              <Cell 
                                 key={`cell-${index}`} 
                                 fill={entry.status === 'Critical' ? '#ef4444' : entry.status === 'Low Stock' ? '#f97316' : 'var(--primary)'} 
                              />
                           ))}
                        </Bar>
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </CardContent>
         </Card>

         <Card className="enterprise-card">
            <CardHeader>
               <CardTitle>Critical Stock Alerts</CardTitle>
               <CardDescription>Items below threshold or near expiry.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {[
                 { name: 'Insulin Glargine', type: 'Diabetes', stock: '12 units', threshold: '50 units', status: 'critical' },
                 { name: 'Epinephrine 1:1000', type: 'Emergency', stock: '5 units', threshold: '20 units', status: 'critical' },
                 { name: 'Metformin 500mg', type: 'Diabetes', stock: '85 units', threshold: '100 units', status: 'warning' },
               ].map((item, i) => (
                 <div key={i} className="p-3 rounded-xl bg-muted/30 border border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${item.status === 'critical' ? 'bg-red-500/10 text-red-600' : 'bg-orange-500/10 text-orange-600'}`}>
                          <AlertTriangle className="h-4 w-4" />
                       </div>
                       <div>
                          <p className="text-sm font-bold">{item.name}</p>
                          <p className="text-[10px] text-muted-foreground">{item.type} • Stock: {item.stock}</p>
                       </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                       <ArrowUpRight className="h-4 w-4" />
                    </Button>
                 </div>
               ))}
               <Button variant="outline" className="w-full text-xs font-bold border-primary/20 text-primary">View Full Procurement List</Button>
            </CardContent>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card className="enterprise-card">
            <CardHeader className="flex flex-row items-center justify-between">
               <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Global ledger activity across all hospital wings.</CardDescription>
               </div>
               <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors">
                       <div className={`h-10 w-10 rounded-full flex items-center justify-center ${tx.quantity < 0 ? 'bg-red-500/10 text-red-600' : 'bg-green-500/10 text-green-600'}`}>
                          {tx.quantity < 0 ? <Box className="h-5 w-5 rotate-180" /> : <Box className="h-5 w-5" />}
                       </div>
                       <div className="flex-1">
                          <div className="flex items-center justify-between">
                             <p className="text-sm font-bold text-foreground dark:text-gray-100">{tx.drug}</p>
                             <span className={`text-sm font-bold ${tx.quantity < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                {tx.quantity > 0 ? '+' : ''}{tx.quantity}
                             </span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                             <p className="text-[10px] text-muted-foreground">ID: {tx.id} • User: {tx.user}</p>
                             <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                <Clock className="h-3 w-3" /> {tx.date}
                             </div>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         <Card className="enterprise-card">
            <CardHeader>
               <CardTitle>Search & Distribution</CardTitle>
               <CardDescription>Look up drugs or manage batch distribution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Enter drug name, generic name or batch ID..." className="pl-10 h-12 rounded-xl bg-background/50" />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-center space-y-2">
                     <p className="text-xs font-bold text-primary">Active Batches</p>
                     <p className="text-2xl font-bold">142</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-teal-500/5 border border-teal-200 text-center space-y-2">
                     <p className="text-xs font-bold text-teal-600">Dispensed (24h)</p>
                     <p className="text-2xl font-bold">894</p>
                  </div>
               </div>

               <div className="border-t pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                     <Button variant="secondary" className="justify-start gap-2 h-10 px-3 rounded-lg text-xs">
                        <Box className="h-3.5 w-3.5" /> Re-stock All
                     </Button>
                     <Button variant="secondary" className="justify-start gap-2 h-10 px-3 rounded-lg text-xs">
                        <TrendingUp className="h-3.5 w-3.5" /> Analytics
                     </Button>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  )
}

function SelectCategory() {
   return (
      <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
         <button className="px-3 py-1 text-[10px] font-bold bg-white dark:bg-slate-900 rounded-md shadow-sm">All</button>
         <button className="px-3 py-1 text-[10px] font-bold text-muted-foreground hover:text-foreground">Tablets</button>
         <button className="px-3 py-1 text-[10px] font-bold text-muted-foreground hover:text-foreground">Injections</button>
      </div>
   )
}
