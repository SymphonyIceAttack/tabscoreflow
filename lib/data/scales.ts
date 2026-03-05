import type { Scale } from '@/lib/types'

export const scales: Scale[] = [
  {
    id: 'c-major',
    name: 'C Major Scale',
    type: 'major',
    root: 'C',
    notes: [
      // Position 1 (Open position)
      { fret: 0, string: 1, interval: '3' },
      { fret: 1, string: 1, interval: '4' },
      { fret: 3, string: 1, interval: '5' },
      { fret: 0, string: 2, interval: '7' },
      { fret: 1, string: 2, interval: '1', isRoot: true },
      { fret: 3, string: 2, interval: '2' },
      { fret: 0, string: 3, interval: '5' },
      { fret: 2, string: 3, interval: '6' },
      { fret: 0, string: 4, interval: '2' },
      { fret: 2, string: 4, interval: '3' },
      { fret: 3, string: 4, interval: '4' },
      { fret: 0, string: 5, interval: '6' },
      { fret: 2, string: 5, interval: '7' },
      { fret: 3, string: 5, interval: '1', isRoot: true },
      { fret: 0, string: 6, interval: '3' },
      { fret: 1, string: 6, interval: '4' },
      { fret: 3, string: 6, interval: '5' }
    ],
    intervals: ['1', '2', '3', '4', '5', '6', '7'],
    description: 'The most basic major scale, all white key notes, no sharps or flats.'
  },
  {
    id: 'a-minor',
    name: 'A Minor Scale',
    type: 'minor',
    root: 'A',
    notes: [
      { fret: 0, string: 1, interval: '3' },
      { fret: 1, string: 1, interval: '4' },
      { fret: 3, string: 1, interval: '5' },
      { fret: 0, string: 2, interval: '7' },
      { fret: 1, string: 2, interval: '1', isRoot: true },
      { fret: 3, string: 2, interval: '2' },
      { fret: 0, string: 3, interval: '5' },
      { fret: 2, string: 3, interval: '6' },
      { fret: 0, string: 4, interval: '2' },
      { fret: 2, string: 4, interval: 'b3' },
      { fret: 3, string: 4, interval: '4' },
      { fret: 0, string: 5, interval: '6' },
      { fret: 2, string: 5, interval: 'b7' },
      { fret: 3, string: 5, interval: '1', isRoot: true },
      { fret: 0, string: 6, interval: '3' },
      { fret: 1, string: 6, interval: '4' },
      { fret: 3, string: 6, interval: '5' }
    ],
    intervals: ['1', '2', 'b3', '4', '5', 'b6', 'b7'],
    description: 'The relative minor of C major, melancholic emotion, commonly used in rock and blues.'
  },
  {
    id: 'a-pentatonic-minor',
    name: 'A Minor Pentatonic',
    type: 'pentatonic-minor',
    root: 'A',
    notes: [
      { fret: 5, string: 1, interval: '1', isRoot: true },
      { fret: 8, string: 1, interval: 'b3' },
      { fret: 5, string: 2, interval: '5' },
      { fret: 8, string: 2, interval: 'b7' },
      { fret: 5, string: 3, interval: '2' },
      { fret: 7, string: 3, interval: '4' },
      { fret: 5, string: 4, interval: 'b7' },
      { fret: 7, string: 4, interval: '1', isRoot: true },
      { fret: 5, string: 5, interval: '4' },
      { fret: 7, string: 5, interval: '5' },
      { fret: 5, string: 6, interval: '1', isRoot: true },
      { fret: 8, string: 6, interval: 'b3' }
    ],
    intervals: ['1', 'b3', '4', '5', 'b7'],
    description: 'The most common improvising scale, only 5 notes, perfect for blues and rock solos.'
  },
  {
    id: 'e-pentatonic-minor',
    name: 'E Minor Pentatonic',
    type: 'pentatonic-minor',
    root: 'E',
    notes: [
      { fret: 0, string: 1, interval: '1', isRoot: true },
      { fret: 3, string: 1, interval: 'b3' },
      { fret: 0, string: 2, interval: '5' },
      { fret: 3, string: 2, interval: 'b7' },
      { fret: 0, string: 3, interval: '2' },
      { fret: 2, string: 3, interval: '4' },
      { fret: 0, string: 4, interval: 'b7' },
      { fret: 2, string: 4, interval: '1', isRoot: true },
      { fret: 0, string: 5, interval: '4' },
      { fret: 2, string: 5, interval: '5' },
      { fret: 0, string: 6, interval: '1', isRoot: true },
      { fret: 3, string: 6, interval: 'b3' }
    ],
    intervals: ['1', 'b3', '4', '5', 'b7'],
    description: 'Open position minor pentatonic, uses open strings, perfect for beginners.'
  },
  {
    id: 'a-blues',
    name: 'A Blues Scale',
    type: 'blues',
    root: 'A',
    notes: [
      { fret: 5, string: 1, interval: '1', isRoot: true },
      { fret: 8, string: 1, interval: 'b3' },
      { fret: 5, string: 2, interval: '5' },
      { fret: 6, string: 2, interval: 'b5' },
      { fret: 8, string: 2, interval: 'b7' },
      { fret: 5, string: 3, interval: '2' },
      { fret: 7, string: 3, interval: '4' },
      { fret: 5, string: 4, interval: 'b7' },
      { fret: 7, string: 4, interval: '1', isRoot: true },
      { fret: 8, string: 4, interval: 'b5' },
      { fret: 5, string: 5, interval: '4' },
      { fret: 7, string: 5, interval: '5' },
      { fret: 5, string: 6, interval: '1', isRoot: true },
      { fret: 8, string: 6, interval: 'b3' }
    ],
    intervals: ['1', 'b3', '4', 'b5', '5', 'b7'],
    description: 'Minor pentatonic with the "blue note" (b5), adding unique tension and emotion.'
  },
  {
    id: 'g-major-pentatonic',
    name: 'G Major Pentatonic',
    type: 'pentatonic-major',
    root: 'G',
    notes: [
      { fret: 3, string: 1, interval: '1', isRoot: true },
      { fret: 5, string: 1, interval: '2' },
      { fret: 2, string: 2, interval: '5' },
      { fret: 5, string: 2, interval: '6' },
      { fret: 2, string: 3, interval: '2' },
      { fret: 4, string: 3, interval: '3' },
      { fret: 2, string: 4, interval: '6' },
      { fret: 5, string: 4, interval: '1', isRoot: true },
      { fret: 2, string: 5, interval: '3' },
      { fret: 5, string: 5, interval: '5' },
      { fret: 3, string: 6, interval: '1', isRoot: true },
      { fret: 5, string: 6, interval: '2' }
    ],
    intervals: ['1', '2', '3', '5', '6'],
    description: 'Major pentatonic scale, bright and joyful feel, suitable for country and pop music.'
  },
  {
    id: 'a-dorian',
    name: 'A Dorian Mode',
    type: 'dorian',
    root: 'A',
    notes: [
      { fret: 5, string: 1, interval: '1', isRoot: true },
      { fret: 7, string: 1, interval: '2' },
      { fret: 8, string: 1, interval: 'b3' },
      { fret: 5, string: 2, interval: '5' },
      { fret: 7, string: 2, interval: '6' },
      { fret: 8, string: 2, interval: 'b7' },
      { fret: 5, string: 3, interval: '2' },
      { fret: 6, string: 3, interval: 'b3' },
      { fret: 7, string: 3, interval: '4' },
      { fret: 5, string: 4, interval: '6' },
      { fret: 7, string: 4, interval: '1', isRoot: true },
      { fret: 5, string: 5, interval: '4' },
      { fret: 7, string: 5, interval: '5' },
      { fret: 5, string: 6, interval: '1', isRoot: true },
      { fret: 7, string: 6, interval: '2' },
      { fret: 8, string: 6, interval: 'b3' }
    ],
    intervals: ['1', '2', 'b3', '4', '5', '6', 'b7'],
    description: 'Variation of minor scale with major sixth, commonly used in fusion rock and jazz.'
  },
  {
    id: 'e-mixolydian',
    name: 'E Mixolydian Mode',
    type: 'mixolydian',
    root: 'E',
    notes: [
      { fret: 0, string: 1, interval: '1', isRoot: true },
      { fret: 2, string: 1, interval: '2' },
      { fret: 4, string: 1, interval: '3' },
      { fret: 0, string: 2, interval: '5' },
      { fret: 2, string: 2, interval: '6' },
      { fret: 3, string: 2, interval: 'b7' },
      { fret: 0, string: 3, interval: '2' },
      { fret: 1, string: 3, interval: 'b3' },
      { fret: 2, string: 3, interval: '3' },
      { fret: 0, string: 4, interval: '6' },
      { fret: 2, string: 4, interval: '1', isRoot: true },
      { fret: 0, string: 5, interval: '3' },
      { fret: 2, string: 5, interval: '5' },
      { fret: 0, string: 6, interval: '1', isRoot: true },
      { fret: 2, string: 6, interval: '2' },
      { fret: 4, string: 6, interval: '3' }
    ],
    intervals: ['1', '2', '3', '4', '5', '6', 'b7'],
    description: 'Major scale with minor seventh, companion to dominant seventh chords, commonly used in rock and blues.'
  }
]

export const scaleTypes = [
  { value: 'major', label: 'Major' },
  { value: 'minor', label: 'Minor' },
  { value: 'pentatonic-major', label: 'Major Pentatonic' },
  { value: 'pentatonic-minor', label: 'Minor Pentatonic' },
  { value: 'blues', label: 'Blues' },
  { value: 'dorian', label: 'Dorian' },
  { value: 'mixolydian', label: 'Mixolydian' },
  { value: 'phrygian', label: 'Phrygian' }
]

export const roots = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export const SCALE_CATEGORIES = scaleTypes
export const ROOT_NOTES = roots

export function getScaleById(id: string): Scale | undefined {
  return scales.find(scale => scale.id === id)
}

export function filterScales(filters: { type?: string; root?: string }): Scale[] {
  let result = [...scales]
  
  if (filters.type) {
    result = result.filter(scale => scale.type === filters.type)
  }
  
  if (filters.root) {
    result = result.filter(scale => scale.root === filters.root)
  }
  
  return result
}
