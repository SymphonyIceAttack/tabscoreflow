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
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null)
  const [selectedChord, setSelectedChord] = useState<Chord | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  
  const filteredChords = useMemo(() => {
    return chords.filter(chord => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = 
          chord.name.toLowerCase().includes(query) ||
          (chord.fullName?.toLowerCase().includes(query) ?? false) ||
          chord.root.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }
      
      // Root filter
      if (selectedRoot && chord.root !== selectedRoot) return false
      
      // Type filter
      if (selectedCategory && chord.type !== selectedCategory) return false
      
      // Difficulty filter
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
  
  // Group by root
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
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Chord Library</h1>
          <p className="text-muted-foreground">
            {chords.length} common guitar chords with detailed fingering charts
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="max-w-2xl mx-auto mb-8 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search chords..."
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
              Filter
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
          
          {/* Filter Panel */}
          {showFilters && (
            <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-4">
              {/* Root Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Root Note</label>
                <div className="flex flex-wrap gap-2">
                  {ROOT_NOTES.map(root => (
                    <button
                      type="button"
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
              
              {/* Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <div className="flex flex-wrap gap-2">
                  {CHORD_CATEGORIES.map(category => (
                    <button
                      type="button"
                      key={category.value}
                      onClick={() => setSelectedCategory(selectedCategory === category.value ? null : category.value)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm transition-colors",
                        selectedCategory === category.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/50 hover:bg-muted"
                      )}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Difficulty Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <div className="flex flex-wrap gap-2">
                  {DIFFICULTIES.map(difficulty => (
                    <button
                      type="button"
                      key={difficulty.value}
                      onClick={() => setSelectedDifficulty(selectedDifficulty === difficulty.value ? null : difficulty.value)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm transition-colors",
                        selectedDifficulty === difficulty.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/50 hover:bg-muted"
                      )}
                    >
                      {difficulty.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                  <X className="h-4 w-4" />
                  Clear All Filters
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* Search Results Count */}
        {(searchQuery || activeFiltersCount > 0) && (
          <div className="text-center mb-6 text-sm text-muted-foreground">
            Found {filteredChords.length} chords
          </div>
        )}
        
        {/* Chord List */}
        {Object.keys(groupedChords).length > 0 ? (
          <div className="space-y-10">
            {ROOT_NOTES.filter(root => groupedChords[root]).map(root => (
              <section key={root}>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {root}
                  </span>
                  {root} Chords
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
            <h3 className="text-xl font-semibold mb-2">No matching chords found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search for something else
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      
      {/* Chord Detail Panel */}
      <Sheet open={!!selectedChord} onOpenChange={(open) => !open && setSelectedChord(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="sr-only">Chord Details</SheetTitle>
          </SheetHeader>
          {selectedChord && <ChordDetail chord={selectedChord} />}
        </SheetContent>
      </Sheet>
    </div>
  )
}
