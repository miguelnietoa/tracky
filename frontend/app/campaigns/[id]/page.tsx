import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Calendar,
  Users,
  Target,
  Leaf,
  ArrowLeft,
  Share2,
  Heart,
  MessageCircle,
  TrendingUp,
  Shield,
  Award,
  Clock,
} from "lucide-react"
import Link from "next/link"

// Mock data for campaign details
const campaign = {
  id: 1,
  title: "Beach Cleanup Initiative",
  description:
    "Join our community-driven beach cleanup initiative to remove plastic waste and restore marine ecosystems. This campaign focuses on cleaning Santa Monica Beach while educating participants about marine conservation and sustainable practices.",
  longDescription:
    "Our Beach Cleanup Initiative is more than just picking up trash – it's about creating lasting change in our coastal communities. We'll be working with local marine biologists to identify the most impactful areas for cleanup, documenting the types of waste we collect, and using this data to advocate for better waste management policies. Participants will learn about marine ecosystems, the impact of plastic pollution, and how individual actions can create collective change.",
  location: "Santa Monica, CA",
  startDate: "2025-02-15",
  endDate: "2025-02-16",
  participants: 45,
  maxParticipants: 100,
  goal: "Remove 500kg of plastic waste",
  status: "active",
  category: "cleanup",
  organizer: {
    name: "Maria Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    reputation: 4.8,
    campaigns: 12,
  },
  metrics: [
    { name: "Plastic Waste Removed", target: 500, current: 320, unit: "kg" },
    { name: "Beach Area Cleaned", target: 2, current: 1.3, unit: "km" },
    { name: "Volunteers Engaged", target: 100, current: 45, unit: "people" },
  ],
  impact: {
    co2Saved: "2.3 tons",
    wasteRemoved: "320 kg",
    areaRestored: "1.3 km",
  },
  tokenReward: 150,
  blockchain: {
    contractAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    transactionCount: 127,
    lastUpdate: "2025-01-15T10:30:00Z",
  },
  updates: [
    {
      id: 1,
      date: "2025-01-14",
      title: "Halfway to our goal!",
      content: "Amazing progress team! We've removed 320kg of plastic waste so far.",
      author: "Maria Rodriguez",
    },
    {
      id: 2,
      date: "2025-01-12",
      title: "New volunteer training session",
      content: "Join us this Saturday for a marine conservation workshop.",
      author: "Maria Rodriguez",
    },
  ],
}

export default function CampaignDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Leaf className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Tracky</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/campaigns" className="text-sm font-medium text-tracky-primary">
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
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm" className="bg-tracky-primary hover:bg-tracky-primary/90">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/campaigns">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Campaigns
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Campaign Header */}
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="default" className="bg-tracky-secondary text-white">
                      {campaign.status}
                    </Badge>
                    <Badge variant="outline">{campaign.category}</Badge>
                  </div>
                  <h1 className="text-4xl font-bold text-foreground">{campaign.title}</h1>
                  <p className="text-lg text-muted-foreground">{campaign.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Campaign Meta */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {campaign.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(campaign.startDate).toLocaleDateString()} -{" "}
                  {new Date(campaign.endDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2" />
                  {campaign.participants}/{campaign.maxParticipants} participants
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Target className="h-4 w-4 mr-2" />
                  {campaign.goal}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Campaign</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{campaign.longDescription}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Organizer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={campaign.organizer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>MR</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{campaign.organizer.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {campaign.organizer.campaigns} campaigns organized • {campaign.organizer.reputation}★ rating
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Impact Metrics</CardTitle>
                    <CardDescription>Real-time progress towards campaign goals</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {campaign.metrics.map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{metric.name}</span>
                          <span className="text-muted-foreground">
                            {metric.current} / {metric.target} {metric.unit}
                          </span>
                        </div>
                        <Progress value={(metric.current / metric.target) * 100} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {Math.round((metric.current / metric.target) * 100)}% complete
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Environmental Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-tracky-secondary">{campaign.impact.co2Saved}</div>
                        <div className="text-sm text-muted-foreground">CO2 Saved</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-tracky-primary">{campaign.impact.wasteRemoved}</div>
                        <div className="text-sm text-muted-foreground">Waste Removed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-tracky-secondary">{campaign.impact.areaRestored}</div>
                        <div className="text-sm text-muted-foreground">Area Restored</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="blockchain" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Blockchain Verification
                    </CardTitle>
                    <CardDescription>Transparent and immutable tracking of campaign activities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="text-sm font-medium">Contract Address</Label>
                        <p className="text-sm text-muted-foreground font-mono">{campaign.blockchain.contractAddress}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Total Transactions</Label>
                        <p className="text-sm text-muted-foreground">
                          {campaign.blockchain.transactionCount} verified actions
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <h4 className="font-medium">Recent Blockchain Activity</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Volunteer registration verified</span>
                          <span className="text-muted-foreground">2 hours ago</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Impact metric updated</span>
                          <span className="text-muted-foreground">4 hours ago</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Token rewards distributed</span>
                          <span className="text-muted-foreground">1 day ago</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="updates" className="space-y-6">
                {campaign.updates.map((update) => (
                  <Card key={update.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{update.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {new Date(update.date).toLocaleDateString()}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{update.content}</p>
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
                        <span className="text-sm text-muted-foreground">By {update.author}</span>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Comment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join Campaign */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Join This Campaign</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-tracky-primary mb-2">{campaign.tokenReward}</div>
                  <div className="text-sm text-muted-foreground">tokens reward</div>
                </div>
                <Button className="w-full bg-tracky-primary hover:bg-tracky-primary/90 text-white">
                  Join Campaign
                </Button>
                <div className="text-xs text-center text-muted-foreground">
                  {campaign.maxParticipants - campaign.participants} spots remaining
                </div>
              </CardContent>
            </Card>

            {/* Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progress Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span className="font-medium">64%</span>
                  </div>
                  <Progress value={64} className="h-2" />
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-tracky-secondary" />
                    <span className="text-sm">On track to meet goals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-4 w-4 text-tracky-primary" />
                    <span className="text-sm">High community engagement</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-tracky-secondary" />
                    <span className="text-sm">Blockchain verified</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Participants */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Avatar key={i} className="h-8 w-8 border-2 border-background">
                      <AvatarImage src={`/placeholder-icon.png?height=32&width=32&text=${i}`} />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted border-2 border-background text-xs font-medium">
                    +{campaign.participants - 5}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  {campaign.participants} volunteers making a difference
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
