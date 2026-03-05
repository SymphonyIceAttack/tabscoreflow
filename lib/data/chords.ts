import type { Chord } from '@/lib/types'

export const chords: Chord[] = [
  // Major Chords
  {
    id: 'c-major',
    name: 'C Major',
    symbol: 'C',
    type: 'major',
    root: 'C',
    positions: [
      { fret: 0, string: 1, finger: undefined },
      { fret: 1, string: 2, finger: 1 },
      { fret: 0, string: 3, finger: undefined },
      { fret: 2, string: 4, finger: 2 },
      { fret: 3, string: 5, finger: 3 }
    ],
    mutedStrings: [6],
    openStrings: [1, 3],
    difficulty: 1
  },
  {
    id: 'd-major',
    name: 'D Major',
    symbol: 'D',
    type: 'major',
    root: 'D',
    positions: [
      { fret: 2, string: 1, finger: 2 },
      { fret: 3, string: 2, finger: 3 },
      { fret: 2, string: 3, finger: 1 },
      { fret: 0, string: 4, finger: undefined }
    ],
    mutedStrings: [5, 6],
    openStrings: [4],
    difficulty: 1
  },
  {
    id: 'e-major',
    name: 'E Major',
    symbol: 'E',
    type: 'major',
    root: 'E',
    positions: [
      { fret: 0, string: 1, finger: undefined },
      { fret: 0, string: 2, finger: undefined },
      { fret: 1, string: 3, finger: 1 },
      { fret: 2, string: 4, finger: 3 },
      { fret: 2, string: 5, finger: 2 },
      { fret: 0, string: 6, finger: undefined }
    ],
    openStrings: [1, 2, 6],
    difficulty: 1
  },
  {
    id: 'g-major',
    name: 'G Major',
    symbol: 'G',
    type: 'major',
    root: 'G',
    positions: [
      { fret: 3, string: 1, finger: 4 },
      { fret: 0, string: 2, finger: undefined },
      { fret: 0, string: 3, finger: undefined },
      { fret: 0, string: 4, finger: undefined },
      { fret: 2, string: 5, finger: 1 },
      { fret: 3, string: 6, finger: 2 }
    ],
    openStrings: [2, 3, 4],
    difficulty: 1
  },
  {
    id: 'a-major',
    name: 'A Major',
    symbol: 'A',
    type: 'major',
    root: 'A',
    positions: [
      { fret: 0, string: 1, finger: undefined },
      { fret: 2, string: 2, finger: 3 },
      { fret: 2, string: 3, finger: 2 },
      { fret: 2, string: 4, finger: 1 },
      { fret: 0, string: 5, finger: undefined }
    ],
    mutedStrings: [6],
    openStrings: [1, 5],
    difficulty: 1
  },
  {
    id: 'f-major',
    name: 'F Major',
    symbol: 'F',
    type: 'major',
    root: 'F',
    positions: [
      { fret: 1, string: 1, finger: 1 },
      { fret: 1, string: 2, finger: 1 },
      { fret: 2, string: 3, finger: 2 },
      { fret: 3, string: 4, finger: 3 },
      { fret: 3, string: 5, finger: 4 },
      { fret: 1, string: 6, finger: 1 }
    ],
    barrePosition: 1,
    difficulty: 2
  },
  {
    id: 'b-major',
    name: 'B Major',
    symbol: 'B',
    type: 'major',
    root: 'B',
    positions: [
      { fret: 2, string: 1, finger: 1 },
      { fret: 4, string: 2, finger: 3 },
      { fret: 4, string: 3, finger: 4 },
      { fret: 4, string: 4, finger: 2 },
      { fret: 2, string: 5, finger: 1 }
    ],
    barrePosition: 2,
    mutedStrings: [6],
    difficulty: 2
  },
  // Minor Chords
  {
    id: 'am-minor',
    name: 'A Minor',
    symbol: 'Am',
    type: 'minor',
    root: 'A',
    positions: [
      { fret: 0, string: 1, finger: undefined },
      { fret: 1, string: 2, finger: 1 },
      { fret: 2, string: 3, finger: 3 },
      { fret: 2, string: 4, finger: 2 },
      { fret: 0, string: 5, finger: undefined }
    ],
    mutedStrings: [6],
    openStrings: [1, 5],
    difficulty: 1
  },
  {
    id: 'dm-minor',
    name: 'D Minor',
    symbol: 'Dm',
    type: 'minor',
    root: 'D',
    positions: [
      { fret: 1, string: 1, finger: 1 },
      { fret: 3, string: 2, finger: 3 },
      { fret: 2, string: 3, finger: 2 },
      { fret: 0, string: 4, finger: undefined }
    ],
    mutedStrings: [5, 6],
    openStrings: [4],
    difficulty: 1
  },
  {
    id: 'em-minor',
    name: 'E Minor',
    symbol: 'Em',
    type: 'minor',
    root: 'E',
    positions: [
      { fret: 0, string: 1, finger: undefined },
      { fret: 0, string: 2, finger: undefined },
      { fret: 0, string: 3, finger: undefined },
      { fret: 2, string: 4, finger: 2 },
      { fret: 2, string: 5, finger: 3 },
      { fret: 0, string: 6, finger: undefined }
    ],
    openStrings: [1, 2, 3, 6],
    difficulty: 1
  },
  {
    id: 'bm-minor',
    name: 'B Minor',
    symbol: 'Bm',
    type: 'minor',
    root: 'B',
    positions: [
      { fret: 2, string: 1, finger: 1 },
      { fret: 3, string: 2, finger: 2 },
      { fret: 4, string: 3, finger: 4 },
      { fret: 4, string: 4, finger: 3 },
      { fret: 2, string: 5, finger: 1 }
    ],
    barrePosition: 2,
    mutedStrings: [6],
    difficulty: 2
  },
  {
    id: 'fm-minor',
    name: 'F# Minor',
    symbol: 'F#m',
    type: 'minor',
    root: 'F#',
    positions: [
      { fret: 2, string: 1, finger: 1 },
      { fret: 2, string: 2, finger: 1 },
      { fret: 2, string: 3, finger: 1 },
      { fret: 4, string: 4, finger: 3 },
      { fret: 4, string: 5, finger: 4 },
      { fret: 2, string: 6, finger: 1 }
    ],
    barrePosition: 2,
    difficulty: 2
  },
  // Seventh Chords
  {
    id: 'a7',
    name: 'A Seventh',
    symbol: 'A7',
    type: 'seventh',
    root: 'A',
    positions: [
      { fret: 0, string: 1, finger: undefined },
      { fret: 2, string: 2, finger: 2 },
      { fret: 0, string: 3, finger: undefined },
      { fret: 2, string: 4, finger: 1 },
      { fret: 0, string: 5, finger: undefined }
    ],
    mutedStrings: [6],
    openStrings: [1, 3, 5],
    difficulty: 1
  },
  {
    id: 'e7',
    name: 'E Seventh',
    symbol: 'E7',
    type: 'seventh',
    root: 'E',
    positions: [
      { fret: 0, string: 1, finger: undefined },
      { fret: 0, string: 2, finger: undefined },
      { fret: 1, string: 3, finger: 1 },
      { fret: 0, string: 4, finger: undefined },
      { fret: 2, string: 5, finger: 2 },
      { fret: 0, string: 6, finger: undefined }
    ],
    openStrings: [1, 2, 4, 6],
    difficulty: 1
  },
  {
    id: 'd7',
    name: 'D Seventh',
    symbol: 'D7',
    type: 'seventh',
    root: 'D',
    positions: [
      { fret: 2, string: 1, finger: 2 },
      { fret: 1, string: 2, finger: 1 },
      { fret: 2, string: 3, finger: 3 },
      { fret: 0, string: 4, finger: undefined }
    ],
    mutedStrings: [5, 6],
    openStrings: [4],
    difficulty: 1
  },
  {
    id: 'g7',
    name: 'G Seventh',
    symbol: 'G7',
    type: 'seventh',
    root: 'G',
    positions: [
      { fret: 1, string: 1, finger: 1 },
      { fret: 0, string: 2, finger: undefined },
      { fret: 0, string: 3, finger: undefined },
      { fret: 0, string: 4, finger: undefined },
      { fret: 2, string: 5, finger: 2 },
      { fret: 3, string: 6, finger: 3 }
    ],
    openStrings: [2, 3, 4],
    difficulty: 1
  },
  // Sus Chords
  {
    id: 'dsus2',
    name: 'D Suspended 2nd',
    symbol: 'Dsus2',
    type: 'sus2',
    root: 'D',
    positions: [
      { fret: 0, string: 1, finger: undefined },
      { fret: 3, string: 2, finger: 3 },
      { fret: 2, string: 3, finger: 2 },
      { fret: 0, string: 4, finger: undefined }
    ],
    mutedStrings: [5, 6],
    openStrings: [1, 4],
    difficulty: 1
  },
  {
    id: 'asus4',
    name: 'A Suspended 4th',
    symbol: 'Asus4',
    type: 'sus4',
    root: 'A',
    positions: [
      { fret: 0, string: 1, finger: undefined },
      { fret: 3, string: 2, finger: 4 },
      { fret: 2, string: 3, finger: 2 },
      { fret: 2, string: 4, finger: 1 },
      { fret: 0, string: 5, finger: undefined }
    ],
    mutedStrings: [6],
    openStrings: [1, 5],
    difficulty: 1
  },
  // Power Chords
  {
    id: 'e5',
    name: 'E Power Chord',
    symbol: 'E5',
    type: 'power',
    root: 'E',
    positions: [
      { fret: 2, string: 5, finger: 3 },
      { fret: 0, string: 6, finger: undefined }
    ],
    mutedStrings: [1, 2, 3, 4],
    openStrings: [6],
    difficulty: 1
  },
  {
    id: 'a5',
    name: 'A Power Chord',
    symbol: 'A5',
    type: 'power',
    root: 'A',
    positions: [
      { fret: 2, string: 4, finger: 3 },
      { fret: 0, string: 5, finger: undefined }
    ],
    mutedStrings: [1, 2, 3, 6],
    openStrings: [5],
    difficulty: 1
  }
]

export const chordTypes = [
  { value: 'major', label: '大三和弦' },
  { value: 'minor', label: '小三和弦' },
  { value: 'seventh', label: '七和弦' },
  { value: 'maj7', label: '大七和弦' },
  { value: 'min7', label: '小七和弦' },
  { value: 'sus2', label: '挂二和弦' },
  { value: 'sus4', label: '挂四和弦' },
  { value: 'dim', label: '减和弦' },
  { value: 'aug', label: '增和弦' },
  { value: 'power', label: '强力和弦' }
]

export const roots = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export function getChordById(id: string): Chord | undefined {
  return chords.find(chord => chord.id === id)
}

export function filterChords(filters: { type?: string; root?: string; difficulty?: number }): Chord[] {
  let result = [...chords]
  
  if (filters.type) {
    result = result.filter(chord => chord.type === filters.type)
  }
  
  if (filters.root) {
    result = result.filter(chord => chord.root === filters.root)
  }
  
  if (filters.difficulty) {
    result = result.filter(chord => chord.difficulty <= filters.difficulty!)
  }
  
  return result
}
