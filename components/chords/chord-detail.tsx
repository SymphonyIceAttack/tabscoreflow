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
  
  // 播放和弦音符
  const playChord = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    
    const ctx = audioContextRef.current
    const now = ctx.currentTime
    
    // 根弦频率映射（开放弦）
    const openStringFreqs = [329.63, 246.94, 196.0, 146.83, 110.0, 82.41] // E4 B3 G3 D3 A2 E2
    
    chord.positions[0].frets.forEach((fret, stringIndex) => {
      if (fret === -1) return // 跳过不弹的弦
      
      // 计算实际频率
      const baseFreq = openStringFreqs[stringIndex]
      const freq = baseFreq * Math.pow(2, fret / 12)
      
      // 创建振荡器
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      osc.type = "triangle"
      osc.frequency.setValueAtTime(freq, now)
      
      // 琶音效果 - 每根弦延迟一点
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
  
  // 计算指板显示范围
  const nonZeroFrets = position.frets.filter(f => f > 0)
  const minFret = nonZeroFrets.length > 0 ? Math.min(...nonZeroFrets) : 0
  const maxFret = nonZeroFrets.length > 0 ? Math.max(...nonZeroFrets) : 3
  const startFret = minFret <= 4 ? 0 : minFret - 1
  const displayFrets = Math.max(4, maxFret - startFret + 1)
  
  return (
    <div className="space-y-6">
      {/* 和弦名称和信息 */}
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
          播放
        </Button>
      </div>
      
      {/* 和弦图 */}
      <div className="bg-muted/30 rounded-xl p-6">
        <div className="max-w-xs mx-auto">
          {/* 起始品位标记 */}
          {startFret > 0 && (
            <div className="text-right pr-2 text-sm text-muted-foreground mb-2">
              {startFret + 1} fr
            </div>
          )}
          
          {/* 指板图 */}
          <div className="relative">
            {/* 弦 */}
            <svg 
              viewBox={`0 0 150 ${displayFrets * 30 + 20}`} 
              className="w-full"
            >
              {/* 琴枕或起始品位线 */}
              <rect 
                x="15" 
                y="10" 
                width="120" 
                height={startFret === 0 ? 6 : 2}
                fill={startFret === 0 ? "currentColor" : "hsl(var(--muted-foreground))"}
                className="text-foreground"
              />
              
              {/* 品丝 */}
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
              
              {/* 弦 */}
              {[0, 1, 2, 3, 4, 5].map((string) => (
                <line
                  key={string}
                  x1={15 + string * 24}
                  y1="10"
                  x2={15 + string * 24}
                  y2={10 + displayFrets * 30 + 6}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1 + string * 0.3}
                  opacity="0.7"
                />
              ))}
              
              {/* 手指位置 */}
              {position.frets.map((fret, stringIndex) => {
                if (fret === -1) {
                  // X 标记 - 不弹
                  return (
                    <text
                      key={stringIndex}
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
                  // 空心圆 - 空弦
                  return (
                    <circle
                      key={stringIndex}
                      cx={15 + stringIndex * 24}
                      cy="3"
                      r="4"
                      fill="none"
                      stroke="hsl(var(--foreground))"
                      strokeWidth="1.5"
                    />
                  )
                }
                
                // 实心圆 - 按弦位置
                const displayFret = fret - startFret
                return (
                  <g key={stringIndex}>
                    <circle
                      cx={15 + stringIndex * 24}
                      cy={16 + displayFret * 30 - 15}
                      r="10"
                      fill="hsl(var(--primary))"
                    />
                    {position.fingers && position.fingers[stringIndex] > 0 && (
                      <text
                        x={15 + stringIndex * 24}
                        y={16 + displayFret * 30 - 11}
                        textAnchor="middle"
                        fontSize="11"
                        fill="hsl(var(--primary-foreground))"
                        fontWeight="bold"
                      >
                        {position.fingers[stringIndex]}
                      </text>
                    )}
                  </g>
                )
              })}
              
              {/* 横按标记 */}
              {position.barres?.map((barre, i) => {
                const displayFret = barre.fret - startFret
                return (
                  <rect
                    key={i}
                    x={15 + barre.fromString * 24 - 5}
                    y={16 + displayFret * 30 - 23}
                    width={(barre.toString - barre.fromString) * 24 + 10}
                    height="16"
                    rx="8"
                    fill="hsl(var(--primary))"
                    opacity="0.8"
                  />
                )
              })}
            </svg>
          </div>
        </div>
      </div>
      
      {/* 组成音 */}
      <div className="space-y-3">
        <h3 className="font-semibold flex items-center gap-2">
          <Volume2 className="h-4 w-4" />
          组成音
        </h3>
        <div className="flex flex-wrap gap-2">
          {chord.notes.map((note, i) => (
            <Badge 
              key={i} 
              variant="outline" 
              className={cn(
                "text-base px-3 py-1",
                i === 0 && "bg-primary/10 border-primary"
              )}
            >
              {note}
              {i === 0 && <span className="ml-1 text-xs opacity-60">根音</span>}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* 其他把位 */}
      {chord.positions.length > 1 && (
        <div className="space-y-3">
          <h3 className="font-semibold">其他把位</h3>
          <div className="grid grid-cols-3 gap-3">
            {chord.positions.slice(1).map((pos, i) => {
              const posMinFret = Math.min(...pos.frets.filter(f => f > 0))
              return (
                <button
                  key={i}
                  className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-center"
                >
                  <div className="text-sm font-medium">把位 {i + 2}</div>
                  <div className="text-xs text-muted-foreground">
                    第 {posMinFret} 品起
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
      
      {/* 相关和弦 */}
      {chord.relatedChords && chord.relatedChords.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold">相关和弦</h3>
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
