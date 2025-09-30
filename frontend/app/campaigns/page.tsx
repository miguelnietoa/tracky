import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, MapPin, Calendar, Users, Target, Leaf } from "lucide-react"
import Link from "next/link"

// Mock data for campaigns
const campaigns = [
  {
    id: 1,
    title: "Beach Cleanup Initiative",
    description: "Community-driven beach cleanup to remove plastic waste and restore marine ecosystems.",
    location: "Santa Monica, CA",
    startDate: "2025-02-15",
    endDate: "2025-02-16",
    participants: 45,
    goal: "Remove 500kg of plastic waste",
    status: "active",
    category: "cleanup",
    impact: "2.3 tons CO2 saved",
    tokens: 150,
  },
  {
    id: 2,
    title: "Urban Tree Planting",
    description: "Plant native trees in urban areas to improve air quality and create green spaces.",
    location: "Mexico City, Mexico",
    startDate: "2025-03-01",
    endDate: "2025-03-31",
    participants: 128,
    goal: "Plant 1000 native trees",
    status: "active",
    category: "reforestation",
    impact: "15 tons CO2 absorbed",
    tokens: 200,
  },
  {
    id: 3,
    title: "River Restoration Project",
    description: "Restore polluted river ecosystem through community action and monitoring.",
    location: "São Paulo, Brazil",
    startDate: "2025-01-20",
    endDate: "2025-04-20",
    participants: 89,
    goal: "Clean 5km of riverbank",
    status: "completed",
    category: "restoration",
    impact: "Water quality improved 40%",
    tokens: 300,
  },
]

export default function CampaignsPage() {
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Environmental Campaigns</h1>
            <p className="text-muted-foreground mt-2">
              Join transparent, blockchain-verified environmental actions in your community
            </p>
          </div>
          <Link href="/campaigns/create">
            <Button className="bg-tracky-primary hover:bg-tracky-primary/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search campaigns..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="cleanup">Cleanup</SelectItem>
              <SelectItem value="reforestation">Reforestation</SelectItem>
              <SelectItem value="restoration">Restoration</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Campaign Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="border-border/50 bg-card/50 backdrop-blur hover:bg-card/80 transition-colors"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge
                    variant={
                      campaign.status === "active"
                        ? "default"
                        : campaign.status === "completed"
                          ? "secondary"
                          : "outline"
                    }
                    className={campaign.status === "active" ? "bg-tracky-secondary text-white" : ""}
                  >
                    {campaign.status}
                  </Badge>
                  <div className="text-right">
                    <div className="text-sm font-medium text-tracky-primary">{campaign.tokens} tokens</div>
                    <div className="text-xs text-muted-foreground">reward</div>
                  </div>
                </div>
                <CardTitle className="text-xl">{campaign.title}</CardTitle>
                <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  {campaign.participants} participants
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Target className="h-4 w-4 mr-2" />
                  {campaign.goal}
                </div>
                <div className="pt-2 border-t border-border/50">
                  <div className="text-sm font-medium text-tracky-secondary mb-2">Impact Achieved</div>
                  <div className="text-sm text-muted-foreground">{campaign.impact}</div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Link href={`/campaigns/${campaign.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Details
                    </Button>
                  </Link>
                  <Button className="flex-1 bg-tracky-primary hover:bg-tracky-primary/90 text-white">
                    Join Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Campaigns
          </Button>
        </div>
      </div>
    </div>
  )
}
