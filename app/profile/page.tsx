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

// Mock achievement data
const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-practice",
    name: "First Practice",
    description: "Complete your first practice session",
    icon: "music",
    unlockedAt: "2024-01-15",
  },
  {
    id: "week-streak",
    name: "Week Streak",
    description: "Practice for 7 days in a row",
    icon: "flame",
    unlockedAt: "2024-02-01",
  },
  {
    id: "chord-master",
    name: "Chord Master",
    description: "Learn 50 chords",
    icon: "guitar",
    unlockedAt: "2024-03-10",
  },
  {
    id: "month-streak",
    name: "Monthly Streak",
    description: "Practice for 30 days in a row",
    icon: "flame",
    progress: 67,
  },
  {
    id: "100-hours",
    name: "100 Hours",
    description: "Accumulate 100 hours of practice",
    icon: "clock",
    progress: 45,
  },
  {
    id: "scale-explorer",
    name: "Scale Explorer",
    description: "Learn all basic scales",
    icon: "star",
    progress: 30,
  },
]

// Generate mock practice data
function generateMockSessions(): PracticeSession[] {
  const sessions: PracticeSession[] = []
  const today = new Date()
  
  for (let i = 0; i < 365; i++) {
    // Randomly decide if there's practice
    if (Math.random() > 0.4) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      sessions.push({
        id: `session-${i}`,
        tabId: tabs[Math.floor(Math.random() * tabs.length)].id,
        date: date.toISOString(),
        duration: Math.floor(Math.random() * 90) + 10, // 10-100 minutes
        notes: "",
      })
    }
  }
  
  return sessions
}

export default function ProfilePage() {
  const { favorites, practiceRecords, user } = useUserStore()
  const [activeTab, setActiveTab] = useState("overview")
  
  // Get favorited tabs
  const favoriteTabs = tabs.filter(tab => favorites.some(f => f.tabId === tab.id))
  
  // Mock practice data
  const mockSessions = generateMockSessions()
  
  // Calculate stats
  const stats = {
    totalHours: Math.round((user?.totalPracticeTime || 0) / 60),
    favoritesCount: favorites.length,
    achievementsUnlocked: MOCK_ACHIEVEMENTS.filter(a => a.unlockedAt).length,
    currentStreak: 5, // Mock data
  }
  
  // Experience progress
  const levelValue = user?.level === 'beginner' ? 1 : user?.level === 'intermediate' ? 2 : user?.level === 'advanced' ? 3 : 4
  const experienceToNextLevel = levelValue * 1000
  const experienceProgress = 0
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* User Info Header */}
        <Card className="bg-card/50 backdrop-blur border-border/50 mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  G
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold">Guitar Practitioner</h1>
                <p className="text-muted-foreground mt-1">
                  Passionate about music, practicing daily
                </p>
                
                {/* Level and Experience */}
                <div className="mt-4 max-w-xs sm:max-w-sm">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="flex items-center gap-1">
                      <Target className="h-4 w-4 text-primary" />
                      Level {levelValue}
                    </span>
                    <span className="text-muted-foreground">
                      0 / {experienceToNextLevel} XP
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${experienceProgress}%` }}
                    />
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4">
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="h-3 w-3" />
                    {stats.totalHours} hours
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Heart className="h-3 w-3" />
                    {stats.favoritesCount} favorites
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Trophy className="h-3 w-3" />
                    {stats.achievementsUnlocked} achievements
                  </Badge>
                </div>
              </div>
              
              {/* Settings Buttons */}
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
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Favorites</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Achievements</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6 text-center">
                  <Clock className="h-8 w-8 mx-auto text-primary mb-2" />
                  <div className="text-3xl font-bold">{stats.totalHours}</div>
                  <div className="text-sm text-muted-foreground">Practice Hours</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6 text-center">
                  <Music className="h-8 w-8 mx-auto text-primary mb-2" />
                  <div className="text-3xl font-bold">{mockSessions.length}</div>
                  <div className="text-sm text-muted-foreground">Tabs Practiced</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6 text-center">
                  <Target className="h-8 w-8 mx-auto text-primary mb-2" />
                  <div className="text-3xl font-bold">{stats.currentStreak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6 text-center">
                  <Trophy className="h-8 w-8 mx-auto text-primary mb-2" />
                  <div className="text-3xl font-bold">{stats.achievementsUnlocked}</div>
                  <div className="text-sm text-muted-foreground">Achievements</div>
                </CardContent>
              </Card>
            </div>
            
            {/* Practice Heatmap */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>Practice Records</CardTitle>
              </CardHeader>
              <CardContent>
                <PracticeHeatmap sessions={mockSessions} />
              </CardContent>
            </Card>
            
            {/* Recent Practice */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>Recent Practice</CardTitle>
              </CardHeader>
              <CardContent>
                {mockSessions.length > 0 ? (
                  <div className="space-y-3">
                    {mockSessions.slice(0, 5).map((record: { tabId: string; duration: number; date: string }) => {
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
                            <div className="text-sm">{Math.floor(record.duration / 60)} min</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(record.date).toLocaleDateString("en-US")}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Music className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No practice records yet</p>
                    <p className="text-sm">Start practicing your first song!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Favorites */}
          <TabsContent value="favorites">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>My Favorites</CardTitle>
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
                    <p>No favorites yet</p>
                    <p className="text-sm">Browse the tab library to find songs you like</p>
                    <Button className="mt-4" asChild>
                      <a href="/tabs">Browse Tabs</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Practice History */}
          <TabsContent value="history">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>Practice History</CardTitle>
              </CardHeader>
              <CardContent>
                <PracticeHeatmap sessions={mockSessions} />
                
                {/* Detailed Records List */}
                <div className="mt-8 space-y-4">
                  <h3 className="font-semibold">Last 30 Days Practice Details</h3>
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
                              {new Date(session.date).toLocaleDateString("en-US")}
                            </div>
                            <div>
                              <div className="font-medium">{tab?.title || "Unknown"}</div>
                              <div className="text-sm text-muted-foreground">{tab?.artist}</div>
                            </div>
                          </div>
                          <Badge variant="outline">{session.duration} min</Badge>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Achievements */}
          <TabsContent value="achievements">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
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
