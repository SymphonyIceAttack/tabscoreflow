"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Chord } from "@/lib/types"

interface ChordCardProps {
  chord: Chord
  onClick?: () => void
  isSelected?: boolean
}

export function ChordCard({ chord, onClick, isSelected }: ChordCardProps) {
  const position = chord.positions[0]
  
  // 计算显示范围
  const nonZeroFrets = position.frets.filter(f => f > 0)
  const minFret = nonZeroFrets.length > 0 ? Math.min(...nonZeroFrets) : 0
  const startFret = minFret <= 3 ? 0 : minFret - 1
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-xl text-left transition-all",
        "bg-card/50 hover:bg-card border border-border/50 hover:border-border",
        isSelected && "ring-2 ring-primary bg-card"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-bold">{chord.name}</h3>
          <p className="text-xs text-muted-foreground">{chord.fullName}</p>
        </div>
        <Badge variant="outline" className="text-xs">
          {chord.difficulty}
        </Badge>
      </div>
      
      {/* 迷你和弦图 */}
      <div className="bg-muted/30 rounded-lg p-2">
        <svg viewBox="0 0 80 70" className="w-full max-w-[120px] mx-auto">
          {/* 琴枕 */}
          <rect 
            x="10" 
            y="5" 
            width="60" 
            height={startFret === 0 ? 4 : 1.5}
            fill={startFret === 0 ? "currentColor" : "hsl(var(--muted-foreground))"}
            className="text-foreground"
          />
          
          {/* 品丝 */}
          {[1, 2, 3, 4].map(i => (
            <rect
              key={i}
              x="10"
              y={5 + i * 15}
              width="60"
              height="1"
              fill="hsl(var(--muted-foreground))"
              opacity="0.4"
            />
          ))}
          
          {/* 弦 */}
          {[0, 1, 2, 3, 4, 5].map(string => (
            <line
              key={string}
              x1={10 + string * 12}
              y1="5"
              x2={10 + string * 12}
              y2="65"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={0.8 + string * 0.15}
              opacity="0.6"
            />
          ))}
          
          {/* 手指位置 */}
          {position.frets.map((fret, stringIndex) => {
            if (fret === -1) {
              return (
                <text
                  key={stringIndex}
                  x={10 + stringIndex * 12}
                  y="3"
                  textAnchor="middle"
                  fontSize="6"
                  fill="hsl(var(--muted-foreground))"
                >
                  x
                </text>
              )
            }
            
            if (fret === 0) {
              return (
                <circle
                  key={stringIndex}
                  cx={10 + stringIndex * 12}
                  cy="2"
                  r="2"
                  fill="none"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="1"
                />
              )
            }
            
            const displayFret = fret - startFret
            return (
              <circle
                key={stringIndex}
                cx={10 + stringIndex * 12}
                cy={5 + displayFret * 15 - 7}
                r="4"
                fill="hsl(var(--primary))"
              />
            )
          })}
        </svg>
      </div>
    </button>
  )
}
