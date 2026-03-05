"use client"

import { useState, useMemo, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ScaleFretboard } from "@/components/scales/scale-fretboard"
import { scales, SCALE_CATEGORIES, ROOT_NOTES } from "@/lib/data/scales"
import { cn } from "@/lib/utils"
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react"
import type { Scale } from "@/lib/types"

const ALL_NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

// 移调音阶
function transposeScale(scale: Scale, newRoot: string): Scale {
  const rootIndex = ALL_NOTES.indexOf(scale.root)
  const newRootIndex = ALL_NOTES.indexOf(newRoot)
  const shift = newRootIndex - rootIndex
  
  const newNotes = scale.notes.map(note => {
    const noteIndex = ALL_NOTES.indexOf(note)
    return ALL_NOTES[(noteIndex + shift + 12) % 12]
  })
  
  return {
    ...scale,
    id: `${scale.id}-${newRoot}`,
    name: scale.name.replace(scale.root, newRoot),
    root: newRoot,
    notes: newNotes,
  }
}

export default function ScalesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Major")
  const [selectedRoot, setSelectedRoot] = useState<string>("C")
  const [selectedScale, setSelectedScale] = useState<Scale | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(120) // BPM
  
  const audioContextRef = useRef<AudioContext | null>(null)
  const playbackRef = useRef<number | null>(null)
  
  // 根据选择的根音过滤和转调音阶
  const availableScales = useMemo(() => {
    return scales
      .filter(s => s.category === selectedCategory)
      .map(s => transposeScale(s, selectedRoot))
  }, [selectedCategory, selectedRoot])
  
  // 当前选中的音阶（考虑移调）
  const currentScale = useMemo(() => {
    if (!selectedScale) {
      return availableScales[0] || null
    }
    // 找到对应的音阶并移调
    const baseScale = scales.find(s => s.id === selectedScale.id.split("-")[0])
    if (baseScale) {
      return transposeScale(baseScale, selectedRoot)
    }
    return selectedScale
  }, [selectedScale, selectedRoot, availableScales])
  
  // 获取音符频率
  const getNoteFrequency = (note: string, octave: number = 4): number => {
    const A4 = 440
    const noteIndex = ALL_NOTES.indexOf(note)
    const semitonesFromA4 = noteIndex - ALL_NOTES.indexOf("A") + (octave - 4) * 12
    return A4 * Math.pow(2, semitonesFromA4 / 12)
  }
  
  // 播放音阶
  const playScale = () => {
    if (!currentScale) return
    
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    
    const ctx = audioContextRef.current
    const interval = 60 / playbackSpeed // 每个音符的间隔（秒）
    
    setIsPlaying(true)
    
    // 播放上行音阶
    const notes = [...currentScale.notes, currentScale.notes[0]] // 加上高八度根音
    let index = 0
    
    const playNext = () => {
      if (index >= notes.length) {
        setIsPlaying(false)
        return
      }
      
      const note = notes[index]
      const octave = index === notes.length - 1 ? 5 : 4 // 最后一个音高八度
      const frequency = getNoteFrequency(note, octave)
      
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      osc.type = "triangle"
      osc.frequency.setValueAtTime(frequency, ctx.currentTime)
      
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + interval * 0.9)
      
      osc.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      osc.start()
      osc.stop(ctx.currentTime + interval)
      
      index++
      playbackRef.current = window.setTimeout(playNext, interval * 1000)
    }
    
    playNext()
  }
  
  const stopPlayback = () => {
    if (playbackRef.current) {
      clearTimeout(playbackRef.current)
    }
    setIsPlaying(false)
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">音阶练习器</h1>
          <p className="text-muted-foreground">
            学习各种音阶的指板把位，掌握即兴演奏的基础
          </p>
        </div>
        
        {/* 选择面板 */}
        <div className="max-w-4xl mx-auto mb-8 space-y-6">
          {/* 根音选择 */}
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">选择根音</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {ROOT_NOTES.map(root => (
                  <button
                    key={root}
                    onClick={() => setSelectedRoot(root)}
                    className={cn(
                      "w-12 h-12 rounded-lg font-bold transition-all",
                      selectedRoot === root
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-muted/50 hover:bg-muted"
                    )}
                  >
                    {root}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* 音阶类型选择 */}
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">音阶类型</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 分类标签 */}
              <div className="flex flex-wrap gap-2">
                {SCALE_CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category)
                      setSelectedScale(null)
                    }}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 hover:bg-muted"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* 该类型下的音阶 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {availableScales.map(scale => (
                  <button
                    key={scale.id}
                    onClick={() => setSelectedScale(scale)}
                    className={cn(
                      "p-3 rounded-lg text-left transition-all",
                      currentScale?.id === scale.id
                        ? "bg-secondary ring-2 ring-primary"
                        : "bg-muted/30 hover:bg-muted/50"
                    )}
                  >
                    <div className="font-medium text-sm">{scale.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {scale.notes.join(" - ")}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* 音阶显示 */}
        {currentScale && (
          <div className="max-w-6xl mx-auto space-y-6">
            {/* 音阶信息 */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">{currentScale.name}</h2>
                    {currentScale.description && (
                      <p className="text-muted-foreground mt-1">{currentScale.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="secondary">{currentScale.category}</Badge>
                      <Badge variant="outline">{currentScale.notes.length} 音</Badge>
                    </div>
                  </div>
                  
                  {/* 播放控制 */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant={isPlaying ? "destructive" : "default"}
                      onClick={isPlaying ? stopPlayback : playScale}
                      className="gap-2"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-4 w-4" />
                          停止
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          播放音阶
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* 速度控制 */}
                <div className="flex items-center gap-4 mb-6 max-w-md">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground w-16">{playbackSpeed} BPM</span>
                  <Slider
                    value={[playbackSpeed]}
                    onValueChange={([v]) => setPlaybackSpeed(v)}
                    min={40}
                    max={200}
                    step={5}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setPlaybackSpeed(120)}
                    className="h-8 w-8"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* 音符和音程 */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="text-sm text-muted-foreground">音符：</span>
                  <div className="flex flex-wrap gap-2">
                    {currentScale.notes.map((note, i) => (
                      <div key={i} className="text-center">
                        <Badge 
                          variant={i === 0 ? "default" : "secondary"}
                          className="mb-1"
                        >
                          {note}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {currentScale.intervals[i]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 指板图 */}
                <ScaleFretboard scale={currentScale} highlightRoot />
              </CardContent>
            </Card>
            
            {/* 使用提示 */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">练习建议</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">1.</span>
                    先从低速开始，确保每个音符都弹准确
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">2.</span>
                    练习上行和下行，建立肌肉记忆
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">3.</span>
                    尝试不同的把位，熟悉整个指板
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">4.</span>
                    配合节拍器练习，保持稳定的节奏
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">5.</span>
                    尝试即兴创作简单的旋律
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
