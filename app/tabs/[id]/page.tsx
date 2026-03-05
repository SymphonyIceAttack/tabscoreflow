import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { TabPlayer } from '@/components/tabs/tab-player'
import { TabCard } from '@/components/tabs/tab-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getTabById, tabs } from '@/lib/data/tabs'
import {
  ArrowLeft,
  Heart,
  Share2,
  Download,
  Star,
  Eye,
  Clock,
  Music,
  User,
  Calendar,
  MessageSquare
} from 'lucide-react'

interface TabPageProps {
  params: Promise<{ id: string }>
}

const difficultyLabels = ['', '入门', '简单', '中等', '困难', '专家']
const difficultyColors = [
  '',
  'bg-green-500/20 text-green-500 border-green-500/30',
  'bg-blue-500/20 text-blue-500 border-blue-500/30',
  'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  'bg-orange-500/20 text-orange-500 border-orange-500/30',
  'bg-red-500/20 text-red-500 border-red-500/30'
]

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

export default async function TabPage({ params }: TabPageProps) {
  const { id } = await params
  const tab = getTabById(id)

  if (!tab) {
    notFound()
  }

  // Get similar tabs (same genre)
  const similarTabs = tabs
    .filter(t => t.id !== tab.id && t.genre.some(g => tab.genre.includes(g)))
    .slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Back navigation */}
        <div className="border-b border-border bg-background">
          <div className="container px-4 py-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="/tabs">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回曲谱库
              </Link>
            </Button>
          </div>
        </div>

        <div className="container px-4 py-8">
          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            {/* Main content */}
            <div className="space-y-6">
              {/* Tab header */}
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Cover image */}
                <div className="relative w-full sm:w-48 aspect-square rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                  {tab.coverUrl ? (
                    <Image
                      src={tab.coverUrl}
                      alt={tab.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Music className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Tab info */}
                <div className="flex-1 min-w-0">
                  <Badge 
                    variant="outline" 
                    className={`mb-3 ${difficultyColors[tab.difficulty]}`}
                  >
                    {difficultyLabels[tab.difficulty]}
                  </Badge>
                  <h1 className="text-3xl font-bold mb-2">{tab.title}</h1>
                  <p className="text-xl text-muted-foreground mb-4">{tab.artist}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {tab.rating.toFixed(1)} ({tab.ratingCount.toLocaleString()})
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {formatViewCount(tab.viewCount)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatDuration(tab.duration)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(tab.createdAt).toLocaleDateString('zh-CN')}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tab.genre.map(g => (
                      <Badge key={g} variant="secondary">{g}</Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline">
                      <Heart className="h-4 w-4 mr-2" />
                      收藏
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      分享
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      下载
                    </Button>
                  </div>
                </div>
              </div>

              {/* Player */}
              <TabPlayer tab={tab} />

              {/* Description */}
              {tab.description && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">曲谱说明</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {tab.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Comments section placeholder */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    评论区
                  </CardTitle>
                  <Badge variant="secondary">即将推出</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    评论功能正在开发中，敬请期待...
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Tab details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">曲谱信息</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">BPM</span>
                    <span className="font-medium">{tab.bpm}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">调式</span>
                    <span className="font-medium">{tab.key}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">调弦</span>
                    <span className="font-medium">{tab.tuning}</span>
                  </div>
                  {tab.capo && (
                    <>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">变调夹</span>
                        <span className="font-medium">{tab.capo} 品</span>
                      </div>
                    </>
                  )}
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">难度</span>
                    <Badge 
                      variant="outline" 
                      className={difficultyColors[tab.difficulty]}
                    >
                      {difficultyLabels[tab.difficulty]}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Similar tabs */}
              {similarTabs.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">相似曲谱</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {similarTabs.map(t => (
                      <TabCard key={t.id} tab={t} variant="compact" />
                    ))}
                  </CardContent>
                </Card>
              )}
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  return tabs.map((tab) => ({
    id: tab.id,
  }))
}
