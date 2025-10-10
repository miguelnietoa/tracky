"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Award,
  Trophy,
  Star,
  Calendar,
  MapPin,
  Users,
  Target,
  Coins,
  Medal,
  Crown,
  Edit,
  Share2,
  Download,
  CheckCircle,
  Leaf,
} from "lucide-react"
import Link from "next/link"

// Mock user data
const userData = {
  name: "Maria Rodriguez",
  username: "@maria_eco",
  avatar: "/placeholder.svg?height=120&width=120",
  location: "Mexico City, Mexico",
  joinDate: "2024-03-15",
  bio: "Environmental advocate passionate about community-driven change. Leading local cleanup initiatives and promoting sustainable practices.",
  stats: {
    totalTokens: 2450,
    campaignsJoined: 12,
    impactCreated: "15.7 tons CO2",
    reputation: 4.8,
    rank: 23,
    level: "Eco Champion",
  },
  badges: [
    {
      id: 1,
      name: "Beach Guardian",
      description: "Completed 5 beach cleanup campaigns",
      icon: "🏖️",
      rarity: "rare",
      earned: "2024-12-15",
    },
    {
      id: 2,
      name: "Tree Planter",
      description: "Planted 100+ trees",
      icon: "🌳",
      rarity: "common",
      earned: "2024-11-20",
    },
    {
      id: 3,
      name: "Community Leader",
      description: "Organized 3 successful campaigns",
      icon: "👥",
      rarity: "epic",
      earned: "2024-10-05",
    },
    {
      id: 4,
      name: "Impact Tracker",
      description: "Verified 50+ environmental actions",
      icon: "📊",
      rarity: "rare",
      earned: "2024-09-12",
    },
    {
      id: 5,
      name: "Waste Warrior",
      description: "Removed 500kg+ of waste",
      icon: "♻️",
      rarity: "rare",
      earned: "2024-08-30",
    },
    {
      id: 6,
      name: "Early Adopter",
      description: "Joined Tracky in first month",
      icon: "🚀",
      rarity: "legendary",
      earned: "2024-03-15",
    },
  ],
  achievements: [
    {
      id: 1,
      title: "First Campaign",
      description: "Joined your first environmental campaign",
      progress: 100,
      maxProgress: 1,
      completed: true,
    },
    {
      id: 2,
      title: "Token Collector",
      description: "Earn 1000 tokens",
      progress: 2450,
      maxProgress: 1000,
      completed: true,
    },
    {
      id: 3,
      title: "Impact Creator",
      description: "Create 10 tons CO2 equivalent impact",
      progress: 15.7,
      maxProgress: 10,
      completed: true,
    },
    {
      id: 4,
      title: "Community Builder",
      description: "Invite 10 friends to join",
      progress: 7,
      maxProgress: 10,
      completed: false,
    },
    {
      id: 5,
      title: "Consistency Champion",
      description: "Participate in campaigns for 6 months",
      progress: 9,
      maxProgress: 6,
      completed: true,
    },
    {
      id: 6,
      title: "Global Impact",
      description: "Participate in campaigns across 5 countries",
      progress: 3,
      maxProgress: 5,
      completed: false,
    },
  ],
  recentActivity: [
    { id: 1, type: "campaign_join", title: "Joined Beach Cleanup Initiative", date: "2025-01-14", tokens: 150 },
    { id: 2, type: "badge_earned", title: "Earned Beach Guardian badge", date: "2025-01-12", tokens: 0 },
    { id: 3, type: "impact_verified", title: "Impact verified: 2.3 tons CO2 saved", date: "2025-01-10", tokens: 100 },
    { id: 4, type: "campaign_complete", title: "Completed Urban Tree Planting", date: "2025-01-08", tokens: 200 },
  ],
  campaigns: [
    {
      id: 1,
      name: "Beach Cleanup Initiative",
      role: "Volunteer",
      status: "active",
      tokens: 150,
      impact: "2.3 tons CO2",
    },
    { id: 2, name: "Urban Tree Planting", role: "Team Lead", status: "completed", tokens: 200, impact: "5.1 tons CO2" },
    { id: 3, name: "River Restoration", role: "Organizer", status: "completed", tokens: 300, impact: "8.3 tons CO2" },
  ],
}

const leaderboard = [
  {
    rank: 1,
    name: "Carlos Silva",
    tokens: 3850,
    impact: "28.5 tons CO2",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 2,
    name: "Ana Martinez",
    tokens: 3420,
    impact: "24.2 tons CO2",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 3,
    name: "Diego Lopez",
    tokens: 2980,
    impact: "19.8 tons CO2",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  { rank: 4, name: "Sofia Chen", tokens: 2750, impact: "18.1 tons CO2", avatar: "/placeholder.svg?height=40&width=40" },
  {
    rank: 5,
    name: "Maria Rodriguez",
    tokens: 2450,
    impact: "15.7 tons CO2",
    avatar: "/placeholder.svg?height=40&width=40",
    isCurrentUser: true,
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  const getBadgeRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500"
      case "rare":
        return "bg-tracky-primary"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "campaign_join":
        return <Users className="h-4 w-4" />
      case "badge_earned":
        return <Award className="h-4 w-4" />
      case "impact_verified":
        return <Target className="h-4 w-4" />
      case "campaign_complete":
        return <Trophy className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">MR</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-foreground">{userData.name}</h1>
                      <Badge variant="secondary" className="bg-tracky-secondary/10 text-tracky-secondary">
                        {userData.stats.level}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{userData.username}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {userData.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Joined {new Date(userData.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground max-w-2xl">{userData.bio}</p>

                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-tracky-primary">{userData.stats.totalTokens}</div>
                    <div className="text-sm text-muted-foreground">Total Tokens</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-tracky-secondary">#{userData.stats.rank}</div>
                    <div className="text-sm text-muted-foreground">Global Rank</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-tracky-primary">{userData.stats.impactCreated}</div>
                    <div className="text-sm text-muted-foreground">CO2 Impact</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-2xl font-bold text-tracky-secondary">{userData.stats.reputation}</span>
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    </div>
                    <div className="text-sm text-muted-foreground">Reputation</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Token Balance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-tracky-primary" />
                    Token Balance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-tracky-primary mb-2">{userData.stats.totalTokens}</div>
                    <div className="text-sm text-muted-foreground">Available Tokens</div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>This Month</span>
                      <span className="font-medium text-tracky-secondary">+450 tokens</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Campaign</span>
                      <span className="font-medium text-tracky-primary">+150 tokens</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Bonus Rewards</span>
                      <span className="font-medium text-tracky-secondary">+75 tokens</span>
                    </div>
                  </div>

                  <Button className="w-full bg-tracky-primary hover:bg-tracky-primary/90 text-white">
                    Redeem Tokens
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-tracky-secondary" />
                    Recent Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {userData.badges.slice(0, 6).map((badge) => (
                      <div key={badge.id} className="text-center">
                        <div
                          className={`w-16 h-16 rounded-full ${getBadgeRarityColor(badge.rarity)} flex items-center justify-center text-2xl mx-auto mb-2`}
                        >
                          {badge.icon}
                        </div>
                        <div className="text-xs font-medium">{badge.name}</div>
                        <div className="text-xs text-muted-foreground capitalize">{badge.rarity}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Campaign Participation */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Participation</CardTitle>
                <CardDescription>Your involvement in environmental campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="flex items-center justify-between p-4 border border-border/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-tracky-primary/10">
                          <Leaf className="h-5 w-5 text-tracky-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-sm text-muted-foreground">Role: {campaign.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={campaign.status === "active" ? "default" : "secondary"}
                          className={campaign.status === "active" ? "bg-tracky-secondary text-white" : ""}
                        >
                          {campaign.status}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">
                          {campaign.tokens} tokens • {campaign.impact}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Badge Collection</CardTitle>
                <CardDescription>Achievements earned through environmental actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {userData.badges.map((badge) => (
                    <div key={badge.id} className="p-6 border border-border/50 rounded-lg text-center">
                      <div
                        className={`w-20 h-20 rounded-full ${getBadgeRarityColor(badge.rarity)} flex items-center justify-center text-3xl mx-auto mb-4`}
                      >
                        {badge.icon}
                      </div>
                      <h3 className="font-semibold mb-2">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                      <div className="flex items-center justify-center gap-2">
                        <Badge
                          variant="outline"
                          className={`capitalize ${getBadgeRarityColor(badge.rarity)} text-white border-0`}
                        >
                          {badge.rarity}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Earned {new Date(badge.earned).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Achievement Progress</CardTitle>
                <CardDescription>Track your progress towards environmental milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {userData.achievements.map((achievement) => (
                    <div key={achievement.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {achievement.completed ? (
                            <CheckCircle className="h-6 w-6 text-tracky-secondary" />
                          ) : (
                            <div className="h-6 w-6 rounded-full border-2 border-muted-foreground"></div>
                          )}
                          <div>
                            <h3 className="font-semibold">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {achievement.progress} / {achievement.maxProgress}
                          </div>
                          {achievement.completed && (
                            <Badge variant="secondary" className="bg-tracky-secondary/10 text-tracky-secondary">
                              Completed
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Progress
                        value={Math.min((achievement.progress / achievement.maxProgress) * 100, 100)}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Global Leaderboard
                </CardTitle>
                <CardDescription>Top environmental impact creators worldwide</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        user.isCurrentUser
                          ? "bg-tracky-primary/10 border-2 border-tracky-primary/20"
                          : "border border-border/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8">
                          {user.rank === 1 && <Crown className="h-6 w-6 text-yellow-500" />}
                          {user.rank === 2 && <Medal className="h-6 w-6 text-gray-400" />}
                          {user.rank === 3 && <Medal className="h-6 w-6 text-amber-600" />}
                          {user.rank > 3 && <span className="font-bold text-muted-foreground">#{user.rank}</span>}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {user.name}
                            {user.isCurrentUser && (
                              <Badge variant="secondary" className="bg-tracky-primary/10 text-tracky-primary">
                                You
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">Impact: {user.impact}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-tracky-primary">{user.tokens}</div>
                        <div className="text-sm text-muted-foreground">tokens</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest environmental actions and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-tracky-primary/10">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()}
                        </div>
                      </div>
                      {activity.tokens > 0 && (
                        <div className="text-right">
                          <div className="font-medium text-tracky-primary">+{activity.tokens}</div>
                          <div className="text-xs text-muted-foreground">tokens</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
