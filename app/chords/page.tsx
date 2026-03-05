"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ChordCard } from "@/components/chords/chord-card"
import { ChordDetail } from "@/components/chords/chord-detail"
import { chords, CHORD_CATEGORIES, ROOT_NOTES, DIFFICULTIES } from "@/lib/data/chords"
import { Search, X, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Chord } from "@/lib/types"

export default function ChordsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRoot, setSelectedRoot] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [selectedChord, setSelectedChord] = useState<Chord | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  
  const filteredChords = useMemo(() => {
    return chords.filter(chord => {
      // 搜索过滤
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = 
          chord.name.toLowerCase().includes(query) ||
          chord.fullName.toLowerCase().includes(query) ||
          chord.root.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }
      
      // 根音过滤
      if (selectedRoot && chord.root !== selectedRoot) return false
      
      // 类型过滤
      if (selectedCategory && chord.category !== selectedCategory) return false
      
      // 难度过滤
      if (selectedDifficulty && chord.difficulty !== selectedDifficulty) return false
      
      return true
    })
  }, [searchQuery, selectedRoot, selectedCategory, selectedDifficulty])
  
  const activeFiltersCount = [selectedRoot, selectedCategory, selectedDifficulty].filter(Boolean).length
  
  const clearFilters = () => {
    setSelectedRoot(null)
    setSelectedCategory(null)
    setSelectedDifficulty(null)
    setSearchQuery("")
  }
  
  // 按根音分组
  const groupedChords = useMemo(() => {
    const groups: Record<string, Chord[]> = {}
    filteredChords.forEach(chord => {
      if (!groups[chord.root]) {
        groups[chord.root] = []
      }
      groups[chord.root].push(chord)
    })
    return groups
  }, [filteredChords])
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">和弦库</h1>
          <p className="text-muted-foreground">
            收录 {chords.length} 个常用吉他和弦，包含详细指法图解
          </p>
        </div>
        
        {/* 搜索和筛选 */}
        <div className="max-w-2xl mx-auto mb-8 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索和弦名称..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              筛选
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
          
          {/* 筛选面板 */}
          {showFilters && (
            <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-4">
              {/* 根音筛选 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">根音</label>
                <div className="flex flex-wrap gap-2">
                  {ROOT_NOTES.map(root => (
                    <button
                      key={root}
                      onClick={() => setSelectedRoot(selectedRoot === root ? null : root)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm transition-colors",
                        selectedRoot === root
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/50 hover:bg-muted"
                      )}
                    >
                      {root}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 类型筛选 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">类型</label>
                <div className="flex flex-wrap gap-2">
                  {CHORD_CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm transition-colors",
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/50 hover:bg-muted"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 难度筛选 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">难度</label>
                <div className="flex flex-wrap gap-2">
                  {DIFFICULTIES.map(difficulty => (
                    <button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm transition-colors",
                        selectedDifficulty === difficulty
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/50 hover:bg-muted"
                      )}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>
              
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                  <X className="h-4 w-4" />
                  清除所有筛选
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* 搜索结果统计 */}
        {(searchQuery || activeFiltersCount > 0) && (
          <div className="text-center mb-6 text-sm text-muted-foreground">
            找到 {filteredChords.length} 个和弦
          </div>
        )}
        
        {/* 和弦列表 */}
        {Object.keys(groupedChords).length > 0 ? (
          <div className="space-y-10">
            {ROOT_NOTES.filter(root => groupedChords[root]).map(root => (
              <section key={root}>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {root}
                  </span>
                  {root} 和弦
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {groupedChords[root].map(chord => (
                    <ChordCard
                      key={chord.id}
                      chord={chord}
                      onClick={() => setSelectedChord(chord)}
                      isSelected={selectedChord?.id === chord.id}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-20">🎸</div>
            <h3 className="text-xl font-semibold mb-2">没有找到匹配的和弦</h3>
            <p className="text-muted-foreground mb-4">
              尝试调整筛选条件或搜索其他关键词
            </p>
            <Button variant="outline" onClick={clearFilters}>
              清除筛选
            </Button>
          </div>
        )}
      </div>
      
      {/* 和弦详情面板 */}
      <Sheet open={!!selectedChord} onOpenChange={(open) => !open && setSelectedChord(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="sr-only">和弦详情</SheetTitle>
          </SheetHeader>
          {selectedChord && <ChordDetail chord={selectedChord} />}
        </SheetContent>
      </Sheet>
    </div>
  )
}
