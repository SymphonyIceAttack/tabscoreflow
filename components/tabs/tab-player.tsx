'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TabControls } from './tab-controls'
import { Fretboard } from './fretboard'
import { ChordDiagram } from './chord-diagram'
import { usePlayerStore } from '@/lib/stores/player-store'
import { useUserStore } from '@/lib/stores/user-store'
import { chords } from '@/lib/data/chords'
import type { Tab } from '@/lib/types'
import { AlertCircle, Download, Info } from 'lucide-react'

interface TabPlayerProps {
  tab: Tab
  className?: string
}

// Sample tab notation for demo
const sampleNotation = `
|----------0--2--3--2--0-----------|
|-------3------------------3-------|
|----0-------------------------0---|
|-2--------------------------------|
|----------------------------------|
|----------------------------------|

|----------0--2--3--2--0-----------|
|-------3------------------3-------|
|----0-------------------------0---|
|-2--------------------------------|
|----------------------------------|
|----------------------------------|

|--3--3--0--3--3--0--3--3--0--1--0-|
|--3--3--1--3--3--1--3--3--1--1--1-|
|--0--0--0--0--0--0--0--0--0--2--0-|
|--0--0--2--0--0--2--0--0--2--3--2-|
|--2--2--3--2--2--3--2--2--3--3--3-|
|--3--3-----3--3-----3--3----------|
`

// Demo chord progression
const demoChords = [
  { time: 0, chord: chords.find(c => c.symbol === 'G') },
  { time: 4, chord: chords.find(c => c.symbol === 'D') },
  { time: 8, chord: chords.find(c => c.symbol === 'Em') },
  { time: 12, chord: chords.find(c => c.symbol === 'C') },
  { time: 16, chord: chords.find(c => c.symbol === 'G') },
]

// Demo fretboard notes
const demoNotes = [
  { string: 1, fret: 3, isRoot: true },
  { string: 2, fret: 3 },
  { string: 3, fret: 0 },
  { string: 4, fret: 0 },
  { string: 5, fret: 2 },
  { string: 6, fret: 3, isRoot: true },
]

export function TabPlayer({ tab, className }: TabPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [currentChordIndex, setCurrentChordIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const practiceStartRef = useRef<number | null>(null)

  const {
    isPlaying,
    currentTime,
    duration,
    speed,
    volume,
    showFretboard,
    showChordDiagrams,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    setCurrentTab,
    reset,
  } = usePlayerStore()

  const { addPracticeRecord } = useUserStore()

  // Initialize player
  useEffect(() => {
    setCurrentTab(tab.id, tab.title)
    setDuration(tab.duration)
    setIsLoaded(true)

    return () => {
      reset()
      // Record practice time on unmount
      if (practiceStartRef.current) {
        const duration = Math.floor((Date.now() - practiceStartRef.current) / 1000)
        if (duration > 10) { // Only record if practiced more than 10 seconds
          addPracticeRecord({
            tabId: tab.id,
            date: new Date().toISOString(),
            duration,
            type: 'tab',
            speed,
          })
        }
      }
    }
  }, [tab])

  // Playback simulation
  useEffect(() => {
    if (isPlaying) {
      if (!practiceStartRef.current) {
        practiceStartRef.current = Date.now()
      }

      intervalRef.current = setInterval(() => {
        setCurrentTime((prev: number) => {
          const increment = (1 / 60) * (speed / 100)
          const next = prev + increment
          if (next >= duration) {
            setIsPlaying(false)
            return duration
          }
          return next
        })
      }, 1000 / 60)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, speed, duration])

  // Update current chord based on time
  useEffect(() => {
    const chordIndex = demoChords.findIndex((c, i) => {
      const next = demoChords[i + 1]
      return currentTime >= c.time && (!next || currentTime < next.time)
    })
    if (chordIndex !== -1) {
      setCurrentChordIndex(chordIndex)
    }
  }, [currentTime])

  const currentChord = demoChords[currentChordIndex]?.chord

  const handleSeek = useCallback((time: number) => {
    setCurrentTime(time)
  }, [])

  if (!isLoaded) {
    return (
      <Card className={cn('overflow-hidden', className)}>
        <CardContent className="p-8 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-64 bg-secondary rounded-lg" />
            <div className="h-16 bg-secondary rounded-lg" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-0">
        {/* Tab notation display */}
        <div className="relative bg-secondary/30 border-b border-border">
          <div 
            ref={containerRef}
            className="p-6 overflow-x-auto"
          >
            {/* Demo notice */}
            <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-primary/10 text-sm">
              <Info className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">
                演示模式 - 实际项目中将集成 AlphaTab 库渲染真实的 Guitar Pro 曲谱
              </span>
            </div>

            {/* Tab notation */}
            <pre className="font-mono text-sm leading-relaxed text-foreground/90 whitespace-pre overflow-x-auto">
              {sampleNotation}
            </pre>

            {/* Progress indicator */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-primary transition-all duration-75 pointer-events-none"
              style={{ 
                left: `calc(${(currentTime / duration) * 100}% + 1.5rem)`,
                opacity: isPlaying ? 1 : 0.5
              }}
            />
          </div>
        </div>

        {/* Visualization section */}
        {(showFretboard || showChordDiagrams) && (
          <div className="border-b border-border p-4 bg-background">
            <div className={cn(
              'grid gap-6',
              showFretboard && showChordDiagrams ? 'lg:grid-cols-[1fr_200px]' : ''
            )}>
              {/* Fretboard */}
              {showFretboard && (
                <div className="bg-gradient-to-b from-amber-950/20 to-amber-900/10 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">当前把位</h4>
                  <Fretboard 
                    notes={demoNotes}
                    activeFrets={[3]}
                    fretCount={12}
                  />
                </div>
              )}

              {/* Chord diagram */}
              {showChordDiagrams && currentChord && (
                <div className="flex flex-col items-center justify-center bg-secondary/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">当前和弦</h4>
                  <ChordDiagram chord={currentChord} size="lg" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="p-4">
          <TabControls onSeek={handleSeek} />
        </div>

        {/* Tab info */}
        <div className="px-4 pb-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline">BPM: {tab.bpm}</Badge>
            <Badge variant="outline">调式: {tab.key}</Badge>
            <Badge variant="outline">调弦: {tab.tuning}</Badge>
            {tab.capo && <Badge variant="outline">变调夹: {tab.capo}品</Badge>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
