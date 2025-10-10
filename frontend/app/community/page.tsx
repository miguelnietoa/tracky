"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  MessageCircle,
  Users,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Heart,
  MessageSquare,
  Eye,
  Pin,
  Star,
} from "lucide-react"
import Link from "next/link"

// Mock community data
const communityStats = {
  totalMembers: 15847,
  activeDiscussions: 234,
  monthlyPosts: 1289,
  helpfulAnswers: 892,
}

const trendingTopics = [
  { id: 1, name: "Ocean Cleanup", posts: 45, trend: "+12%" },
  { id: 2, name: "Urban Gardening", posts: 38, trend: "+8%" },
  { id: 3, name: "Renewable Energy", posts: 32, trend: "+15%" },
  { id: 4, name: "Waste Reduction", posts: 28, trend: "+5%" },
]

const discussions = [
  {
    id: 1,
    title: "Best practices for organizing beach cleanup events",
    content:
      "I'm planning to organize a beach cleanup in my local area and would love to hear from experienced organizers about best practices, safety considerations, and how to maximize impact.",
    author: {
      name: "Maria Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 4.8,
      level: "Eco Champion",
    },
    category: "Organization",
    tags: ["beach-cleanup", "organization", "safety"],
    createdAt: "2025-01-14T10:30:00Z",
    replies: 23,
    views: 156,
    likes: 45,
    isPinned: true,
    isAnswered: false,
  },
  {
    id: 2,
    title: "How to measure CO2 impact accurately in tree planting campaigns?",
    content:
      "We're running a tree planting campaign and want to ensure our CO2 impact calculations are accurate. What methodologies do you recommend for measuring and verifying environmental impact?",
    author: {
      name: "Carlos Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 4.9,
      level: "Impact Leader",
    },
    category: "Impact Measurement",
    tags: ["co2", "measurement", "trees", "verification"],
    createdAt: "2025-01-13T15:45:00Z",
    replies: 18,
    views: 203,
    likes: 67,
    isPinned: false,
    isAnswered: true,
  },
  {
    id: 3,
    title: "Blockchain verification process - technical questions",
    content:
      "Can someone explain how the blockchain verification works for campaign actions? I'm curious about the technical implementation and how it ensures transparency.",
    author: {
      name: "Ana Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 4.6,
      level: "Tech Advocate",
    },
    category: "Technology",
    tags: ["blockchain", "verification", "technical"],
    createdAt: "2025-01-13T09:20:00Z",
    replies: 31,
    views: 289,
    likes: 89,
    isPinned: false,
    isAnswered: true,
  },
  {
    id: 4,
    title: "Sustainable materials for campaign supplies",
    content:
      "Looking for recommendations on sustainable materials and suppliers for campaign equipment like gloves, bags, and tools. What has worked well for your campaigns?",
    author: {
      name: "Diego Lopez",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 4.4,
      level: "Green Innovator",
    },
    category: "Resources",
    tags: ["sustainable", "materials", "supplies"],
    createdAt: "2025-01-12T14:10:00Z",
    replies: 12,
    views: 98,
    likes: 34,
    isPinned: false,
    isAnswered: false,
  },
]

const categories = [
  { id: "all", name: "All Discussions", count: 234 },
  { id: "organization", name: "Organization", count: 67 },
  { id: "impact", name: "Impact Measurement", count: 45 },
  { id: "technology", name: "Technology", count: 38 },
  { id: "resources", name: "Resources", count: 42 },
  { id: "success-stories", name: "Success Stories", count: 28 },
  { id: "help", name: "Help & Support", count: 14 },
]

const topContributors = [
  {
    name: "Carlos Silva",
    avatar: "/placeholder.svg?height=40&width=40",
    posts: 89,
    helpfulAnswers: 67,
    reputation: 4.9,
  },
  {
    name: "Maria Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    posts: 76,
    helpfulAnswers: 54,
    reputation: 4.8,
  },
  {
    name: "Ana Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    posts: 63,
    helpfulAnswers: 41,
    reputation: 4.6,
  },
]

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [showNewPostForm, setShowNewPostForm] = useState(false)

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesCategory = selectedCategory === "all" || discussion.category.toLowerCase() === selectedCategory
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Community Hub</h1>
            <p className="text-muted-foreground mt-2">
              Connect, share knowledge, and collaborate with environmental advocates worldwide
            </p>
          </div>
          <Button
            onClick={() => setShowNewPostForm(!showNewPostForm)}
            className="bg-tracky-primary hover:bg-tracky-primary/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Discussion
          </Button>
        </div>

        {/* Community Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-tracky-primary">
                {communityStats.totalMembers.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Discussions</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-tracky-secondary">{communityStats.activeDiscussions}</div>
              <p className="text-xs text-muted-foreground">+8 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Posts</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-tracky-primary">{communityStats.monthlyPosts}</div>
              <p className="text-xs text-muted-foreground">+15% increase</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Helpful Answers</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-tracky-secondary">{communityStats.helpfulAnswers}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? "bg-tracky-primary/10 text-tracky-primary"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-xs text-muted-foreground">{category.count}</span>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trending Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic) => (
                  <div key={topic.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{topic.name}</div>
                      <div className="text-xs text-muted-foreground">{topic.posts} posts</div>
                    </div>
                    <Badge variant="secondary" className="bg-tracky-secondary/10 text-tracky-secondary">
                      {topic.trend}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Contributors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {contributor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{contributor.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {contributor.posts} posts • {contributor.helpfulAnswers} helpful
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs">{contributor.reputation}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* New Post Form */}
            {showNewPostForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Start a New Discussion</CardTitle>
                  <CardDescription>Share your thoughts, ask questions, or start a conversation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Input placeholder="Discussion title..." className="text-base" />
                  </div>
                  <div className="space-y-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="organization">Organization</SelectItem>
                        <SelectItem value="impact">Impact Measurement</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="resources">Resources</SelectItem>
                        <SelectItem value="success-stories">Success Stories</SelectItem>
                        <SelectItem value="help">Help & Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Share your thoughts, ask questions, or provide details..."
                      className="min-h-32 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input placeholder="Tags (comma separated)" />
                  </div>
                  <div className="flex gap-3">
                    <Button className="bg-tracky-primary hover:bg-tracky-primary/90 text-white">Post Discussion</Button>
                    <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="answered">Answered</SelectItem>
                  <SelectItem value="unanswered">Unanswered</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Discussions List */}
            <div className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <Card key={discussion.id} className="hover:bg-muted/30 transition-colors">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            {discussion.isPinned && <Pin className="h-4 w-4 text-tracky-primary" />}
                            <Link
                              href={`/community/discussions/${discussion.id}`}
                              className="text-lg font-semibold hover:text-tracky-primary transition-colors"
                            >
                              {discussion.title}
                            </Link>
                            {discussion.isAnswered && (
                              <Badge variant="secondary" className="bg-tracky-secondary/10 text-tracky-secondary">
                                Answered
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground line-clamp-2">{discussion.content}</p>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {discussion.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Separator />

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {discussion.author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{discussion.author.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {discussion.author.level}
                              </Badge>
                              <span>{formatTimeAgo(discussion.createdAt)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {discussion.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {discussion.replies}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {discussion.likes}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" size="lg">
                Load More Discussions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
