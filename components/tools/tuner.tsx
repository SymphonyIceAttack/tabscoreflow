"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Mic, MicOff, Volume2 } from "lucide-react"

// 标准吉他调音频率
const STANDARD_TUNING = [
  { note: "E2", frequency: 82.41, string: 6 },
  { note: "A2", frequency: 110.0, string: 5 },
  { note: "D3", frequency: 146.83, string: 4 },
  { note: "G3", frequency: 196.0, string: 3 },
  { note: "B3", frequency: 246.94, string: 2 },
  { note: "E4", frequency: 329.63, string: 1 },
]

// 所有音符频率
const ALL_NOTES = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
]

function frequencyToNote(frequency: number): { note: string; octave: number; cents: number } {
  const A4 = 440
  const C0 = A4 * Math.pow(2, -4.75)
  
  if (frequency <= 0) {
    return { note: "—", octave: 0, cents: 0 }
  }
  
  const halfStepsFromC0 = 12 * Math.log2(frequency / C0)
  const octave = Math.floor(halfStepsFromC0 / 12)
  const noteIndex = Math.round(halfStepsFromC0) % 12
  const exactHalfSteps = halfStepsFromC0
  const roundedHalfSteps = Math.round(exactHalfSteps)
  const cents = Math.round((exactHalfSteps - roundedHalfSteps) * 100)
  
  return {
    note: ALL_NOTES[noteIndex < 0 ? noteIndex + 12 : noteIndex],
    octave,
    cents
  }
}

function findClosestString(frequency: number): typeof STANDARD_TUNING[0] | null {
  if (frequency <= 0) return null
  
  let closest = STANDARD_TUNING[0]
  let minDiff = Math.abs(frequency - closest.frequency)
  
  for (const string of STANDARD_TUNING) {
    const diff = Math.abs(frequency - string.frequency)
    if (diff < minDiff) {
      minDiff = diff
      closest = string
    }
  }
  
  // 只有在频率接近某个弦的时候才返回
  const cents = Math.abs(1200 * Math.log2(frequency / closest.frequency))
  if (cents < 100) {
    return closest
  }
  
  return null
}

export function Tuner() {
  const [isListening, setIsListening] = useState(false)
  const [frequency, setFrequency] = useState(0)
  const [volume, setVolume] = useState(0)
  const [selectedString, setSelectedString] = useState<number | null>(null)
  
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const animationRef = useRef<number | null>(null)
  
  const noteInfo = frequencyToNote(frequency)
  const closestString = findClosestString(frequency)
  
  // 自相关函数检测音高
  const autoCorrelate = useCallback((buffer: Float32Array, sampleRate: number): number => {
    const SIZE = buffer.length
    const MAX_SAMPLES = Math.floor(SIZE / 2)
    let bestOffset = -1
    let bestCorrelation = 0
    let rms = 0
    
    // 计算 RMS
    for (let i = 0; i < SIZE; i++) {
      const val = buffer[i]
      rms += val * val
    }
    rms = Math.sqrt(rms / SIZE)
    
    if (rms < 0.01) return -1 // 信号太弱
    
    let lastCorrelation = 1
    for (let offset = 0; offset < MAX_SAMPLES; offset++) {
      let correlation = 0
      
      for (let i = 0; i < MAX_SAMPLES; i++) {
        correlation += Math.abs(buffer[i] - buffer[i + offset])
      }
      
      correlation = 1 - correlation / MAX_SAMPLES
      
      if (correlation > 0.9 && correlation > lastCorrelation) {
        if (correlation > bestCorrelation) {
          bestCorrelation = correlation
          bestOffset = offset
        }
      }
      
      lastCorrelation = correlation
    }
    
    if (bestCorrelation > 0.01 && bestOffset > 0) {
      return sampleRate / bestOffset
    }
    
    return -1
  }, [])
  
  const analyze = useCallback(() => {
    if (!analyserRef.current || !audioContextRef.current) return
    
    const analyser = analyserRef.current
    const bufferLength = analyser.fftSize
    const buffer = new Float32Array(bufferLength)
    
    analyser.getFloatTimeDomainData(buffer)
    
    // 计算音量
    let sum = 0
    for (let i = 0; i < bufferLength; i++) {
      sum += buffer[i] * buffer[i]
    }
    const rms = Math.sqrt(sum / bufferLength)
    setVolume(Math.min(1, rms * 10))
    
    // 检测频率
    const detectedFrequency = autoCorrelate(buffer, audioContextRef.current.sampleRate)
    
    if (detectedFrequency > 60 && detectedFrequency < 1000) {
      setFrequency(detectedFrequency)
    }
    
    animationRef.current = requestAnimationFrame(analyze)
  }, [autoCorrelate])
  
  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        }
      })
      
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 4096
      
      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)
      
      mediaStreamRef.current = stream
      setIsListening(true)
      
      analyze()
    } catch {
      console.error("无法访问麦克风")
    }
  }
  
  const stopListening = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close()
    }
    
    setIsListening(false)
    setFrequency(0)
    setVolume(0)
  }
  
  useEffect(() => {
    return () => {
      stopListening()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  // 播放参考音
  const playReferenceNote = (freq: number) => {
    const audioContext = new AudioContext()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.type = "sine"
    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime)
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5)
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 1.5)
  }
  
  const getTuningStatus = () => {
    if (!closestString) return "waiting"
    
    const targetFreq = closestString.frequency
    const cents = 1200 * Math.log2(frequency / targetFreq)
    
    if (Math.abs(cents) < 5) return "perfect"
    if (Math.abs(cents) < 15) return "close"
    if (cents < 0) return "flat"
    return "sharp"
  }
  
  const tuningStatus = getTuningStatus()
  
  return (
    <div className="space-y-6">
      {/* 主调音表盘 */}
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-lg text-muted-foreground">调音器</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 音高显示 */}
          <div className="text-center space-y-2">
            <div className={cn(
              "text-8xl font-bold transition-colors",
              tuningStatus === "perfect" && "text-green-500",
              tuningStatus === "close" && "text-amber-500",
              tuningStatus === "flat" && "text-blue-500",
              tuningStatus === "sharp" && "text-red-500",
              tuningStatus === "waiting" && "text-muted-foreground"
            )}>
              {noteInfo.note}
              {noteInfo.octave > 0 && (
                <span className="text-4xl align-top ml-1">{noteInfo.octave}</span>
              )}
            </div>
            
            <div className="text-sm text-muted-foreground">
              {frequency > 0 ? `${frequency.toFixed(1)} Hz` : "等待输入..."}
            </div>
          </div>
          
          {/* 音准指示器 */}
          <div className="relative h-12 bg-muted/30 rounded-full overflow-hidden">
            {/* 刻度 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-px h-8 bg-green-500" />
            </div>
            <div className="absolute inset-0 flex items-center justify-between px-8">
              <span className="text-xs text-muted-foreground">低</span>
              <span className="text-xs text-muted-foreground">高</span>
            </div>
            
            {/* 指针 */}
            {frequency > 0 && (
              <div 
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full transition-all duration-100",
                  tuningStatus === "perfect" && "bg-green-500",
                  tuningStatus === "close" && "bg-amber-500",
                  tuningStatus === "flat" && "bg-blue-500",
                  tuningStatus === "sharp" && "bg-red-500"
                )}
                style={{
                  left: `${50 + Math.max(-40, Math.min(40, noteInfo.cents * 0.8))}%`,
                  transform: "translate(-50%, -50%)"
                }}
              />
            )}
          </div>
          
          {/* 音准偏差 */}
          <div className="text-center">
            <span className={cn(
              "text-2xl font-mono",
              tuningStatus === "perfect" && "text-green-500",
              tuningStatus === "close" && "text-amber-500",
              (tuningStatus === "flat" || tuningStatus === "sharp") && "text-muted-foreground"
            )}>
              {frequency > 0 ? (
                noteInfo.cents >= 0 ? `+${noteInfo.cents}` : noteInfo.cents
              ) : "—"}
              <span className="text-sm ml-1">cents</span>
            </span>
          </div>
          
          {/* 音量指示 */}
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-75"
                style={{ width: `${volume * 100}%` }}
              />
            </div>
          </div>
          
          {/* 控制按钮 */}
          <Button
            size="lg"
            className="w-full"
            variant={isListening ? "destructive" : "default"}
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? (
              <>
                <MicOff className="h-5 w-5 mr-2" />
                停止调音
              </>
            ) : (
              <>
                <Mic className="h-5 w-5 mr-2" />
                开始调音
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      {/* 吉他弦示意图 */}
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">标准调音</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {STANDARD_TUNING.map((string) => (
              <button
                key={string.string}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg transition-colors",
                  "hover:bg-muted/50",
                  selectedString === string.string && "bg-primary/10 border border-primary/50",
                  closestString?.string === string.string && isListening && (
                    tuningStatus === "perfect" ? "bg-green-500/10 border border-green-500/50" :
                    tuningStatus === "close" ? "bg-amber-500/10 border border-amber-500/50" :
                    "bg-muted/30"
                  )
                )}
                onClick={() => {
                  setSelectedString(string.string)
                  playReferenceNote(string.frequency)
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-mono text-sm">
                    {string.string}
                  </span>
                  <span className="font-medium">{string.note}</span>
                </div>
                <span className="text-sm text-muted-foreground font-mono">
                  {string.frequency.toFixed(2)} Hz
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            点击弦号播放参考音
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
