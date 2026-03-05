"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { PracticeSession } from "@/lib/types"

interface PracticeHeatmapProps {
  sessions: PracticeSession[]
}

// 生成过去一年的日期
function generateYearDates(): Date[] {
  const dates: Date[] = []
  const today = new Date()
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
  
  // 从一年前的周日开始
  const start = new Date(oneYearAgo)
  start.setDate(start.getDate() - start.getDay())
  
  const current = new Date(start)
  while (current <= today) {
    dates.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  
  return dates
}

// 格式化日期为 YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]
}

// 获取练习强度级别 (0-4)
function getIntensityLevel(minutes: number): number {
  if (minutes === 0) return 0
  if (minutes < 15) return 1
  if (minutes < 30) return 2
  if (minutes < 60) return 3
  return 4
}

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"]
const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

export function PracticeHeatmap({ sessions }: PracticeHeatmapProps) {
  const dates = useMemo(() => generateYearDates(), [])
  
  // 按日期汇总练习时长
  const practiceByDate = useMemo(() => {
    const map: Record<string, number> = {}
    sessions.forEach(session => {
      const dateStr = session.date.split("T")[0]
      map[dateStr] = (map[dateStr] || 0) + session.duration
    })
    return map
  }, [sessions])
  
  // 按周分组
  const weeks = useMemo(() => {
    const result: Date[][] = []
    let currentWeek: Date[] = []
    
    dates.forEach((date, index) => {
      currentWeek.push(date)
      if (date.getDay() === 6 || index === dates.length - 1) {
        result.push(currentWeek)
        currentWeek = []
      }
    })
    
    return result
  }, [dates])
  
  // 获取月份标签位置
  const monthLabels = useMemo(() => {
    const labels: { month: string; weekIndex: number }[] = []
    let lastMonth = -1
    
    weeks.forEach((week, weekIndex) => {
      const firstDayOfWeek = week[0]
      const month = firstDayOfWeek.getMonth()
      if (month !== lastMonth) {
        labels.push({ month: MONTHS[month], weekIndex })
        lastMonth = month
      }
    })
    
    return labels
  }, [weeks])
  
  // 统计数据
  const stats = useMemo(() => {
    const totalMinutes = Object.values(practiceByDate).reduce((a, b) => a + b, 0)
    const activeDays = Object.keys(practiceByDate).length
    const currentStreak = (() => {
      let streak = 0
      const today = new Date()
      const current = new Date(today)
      
      while (true) {
        const dateStr = formatDate(current)
        if (practiceByDate[dateStr]) {
          streak++
          current.setDate(current.getDate() - 1)
        } else {
          break
        }
      }
      return streak
    })()
    
    return { totalMinutes, activeDays, currentStreak }
  }, [practiceByDate])
  
  return (
    <div className="space-y-4">
      {/* 统计概览 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 rounded-lg bg-muted/30">
          <div className="text-2xl font-bold">{Math.round(stats.totalMinutes / 60)}</div>
          <div className="text-xs text-muted-foreground">总练习小时</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/30">
          <div className="text-2xl font-bold">{stats.activeDays}</div>
          <div className="text-xs text-muted-foreground">练习天数</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/30">
          <div className="text-2xl font-bold">{stats.currentStreak}</div>
          <div className="text-xs text-muted-foreground">当前连续</div>
        </div>
      </div>
      
      {/* 热力图 */}
      <div className="overflow-x-auto">
        <div className="min-w-[750px]">
          {/* 月份标签 */}
          <div className="flex mb-1 text-xs text-muted-foreground pl-8">
            {monthLabels.map(({ month, weekIndex }) => (
              <div
                key={`${month}-${weekIndex}`}
                className="absolute"
                style={{ left: `calc(32px + ${weekIndex * 14}px)` }}
              >
                {month}
              </div>
            ))}
          </div>
          
          <div className="flex gap-0.5 mt-6">
            {/* 星期标签 */}
            <div className="flex flex-col gap-0.5 mr-1 text-xs text-muted-foreground">
              {WEEKDAYS.map((day, i) => (
                <div key={day} className={cn("h-3 flex items-center", i % 2 === 1 && "invisible")}>
                  {day}
                </div>
              ))}
            </div>
            
            {/* 日期格子 */}
            <TooltipProvider>
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-0.5">
                  {/* 填充空白格子使周日在顶部 */}
                  {weekIndex === 0 && week[0].getDay() > 0 && (
                    Array.from({ length: week[0].getDay() }).map((_, i) => (
                      <div key={`empty-${i}`} className="w-3 h-3" />
                    ))
                  )}
                  
                  {week.map((date) => {
                    const dateStr = formatDate(date)
                    const minutes = practiceByDate[dateStr] || 0
                    const level = getIntensityLevel(minutes)
                    
                    return (
                      <Tooltip key={dateStr}>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              "w-3 h-3 rounded-sm transition-colors cursor-pointer",
                              level === 0 && "bg-muted/30",
                              level === 1 && "bg-green-900/40",
                              level === 2 && "bg-green-700/60",
                              level === 3 && "bg-green-500/80",
                              level === 4 && "bg-green-400"
                            )}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-sm">
                            <div className="font-medium">{dateStr}</div>
                            <div className="text-muted-foreground">
                              {minutes > 0 ? `${minutes} 分钟练习` : "无练习记录"}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </div>
              ))}
            </TooltipProvider>
          </div>
          
          {/* 图例 */}
          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
            <span>少</span>
            <div className="w-3 h-3 rounded-sm bg-muted/30" />
            <div className="w-3 h-3 rounded-sm bg-green-900/40" />
            <div className="w-3 h-3 rounded-sm bg-green-700/60" />
            <div className="w-3 h-3 rounded-sm bg-green-500/80" />
            <div className="w-3 h-3 rounded-sm bg-green-400" />
            <span>多</span>
          </div>
        </div>
      </div>
    </div>
  )
}
