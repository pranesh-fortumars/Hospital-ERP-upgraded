"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  PhoneOff, 
  MessageSquare, 
  Users, 
  Share, 
  FileText,
  Sparkles,
  Maximize2,
  Settings
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TelemedicineConsultation({ patientName = "John Doe", onEnd }: { patientName?: string, onEnd?: () => void }) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [messages, setMessages] = useState([
    { role: "system", content: "Consultation started at " + new Date().toLocaleTimeString() },
    { role: "patient", content: "Hello Doctor, I've been feeling a bit dizzy since morning." },
  ])
  const [newMessage, setNewMessage] = useState("")

  const [aiNote, setAiNote] = useState("Analyzing patient symptoms in real-time...")

  useEffect(() => {
    const timer = setTimeout(() => {
      setAiNote("AI Suggestion: Symptoms could indicate mild dehydration or labyrinthitis. Recommended: Check BP and conduct a Romberg test.")
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const sendMessage = () => {
    if (!newMessage.trim()) return
    setMessages([...messages, { role: "doctor", content: newMessage }])
    setNewMessage("")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[700px]">
      {/* Video Stream Section */}
      <div className="lg:col-span-3 relative bg-black rounded-2xl overflow-hidden flex flex-col group">
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <Badge variant="destructive" className="animate-pulse flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-white mr-1" /> LIVE
          </Badge>
          <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20">
            00:12:45
          </Badge>
        </div>

        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button size="icon" variant="ghost" className="bg-white/10 hover:bg-white/20 text-white rounded-full">
            <Settings className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="bg-white/10 hover:bg-white/20 text-white rounded-full">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Main Video (Patient) */}
        <div className="flex-1 flex items-center justify-center relative">
          {!isVideoOff ? (
            <div className="w-full h-full bg-gradient-to-br from-teal-900/40 to-emerald-900/40 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto border-4 border-emerald-500/30 animate-pulse">
                   <Users className="h-16 w-16 text-emerald-400" />
                </div>
                <p className="mt-4 text-emerald-400 font-medium text-lg">{patientName}</p>
                <p className="text-emerald-500/60 text-sm">HD Video Connected</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-gray-500">
               <VideoOff className="h-16 w-16" />
               <p>Patient video is off</p>
            </div>
          )}
          
          {/* Self View (Doctor) */}
          <div className="absolute bottom-6 right-6 w-48 h-32 bg-gray-800 rounded-xl border-2 border-white/20 overflow-hidden shadow-2xl">
             <div className="w-full h-full bg-slate-700 flex items-center justify-center">
               <Users className="h-8 w-8 text-slate-400" />
             </div>
             <div className="absolute bottom-2 left-2 px-1 rounded bg-black/40 text-[10px] text-white">
               Dr. You (You)
             </div>
          </div>
        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMuted(!isMuted)}
            className={`rounded-full h-12 w-12 ${isMuted ? 'bg-red-500 hover:bg-red-600 text-white' : 'text-white hover:bg-white/20'}`}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`rounded-full h-12 w-12 ${isVideoOff ? 'bg-red-500 hover:bg-red-600 text-white' : 'text-white hover:bg-white/20'}`}
          >
            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full h-12 w-12">
            <Share className="h-5 w-5" />
          </Button>
          <div className="w-px h-8 bg-white/20 mx-2" />
          <Button variant="destructive" size="icon" onClick={onEnd} className="rounded-full h-14 w-14 shadow-lg shadow-red-500/40">
            <PhoneOff className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Side Panel: Chat & AI Notes */}
      <div className="flex flex-col gap-4">
        <ScrollArea className="flex-1 rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-4">
          <div className="space-y-4">
             <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Consultation Chat</h3>
             </div>
             {messages.map((msg, i) => (
               <div key={i} className={`flex flex-col ${msg.role === 'doctor' ? 'items-end' : 'items-start'}`}>
                 <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                   msg.role === 'doctor' 
                     ? 'bg-primary text-white' 
                     : msg.role === 'system' 
                       ? 'bg-muted text-muted-foreground text-[11px] italic self-center my-2' 
                       : 'bg-secondary text-secondary-foreground'
                 }`}>
                   {msg.content}
                 </div>
               </div>
             ))}
          </div>
        </ScrollArea>

        {/* AI Assistant Panel */}
        <Card className="border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20 overflow-hidden shrink-0">
          <CardHeader className="py-3 bg-emerald-500/10 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
               <Sparkles className="h-4 w-4 " />
               <CardTitle className="text-xs font-bold uppercase tracking-wider">AI Insight Engine</CardTitle>
            </div>
            <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-600">Active</Badge>
          </CardHeader>
          <CardContent className="py-4">
             <div className="space-y-3">
               <p className="text-xs leading-relaxed text-gray-700 dark:text-gray-300">
                 {aiNote}
               </p>
               <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-[10px] px-2 bg-white/50 border-emerald-200">
                    <FileText className="h-3 w-3 mr-1" /> Generate SOAP
                  </Button>
               </div>
             </div>
          </CardContent>
        </Card>

        {/* Input area */}
        <div className="flex gap-2 p-2 rounded-xl border border-border bg-background">
          <input 
            className="flex-1 bg-transparent border-none text-sm px-2 focus:outline-none" 
            placeholder="Type message..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button size="icon" variant="ghost" onClick={sendMessage} className="h-8 w-8 text-primary">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
