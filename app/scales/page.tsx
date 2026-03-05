"use client"

import { useState, useMemo, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ScaleFretboard } from "@/components/scales/scale-fretboard"
import { scales, SCALE_CATEGORIES, ROOT_NOTES } from "@/lib/data/scales"
import { cn } from "@/lib/utils"
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react"
import type { Scale, ScaleNote } from "@/lib/types"

const ALL_NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

// Transpose scale
function transposeScale(scale: Scale, newRoot: string): Scale {
  const rootIndex = ALL_NOTES.indexOf(scale.root)
  const newRootIndex = ALL_NOTES.indexOf(newRoot)
  const shift = newRootIndex - rootIndex
  
  const newNotes: ScaleNote[] = scale.notes.map(note => {
    const noteIndex = ALL_NOTES.indexOf(note.interval || '1')
    const newNote = ALL_NOTES[(noteIndex + shift + 12) % 12]
    return {
      ...note,
      fret: note.fret, // Keep fret position, update note name
    }
  })
  
  return {
    ...scale,
    id: `${scale.id}-${newRoot}`,
    name: scale.name.replace(scale.root, newRoot),
    root: newRoot,
    notes: newNotes,
  }
}

export default function ScalesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Major")
  const [selectedRoot, setSelectedRoot] = useState<string>("C")
  const [selectedScale, setSelectedScale] = useState<Scale | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(120) // BPM
  
  const audioContextRef = useRef<AudioContext | null>(null)
  const playbackRef = useRef<number | null>(null)
  
  // Filter and transpose scales based on selected root
  const availableScales = useMemo(() => {
    return scales
      .filter(s => s.type === selectedCategory)
      .map(s => transposeScale(s, selectedRoot))
  }, [selectedCategory, selectedRoot])
  
  // Current selected scale (with transposition)
  const currentScale = useMemo(() => {
    if (!selectedScale) {
      return availableScales[0] || null
    }
    // Find corresponding scale and transpose
    const baseScale = scales.find(s => s.id === selectedScale.id.split("-")[0])
    if (baseScale) {
      return transposeScale(baseScale, selectedRoot)
    }
    return selectedScale
  }, [selectedScale, selectedRoot, availableScales])
  
  // Get note frequency
  const getNoteFrequency = (note: string, octave: number = 4): number => {
    const A4 = 440
    const noteIndex = ALL_NOTES.indexOf(note)
    const semitonesFromA4 = noteIndex - ALL_NOTES.indexOf("A") + (octave - 4) * 12
    return A4 * Math.pow(2, semitonesFromA4 / 12)
  }
  
  // Play scale
  const playScale = () => {
    if (!currentScale) return
    
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    
    const ctx = audioContextRef.current
    const interval = 60 / playbackSpeed // Interval per note (seconds)
    
    setIsPlaying(true)
    
    // Play ascending scale
    const notes = [...currentScale.notes, currentScale.notes[0]] // Add octave root
    let index = 0
    
    const playNext = () => {
      if (index >= notes.length) {
        setIsPlaying(false)
        return
      }
      
      const note = notes[index]
      const octave = index === notes.length - 1 ? 5 : 4 // Last note octave higher
      const noteStr = typeof note === 'string' ? note : `string${note.string}-${note.fret}`
      const frequency = getNoteFrequency(noteStr, octave)
      
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      osc.type = "triangle"
      osc.frequency.setValueAtTime(frequency, ctx.currentTime)
      
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + interval * 0.9)
      
      osc.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      osc.start()
      osc.stop(ctx.currentTime + interval)
      
      index++
      playbackRef.current = window.setTimeout(playNext, interval * 1000)
    }
    
    playNext()
  }
  
  const stopPlayback = () => {
    if (playbackRef.current) {
      clearTimeout(playbackRef.current)
    }
    setIsPlaying(false)
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Scale Practice</h1>
          <p className="text-muted-foreground">
            Learn scale positions across the fretboard for improvisation
          </p>
        </div>
        
        {/* Selection Panel */}
        <div className="max-w-4xl mx-auto mb-8 space-y-6">
          {/* Root Note Selection */}
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Select Root Note</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {ROOT_NOTES.map(root => (
                  <button
                    type="button"
                    key={root}
                    onClick={() => setSelectedRoot(root)}
                    className={cn(
                      "w-12 h-12 rounded-lg font-bold transition-all",
                      selectedRoot === root
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-muted/50 hover:bg-muted"
                    )}
                  >
                    {root}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Scale Type Selection */}
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Scale Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2">
                {SCALE_CATEGORIES.map(category => (
                  <button
                    type="button"
                    key={category.value}
                    onClick={() => {
                      setSelectedCategory(category.value)
                      setSelectedScale(null)
                    }}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      selectedCategory === category.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 hover:bg-muted"
                    )}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              
              {/* Scales in this category */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {availableScales.map(scale => (
                  <button
                    type="button"
                    key={scale.id}
                    onClick={() => setSelectedScale(scale)}
                    className={cn(
                      "p-3 rounded-lg text-left transition-all",
                      currentScale?.id === scale.id
                        ? "bg-secondary ring-2 ring-primary"
                        : "bg-muted/30 hover:bg-muted/50"
                    )}
                  >
                    <div className="font-medium text-sm">{scale.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {scale.notes.join(" - ")}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Scale Display */}
        {currentScale && (
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Scale Info */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">{currentScale.name}</h2>
                    {currentScale.description && (
                      <p className="text-muted-foreground mt-1">{currentScale.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="secondary">{currentScale.type}</Badge>
                      <Badge variant="outline">{currentScale.notes.length} notes</Badge>
                    </div>
                  </div>
                  
                  {/* Playback Controls */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant={isPlaying ? "destructive" : "default"}
                      onClick={isPlaying ? stopPlayback : playScale}
                      className="gap-2"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-4 w-4" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          Play Scale
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* Speed Control */}
                <div className="flex items-center gap-4 mb-6 max-w-md">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground w-16">{playbackSpeed} BPM</span>
                  <Slider
                    value={[playbackSpeed]}
                    onValueChange={([v]) => setPlaybackSpeed(v)}
                    min={40}
                    max={200}
                    step={5}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setPlaybackSpeed(120)}
                    className="h-8 w-8"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Notes and Intervals */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="text-sm text-muted-foreground">Notes:</span>
                  <div className="flex flex-wrap gap-2">
                    {currentScale.notes.map((note, i) => (
                      <div key={i} className="text-center">
                        <Badge 
                          variant={i === 0 ? "default" : "secondary"}
                          className="mb-1"
                        >
                          {note.fret}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {currentScale.intervals[i]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Fretboard Diagram */}
                <ScaleFretboard scale={currentScale} highlightRoot />
              </CardContent>
            </Card>
            
            {/* Usage Tips */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Practice Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">1.</span>
                    Start at a slow tempo, make sure each note is accurate
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">2.</span>
                    Practice ascending and descending to build muscle memory
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">3.</span>
                    Try different positions to familiarize the entire fretboard
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">4.</span>
                    Practice with a metronome to maintain steady rhythm
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">5.</span>
                    Try improvising simple melodies
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
