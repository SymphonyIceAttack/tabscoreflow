// 曲谱相关类型
export interface Tab {
  id: string
  title: string
  artist: string
  difficulty: 1 | 2 | 3 | 4 | 5
  genre: string[]
  bpm: number
  key: string
  duration: number // seconds
  fileUrl: string
  coverUrl?: string
  rating: number
  ratingCount: number
  viewCount: number
  createdAt: string
  tuning: string
  capo?: number
  description?: string
}

// 和弦相关类型
export interface ChordPosition {
  fret: number
  string: number
  finger?: 1 | 2 | 3 | 4
}

export interface Chord {
  id: string
  name: string
  symbol: string
  type: 'major' | 'minor' | 'seventh' | 'maj7' | 'min7' | 'sus2' | 'sus4' | 'dim' | 'aug' | 'power'
  root: string
  positions: ChordPosition[]
  barrePosition?: number
  mutedStrings?: number[]
  openStrings?: number[]
  difficulty: 1 | 2 | 3
}

// 音阶相关类型
export interface ScaleNote {
  fret: number
  string: number
  isRoot?: boolean
  interval?: string
}

export interface Scale {
  id: string
  name: string
  type: 'major' | 'minor' | 'pentatonic-major' | 'pentatonic-minor' | 'blues' | 'dorian' | 'mixolydian' | 'phrygian'
  root: string
  notes: ScaleNote[]
  intervals: string[]
  description: string
}

// 用户相关类型
export interface User {
  id: string
  name: string
  avatar?: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  joinedAt: string
  totalPracticeTime: number // minutes
  streak: number // days
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: string
  progress?: number
  target?: number
}

// 练习记录类型
export interface PracticeRecord {
  id: string
  tabId?: string
  date: string
  duration: number // seconds
  type: 'tab' | 'chord' | 'scale' | 'metronome' | 'tuner'
  speed?: number // percentage
  notes?: string
}

// 收藏类型
export interface Favorite {
  id: string
  userId: string
  tabId: string
  addedAt: string
}

// 评论类型
export interface Comment {
  id: string
  tabId: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  rating?: number
  createdAt: string
  likes: number
  replies?: Comment[]
}

// 挑战类型
export interface Challenge {
  id: string
  name: string
  description: string
  type: 'daily' | 'weekly' | 'monthly' | 'special'
  target: number
  unit: 'minutes' | 'songs' | 'days'
  startDate: string
  endDate: string
  participants: number
  completed: number
}

// 排行榜类型
export interface LeaderboardEntry {
  rank: number
  userId: string
  userName: string
  userAvatar?: string
  score: number
  metric: string
}

// 调音器类型
export type TuningPreset = {
  name: string
  notes: string[]
  frequencies: number[]
}

// 节拍器类型
export type TimeSignature = {
  beats: number
  noteValue: number
}

// 筛选器类型
export interface TabFilters {
  search?: string
  difficulty?: number[]
  genre?: string[]
  sortBy?: 'latest' | 'popular' | 'rating' | 'difficulty'
  sortOrder?: 'asc' | 'desc'
}

// 练习会话类型
export interface PracticeSession {
  id: string
  tabId: string
  date: string
  duration: number // minutes
  notes: string
}

// 论坛帖子类型
export interface ForumPost {
  id: string
  title: string
  content: string
  author: {
    id: string
    username: string
    avatar: string
    level: number
  }
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
  views: number
  likes: number
  commentsCount: number
  isPinned: boolean
}

// 论坛评论类型 (覆盖之前简单的 Comment)
export interface Comment {
  id: string
  postId: string
  content: string
  author: {
    id: string
    username: string
    avatar: string
    level: number
  }
  createdAt: string
  likes: number
  replies?: Comment[]
}

// 挑战类型 (更新)
export interface Challenge {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'monthly' | 'special'
  startDate: string
  endDate: string
  participants: number
  tasks: {
    day: number
    task: string
    completed: boolean
  }[]
  rewards: {
    experience: number
    badge: string
  }
}
