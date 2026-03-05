import type { Scale } from '@/lib/types'

export const scales: Scale[] = [
  {
    id: 'c-major',
    name: 'C 大调音阶',
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
    description: '最基础的大调音阶，所有白键音符，无升降号。'
  },
  {
    id: 'a-minor',
    name: 'A 小调音阶',
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
    description: 'C大调的关系小调，情感忧郁，摇滚和布鲁斯常用。'
  },
  {
    id: 'a-pentatonic-minor',
    name: 'A 小调五声音阶',
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
    description: '最常用的即兴音阶，只有5个音符，非常适合蓝调和摇滚独奏。'
  },
  {
    id: 'e-pentatonic-minor',
    name: 'E 小调五声音阶',
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
    description: '开放把位的小调五声音阶，利用空弦，非常适合初学者。'
  },
  {
    id: 'a-blues',
    name: 'A 布鲁斯音阶',
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
    description: '小调五声音阶加上"蓝调音"(b5)，增加了独特的张力和情感。'
  },
  {
    id: 'g-major-pentatonic',
    name: 'G 大调五声音阶',
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
    description: '大调五声音阶，明亮欢快的感觉，适合乡村和流行音乐。'
  },
  {
    id: 'a-dorian',
    name: 'A 多利亚调式',
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
    description: '小调音阶的变体，有大六度，融合摇滚和爵士常用。'
  },
  {
    id: 'e-mixolydian',
    name: 'E 混合利底亚调式',
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
    description: '大调音阶但有小七度，属七和弦的配套音阶，摇滚和布鲁斯常用。'
  }
]

export const scaleTypes = [
  { value: 'major', label: '大调' },
  { value: 'minor', label: '小调' },
  { value: 'pentatonic-major', label: '大调五声' },
  { value: 'pentatonic-minor', label: '小调五声' },
  { value: 'blues', label: '布鲁斯' },
  { value: 'dorian', label: '多利亚' },
  { value: 'mixolydian', label: '混合利底亚' },
  { value: 'phrygian', label: '弗里几亚' }
]

export const roots = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

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
