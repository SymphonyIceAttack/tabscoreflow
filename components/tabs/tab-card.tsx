'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/lib/stores/user-store'
import type { Tab } from '@/lib/types'
import {
  Star,
  Clock,
  Heart,
  Play,
  Eye,
  Music
} from 'lucide-react'

interface TabCardProps {
  tab: Tab
  variant?: 'default' | 'compact' | 'featured'
}

const difficultyLabels = ['', '入门', '简单', '中等', '困难', '专家']
const difficultyColors = [
  '',
  'bg-green-500/20 text-green-400 border-green-500/30',
  'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'bg-red-500/20 text-red-400 border-red-500/30'
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

export function TabCard({ tab, variant = 'default' }: TabCardProps) {
  const { isFavorite, addFavorite, removeFavorite, _hasHydrated } = useUserStore()
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  const favorite = mounted && _hasHydrated ? isFavorite(tab.id) : false

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (favorite) {
      removeFavorite(tab.id)
    } else {
      addFavorite(tab.id)
    }
  }

  if (variant === 'compact') {
    return (
      <Link href={`/tabs/${tab.id}`}>
        <Card className="group hover:bg-secondary/50 transition-colors">
          <CardContent className="flex items-center gap-4 p-3">
            <div className="relative h-12 w-12 rounded-md overflow-hidden bg-secondary flex-shrink-0">
              {tab.coverUrl ? (
                <Image
                  src={tab.coverUrl}
                  alt={tab.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Music className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                {tab.title}
              </h4>
              <p className="text-xs text-muted-foreground truncate">{tab.artist}</p>
            </div>
            <Badge variant="outline" className={cn('text-xs', difficultyColors[tab.difficulty])}>
              {difficultyLabels[tab.difficulty]}
            </Badge>
          </CardContent>
        </Card>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link href={`/tabs/${tab.id}`}>
        <Card className="group relative overflow-hidden h-[320px]">
          {tab.coverUrl && (
            <Image
              src={tab.coverUrl}
              alt={tab.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <CardContent className="absolute inset-0 flex flex-col justify-end p-6">
            <Badge variant="outline" className={cn('w-fit mb-3', difficultyColors[tab.difficulty])}>
              {difficultyLabels[tab.difficulty]}
            </Badge>
            <h3 className="text-2xl font-bold text-white mb-1">{tab.title}</h3>
            <p className="text-white/80 mb-4">{tab.artist}</p>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {tab.rating.toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {formatViewCount(tab.viewCount)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatDuration(tab.duration)}
              </span>
            </div>
            <Button
              size="lg"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Play className="h-5 w-5 mr-2" />
              开始练习
            </Button>
          </CardContent>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'absolute top-4 right-4 text-white hover:bg-white/20',
              favorite && 'text-red-400'
            )}
            onClick={handleFavoriteClick}
          >
            <Heart className={cn('h-5 w-5', favorite && 'fill-current')} />
          </Button>
        </Card>
      </Link>
    )
  }

  // Default variant
  return (
    <Link href={`/tabs/${tab.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all hover:border-primary/50">
        <div className="relative aspect-square bg-secondary">
          {tab.coverUrl ? (
            <Image
              src={tab.coverUrl}
              alt={tab.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Music className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <Button
              size="icon"
              className="h-14 w-14 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Play className="h-6 w-6" />
            </Button>
          </div>
          <Badge
            variant="outline"
            className={cn('absolute top-3 left-3', difficultyColors[tab.difficulty])}
          >
            {difficultyLabels[tab.difficulty]}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'absolute top-2 right-2 h-8 w-8 bg-black/40 hover:bg-black/60 text-white',
              favorite && 'text-red-400'
            )}
            onClick={handleFavoriteClick}
          >
            <Heart className={cn('h-4 w-4', favorite && 'fill-current')} />
          </Button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
            {tab.title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">{tab.artist}</p>
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                {tab.rating.toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {formatViewCount(tab.viewCount)}
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {formatDuration(tab.duration)}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tab.genre.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
