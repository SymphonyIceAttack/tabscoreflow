import Link from 'next/link'
import { Guitar } from 'lucide-react'

const footerLinks = {
  product: [
    { href: '/tabs', label: '曲谱库' },
    { href: '/tools?tab=tuner', label: '调音器' },
    { href: '/tools?tab=metronome', label: '节拍器' },
    { href: '/chords', label: '和弦库' },
    { href: '/scales', label: '音阶练习' },
  ],
  community: [
    { href: '/community', label: '社区首页' },
    { href: '/community/challenges', label: '学习挑战' },
    { href: '/community/forum', label: '问答论坛' },
  ],
  resources: [
    { href: '#', label: '新手指南' },
    { href: '#', label: '常见问题' },
    { href: '#', label: '联系我们' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Guitar className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">GuitarTab Pro</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              专业的吉他曲谱练习平台，提供丰富的曲谱资源和实用的练习工具，
              帮助你快速提升吉他技能。
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">产品功能</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="font-semibold mb-4">社区</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4">资源</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GuitarTab Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              隐私政策
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              使用条款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
