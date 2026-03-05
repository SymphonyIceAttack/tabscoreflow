"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { Achievement } from "@/lib/types"
import { 
  Trophy, 
  Flame, 
  Music, 
  Guitar, 
  Star, 
  Target, 
  Clock, 
  Zap,
  Award,
  Crown
} from "lucide-react"

interface AchievementsProps {
  achievements: Achievement[]
}

const ACHIEVEMENT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "first-practice": Music,
  "week-streak": Flame,
  "month-streak": Flame,
  "100-hours": Clock,
  "chord-master": Guitar,
  "scale-explorer": Star,
  "perfect-tuning": Target,
  "speed-demon": Zap,
  "dedication": Award,
  "virtuoso": Crown,
  "default": Trophy,
}

export function Achievements({ achievements }: AchievementsProps) {
  // 按解锁状态分组
  const unlocked = achievements.filter(a => a.unlockedAt)
  const locked = achievements.filter(a => !a.unlockedAt)
  
  return (
    <div className="space-y-6">
      {/* 已解锁成就 */}
      {unlocked.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">已获得</h3>
            <Badge variant="secondary">{unlocked.length} / {achievements.length}</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {unlocked.map((achievement) => {
              const Icon = ACHIEVEMENT_ICONS[achievement.id] || ACHIEVEMENT_ICONS.default
              return (
                <div
                  key={achievement.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{achievement.name}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {achievement.description}
                    </div>
                    {achievement.unlockedAt && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(achievement.unlockedAt).toLocaleDateString("zh-CN")} 获得
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
      
      {/* 未解锁成就 */}
      {locked.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">待解锁</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {locked.map((achievement) => {
              const Icon = ACHIEVEMENT_ICONS[achievement.id] || ACHIEVEMENT_ICONS.default
              return (
                <div
                  key={achievement.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl",
                    "bg-muted/20 border border-border/50 opacity-60"
                  )}
                >
                  <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{achievement.name}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {achievement.description}
                    </div>
                    {achievement.progress !== undefined && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>进度</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary/50 transition-all"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
