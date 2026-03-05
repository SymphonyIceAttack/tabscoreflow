'use client'

import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tuner } from "@/components/tools/tuner"
import { Metronome } from "@/components/tools/metronome"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Guitar, Timer } from "lucide-react"

export default function ToolsPage() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get('tab') || 'tuner'

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">练习工具</h1>
            <p className="text-muted-foreground">
              调音器、节拍器等吉他练习必备工具
            </p>
          </div>
          
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="tuner" className="flex items-center gap-2">
                <Guitar className="h-4 w-4" />
                调音器
              </TabsTrigger>
              <TabsTrigger value="metronome" className="flex items-center gap-2">
                <Timer className="h-4 w-4" />
                节拍器
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tuner">
              <Tuner />
            </TabsContent>
            
            <TabsContent value="metronome">
              <Metronome />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
