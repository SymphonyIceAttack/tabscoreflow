'use client'

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tuner } from "@/components/tools/tuner"
import { Metronome } from "@/components/tools/metronome"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Guitar, Timer } from "lucide-react"

export default function ToolsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ToolsPageContent />
    </Suspense>
  )
}

function ToolsPageContent() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get('tab') || 'tuner'

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Practice Tools</h1>
            <p className="text-muted-foreground">
              Essential guitar practice tools like tuner and metronome
            </p>
          </div>
          
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="tuner" className="flex items-center gap-2">
                <Guitar className="h-4 w-4" />
                Tuner
              </TabsTrigger>
              <TabsTrigger value="metronome" className="flex items-center gap-2">
                <Timer className="h-4 w-4" />
                Metronome
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
