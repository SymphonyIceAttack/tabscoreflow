"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { forumPosts, comments } from "@/lib/data/community"
import { 
  ArrowLeft, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Flag,
  MoreHorizontal,
  Send
} from "lucide-react"

interface PostPageProps {
  params: Promise<{ id: string }>
}

export default function PostPage({ params }: PostPageProps) {
  const { id } = use(params)
  const post = forumPosts.find(p => p.id === id)
  
  if (!post) {
    notFound()
  }
  
  const postComments = comments.filter(c => c.postId === id)
  
  // 格式化时间
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60))
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60))
        return `${minutes} 分钟前`
      }
      return `${hours} 小时前`
    }
    if (days < 7) return `${days} 天前`
    return date.toLocaleDateString("zh-CN")
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 返回按钮 */}
        <Link href="/community" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          返回社区
        </Link>
        
        {/* 帖子内容 */}
        <Card className="bg-card/50 backdrop-blur border-border/50 mb-6">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{post.category}</Badge>
              {post.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
            
            <h1 className="text-2xl font-bold">{post.title}</h1>
            
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.username[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{post.author.username}</span>
                  <Badge variant="outline" className="text-xs">Lv.{post.author.level}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(post.createdAt)} 发布
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* 正文 */}
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
            
            {/* 交互按钮 */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  {post.commentsCount}
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  分享
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Flag className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* 评论区 */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <h2 className="text-lg font-semibold">评论 ({postComments.length})</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 发表评论 */}
            <div className="flex gap-4">
              <Avatar>
                <AvatarFallback>我</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Textarea 
                  placeholder="写下你的评论..." 
                  className="min-h-[80px] resize-none"
                />
                <div className="flex justify-end">
                  <Button className="gap-2">
                    <Send className="h-4 w-4" />
                    发表评论
                  </Button>
                </div>
              </div>
            </div>
            
            {/* 评论列表 */}
            <div className="space-y-4 pt-4 border-t border-border/50">
              {postComments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback>{comment.author.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{comment.author.username}</span>
                      <Badge variant="outline" className="text-xs">Lv.{comment.author.level}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{comment.content}</p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground">
                        <ThumbsUp className="h-3.5 w-3.5" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">
                        回复
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {postComments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p>还没有评论，来抢沙发吧！</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
