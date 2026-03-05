import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Achievement, PracticeRecord, Favorite } from '@/lib/types'

interface UserState {
  user: User | null
  favorites: Favorite[]
  practiceRecords: PracticeRecord[]
  _hasHydrated: boolean
  
  // Actions
  setUser: (user: User) => void
  updateUser: (updates: Partial<User>) => void
  addFavorite: (tabId: string) => void
  removeFavorite: (tabId: string) => void
  isFavorite: (tabId: string) => boolean
  addPracticeRecord: (record: Omit<PracticeRecord, 'id'>) => void
  getPracticeStats: () => {
    totalTime: number
    todayTime: number
    weekTime: number
    streak: number
    totalSessions: number
  }
  getTabPracticeCount: (tabId: string) => number
  unlockAchievement: (achievementId: string) => void
  setHasHydrated: (state: boolean) => void
}

const defaultUser: User = {
  id: '1',
  name: '吉他爱好者',
  level: 'beginner',
  joinedAt: new Date().toISOString(),
  totalPracticeTime: 0,
  streak: 0,
  achievements: []
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: defaultUser,
      favorites: [],
      practiceRecords: [],
      _hasHydrated: false,

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state })
      },

      setUser: (user) => set({ user }),

      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),

      addFavorite: (tabId) => set((state) => {
        if (state.favorites.some(f => f.tabId === tabId)) return state
        return {
          favorites: [
            ...state.favorites,
            {
              id: Date.now().toString(),
              userId: state.user?.id || '1',
              tabId,
              addedAt: new Date().toISOString()
            }
          ]
        }
      }),

      removeFavorite: (tabId) => set((state) => ({
        favorites: state.favorites.filter(f => f.tabId !== tabId)
      })),

      isFavorite: (tabId) => {
        return get().favorites.some(f => f.tabId === tabId)
      },

      addPracticeRecord: (record) => set((state) => {
        const newRecord: PracticeRecord = {
          ...record,
          id: Date.now().toString()
        }
        
        const totalTime = (state.user?.totalPracticeTime || 0) + Math.floor(record.duration / 60)
        
        return {
          practiceRecords: [...state.practiceRecords, newRecord],
          user: state.user ? { ...state.user, totalPracticeTime: totalTime } : null
        }
      }),

      getPracticeStats: () => {
        const records = get().practiceRecords
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

        const totalTime = records.reduce((sum, r) => sum + r.duration, 0)
        const todayTime = records
          .filter(r => new Date(r.date) >= today)
          .reduce((sum, r) => sum + r.duration, 0)
        const weekTime = records
          .filter(r => new Date(r.date) >= weekAgo)
          .reduce((sum, r) => sum + r.duration, 0)

        // Calculate streak
        const uniqueDays = new Set(
          records.map(r => new Date(r.date).toDateString())
        )
        let streak = 0
        const checkDate = new Date(today)
        while (uniqueDays.has(checkDate.toDateString())) {
          streak++
          checkDate.setDate(checkDate.getDate() - 1)
        }

        return {
          totalTime: Math.floor(totalTime / 60),
          todayTime: Math.floor(todayTime / 60),
          weekTime: Math.floor(weekTime / 60),
          streak,
          totalSessions: records.length
        }
      },

      getTabPracticeCount: (tabId) => {
        return get().practiceRecords.filter(r => r.tabId === tabId).length
      },

      unlockAchievement: (achievementId) => set((state) => {
        if (!state.user) return state
        if (state.user.achievements.some(a => a.id === achievementId)) return state
        
        const achievement: Achievement = {
          id: achievementId,
          name: getAchievementName(achievementId),
          description: getAchievementDescription(achievementId),
          icon: getAchievementIcon(achievementId),
          unlockedAt: new Date().toISOString()
        }
        
        return {
          user: {
            ...state.user,
            achievements: [...state.user.achievements, achievement]
          }
        }
      })
    }),
    {
      name: 'guitar-practice-user',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      }
    }
  )
)

// Achievement helpers
function getAchievementName(id: string): string {
  const names: Record<string, string> = {
    'first-practice': '初次练习',
    'week-streak': '周连续练习',
    'month-streak': '月连续练习',
    'speed-master': '速度大师',
    'song-collector': '歌曲收藏家',
    'practice-100': '百小时练习',
    'tuner-pro': '调音达人',
    'chord-master': '和弦大师'
  }
  return names[id] || id
}

function getAchievementDescription(id: string): string {
  const descriptions: Record<string, string> = {
    'first-practice': '完成第一次练习',
    'week-streak': '连续7天练习',
    'month-streak': '连续30天练习',
    'speed-master': '以150%速度完成一首歌',
    'song-collector': '收藏10首曲谱',
    'practice-100': '累计练习100小时',
    'tuner-pro': '使用调音器50次',
    'chord-master': '掌握所有基础和弦'
  }
  return descriptions[id] || ''
}

function getAchievementIcon(id: string): string {
  const icons: Record<string, string> = {
    'first-practice': 'play',
    'week-streak': 'flame',
    'month-streak': 'trophy',
    'speed-master': 'zap',
    'song-collector': 'heart',
    'practice-100': 'clock',
    'tuner-pro': 'music',
    'chord-master': 'star'
  }
  return icons[id] || 'award'
}
