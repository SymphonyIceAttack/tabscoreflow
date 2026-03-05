'use client'

import { cn } from '@/lib/utils'
import type { Chord } from '@/lib/types'

interface ChordDiagramProps {
  chord: Chord
  size?: 'sm' | 'md' | 'lg'
  showName?: boolean
  className?: string
}

const fingerColors = {
  1: 'bg-blue-500',
  2: 'bg-green-500',
  3: 'bg-yellow-500',
  4: 'bg-red-500',
}

export function ChordDiagram({
  chord,
  size = 'md',
  showName = true,
  className,
}: ChordDiagramProps) {
  const strings = [1, 2, 3, 4, 5, 6]
  const maxFret = Math.max(...chord.positions.map(p => p.fret), 4)
  const minFret = Math.min(...chord.positions.filter(p => p.fret > 0).map(p => p.fret), 1)
  const startFret = minFret > 4 ? minFret : 1
  const frets = Array.from({ length: 5 }, (_, i) => startFret + i)

  const sizeClasses = {
    sm: { width: 'w-24', height: 'h-28', dot: 'w-3 h-3', text: 'text-[8px]' },
    md: { width: 'w-32', height: 'h-36', dot: 'w-4 h-4', text: 'text-[10px]' },
    lg: { width: 'w-40', height: 'h-44', dot: 'w-5 h-5', text: 'text-xs' },
  }

  const s = sizeClasses[size]

  const getPositionAtString = (string: number) => {
    return chord.positions.find(p => p.string === string)
  }

  const isStringMuted = (string: number) => {
    return chord.mutedStrings?.includes(string) || false
  }

  const isStringOpen = (string: number) => {
    return chord.openStrings?.includes(string) || false
  }

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {showName && (
        <div className="text-center mb-2">
          <span className="font-bold text-lg">{chord.symbol}</span>
          <span className="text-xs text-muted-foreground ml-2">{chord.name}</span>
        </div>
      )}

      <div className={cn('relative', s.width, s.height)}>
        {/* Nut or position indicator */}
        {startFret === 1 ? (
          <div className="absolute top-4 left-0 right-0 h-1 bg-foreground rounded-full" />
        ) : (
          <div className="absolute top-4 -left-4 text-xs text-muted-foreground font-mono">
            {startFret}fr
          </div>
        )}

        {/* Barre indicator */}
        {chord.barrePosition && (
          <div
            className="absolute bg-foreground/80 rounded-full z-10"
            style={{
              top: `calc(1rem + ${((chord.barrePosition - startFret + 0.5) / 5) * 100}% - 6px)`,
              left: '0',
              right: '0',
              height: '12px',
            }}
          />
        )}

        {/* Grid */}
        <div className="absolute top-4 left-0 right-0 bottom-0">
          {/* Vertical lines (strings) */}
          {strings.map((string, i) => (
            <div
              key={`string-${string}`}
              className="absolute top-0 bottom-0 w-px bg-border"
              style={{ left: `${(i / 5) * 100}%` }}
            />
          ))}

          {/* Horizontal lines (frets) */}
          {frets.map((_, i) => (
            <div
              key={`fret-${i}`}
              className="absolute left-0 right-0 h-px bg-border"
              style={{ top: `${(i / 4) * 100}%` }}
            />
          ))}
        </div>

        {/* String indicators (muted/open) */}
        <div className="absolute top-0 left-0 right-0 h-4 flex justify-between">
          {strings.map(string => (
            <div key={string} className="flex items-center justify-center w-0">
              {isStringMuted(string) && (
                <span className="text-muted-foreground font-bold text-xs">X</span>
              )}
              {isStringOpen(string) && (
                <div className="w-2.5 h-2.5 rounded-full border border-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        {/* Finger positions */}
        <div className="absolute top-4 left-0 right-0 bottom-0">
          {chord.positions
            .filter(pos => pos.fret > 0 && pos.fret >= startFret)
            .map((pos, i) => (
              <div
                key={i}
                className={cn(
                  'absolute rounded-full flex items-center justify-center',
                  s.dot,
                  pos.finger ? fingerColors[pos.finger] : 'bg-foreground',
                  'text-white font-bold',
                  s.text,
                  '-translate-x-1/2 -translate-y-1/2'
                )}
                style={{
                  left: `${((pos.string - 1) / 5) * 100}%`,
                  top: `${((pos.fret - startFret + 0.5) / 5) * 100}%`,
                }}
              >
                {pos.finger}
              </div>
            ))}
        </div>
      </div>

      {/* Finger legend for beginners */}
      {size === 'lg' && (
        <div className="flex gap-2 mt-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />1 食指
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />2 中指
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />3 无名指
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />4 小指
          </span>
        </div>
      )}
    </div>
  )
}
