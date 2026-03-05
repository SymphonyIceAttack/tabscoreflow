'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'
import {
  Guitar,
  Search,
  Menu,
  Moon,
  Sun,
  User,
  Heart,
  Clock,
  BarChart3,
  Settings,
  Music,
  Mic,
  Timer,
  BookOpen,
  Users,
  Trophy,
  MessageSquare
} from 'lucide-react'

const mainNavItems = [
  { href: '/tabs', label: '曲谱库', icon: Music },
  { href: '/tools', label: '练习工具', icon: Settings },
  { href: '/community', label: '社区', icon: Users },
]

const toolNavItems = [
  { href: '/tools?tab=tuner', label: '调音器', icon: Mic },
  { href: '/tools?tab=metronome', label: '节拍器', icon: Timer },
  { href: '/chords', label: '和弦库', icon: BookOpen },
  { href: '/scales', label: '音阶练习', icon: BarChart3 },
]

const userNavItems = [
  { href: '/profile', label: '个人中心', icon: User },
  { href: '/profile/favorites', label: '我的收藏', icon: Heart },
  { href: '/profile/practice', label: '练习记录', icon: Clock },
  { href: '/profile/stats', label: '学习统计', icon: BarChart3 },
]

export function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/tabs?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Guitar className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden font-bold text-lg sm:inline-block">
            GuitarTab Pro
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors',
                pathname.startsWith(item.href)
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <form onSubmit={handleSearch} className="hidden sm:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索曲谱..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[200px] lg:w-[280px] pl-9 bg-secondary/50"
            />
          </form>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">搜索</span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">切换主题</span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">用户菜单</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {userNavItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/community/challenges" className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  学习挑战
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">菜单</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <nav className="flex flex-col gap-4 mt-8">
                <div className="space-y-1">
                  <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    导航
                  </p>
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        pathname.startsWith(item.href)
                          ? 'bg-secondary text-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="space-y-1">
                  <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    练习工具
                  </p>
                  {toolNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        pathname === item.href
                          ? 'bg-secondary text-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="space-y-1">
                  <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    个人中心
                  </p>
                  {userNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        pathname === item.href
                          ? 'bg-secondary text-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="sm:hidden border-t border-border px-4 py-3">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索曲谱、艺人..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9"
              autoFocus
            />
          </form>
        </div>
      )}
    </header>
  )
}
