"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import type { Scale } from "@/lib/types"

interface ScaleFretboardProps {
  scale: Scale
  highlightRoot?: boolean
}

// 每根弦的起始音符 (标准调音)
const STRING_NOTES = ["E", "B", "G", "D", "A", "E"]
const ALL_NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

// 获取品位上的音符
function getNoteAtFret(stringIndex: number, fret: number): string {
  const stringNote = STRING_NOTES[stringIndex]
  const startIndex = ALL_NOTES.indexOf(stringNote)
  return ALL_NOTES[(startIndex + fret) % 12]
}

// 获取音符的频率
function getNoteFrequency(note: string, octave: number): number {
  const A4 = 440
  const noteIndex = ALL_NOTES.indexOf(note)
  const semitonesFromA4 = noteIndex - ALL_NOTES.indexOf("A") + (octave - 4) * 12
  return A4 * Math.pow(2, semitonesFromA4 / 12)
}

// 获取弦的八度
function getStringOctave(stringIndex: number): number {
  const octaves = [4, 3, 3, 3, 2, 2]
  return octaves[stringIndex]
}

export function ScaleFretboard({ scale, highlightRoot = true }: ScaleFretboardProps) {
  const [playingNote, setPlayingNote] = useState<string | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  
  const fretCount = 15
  
  // 播放音符
  const playNote = (note: string, stringIndex: number, fret: number) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    
    const ctx = audioContextRef.current
    const baseOctave = getStringOctave(stringIndex)
    const octaveOffset = Math.floor(fret / 12)
    const frequency = getNoteFrequency(note, baseOctave + octaveOffset)
    
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    osc.type = "triangle"
    osc.frequency.setValueAtTime(frequency, ctx.currentTime)
    
    gainNode.gain.setValueAtTime(0.4, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1)
    
    osc.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + 1)
    
    setPlayingNote(`${stringIndex}-${fret}`)
    setTimeout(() => setPlayingNote(null), 200)
  }
  
  // 检查音符是否在音阶内
  const isNoteInScale = (note: string): boolean => {
    return scale.notes.includes(note)
  }
  
  // 检查是否是根音
  const isRoot = (note: string): boolean => {
    return note === scale.root
  }
  
  // 获取音程
  const getInterval = (note: string): string => {
    const noteIndex = scale.notes.indexOf(note)
    if (noteIndex === -1) return ""
    return scale.intervals[noteIndex]
  }
  
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* 品位数字 */}
        <div className="flex mb-2 pl-10">
          {Array.from({ length: fretCount + 1 }).map((_, fret) => (
            <div
              key={fret}
              className={cn(
                "flex-1 text-center text-xs text-muted-foreground",
                [3, 5, 7, 9, 12, 15].includes(fret) && "font-medium text-foreground"
              )}
            >
              {fret}
            </div>
          ))}
        </div>
        
        {/* 指板 */}
        <div className="relative bg-gradient-to-b from-amber-900/30 to-amber-950/30 rounded-lg overflow-hidden">
          {/* 品位标记点 */}
          <div className="absolute inset-0 pointer-events-none">
            {[3, 5, 7, 9, 15].map(fret => (
              <div
                key={fret}
                className="absolute w-3 h-3 bg-muted-foreground/20 rounded-full"
                style={{
                  left: `calc(${(fret + 0.5) / (fretCount + 1) * 100}% + 20px)`,
                  top: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              />
            ))}
            {/* 12品双点 */}
            <div
              className="absolute w-3 h-3 bg-muted-foreground/20 rounded-full"
              style={{
                left: `calc(${12.5 / (fretCount + 1) * 100}% + 20px)`,
                top: "35%",
                transform: "translateX(-50%)"
              }}
            />
            <div
              className="absolute w-3 h-3 bg-muted-foreground/20 rounded-full"
              style={{
                left: `calc(${12.5 / (fretCount + 1) * 100}% + 20px)`,
                top: "65%",
                transform: "translateX(-50%)"
              }}
            />
          </div>
          
          {/* 弦和音符 */}
          {STRING_NOTES.map((_, stringIndex) => (
            <div key={stringIndex} className="flex items-center h-12">
              {/* 弦名 */}
              <div className="w-10 text-center text-sm font-medium text-muted-foreground">
                {STRING_NOTES[stringIndex]}
              </div>
              
              {/* 品位 */}
              {Array.from({ length: fretCount + 1 }).map((_, fret) => {
                const note = getNoteAtFret(stringIndex, fret)
                const inScale = isNoteInScale(note)
                const root = isRoot(note)
                const interval = getInterval(note)
                const isPlaying = playingNote === `${stringIndex}-${fret}`
                
                return (
                  <div
                    key={fret}
                    className={cn(
                      "flex-1 h-full flex items-center justify-center relative",
                      fret === 0 
                        ? "border-r-4 border-foreground/50" 
                        : "border-r border-muted-foreground/30"
                    )}
                  >
                    {/* 弦线 */}
                    <div 
                      className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-zinc-400 to-zinc-500"
                      style={{ height: `${1 + stringIndex * 0.5}px` }}
                    />
                    
                    {/* 音符圆点 */}
                    {inScale && (
                      <button
                        onClick={() => playNote(note, stringIndex, fret)}
                        className={cn(
                          "relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                          "text-xs font-bold",
                          root && highlightRoot
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                            : "bg-secondary text-secondary-foreground",
                          isPlaying && "scale-125 ring-2 ring-primary"
                        )}
                      >
                        <span className="leading-none">{note}</span>
                        {interval && (
                          <span className="absolute -bottom-4 text-[10px] text-muted-foreground">
                            {interval}
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
