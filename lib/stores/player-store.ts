'use client'

import { create } from 'zustand'

interface PlayerState {
  // Playback state
  isPlaying: boolean
  currentTime: number
  duration: number
  speed: number
  volume: number
  isMuted: boolean
  
  // Loop state
  isLooping: boolean
  loopStart: number | null
  loopEnd: number | null
  
  // Current tab info
  currentTabId: string | null
  currentTabTitle: string | null
  
  // Display options
  showFretboard: boolean
  showChordDiagrams: boolean
  autoScroll: boolean
  
  // Actions
  setIsPlaying: (isPlaying: boolean) => void
  togglePlay: () => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setSpeed: (speed: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  setLooping: (isLooping: boolean) => void
  setLoopPoints: (start: number | null, end: number | null) => void
  clearLoop: () => void
  setCurrentTab: (id: string | null, title: string | null) => void
  toggleFretboard: () => void
  toggleChordDiagrams: () => void
  toggleAutoScroll: () => void
  reset: () => void
}

const initialState = {
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  speed: 100,
  volume: 80,
  isMuted: false,
  isLooping: false,
  loopStart: null,
  loopEnd: null,
  currentTabId: null,
  currentTabTitle: null,
  showFretboard: true,
  showChordDiagrams: true,
  autoScroll: true
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  ...initialState,

  setIsPlaying: (isPlaying) => set({ isPlaying }),
  
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setCurrentTime: (currentTime) => set({ currentTime }),

  setDuration: (duration) => set({ duration }),

  setSpeed: (speed) => set({ speed: Math.max(25, Math.min(200, speed)) }),

  setVolume: (volume) => set({ volume: Math.max(0, Math.min(100, volume)) }),

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  setLooping: (isLooping) => set({ isLooping }),

  setLoopPoints: (loopStart, loopEnd) => set({ loopStart, loopEnd, isLooping: true }),

  clearLoop: () => set({ loopStart: null, loopEnd: null, isLooping: false }),

  setCurrentTab: (currentTabId, currentTabTitle) => set({ currentTabId, currentTabTitle }),

  toggleFretboard: () => set((state) => ({ showFretboard: !state.showFretboard })),

  toggleChordDiagrams: () => set((state) => ({ showChordDiagrams: !state.showChordDiagrams })),

  toggleAutoScroll: () => set((state) => ({ autoScroll: !state.autoScroll })),

  reset: () => set(initialState)
}))
