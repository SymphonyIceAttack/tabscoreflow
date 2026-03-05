"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { challenges, leaderboard, forumPosts, FORUM_CATEGORIES } from "@/lib/data/community"
import { cn } from "@/lib/utils"
import { 
  Trophy, 
  Flame, 
  MessageSquare, 
  Target,
  Users,
  Clock,
  ThumbsUp,
  Eye,
  Search,
  Pin,
  ChevronRight,
  Medal,
  Star
} from "lucide-react"
import Link from "next/link"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("challenges")
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [searchQuery, setSearchQuery] = useState("")
  
  // 过滤帖子
  const filteredPosts = forumPosts.filter(post => {
    if (selectedCategory !== "全部" && post.category !== selectedCategory) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return post.title.toLowerCase().includes(query) || 
             post.content.toLowerCase().includes(query)
    }
    return true
  }).sort((a, b) => {
    // 置顶帖子优先
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">学习社区</h1>
          <p className="text-muted-foreground">
            与全球吉他爱好者交流学习，一起进步
          </p>
        </div>
        
        {/* 主标签页 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="challenges" className="gap-2">
              <Target className="h-4 w-4" />
              学习挑战
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="gap-2">
              <Trophy className="h-4 w-4" />
              排行榜
            </TabsTrigger>
            <TabsTrigger value="forum" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              问答论坛
            </TabsTrigger>
          </TabsList>
          
          {/* 学习挑战 */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {challenges.map((challenge) => {
                const completedTasks = challenge.tasks.filter(t => t.completed).length
                const progress = (completedTasks / challenge.tasks.length) * 100
                
                return (
                  <Card key={challenge.id} className="bg-card/50 backdrop-blur border-border/50 overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <Badge variant={challenge.type === "daily" ? "default" : "secondary"}>
                          {challenge.type === "daily" ? "每日" : "每周"}挑战
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {challenge.participants.toLocaleString()}
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-2">{challenge.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* 进度条 */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">进度</span>
                          <span className="font-medium">{completedTasks}/{challenge.tasks.length}</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      
                      {/* 任务列表预览 */}
                      <div className="space-y-2">
                        {challenge.tasks.slice(0, 3).map((task, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <div className={cn(
                              "w-5 h-5 rounded-full flex items-center justify-center text-xs",
                              task.completed 
                                ? "bg-green-500 text-white" 
                                : "bg-muted text-muted-foreground"
                            )}>
                              {task.completed ? "✓" : i + 1}
                            </div>
                            <span className={cn(
                              task.completed && "line-through text-muted-foreground"
                            )}>
                              {task.task}
                            </span>
                          </div>
                        ))}
                        {challenge.tasks.length > 3 && (
                          <div className="text-sm text-muted-foreground pl-7">
                            还有 {challenge.tasks.length - 3} 个任务...
                          </div>
                        )}
                      </div>
                      
                      {/* 奖励 */}
                      <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 text-amber-500" />
                          <span>{challenge.rewards.experience} XP</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Medal className="h-4 w-4 text-primary" />
                          <span>专属徽章</span>
                        </div>
                      </div>
                      
                      <Button className="w-full">
                        {progress > 0 ? "继续挑战" : "参加挑战"}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
          
          {/* 排行榜 */}
          <TabsContent value="leaderboard">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  练习时长排行榜
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={entry.userId}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl transition-colors",
                        index < 3 ? "bg-gradient-to-r" : "bg-muted/30",
                        index === 0 && "from-amber-500/20 to-amber-500/5 border border-amber-500/30",
                        index === 1 && "from-zinc-400/20 to-zinc-400/5 border border-zinc-400/30",
                        index === 2 && "from-orange-600/20 to-orange-600/5 border border-orange-600/30"
                      )}
                    >
                      {/* 排名 */}
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold",
                        index === 0 && "bg-amber-500 text-white",
                        index === 1 && "bg-zinc-400 text-white",
                        index === 2 && "bg-orange-600 text-white",
                        index > 2 && "bg-muted text-muted-foreground"
                      )}>
                        {entry.rank}
                      </div>
                      
                      {/* 用户信息 */}
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={entry.avatar} />
                        <AvatarFallback>{entry.username[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{entry.username}</span>
                          <Badge variant="outline" className="text-xs">
                            Lv.{entry.level}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {Math.round(entry.totalPracticeTime / 60)}h
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="h-3 w-3 text-orange-500" />
                            {entry.streak}天连续
                          </span>
                        </div>
                      </div>
                      
                      {/* 奖杯图标 */}
                      {index < 3 && (
                        <Trophy className={cn(
                          "h-6 w-6",
                          index === 0 && "text-amber-500",
                          index === 1 && "text-zinc-400",
                          index === 2 && "text-orange-600"
                        )} />
                      )}
                    </div>
                  ))}
                </div>
                
                {/* 我的排名 */}
                <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/30">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      156
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/20 text-primary">我</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">我的排名</span>
                        <Badge variant="outline" className="text-xs">Lv.12</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          45h
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="h-3 w-3 text-orange-500" />
                          5天连续
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      冲榜
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 问答论坛 */}
          <TabsContent value="forum" className="space-y-6">
            {/* 搜索和筛选 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索帖子..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button>发布帖子</Button>
            </div>
            
            {/* 分类标签 */}
            <div className="flex flex-wrap gap-2">
              {FORUM_CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm transition-colors",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 hover:bg-muted"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* 帖子列表 */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Link key={post.id} href={`/community/posts/${post.id}`}>
                  <Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card transition-colors cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <Avatar className="h-10 w-10 shrink-0">
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>{post.author.username[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-1">
                            {post.isPinned && (
                              <Pin className="h-4 w-4 text-primary shrink-0 mt-1" />
                            )}
                            <h3 className="font-semibold text-lg leading-tight line-clamp-1">
                              {post.title}
                            </h3>
                          </div>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {post.content}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <span className="font-medium text-foreground">{post.author.username}</span>
                              <Badge variant="outline" className="text-xs h-5">
                                Lv.{post.author.level}
                              </Badge>
                            </div>
                            
                            <Badge variant="secondary" className="h-5">
                              {post.category}
                            </Badge>
                            
                            <div className="flex items-center gap-3 text-muted-foreground ml-auto">
                              <span className="flex items-center gap-1">
                                <Eye className="h-3.5 w-3.5" />
                                {post.views}
                              </span>
                              <span className="flex items-center gap-1">
                                <ThumbsUp className="h-3.5 w-3.5" />
                                {post.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-3.5 w-3.5" />
                                {post.commentsCount}
                              </span>
                            </div>
                            
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>没有找到相关帖子</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
