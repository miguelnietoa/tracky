"use client"

import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="/">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Tracky</span>
            </div>
          </a>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/campaigns"
              className={`text-sm font-medium transition-colors cursor-pointer ${
                isActive("/campaigns")
                  ? "text-tracky-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Campaigns
            </Link>
            <Link
              href="/tracking"
              className={`text-sm font-medium transition-colors cursor-pointer ${
                isActive("/tracking")
                  ? "text-tracky-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Tracking
            </Link>
            <Link
              href="/community"
              className={`text-sm font-medium transition-colors cursor-pointer ${
                isActive("/community")
                  ? "text-tracky-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Community
            </Link>
            <Link
              href="/profile"
              className={`text-sm font-medium transition-colors cursor-pointer ${
                isActive("/profile")
                  ? "text-tracky-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Profile
            </Link>
            <Link
              href="/rewards"
              className={`text-sm font-medium transition-colors cursor-pointer ${
                isActive("/rewards")
                  ? "text-tracky-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Rewards
            </Link>
            <Link
              href="/auditing"
              className={`text-sm font-medium transition-colors cursor-pointer ${
                isActive("/auditing")
                  ? "text-tracky-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Auditing
            </Link>
            <Link
              href="/reports"
              className={`text-sm font-medium transition-colors cursor-pointer ${
                isActive("/reports")
                  ? "text-tracky-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Reports
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/login" className="cursor-pointer">
              <Button variant="ghost" size="sm" className="cursor-pointer">
                Sign In
              </Button>
            </a>
            <a href="/get-started" className="cursor-pointer">
              <Button size="sm" className="bg-tracky-primary hover:bg-tracky-primary/90 cursor-pointer">
                Get Started
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
