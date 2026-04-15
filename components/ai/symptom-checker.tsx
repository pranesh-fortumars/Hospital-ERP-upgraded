"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Sparkles, 
  Search, 
  Stethoscope, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  BrainCircuit
} from "lucide-react"

const symptomsList = [
  "Headache", "Fever", "Cough", "Dizziness", "Fatigue", "Nausea", "Shortness of breath", "Chest pain", "Muscle ache"
]

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [query, setQuery] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const toggleSymptom = (s: string) => {
    if (selectedSymptoms.includes(s)) {
      setSelectedSymptoms(selectedSymptoms.filter(i => i !== s))
    } else {
      setSelectedSymptoms([...selectedSymptoms, s])
    }
  }

  const analyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setResult({
        prediction: "Mild Respiratory Infection",
        confidence: "82%",
        recommendation: "Book a consultation with a General Physician. Stay hydrated and monitor temperature.",
        doctor: "Dr. Sarah Wilson (General Medicine)",
        urgency: "Moderate"
      })
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-2">
            <BrainCircuit className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">AI Diagnostics Assist</span>
         </div>
         <h1 className="text-3xl font-bold tracking-tight">How are you feeling today?</h1>
         <p className="text-muted-foreground">Select your symptoms for an AI-powered preliminary assessment and doctor routing.</p>
      </div>

      {!result ? (
        <Card className="glass-card">
          <CardHeader>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                   placeholder="Search symptoms (e.g. headache, fever...)" 
                   className="pl-10 h-12 bg-background/50 border-primary/20 focus-visible:ring-primary"
                   value={query}
                   onChange={(e) => setQuery(e.target.value)}
                />
             </div>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="flex flex-wrap gap-2">
               {symptomsList.filter(s => s.toLowerCase().includes(query.toLowerCase())).map(s => (
                 <button
                   key={s}
                   onClick={() => toggleSymptom(s)}
                   className={`px-4 py-2 rounded-full text-sm transition-all ${
                     selectedSymptoms.includes(s)
                       ? 'bg-primary text-white shadow-lg shadow-primary/30'
                       : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                   }`}
                 >
                   {s}
                 </button>
               ))}
             </div>

             <div className="pt-4 flex flex-col items-center">
                <Button 
                  size="lg" 
                  disabled={selectedSymptoms.length === 0 || isAnalyzing}
                  onClick={analyze}
                  className="w-full md:w-auto px-12 h-14 rounded-2xl gap-2 text-lg shadow-xl shadow-primary/20"
                >
                   {isAnalyzing ? (
                     <>
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        AI Analysis in progress...
                     </>
                   ) : (
                     <>
                        Run AI Assessment
                        <ArrowRight className="h-5 w-5" />
                     </>
                   )}
                </Button>
                <p className="mt-4 text-[10px] text-muted-foreground max-w-sm text-center">
                  * This is an AI assessment tool and not a medical diagnosis. In case of emergency, please contact your nearest hospital immediately.
                </p>
             </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="overflow-hidden border-primary/30 shadow-2xl">
             <div className="bg-primary/10 p-6 border-b border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
                      <Sparkles className="h-6 w-6" />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold">Assessment Result</h3>
                      <p className="text-xs text-primary/70">Analysis complete with {result.confidence} confidence</p>
                   </div>
                </div>
                <Badge className="bg-orange-500 hover:bg-orange-600 border-0">{result.urgency} Urgency</Badge>
             </div>
             <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <div>
                         <Label className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest">Potential Condition</Label>
                         <p className="text-2xl font-bold text-gray-900 mt-1">{result.prediction}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30 border border-border">
                         <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm font-bold">Recommended Actions</span>
                         </div>
                         <p className="text-sm leading-relaxed text-gray-700">{result.recommendation}</p>
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                         <Stethoscope className="h-8 w-8 text-primary mb-4" />
                         <h4 className="font-bold">Suggested Routing</h4>
                         <p className="text-sm text-muted-foreground mb-4">Based on your symptoms, we recommend speaking with a specialist.</p>
                         <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-border">
                            <div className="h-10 w-10 rounded-full bg-teal-500/10 flex items-center justify-center">
                               <CheckCircle2 className="h-6 w-6 text-teal-600" />
                            </div>
                            <div className="flex-1">
                               <p className="text-xs font-bold">{result.doctor}</p>
                               <p className="text-[10px] text-muted-foreground">Available today: 04:00 PM</p>
                            </div>
                         </div>
                         <Button className="w-full mt-4 rounded-xl">Book Instant Appointment</Button>
                      </div>
                   </div>
                </div>
                
                <button 
                  onClick={() => setResult(null)} 
                  className="mt-6 text-sm text-primary hover:underline font-medium flex items-center gap-2 mx-auto"
                >
                   Restart Assessment
                </button>
             </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
