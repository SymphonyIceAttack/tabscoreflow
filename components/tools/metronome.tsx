"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { Play, Pause, Minus, Plus, Volume2 } from "lucide-react"

const TIME_SIGNATURES = [
  { beats: 2, noteValue: 4, label: "2/4" },
  { beats: 3, noteValue: 4, label: "3/4" },
  { beats: 4, noteValue: 4, label: "4/4" },
  { beats: 6, noteValue: 8, label: "6/8" },
]

const TEMPO_MARKINGS = [
  { min: 20, max: 40, name: "Grave" },
  { min: 40, max: 60, name: "Largo" },
  { min: 60, max: 66, name: "Larghetto" },
  { min: 66, max: 76, name: "Adagio" },
  { min: 76, max: 108, name: "Andante" },
  { min: 108, max: 120, name: "Moderato" },
  { min: 120, max: 168, name: "Allegro" },
  { min: 168, max: 200, name: "Presto" },
  { min: 200, max: 300, name: "Prestissimo" },
]

function getTempoMarking(bpm: number): string {
  for (const marking of TEMPO_MARKINGS) {
    if (bpm >= marking.min && bpm < marking.max) {
      return marking.name
    }
  }
  return "Prestissimo"
}

export function Metronome() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [bpm, setBpm] = useState(120)
  const [currentBeat, setCurrentBeat] = useState(0)
  const [timeSignature, setTimeSignature] = useState(TIME_SIGNATURES[2]) // 4/4
  const [volume, setVolume] = useState(0.7)
  const [accentFirst, setAccentFirst] = useState(true)
  
  const audioContextRef = useRef<AudioContext | null>(null)
  const nextNoteTimeRef = useRef(0)
  const currentBeatRef = useRef(0)
  const timerIdRef = useRef<number | null>(null)
  const isPlayingRef = useRef(false)
  
  const scheduleNote = useCallback((time: number, isAccent: boolean) => {
    if (!audioContextRef.current) return
    
    const osc = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()
    
    osc.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)
    
    // 重音用更高的频率
    osc.frequency.value = isAccent && accentFirst ? 1000 : 800
    osc.type = "sine"
    
    gainNode.gain.setValueAtTime(volume, time)
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.05)
    
    osc.start(time)
    osc.stop(time + 0.05)
  }, [volume, accentFirst])
  
  const scheduler = useCallback(() => {
    if (!audioContextRef.current || !isPlayingRef.current) return
    
    const secondsPerBeat = 60.0 / bpm
    const scheduleAheadTime = 0.1 // 提前调度时间
    
    while (nextNoteTimeRef.current < audioContextRef.current.currentTime + scheduleAheadTime) {
      const isAccent = currentBeatRef.current === 0
      scheduleNote(nextNoteTimeRef.current, isAccent)
      
      // 更新 UI 状态
      const beatToSet = currentBeatRef.current
      setCurrentBeat(beatToSet)
      
      // 移动到下一拍
      nextNoteTimeRef.current += secondsPerBeat
      currentBeatRef.current = (currentBeatRef.current + 1) % timeSignature.beats
    }
    
    timerIdRef.current = window.setTimeout(scheduler, 25)
  }, [bpm, timeSignature.beats, scheduleNote])
  
  const startMetronome = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume()
    }
    
    isPlayingRef.current = true
    currentBeatRef.current = 0
    nextNoteTimeRef.current = audioContextRef.current.currentTime
    
    setIsPlaying(true)
    scheduler()
  }, [scheduler])
  
  const stopMetronome = useCallback(() => {
    isPlayingRef.current = false
    setIsPlaying(false)
    setCurrentBeat(0)
    
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current)
      timerIdRef.current = null
    }
  }, [])
  
  const toggleMetronome = () => {
    if (isPlaying) {
      stopMetronome()
    } else {
      startMetronome()
    }
  }
  
  const adjustBpm = (delta: number) => {
    setBpm(prev => Math.max(20, Math.min(300, prev + delta)))
  }
  
  // 清理
  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current)
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])
  
  // 当 BPM 改变时重启节拍器以应用新速度
  useEffect(() => {
    if (isPlaying) {
      stopMetronome()
      startMetronome()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bpm, timeSignature])
  
  const tempoMarking = getTempoMarking(bpm)
  
  return (
    <div className="space-y-6">
      {/* 主节拍显示 */}
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-lg text-muted-foreground">节拍器</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* BPM 显示 */}
          <div className="text-center space-y-1">
            <div className="text-8xl font-bold tabular-nums text-foreground">
              {bpm}
            </div>
            <div className="text-sm text-muted-foreground">
              BPM · {tempoMarking}
            </div>
          </div>
          
          {/* 节拍指示器 */}
          <div className="flex justify-center gap-3">
            {Array.from({ length: timeSignature.beats }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-6 h-6 rounded-full transition-all duration-100",
                  currentBeat === i && isPlaying
                    ? i === 0
                      ? "bg-primary scale-125 shadow-lg shadow-primary/50"
                      : "bg-primary/70 scale-110"
                    : "bg-muted/50"
                )}
              />
            ))}
          </div>
          
          {/* BPM 调节 */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => adjustBpm(-5)}
              className="h-12 w-12 rounded-full"
            >
              <Minus className="h-5 w-5" />
            </Button>
            
            <Slider
              value={[bpm]}
              onValueChange={([value]) => setBpm(value)}
              min={20}
              max={300}
              step={1}
              className="flex-1"
            />
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => adjustBpm(5)}
              className="h-12 w-12 rounded-full"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          
          {/* 播放按钮 */}
          <Button
            size="lg"
            className={cn(
              "w-full h-14 text-lg transition-all",
              isPlaying && "bg-primary/90"
            )}
            onClick={toggleMetronome}
          >
            {isPlaying ? (
              <>
                <Pause className="h-6 w-6 mr-2" />
                停止
              </>
            ) : (
              <>
                <Play className="h-6 w-6 mr-2" />
                开始
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      {/* 设置 */}
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 拍号选择 */}
          <div className="space-y-3">
            <label className="text-sm text-muted-foreground">拍号</label>
            <div className="grid grid-cols-4 gap-2">
              {TIME_SIGNATURES.map((ts) => (
                <button
                  key={ts.label}
                  className={cn(
                    "p-3 rounded-lg text-center transition-colors",
                    timeSignature.label === ts.label
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 hover:bg-muted"
                  )}
                  onClick={() => setTimeSignature(ts)}
                >
                  <span className="text-lg font-bold">{ts.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* 音量 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-muted-foreground">音量</label>
              <span className="text-sm text-muted-foreground">
                {Math.round(volume * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[volume]}
                onValueChange={([value]) => setVolume(value)}
                min={0}
                max={1}
                step={0.01}
                className="flex-1"
              />
            </div>
          </div>
          
          {/* 重音开关 */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">首拍重音</div>
              <div className="text-xs text-muted-foreground">每小节第一拍使用更高音调</div>
            </div>
            <Button
              variant={accentFirst ? "default" : "outline"}
              size="sm"
              onClick={() => setAccentFirst(!accentFirst)}
            >
              {accentFirst ? "开启" : "关闭"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* 常用速度预设 */}
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">速度预设</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {[60, 80, 100, 120, 140, 160].map((preset) => (
              <button
                key={preset}
                className={cn(
                  "p-3 rounded-lg text-center transition-colors",
                  bpm === preset
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 hover:bg-muted"
                )}
                onClick={() => setBpm(preset)}
              >
                <div className="text-lg font-bold">{preset}</div>
                <div className="text-xs text-inherit opacity-70">
                  {getTempoMarking(preset)}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
