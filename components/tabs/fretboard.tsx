'use client'

import { cn } from '@/lib/utils'

interface FretboardNote {
  string: number // 1-6, 1 is high E
  fret: number // 0-24
  isRoot?: boolean
  label?: string
}

interface FretboardProps {
  notes?: FretboardNote[]
  activeFrets?: number[]
  tuning?: string[]
  fretCount?: number
  showFretNumbers?: boolean
  className?: string
}

const defaultTuning = ['E', 'B', 'G', 'D', 'A', 'E']
const stringColors = [
  'bg-zinc-300 dark:bg-zinc-500',
  'bg-zinc-400 dark:bg-zinc-400',
  'bg-zinc-500 dark:bg-zinc-400',
  'bg-amber-600/80',
  'bg-amber-700/80',
  'bg-amber-800/80',
]

export function Fretboard({
  notes = [],
  activeFrets = [],
  tuning = defaultTuning,
  fretCount = 12,
  showFretNumbers = true,
  className,
}: FretboardProps) {
  const frets = Array.from({ length: fretCount + 1 }, (_, i) => i)
  const strings = Array.from({ length: 6 }, (_, i) => i + 1)

  // Fret markers (dots on fretboard)
  const fretMarkers = [3, 5, 7, 9, 12, 15, 17, 19, 21]
  const doubleFretMarkers = [12, 24]

  const getNoteAtPosition = (string: number, fret: number) => {
    return notes.find(n => n.string === string && n.fret === fret)
  }

  const isActiveFret = (fret: number) => activeFrets.includes(fret)

  return (
    <div className={cn('relative select-none', className)}>
      {/* Nut */}
      <div className="absolute left-12 top-0 bottom-0 w-1.5 bg-zinc-200 dark:bg-zinc-600 rounded-full z-10" />

      {/* Fretboard */}
      <div className="flex">
        {/* Tuning labels */}
        <div className="w-12 flex flex-col justify-between py-1">
          {tuning.map((note, i) => (
            <div
              key={i}
              className="h-6 flex items-center justify-center text-xs font-mono text-muted-foreground"
            >
              {note}
            </div>
          ))}
        </div>

        {/* Frets */}
        <div className="flex-1 relative">
          {/* Fret markers background */}
          {frets.map(fret => (
            <div
              key={`bg-${fret}`}
              className="absolute top-0 bottom-0"
              style={{
                left: `${(fret / fretCount) * 100}%`,
                width: `${100 / fretCount}%`,
              }}
            >
              {fretMarkers.includes(fret) && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {doubleFretMarkers.includes(fret) ? (
                    <div className="flex flex-col gap-6">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                    </div>
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Strings and notes */}
          <div className="relative flex flex-col justify-between py-1" style={{ height: '160px' }}>
            {strings.map(string => (
              <div key={string} className="relative h-6 flex items-center">
                {/* String line */}
                <div
                  className={cn(
                    'absolute left-0 right-0 h-px rounded-full',
                    stringColors[string - 1]
                  )}
                  style={{ height: string > 3 ? '2px' : '1px' }}
                />

                {/* Notes on this string */}
                {frets.map(fret => {
                  const note = getNoteAtPosition(string, fret)
                  const active = isActiveFret(fret)

                  return (
                    <div
                      key={`${string}-${fret}`}
                      className="absolute flex items-center justify-center"
                      style={{
                        left: fret === 0 ? '0' : `${((fret - 0.5) / fretCount) * 100}%`,
                        width: fret === 0 ? '0' : `${100 / fretCount}%`,
                      }}
                    >
                      {note && (
                        <div
                          className={cn(
                            'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold z-20 transition-all',
                            note.isRoot
                              ? 'bg-primary text-primary-foreground scale-110'
                              : 'bg-accent text-accent-foreground',
                            active && 'ring-2 ring-primary ring-offset-1 ring-offset-background animate-pulse-note'
                          )}
                        >
                          {note.label || fret}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Fret wires */}
          {frets.slice(1).map(fret => (
            <div
              key={`fret-${fret}`}
              className="absolute top-0 bottom-0 w-0.5 bg-zinc-400 dark:bg-zinc-500"
              style={{ left: `${(fret / fretCount) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Fret numbers */}
      {showFretNumbers && (
        <div className="flex mt-2 ml-12">
          {frets.map(fret => (
            <div
              key={`num-${fret}`}
              className="text-[10px] text-muted-foreground text-center"
              style={{ width: `${100 / fretCount}%` }}
            >
              {fret > 0 && fret}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
