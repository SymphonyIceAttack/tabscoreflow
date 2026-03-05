"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Play, Volume2 } from "lucide-react"
import type { Chord } from "@/lib/types"

interface ChordDetailProps {
  chord: Chord
}

export function ChordDetail({ chord }: ChordDetailProps) {
  const audioContextRef = useRef<AudioContext | null>(null)
  
  // Play chord notes
  const playChord = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    
    const ctx = audioContextRef.current
    const now = ctx.currentTime
    
    // Open string frequency mapping
    const openStringFreqs = [329.63, 246.94, 196.0, 146.83, 110.0, 82.41] // E4 B3 G3 D3 A2 E2
    
    chord.positions.forEach((pos) => {
      const fret = pos.fret
      if (fret === 0) return // Skip open strings
      
      // Calculate actual frequency
      const stringIndex = 5 - (pos.string - 1) // Convert 1-6 to 5-0 index
      const baseFreq = openStringFreqs[stringIndex]
      const freq = baseFreq * Math.pow(2, fret / 12)
      
      // Create oscillator
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      osc.type = "triangle"
      osc.frequency.setValueAtTime(freq, now)
      
      // Arpeggio effect - slight delay per string
      const delay = stringIndex * 0.05
      
      gainNode.gain.setValueAtTime(0, now + delay)
      gainNode.gain.linearRampToValueAtTime(0.3, now + delay + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + delay + 2)
      
      osc.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      osc.start(now + delay)
      osc.stop(now + delay + 2)
    })
  }
  
  const position = chord.positions[0]
  
  // Calculate fretboard display range
  const nonZeroFrets = chord.positions.filter(p => p.fret > 0).map(p => p.fret)
  const minFret = nonZeroFrets.length > 0 ? Math.min(...nonZeroFrets) : 0
  const maxFret = nonZeroFrets.length > 0 ? Math.max(...nonZeroFrets) : 3
  const startFret = minFret <= 4 ? 0 : minFret - 1
  const displayFrets = Math.max(4, maxFret - startFret + 1)
  
  return (
    <div className="space-y-6">
      {/* Chord Name and Info */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold">{chord.name}</h2>
          <p className="text-muted-foreground mt-1">{chord.fullName}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="secondary">{chord.category}</Badge>
            <Badge variant="outline">{chord.difficulty}</Badge>
          </div>
        </div>
        <Button onClick={playChord} size="lg" className="gap-2">
          <Play className="h-5 w-5" />
          Play
        </Button>
      </div>
      
      {/* Chord Diagram */}
      <div className="bg-muted/30 rounded-xl p-6">
        <div className="max-w-xs mx-auto">
          {/* Starting Fret Marker */}
          {startFret > 0 && (
            <div className="text-right pr-2 text-sm text-muted-foreground mb-2">
              {startFret + 1} fr
            </div>
          )}
          
          {/* Fretboard Diagram */}
          <div className="relative">
            {/* Strings */}
            <svg 
              viewBox={`0 0 150 ${displayFrets * 30 + 20}`} 
              className="w-full"
            >
              {/* Nut or starting fret line */}
              <rect 
                x="15" 
                y="10" 
                width="120" 
                height={startFret === 0 ? 6 : 2}
                fill={startFret === 0 ? "currentColor" : "hsl(var(--muted-foreground))"}
                className="text-foreground"
              />
              
              {/* Frets */}
              {Array.from({ length: displayFrets }).map((_, i) => (
                <rect
                  key={i}
                  x="15"
                  y={16 + (i + 1) * 30}
                  width="120"
                  height="2"
                  fill="hsl(var(--muted-foreground))"
                  opacity="0.5"
                />
              ))}
              
              {/* Strings */}
              {[0, 1, 2, 3, 4, 5].map((stringIndex) => (
                <line
                  key={stringIndex}
                  x1={15 + stringIndex * 24}
                  y1="10"
                  x2={15 + stringIndex * 24}
                  y2={10 + displayFrets * 30 + 6}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1 + stringIndex * 0.3}
                  opacity="0.7"
                />
              ))}
              
              {/* Finger Positions - iterate through positions array */}
              {chord.positions.map((pos, idx) => {
                const stringIndex = 5 - (pos.string - 1) // Convert to 0-5 from right to left
                const fret = pos.fret
                
                if (fret === -1 || (chord.mutedStrings && chord.mutedStrings.includes(pos.string))) {
                  // X mark - don't play
                  return (
                    <text
                      key={idx}
                      x={15 + stringIndex * 24}
                      y="6"
                      textAnchor="middle"
                      fontSize="12"
                      fill="hsl(var(--muted-foreground))"
                    >
                      X
                    </text>
                  )
                }
                
                if (fret === 0) {
                  // Open circle - open string
                  return (
                    <circle
                      key={idx}
                      cx={15 + stringIndex * 24}
                      cy="3"
                      r="4"
                      fill="none"
                      stroke="hsl(var(--foreground))"
                      strokeWidth="1.5"
                    />
                  )
                }
                
                // Filled circle - pressed position
                const displayFret = fret - startFret
                return (
                  <g key={idx}>
                    <circle
                      cx={15 + stringIndex * 24}
                      cy={16 + displayFret * 30 - 15}
                      r="10"
                      fill="hsl(var(--primary))"
                    />
                    {pos.finger && pos.finger > 0 && (
                      <text
                        x={15 + stringIndex * 24}
                        y={16 + displayFret * 30 - 11}
                        textAnchor="middle"
                        fontSize="11"
                        fill="hsl(var(--primary-foreground))"
                        fontWeight="bold"
                      >
                        {pos.finger}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>
          </div>
        </div>
      </div>
      
      {/* Notes */}
      <div className="space-y-3">
        <h3 className="font-semibold flex items-center gap-2">
          <Volume2 className="h-4 w-4" />
          Notes
        </h3>
        <div className="flex flex-wrap gap-2">
          {chord.notes?.map((note, i) => (
            <Badge 
              key={i} 
              variant="outline" 
              className={cn(
                "text-base px-3 py-1",
                i === 0 && "bg-primary/10 border-primary"
              )}
            >
              {note}
              {i === 0 && <span className="ml-1 text-xs opacity-60">root</span>}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Related Chords */}
      {chord.relatedChords && chord.relatedChords.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold">Related Chords</h3>
          <div className="flex flex-wrap gap-2">
            {chord.relatedChords.map((related, i) => (
              <Badge key={i} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                {related}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
