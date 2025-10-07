import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Leaf, Users, Shield, Globe, Zap, Award } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Tracky</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/campaigns"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Campaigns
              </Link>
              <Link
                href="/tracking"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Tracking
              </Link>
              <Link
                href="/community"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Community
              </Link>
              <Link
                href="/profile"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Profile
              </Link>
              <Link
                href="/rewards"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Rewards
              </Link>
              <Link
                href="/auditing"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Auditing
              </Link>
              <Link
                href="/reports"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Reports
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </a>
              <a href="/get-started">
                <Button size="sm" className="bg-tracky-primary hover:bg-tracky-primary/90">
                  Get Started
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-4xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 bg-tracky-secondary/10 text-tracky-secondary border-tracky-secondary/20"
            >
              Blockchain-Powered Environmental Action
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
              The complete platform to <span className="text-tracky-primary">track environmental</span> impact.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty max-w-2xl mx-auto">
              Empower communities with transparent, verifiable environmental campaigns. Build trust, track impact, and
              reward meaningful action through blockchain technology.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="bg-tracky-primary hover:bg-tracky-primary/90 text-white">
                Create Campaign
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Explore Impact
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-tracky-primary">500+</div>
              <div className="text-sm text-muted-foreground mt-1">Active Campaigns</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tracky-secondary">98%</div>
              <div className="text-sm text-muted-foreground mt-1">Transparency Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tracky-primary">10K+</div>
              <div className="text-sm text-muted-foreground mt-1">Volunteers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tracky-secondary">5x</div>
              <div className="text-sm text-muted-foreground mt-1">Faster Impact</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Transparent impact tracking.{" "}
              <span className="text-tracky-secondary">Tools for communities and stakeholders.</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tracky-primary/10">
                  <Users className="h-6 w-6 text-tracky-primary" />
                </div>
                <CardTitle className="text-xl">Campaign Creation</CardTitle>
                <CardDescription>
                  Set up transparent environmental campaigns with verifiable impact metrics and community engagement.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tracky-secondary/10">
                  <Shield className="h-6 w-6 text-tracky-secondary" />
                </div>
                <CardTitle className="text-xl">Blockchain Tracking</CardTitle>
                <CardDescription>
                  Real-time, immutable tracking of all campaign actions and resource allocation on the blockchain.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tracky-primary/10">
                  <Award className="h-6 w-6 text-tracky-primary" />
                </div>
                <CardTitle className="text-xl">Volunteer Recognition</CardTitle>
                <CardDescription>
                  Earn digital tokens and build reputation through meaningful environmental contributions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tracky-secondary/10">
                  <Zap className="h-6 w-6 text-tracky-secondary" />
                </div>
                <CardTitle className="text-xl">Resource Auditing</CardTitle>
                <CardDescription>
                  Real-time visibility into resource usage and allocation for sponsors and stakeholders.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tracky-primary/10">
                  <Globe className="h-6 w-6 text-tracky-primary" />
                </div>
                <CardTitle className="text-xl">Global Community</CardTitle>
                <CardDescription>
                  Connect with environmental advocates worldwide through multi-language support and discussions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tracky-secondary/10">
                  <Leaf className="h-6 w-6 text-tracky-secondary" />
                </div>
                <CardTitle className="text-xl">Impact Reporting</CardTitle>
                <CardDescription>
                  Generate comprehensive reports showcasing campaign success and environmental impact.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Ready to make a transparent impact?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join thousands of communities already using Tracky to create verifiable environmental change.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="bg-tracky-primary hover:bg-tracky-primary/90 text-white">
                Start Your Campaign
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                  <Leaf className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground">Tracky</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transparent environmental action through blockchain technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/campaigns" className="hover:text-foreground transition-colors">
                    Campaigns
                  </Link>
                </li>
                <li>
                  <Link href="/tracking" className="hover:text-foreground transition-colors">
                    Tracking
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-foreground transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/rewards" className="hover:text-foreground transition-colors">
                    Rewards
                  </Link>
                </li>
                <li>
                  <Link href="/auditing" className="hover:text-foreground transition-colors">
                    Auditing
                  </Link>
                </li>
                <li>
                  <Link href="/reports" className="hover:text-foreground transition-colors">
                    Reports
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs" className="hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-foreground transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-foreground transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            © 2025 Tracky. All rights reserved. Built for transparent environmental impact.
          </div>
        </div>
      </footer>
    </div>
  )
}
