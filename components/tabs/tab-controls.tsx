'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePlayerStore } from '@/lib/stores/player-store'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Gauge,
  Settings,
  Maximize,
  Guitar,
  Music
} from 'lucide-react'

interface TabControlsProps {
  onSeek?: (time: number) => void
  onPlayPause?: () => void
  onStop?: () => void
  className?: string
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const speedPresets = [25, 50, 75, 100, 125, 150, 175, 200]

export function TabControls({
  onSeek,
  onPlayPause,
  onStop,
  className,
}: TabControlsProps) {
  const {
    isPlaying,
    currentTime,
    duration,
    speed,
    volume,
    isMuted,
    isLooping,
    loopStart,
    loopEnd,
    showFretboard,
    showChordDiagrams,
    togglePlay,
    setCurrentTime,
    setSpeed,
    setVolume,
    toggleMute,
    setLooping,
    clearLoop,
    toggleFretboard,
    toggleChordDiagrams,
  } = usePlayerStore()

  const handleSeek = (value: number[]) => {
    const time = value[0]
    setCurrentTime(time)
    onSeek?.(time)
  }

  const handlePlayPause = () => {
    togglePlay()
    onPlayPause?.()
  }

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed)
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  const hasLoop = loopStart !== null && loopEnd !== null

  return (
    <TooltipProvider>
      <div className={cn('space-y-3', className)}>
        {/* Progress bar */}
        <div className="space-y-1">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main controls */}
        <div className="flex items-center justify-between gap-4">
          {/* Left controls */}
          <div className="flex items-center gap-1">
            {/* Loop toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isLooping ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => hasLoop ? clearLoop() : setLooping(!isLooping)}
                  className={cn(isLooping && 'text-primary')}
                >
                  {hasLoop ? <Repeat1 className="h-4 w-4" /> : <Repeat className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {hasLoop ? 'AB循环播放' : isLooping ? '关闭循环' : '开启循环'}
              </TooltipContent>
            </Tooltip>

            {/* Speed control */}
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-1 px-2">
                      <Gauge className="h-4 w-4" />
                      <span className="text-xs font-mono">{speed}%</span>
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>播放速度</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="start">
                {speedPresets.map(preset => (
                  <DropdownMenuItem
                    key={preset}
                    onClick={() => handleSpeedChange(preset)}
                    className={cn(speed === preset && 'bg-secondary')}
                  >
                    {preset}%
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Center playback controls */}
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSeek([Math.max(0, currentTime - 5)])}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>后退5秒</TooltipContent>
            </Tooltip>

            <Button
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSeek([Math.min(duration, currentTime + 5)])}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>前进5秒</TooltipContent>
            </Tooltip>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            {/* Volume */}
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={toggleMute}>
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isMuted ? '取消静音' : '静音'}</TooltipContent>
              </Tooltip>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={100}
                step={1}
                onValueChange={(v) => setVolume(v[0])}
                className="w-20"
              />
            </div>

            {/* Display options */}
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>显示设置</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={toggleFretboard}>
                  <Guitar className="h-4 w-4 mr-2" />
                  指板显示
                  {showFretboard && <span className="ml-auto text-primary">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleChordDiagrams}>
                  <Music className="h-4 w-4 mr-2" />
                  和弦图示
                  {showChordDiagrams && <span className="ml-auto text-primary">✓</span>}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Loop indicator */}
        {hasLoop && (
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-secondary/50 rounded-md py-1.5 px-3">
            <Repeat1 className="h-3.5 w-3.5 text-primary" />
            <span>
              AB循环: {formatTime(loopStart || 0)} - {formatTime(loopEnd || 0)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-5 px-2 text-xs"
              onClick={clearLoop}
            >
              取消
            </Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
