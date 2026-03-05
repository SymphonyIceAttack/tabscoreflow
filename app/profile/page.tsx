"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PracticeHeatmap } from "@/components/profile/practice-heatmap"
import { Achievements } from "@/components/profile/achievements"
import { TabCard } from "@/components/tabs/tab-card"
import { useUserStore } from "@/lib/stores/user-store"
import { tabs } from "@/lib/data/tabs"
import { 
  Heart, 
  Clock, 
  Trophy, 
  Music,
  Settings,
  LogOut,
  Target,
  TrendingUp
} from "lucide-react"
import type { Achievement, PracticeSession } from "@/lib/types"

// 模拟成就数据
const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-practice",
    name: "初次练习",
    description: "完成第一次练习",
    icon: "music",
    unlockedAt: "2024-01-15",
  },
  {
    id: "week-streak",
    name: "一周坚持",
    description: "连续7天练习",
    icon: "flame",
    unlockedAt: "2024-02-01",
  },
  {
    id: "chord-master",
    name: "和弦大师",
    description: "学习50个和弦",
    icon: "guitar",
    unlockedAt: "2024-03-10",
  },
  {
    id: "month-streak",
    name: "月度坚持",
    description: "连续30天练习",
    icon: "flame",
    progress: 67,
  },
  {
    id: "100-hours",
    name: "百小时练习",
    description: "累计练习100小时",
    icon: "clock",
    progress: 45,
  },
  {
    id: "scale-explorer",
    name: "音阶探索者",
    description: "学习所有基础音阶",
    icon: "star",
    progress: 30,
  },
]

// 生成模拟练习数据
function generateMockSessions(): PracticeSession[] {
  const sessions: PracticeSession[] = []
  const today = new Date()
  
  for (let i = 0; i < 365; i++) {
    // 随机决定是否有练习
    if (Math.random() > 0.4) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      sessions.push({
        id: `session-${i}`,
        tabId: tabs[Math.floor(Math.random() * tabs.length)].id,
        date: date.toISOString(),
        duration: Math.floor(Math.random() * 90) + 10, // 10-100 分钟
        notes: "",
      })
    }
  }
  
  return sessions
}

export default function ProfilePage() {
  const { favorites, practiceHistory, totalPracticeTime, level, experience } = useUserStore()
  const [activeTab, setActiveTab] = useState("overview")
  
  // 获取收藏的曲谱
  const favoriteTabs = tabs.filter(tab => favorites.includes(tab.id))
  
  // 模拟练习数据
  const mockSessions = generateMockSessions()
  
  // 计算统计数据
  const stats = {
    totalHours: Math.round(totalPracticeTime / 60),
    favoritesCount: favorites.length,
    achievementsUnlocked: MOCK_ACHIEVEMENTS.filter(a => a.unlockedAt).length,
    currentStreak: 5, // 模拟数据
  }
  
  // 经验进度
  const experienceToNextLevel = level * 1000
  const experienceProgress = (experience / experienceToNextLevel) * 100
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* 用户信息头部 */}
        <Card className="bg-card/50 backdrop-blur border-border/50 mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* 头像 */}
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  吉
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold">吉他练习者</h1>
                <p className="text-muted-foreground mt-1">
                  热爱音乐，坚持每日练习
                </p>
                
                {/* 等级和经验 */}
                <div className="mt-4 max-w-xs sm:max-w-sm">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="flex items-center gap-1">
                      <Target className="h-4 w-4 text-primary" />
                      等级 {level}
                    </span>
                    <span className="text-muted-foreground">
                      {experience} / {experienceToNextLevel} XP
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${experienceProgress}%` }}
                    />
                  </div>
                </div>
                
                {/* 快捷统计 */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4">
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="h-3 w-3" />
                    {stats.totalHours} 小时练习
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Heart className="h-3 w-3" />
                    {stats.favoritesCount} 收藏
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Trophy className="h-3 w-3" />
                    {stats.achievementsUnlocked} 成就
                  </Badge>
                </div>
              </div>
              
              {/* 设置按钮 */}
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* 标签页 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">概览</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">收藏</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">记录</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">成就</span>
            </TabsTrigger>
          </TabsList>
          
          {/* 概览 */}
          <TabsContent value="overview" className="space-y-6">
            {/* 统计卡片 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6 text-center">
                  <Clock className="h-8 w-8 mx-auto text-primary mb-2" />
                  <div className="text-3xl font-bold">{stats.totalHours}</div>
                  <div className="text-sm text-muted-foreground">练习小时</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6 text-center">
                  <Music className="h-8 w-8 mx-auto text-primary mb-2" />
                  <div className="text-3xl font-bold">{practiceHistory.length}</div>
                  <div className="text-sm text-muted-foreground">练习曲谱</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6 text-center">
                  <Target className="h-8 w-8 mx-auto text-primary mb-2" />
                  <div className="text-3xl font-bold">{stats.currentStreak}</div>
                  <div className="text-sm text-muted-foreground">连续天数</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6 text-center">
                  <Trophy className="h-8 w-8 mx-auto text-primary mb-2" />
                  <div className="text-3xl font-bold">{stats.achievementsUnlocked}</div>
                  <div className="text-sm text-muted-foreground">已获成就</div>
                </CardContent>
              </Card>
            </div>
            
            {/* 练习热力图 */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>练习记录</CardTitle>
              </CardHeader>
              <CardContent>
                <PracticeHeatmap sessions={mockSessions} />
              </CardContent>
            </Card>
            
            {/* 最近练习 */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>最近练习</CardTitle>
              </CardHeader>
              <CardContent>
                {practiceHistory.length > 0 ? (
                  <div className="space-y-3">
                    {practiceHistory.slice(0, 5).map((record) => {
                      const tab = tabs.find(t => t.id === record.tabId)
                      if (!tab) return null
                      return (
                        <div
                          key={record.tabId}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                              <Music className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{tab.title}</div>
                              <div className="text-sm text-muted-foreground">{tab.artist}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm">{record.practiceCount} 次练习</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(record.lastPracticed).toLocaleDateString("zh-CN")}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Music className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>还没有练习记录</p>
                    <p className="text-sm">开始练习第一首曲子吧！</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 收藏 */}
          <TabsContent value="favorites">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>我的收藏</CardTitle>
              </CardHeader>
              <CardContent>
                {favoriteTabs.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favoriteTabs.map(tab => (
                      <TabCard key={tab.id} tab={tab} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Heart className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>还没有收藏任何曲谱</p>
                    <p className="text-sm">浏览曲谱库，找到喜欢的曲子收藏起来</p>
                    <Button className="mt-4" asChild>
                      <a href="/tabs">浏览曲谱库</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 练习记录 */}
          <TabsContent value="history">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>练习历史</CardTitle>
              </CardHeader>
              <CardContent>
                <PracticeHeatmap sessions={mockSessions} />
                
                {/* 详细记录列表 */}
                <div className="mt-8 space-y-4">
                  <h3 className="font-semibold">最近30天练习详情</h3>
                  <div className="space-y-2">
                    {mockSessions.slice(0, 10).map((session) => {
                      const tab = tabs.find(t => t.id === session.tabId)
                      return (
                        <div
                          key={session.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-sm text-muted-foreground w-24">
                              {new Date(session.date).toLocaleDateString("zh-CN")}
                            </div>
                            <div>
                              <div className="font-medium">{tab?.title || "未知曲目"}</div>
                              <div className="text-sm text-muted-foreground">{tab?.artist}</div>
                            </div>
                          </div>
                          <Badge variant="outline">{session.duration} 分钟</Badge>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 成就 */}
          <TabsContent value="achievements">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>成就系统</CardTitle>
              </CardHeader>
              <CardContent>
                <Achievements achievements={MOCK_ACHIEVEMENTS} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
