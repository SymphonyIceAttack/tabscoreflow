'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { TabCard } from '@/components/tabs/tab-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { tabs, genres } from '@/lib/data/tabs'
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  Music,
  Filter
} from 'lucide-react'

const difficultyOptions = [
  { value: 1, label: '入门' },
  { value: 2, label: '简单' },
  { value: 3, label: '中等' },
  { value: 4, label: '困难' },
  { value: 5, label: '专家' },
]

const sortOptions = [
  { value: 'latest', label: '最新上传' },
  { value: 'popular', label: '最受欢迎' },
  { value: 'rating', label: '评分最高' },
  { value: 'difficulty-asc', label: '难度从低到高' },
  { value: 'difficulty-desc', label: '难度从高到低' },
]

export default function TabsPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  const initialSort = searchParams.get('sort') || 'popular'

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [sortBy, setSortBy] = useState(initialSort)
  const [selectedDifficulties, setSelectedDifficulties] = useState<number[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Update search from URL params
  useEffect(() => {
    const search = searchParams.get('search')
    if (search) setSearchQuery(search)
    const sort = searchParams.get('sort')
    if (sort) setSortBy(sort)
  }, [searchParams])

  const filteredTabs = useMemo(() => {
    let result = [...tabs]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        tab =>
          tab.title.toLowerCase().includes(query) ||
          tab.artist.toLowerCase().includes(query) ||
          tab.genre.some(g => g.toLowerCase().includes(query))
      )
    }

    // Difficulty filter
    if (selectedDifficulties.length > 0) {
      result = result.filter(tab => selectedDifficulties.includes(tab.difficulty))
    }

    // Genre filter
    if (selectedGenres.length > 0) {
      result = result.filter(tab =>
        tab.genre.some(g => selectedGenres.includes(g))
      )
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'popular':
          return b.viewCount - a.viewCount
        case 'rating':
          return b.rating - a.rating
        case 'difficulty-asc':
          return a.difficulty - b.difficulty
        case 'difficulty-desc':
          return b.difficulty - a.difficulty
        default:
          return 0
      }
    })

    return result
  }, [searchQuery, sortBy, selectedDifficulties, selectedGenres])

  const toggleDifficulty = (value: number) => {
    setSelectedDifficulties(prev =>
      prev.includes(value)
        ? prev.filter(d => d !== value)
        : [...prev, value]
    )
  }

  const toggleGenre = (value: string) => {
    setSelectedGenres(prev =>
      prev.includes(value)
        ? prev.filter(g => g !== value)
        : [...prev, value]
    )
  }

  const clearFilters = () => {
    setSelectedDifficulties([])
    setSelectedGenres([])
    setSearchQuery('')
  }

  const activeFilterCount = selectedDifficulties.length + selectedGenres.length

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Difficulty */}
      <div>
        <h4 className="font-medium mb-3">难度等级</h4>
        <div className="space-y-2">
          {difficultyOptions.map(option => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={`difficulty-${option.value}`}
                checked={selectedDifficulties.includes(option.value)}
                onCheckedChange={() => toggleDifficulty(option.value)}
              />
              <Label
                htmlFor={`difficulty-${option.value}`}
                className="text-sm font-normal cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Genre */}
      <div>
        <h4 className="font-medium mb-3">音乐风格</h4>
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
          {genres.map(genre => (
            <div key={genre} className="flex items-center gap-2">
              <Checkbox
                id={`genre-${genre}`}
                checked={selectedGenres.includes(genre)}
                onCheckedChange={() => toggleGenre(genre)}
              />
              <Label
                htmlFor={`genre-${genre}`}
                className="text-sm font-normal cursor-pointer"
              >
                {genre}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <>
          <Separator />
          <Button variant="outline" className="w-full" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            清除所有筛选
          </Button>
        </>
      )}
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border bg-secondary/20">
          <div className="container px-4 py-8">
            <div className="flex items-center gap-3 mb-2">
              <Music className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">曲谱库</h1>
            </div>
            <p className="text-muted-foreground">
              浏览和搜索数千首吉他曲谱，找到适合你水平的练习曲目
            </p>
          </div>
        </section>

        {/* Filters & Content */}
        <section className="container px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    筛选条件
                  </h3>
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary">{activeFilterCount}</Badge>
                  )}
                </div>
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Search & Sort Bar */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="搜索曲名、艺人或风格..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {/* Mobile Filter Button */}
                  <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        筛选
                        {activeFilterCount > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {activeFilterCount}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>筛选条件</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Sort Select */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="排序方式" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* View Toggle */}
                  <div className="hidden sm:flex items-center border border-input rounded-md">
                    <Button
                      variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                      size="icon"
                      className="rounded-r-none"
                      onClick={() => setViewMode('grid')}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                      size="icon"
                      className="rounded-l-none"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedDifficulties.length > 0 || selectedGenres.length > 0 || searchQuery) && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="text-sm text-muted-foreground">已选:</span>
                  {searchQuery && (
                    <Badge variant="secondary" className="gap-1">
                      搜索: {searchQuery}
                      <button onClick={() => setSearchQuery('')}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {selectedDifficulties.map(d => (
                    <Badge key={d} variant="secondary" className="gap-1">
                      {difficultyOptions.find(o => o.value === d)?.label}
                      <button onClick={() => toggleDifficulty(d)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {selectedGenres.map(g => (
                    <Badge key={g} variant="secondary" className="gap-1">
                      {g}
                      <button onClick={() => toggleGenre(g)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={clearFilters}
                  >
                    清除全部
                  </Button>
                </div>
              )}

              {/* Results Count */}
              <p className="text-sm text-muted-foreground mb-4">
                共找到 <span className="font-medium text-foreground">{filteredTabs.length}</span> 首曲谱
              </p>

              {/* Results */}
              {filteredTabs.length > 0 ? (
                viewMode === 'grid' ? (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredTabs.map(tab => (
                      <TabCard key={tab.id} tab={tab} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredTabs.map(tab => (
                      <TabCard key={tab.id} tab={tab} variant="compact" />
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-16">
                  <Music className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">未找到曲谱</h3>
                  <p className="text-muted-foreground mb-4">
                    尝试调整筛选条件或搜索其他关键词
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    清除筛选条件
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
