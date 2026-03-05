import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TabCard } from '@/components/tabs/tab-card'
import { tabs } from '@/lib/data/tabs'
import {
  Guitar,
  Play,
  Mic,
  Timer,
  BookOpen,
  BarChart3,
  ArrowRight,
  Zap,
  Music,
  Target,
  TrendingUp,
  Users,
  Star
} from 'lucide-react'

const features = [
  {
    icon: Music,
    title: 'Extensive Tab Library',
    description: 'Thousands of songs from beginner to expert level',
  },
  {
    icon: Play,
    title: 'Interactive Player',
    description: 'Real-time tab following, tempo control, and A-B loop practice',
  },
  {
    icon: Mic,
    title: 'Smart Tuner',
    description: 'High-precision pitch detection with multiple tuning modes',
  },
  {
    icon: Timer,
    title: 'Pro Metronome',
    description: 'Precise beat control with progressive speed training',
  },
  {
    icon: BookOpen,
    title: 'Chord & Scale Library',
    description: 'Complete chord charts and scale fingerings for quick reference',
  },
  {
    icon: BarChart3,
    title: 'Learning Tracker',
    description: 'Track your practice sessions and monitor your progress',
  },
]

const tools = [
  {
    href: '/tools?tab=tuner',
    icon: Mic,
    title: 'Tuner',
    description: 'Precision Tuning',
    color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  },
  {
    href: '/tools?tab=metronome',
    icon: Timer,
    title: 'Metronome',
    description: 'Rhythm Training',
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  },
  {
    href: '/chords',
    icon: BookOpen,
    title: 'Chords',
    description: 'Fingering Charts',
    color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  },
  {
    href: '/scales',
    icon: BarChart3,
    title: 'Scales',
    description: 'Fretboard Mastery',
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  },
]

const stats = [
  { value: '10,000+', label: 'Tabs' },
  { value: '50,000+', label: 'Active Users' },
  { value: '1M+', label: 'Practice Hours' },
  { value: '4.9', label: 'User Rating', icon: Star },
]

export default function HomePage() {
  const featuredTabs = tabs.slice(0, 4)
  const popularTabs = [...tabs].sort((a, b) => b.viewCount - a.viewCount).slice(0, 8)
  const latestTabs = [...tabs].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
          
          <div className="container relative px-4 py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-6 px-4 py-1.5">
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                New - Guitar Pro Format Support
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
                Professional Guitar
                <span className="text-primary"> Tab Practice</span>
                Platform
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed text-balance">
                Extensive tab library, interactive player, smart tuner, professional metronome
                <br className="hidden sm:block" />
                All-in-one solution for your guitar practice needs
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/tabs">
                    <Play className="h-5 w-5 mr-2" />
                    Start Practicing
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/tools">
                    <Guitar className="h-5 w-5 mr-2" />
                    Explore Tools
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl md:text-3xl font-bold">{stat.value}</span>
                    {stat.icon && <stat.icon className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Tools Section */}
        <section className="border-b border-border bg-secondary/20">
          <div className="container px-4 py-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">Practice Tools</h2>
                <p className="text-muted-foreground mt-1">Quick access to essential tools</p>
              </div>
              <Button asChild variant="ghost">
                <Link href="/tools">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tools.map((tool) => (
                <Link key={tool.href} href={tool.href}>
                  <Card className={`group hover:shadow-md transition-all hover:border-primary/50 ${tool.color}`}>
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-background mb-4">
                        <tool.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Tabs Section */}
        <section className="border-b border-border">
          <div className="container px-4 py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">Featured Tabs</h2>
                <p className="text-muted-foreground mt-1">Editor-curated high-quality tabs</p>
              </div>
              <Button asChild variant="ghost">
                <Link href="/tabs">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredTabs.map((tab) => (
                <TabCard key={tab.id} tab={tab} variant="featured" />
              ))}
            </div>
          </div>
        </section>

        {/* Popular Tabs Section */}
        <section className="border-b border-border bg-secondary/20">
          <div className="container px-4 py-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                <div>
                  <h2 className="text-2xl font-bold">Popular Tabs</h2>
                  <p className="text-muted-foreground mt-1">Most popular practice songs</p>
                </div>
              </div>
              <Button asChild variant="ghost">
                <Link href="/tabs?sort=popular">
                  View More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularTabs.map((tab) => (
                <TabCard key={tab.id} tab={tab} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-b border-border">
          <div className="container px-4 py-20">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4">
                <Target className="h-3.5 w-3.5 mr-1.5" />
                Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                All-in-One Platform for Guitar Learners
              </h2>
              <p className="text-muted-foreground text-lg">
                Whether you're a beginner or advanced player, we have resources and tools for you
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-secondary/30 border-border/50">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mb-4">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Tabs Section */}
        <section className="border-b border-border bg-secondary/20">
          <div className="container px-4 py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">Latest Uploads</h2>
                <p className="text-muted-foreground mt-1">Recently updated tabs</p>
              </div>
              <Button asChild variant="ghost">
                <Link href="/tabs?sort=latest">
                  View More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="space-y-3">
              {latestTabs.map((tab) => (
                <TabCard key={tab.id} tab={tab} variant="compact" />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
          <div className="container relative px-4 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <Users className="h-12 w-12 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                Join Our Guitar Learning Community
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Learn, share, and grow with thousands of guitar enthusiasts
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/community">
                    Join Community
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/community/challenges">
                    Join Challenges
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
