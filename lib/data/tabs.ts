import type { Tab } from '@/lib/types'

export const tabs: Tab[] = [
  {
    id: '1',
    title: 'Wonderwall',
    artist: 'Oasis',
    difficulty: 2,
    genre: ['Rock', 'Britpop'],
    bpm: 87,
    key: 'F#m',
    duration: 258,
    fileUrl: '/tabs/wonderwall.gp',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    rating: 4.8,
    ratingCount: 2456,
    viewCount: 89234,
    createdAt: '2024-01-15',
    tuning: 'Standard',
    description: '经典的 Oasis 歌曲，非常适合初学者练习扫弦和和弦转换。'
  },
  {
    id: '2',
    title: 'Hotel California',
    artist: 'Eagles',
    difficulty: 4,
    genre: ['Rock', 'Classic Rock'],
    bpm: 75,
    key: 'Bm',
    duration: 391,
    fileUrl: '/tabs/hotel-california.gp',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
    rating: 4.9,
    ratingCount: 3891,
    viewCount: 156789,
    createdAt: '2024-02-20',
    tuning: 'Standard',
    description: '经典摇滚神曲，包含著名的双吉他独奏。'
  },
  {
    id: '3',
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    difficulty: 5,
    genre: ['Rock', 'Hard Rock'],
    bpm: 82,
    key: 'Am',
    duration: 482,
    fileUrl: '/tabs/stairway-to-heaven.gp',
    coverUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop',
    rating: 4.95,
    ratingCount: 5678,
    viewCount: 234567,
    createdAt: '2024-01-10',
    tuning: 'Standard',
    description: '摇滚史上最伟大的歌曲之一，包含复杂的指弹和独奏。'
  },
  {
    id: '4',
    title: 'Nothing Else Matters',
    artist: 'Metallica',
    difficulty: 3,
    genre: ['Metal', 'Rock Ballad'],
    bpm: 69,
    key: 'Em',
    duration: 386,
    fileUrl: '/tabs/nothing-else-matters.gp',
    coverUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop',
    rating: 4.85,
    ratingCount: 4123,
    viewCount: 178456,
    createdAt: '2024-03-05',
    tuning: 'Standard',
    description: 'Metallica 最著名的抒情歌曲，指弹技巧入门必练。'
  },
  {
    id: '5',
    title: 'Sweet Child O\' Mine',
    artist: 'Guns N\' Roses',
    difficulty: 4,
    genre: ['Rock', 'Hard Rock'],
    bpm: 124,
    key: 'D',
    duration: 356,
    fileUrl: '/tabs/sweet-child-o-mine.gp',
    coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
    rating: 4.8,
    ratingCount: 3456,
    viewCount: 145678,
    createdAt: '2024-02-28',
    tuning: 'Standard (Eb)',
    description: '标志性的开场 riff，是学习经典摇滚的必备曲目。'
  },
  {
    id: '6',
    title: 'Wish You Were Here',
    artist: 'Pink Floyd',
    difficulty: 2,
    genre: ['Rock', 'Progressive Rock'],
    bpm: 62,
    key: 'G',
    duration: 334,
    fileUrl: '/tabs/wish-you-were-here.gp',
    coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
    rating: 4.75,
    ratingCount: 2789,
    viewCount: 98765,
    createdAt: '2024-01-25',
    tuning: 'Standard',
    description: '优美的前奏和简单的和弦进行，非常适合弹唱练习。'
  },
  {
    id: '7',
    title: 'Blackbird',
    artist: 'The Beatles',
    difficulty: 3,
    genre: ['Folk', 'Rock'],
    bpm: 94,
    key: 'G',
    duration: 138,
    fileUrl: '/tabs/blackbird.gp',
    coverUrl: 'https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=400&h=400&fit=crop',
    rating: 4.9,
    ratingCount: 3234,
    viewCount: 123456,
    createdAt: '2024-03-10',
    tuning: 'Standard',
    description: '经典的指弹曲目，使用独特的拇指技巧。'
  },
  {
    id: '8',
    title: 'Tears in Heaven',
    artist: 'Eric Clapton',
    difficulty: 3,
    genre: ['Rock', 'Ballad'],
    bpm: 80,
    key: 'A',
    duration: 274,
    fileUrl: '/tabs/tears-in-heaven.gp',
    coverUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop',
    rating: 4.85,
    ratingCount: 2987,
    viewCount: 112345,
    createdAt: '2024-02-15',
    tuning: 'Standard',
    description: 'Eric Clapton 的深情之作，包含优美的指弹段落。'
  },
  {
    id: '9',
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    difficulty: 2,
    genre: ['Grunge', 'Alternative Rock'],
    bpm: 117,
    key: 'Fm',
    duration: 301,
    fileUrl: '/tabs/smells-like-teen-spirit.gp',
    coverUrl: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=400&h=400&fit=crop',
    rating: 4.7,
    ratingCount: 4567,
    viewCount: 198765,
    createdAt: '2024-01-30',
    tuning: 'Standard',
    description: '垃圾摇滚经典，简单的 power chord 和强力节奏。'
  },
  {
    id: '10',
    title: 'Hallelujah',
    artist: 'Jeff Buckley',
    difficulty: 2,
    genre: ['Folk', 'Alternative'],
    bpm: 56,
    key: 'C',
    duration: 415,
    fileUrl: '/tabs/hallelujah.gp',
    coverUrl: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&h=400&fit=crop',
    rating: 4.8,
    ratingCount: 2345,
    viewCount: 87654,
    createdAt: '2024-03-01',
    tuning: 'Standard',
    description: '优美的分解和弦练习曲，情感表达的绝佳素材。'
  },
  {
    id: '11',
    title: 'Dust in the Wind',
    artist: 'Kansas',
    difficulty: 3,
    genre: ['Rock', 'Progressive Rock'],
    bpm: 96,
    key: 'C',
    duration: 204,
    fileUrl: '/tabs/dust-in-the-wind.gp',
    coverUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop',
    rating: 4.75,
    ratingCount: 1987,
    viewCount: 76543,
    createdAt: '2024-02-10',
    tuning: 'Standard',
    description: '经典指弹练习曲，Travis picking 技巧的完美教材。'
  },
  {
    id: '12',
    title: 'One',
    artist: 'Metallica',
    difficulty: 5,
    genre: ['Metal', 'Thrash Metal'],
    bpm: 108,
    key: 'Bm',
    duration: 446,
    fileUrl: '/tabs/one.gp',
    coverUrl: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=400&h=400&fit=crop',
    rating: 4.9,
    ratingCount: 3876,
    viewCount: 156789,
    createdAt: '2024-01-20',
    tuning: 'Standard',
    description: 'Metallica 技术性最强的歌曲之一，包含高速独奏。'
  },
  {
    id: '13',
    title: 'Layla (Unplugged)',
    artist: 'Eric Clapton',
    difficulty: 3,
    genre: ['Blues', 'Rock'],
    bpm: 95,
    key: 'Dm',
    duration: 285,
    fileUrl: '/tabs/layla-unplugged.gp',
    coverUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop',
    rating: 4.85,
    ratingCount: 2654,
    viewCount: 98765,
    createdAt: '2024-02-25',
    tuning: 'Standard',
    description: '不插电版本的经典，展示了 Clapton 的蓝调技巧。'
  },
  {
    id: '14',
    title: 'Californication',
    artist: 'Red Hot Chili Peppers',
    difficulty: 2,
    genre: ['Rock', 'Alternative Rock'],
    bpm: 96,
    key: 'Am',
    duration: 329,
    fileUrl: '/tabs/californication.gp',
    coverUrl: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=400&h=400&fit=crop',
    rating: 4.7,
    ratingCount: 3123,
    viewCount: 134567,
    createdAt: '2024-03-08',
    tuning: 'Standard',
    description: '简洁的旋律线和和弦进行，非常适合练习节奏感。'
  },
  {
    id: '15',
    title: 'While My Guitar Gently Weeps',
    artist: 'The Beatles',
    difficulty: 3,
    genre: ['Rock', 'Classic Rock'],
    bpm: 116,
    key: 'Am',
    duration: 284,
    fileUrl: '/tabs/while-my-guitar-gently-weeps.gp',
    coverUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop',
    rating: 4.85,
    ratingCount: 2876,
    viewCount: 109876,
    createdAt: '2024-01-28',
    tuning: 'Standard',
    description: 'George Harrison 的杰作，包含优美的独奏段落。'
  },
  {
    id: '16',
    title: 'Enter Sandman',
    artist: 'Metallica',
    difficulty: 3,
    genre: ['Metal', 'Heavy Metal'],
    bpm: 123,
    key: 'Em',
    duration: 332,
    fileUrl: '/tabs/enter-sandman.gp',
    coverUrl: 'https://images.unsplash.com/photo-1461784121038-f088ca1e7714?w=400&h=400&fit=crop',
    rating: 4.8,
    ratingCount: 4234,
    viewCount: 187654,
    createdAt: '2024-02-18',
    tuning: 'Standard',
    description: '金属乐入门必练，标志性的 riff 和强力节奏。'
  },
  {
    id: '17',
    title: 'Knockin\' on Heaven\'s Door',
    artist: 'Bob Dylan',
    difficulty: 1,
    genre: ['Folk', 'Rock'],
    bpm: 70,
    key: 'G',
    duration: 151,
    fileUrl: '/tabs/knockin-on-heavens-door.gp',
    coverUrl: 'https://images.unsplash.com/photo-1466428996289-fb355538da1b?w=400&h=400&fit=crop',
    rating: 4.6,
    ratingCount: 3456,
    viewCount: 145678,
    createdAt: '2024-03-12',
    tuning: 'Standard',
    description: '只需要四个和弦的经典歌曲，完美的初学者入门曲。'
  },
  {
    id: '18',
    title: 'The Trooper',
    artist: 'Iron Maiden',
    difficulty: 4,
    genre: ['Metal', 'Heavy Metal'],
    bpm: 162,
    key: 'Em',
    duration: 249,
    fileUrl: '/tabs/the-trooper.gp',
    coverUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=400&fit=crop',
    rating: 4.85,
    ratingCount: 2987,
    viewCount: 123456,
    createdAt: '2024-02-08',
    tuning: 'Standard',
    description: 'Iron Maiden 的经典，双吉他 harmony 的典范。'
  },
  {
    id: '19',
    title: 'Cliffs of Dover',
    artist: 'Eric Johnson',
    difficulty: 5,
    genre: ['Rock', 'Instrumental'],
    bpm: 140,
    key: 'G',
    duration: 248,
    fileUrl: '/tabs/cliffs-of-dover.gp',
    coverUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=400&h=400&fit=crop',
    rating: 4.95,
    ratingCount: 2345,
    viewCount: 98765,
    createdAt: '2024-01-22',
    tuning: 'Standard',
    description: '吉他技术的巅峰之作，需要高超的速弹和音色控制。'
  },
  {
    id: '20',
    title: 'Wonderful Tonight',
    artist: 'Eric Clapton',
    difficulty: 1,
    genre: ['Rock', 'Ballad'],
    bpm: 95,
    key: 'G',
    duration: 216,
    fileUrl: '/tabs/wonderful-tonight.gp',
    coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
    rating: 4.7,
    ratingCount: 2654,
    viewCount: 87654,
    createdAt: '2024-03-15',
    tuning: 'Standard',
    description: '简单优美的歌曲，非常适合初学者练习和弦转换。'
  }
]

export const genres = [
  'Rock',
  'Classic Rock',
  'Hard Rock',
  'Metal',
  'Heavy Metal',
  'Thrash Metal',
  'Blues',
  'Folk',
  'Alternative Rock',
  'Grunge',
  'Progressive Rock',
  'Britpop',
  'Rock Ballad',
  'Ballad',
  'Instrumental'
]

export const tunings = [
  'Standard',
  'Standard (Eb)',
  'Drop D',
  'Drop C',
  'Open G',
  'Open D',
  'DADGAD',
  'Half Step Down'
]

export function getTabById(id: string): Tab | undefined {
  return tabs.find(tab => tab.id === id)
}

export function searchTabs(query: string): Tab[] {
  const lowerQuery = query.toLowerCase()
  return tabs.filter(
    tab =>
      tab.title.toLowerCase().includes(lowerQuery) ||
      tab.artist.toLowerCase().includes(lowerQuery)
  )
}

export function filterTabs(filters: {
  difficulty?: number[]
  genre?: string[]
  sortBy?: 'latest' | 'popular' | 'rating' | 'difficulty'
  sortOrder?: 'asc' | 'desc'
}): Tab[] {
  let result = [...tabs]

  if (filters.difficulty?.length) {
    result = result.filter(tab => filters.difficulty!.includes(tab.difficulty))
  }

  if (filters.genre?.length) {
    result = result.filter(tab =>
      tab.genre.some(g => filters.genre!.includes(g))
    )
  }

  if (filters.sortBy) {
    result.sort((a, b) => {
      let comparison = 0
      switch (filters.sortBy) {
        case 'latest':
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          break
        case 'popular':
          comparison = b.viewCount - a.viewCount
          break
        case 'rating':
          comparison = b.rating - a.rating
          break
        case 'difficulty':
          comparison = a.difficulty - b.difficulty
          break
      }
      return filters.sortOrder === 'asc' ? -comparison : comparison
    })
  }

  return result
}
