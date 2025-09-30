"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, ShoppingCart, Coins, Star, Zap, Award, TreePine, Heart, Globe, Search, Filter } from "lucide-react"
import Link from "next/link"

// Mock rewards data
const userTokens = 2450

const rewardCategories = [
  { id: "eco", name: "Eco Products", icon: <TreePine className="h-5 w-5" />, count: 24 },
  { id: "experiences", name: "Experiences", icon: <Globe className="h-5 w-5" />, count: 12 },
  { id: "donations", name: "Donations", icon: <Heart className="h-5 w-5" />, count: 8 },
  { id: "digital", name: "Digital Rewards", icon: <Zap className="h-5 w-5" />, count: 15 },
]

const featuredRewards = [
  {
    id: 1,
    title: "Bamboo Water Bottle",
    description: "Sustainable bamboo water bottle with 500ml capacity",
    cost: 150,
    category: "eco",
    image: "/placeholder.svg?height=200&width=200&text=Bamboo+Bottle",
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    title: "Tree Planting Certificate",
    description: "Plant a tree in your name in reforestation projects",
    cost: 200,
    category: "experiences",
    image: "/placeholder.svg?height=200&width=200&text=Tree+Certificate",
    inStock: true,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    title: "Ocean Cleanup Donation",
    description: "Support ocean cleanup initiatives worldwide",
    cost: 100,
    category: "donations",
    image: "/placeholder.svg?height=200&width=200&text=Ocean+Cleanup",
    inStock: true,
    rating: 5.0,
    reviews: 256,
  },
]

const allRewards = [
  ...featuredRewards,
  {
    id: 4,
    title: "Solar Power Bank",
    description: "Portable solar-powered charging device",
    cost: 300,
    category: "eco",
    image: "/placeholder.svg?height=200&width=200&text=Solar+Bank",
    inStock: true,
    rating: 4.7,
    reviews: 67,
  },
  {
    id: 5,
    title: "Eco Workshop Access",
    description: "Online sustainability workshop series",
    cost: 250,
    category: "digital",
    image: "/placeholder.svg?height=200&width=200&text=Workshop",
    inStock: true,
    rating: 4.6,
    reviews: 43,
  },
  {
    id: 6,
    title: "Reusable Food Wraps",
    description: "Set of 3 beeswax food wraps",
    cost: 120,
    category: "eco",
    image: "/placeholder.svg?height=200&width=200&text=Food+Wraps",
    inStock: false,
    rating: 4.5,
    reviews: 91,
  },
]

const tokenHistory = [
  { id: 1, type: "earned", description: "Beach Cleanup Campaign", amount: 150, date: "2025-01-14" },
  { id: 2, type: "redeemed", description: "Bamboo Water Bottle", amount: -150, date: "2025-01-12" },
  { id: 3, type: "earned", description: "Impact Verification Bonus", amount: 100, date: "2025-01-10" },
  { id: 4, type: "earned", description: "Urban Tree Planting", amount: 200, date: "2025-01-08" },
  { id: 5, type: "redeemed", description: "Ocean Cleanup Donation", amount: -100, date: "2025-01-05" },
]

export default function RewardsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRewards = allRewards.filter((reward) => {
    const matchesCategory = selectedCategory === "all" || reward.category === selectedCategory
    const matchesSearch =
      reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-tracky-primary/10 rounded-full">
                <Coins className="h-4 w-4 text-tracky-primary" />
                <span className="font-medium text-tracky-primary">{userTokens}</span>
              </div>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Token Rewards</h1>
          <p className="text-muted-foreground">
            Redeem your environmental impact tokens for sustainable products and experiences
          </p>
        </div>

        {/* Token Balance */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-tracky-primary/10">
                  <Coins className="h-8 w-8 text-tracky-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-tracky-primary">{userTokens} Tokens</h2>
                  <p className="text-muted-foreground">Available for redemption</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-2">This month earned</div>
                <div className="text-xl font-semibold text-tracky-secondary">+450 tokens</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="rewards" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rewards">Browse Rewards</TabsTrigger>
            <TabsTrigger value="history">Token History</TabsTrigger>
            <TabsTrigger value="earn">Earn More</TabsTrigger>
          </TabsList>

          <TabsContent value="rewards" className="space-y-6">
            {/* Categories */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {rewardCategories.map((category) => (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-colors ${
                    selectedCategory === category.id
                      ? "bg-tracky-primary/10 border-tracky-primary"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="pt-6 text-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-tracky-primary/10 mx-auto mb-3">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} items</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search rewards..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="eco">Eco Products</SelectItem>
                  <SelectItem value="experiences">Experiences</SelectItem>
                  <SelectItem value="donations">Donations</SelectItem>
                  <SelectItem value="digital">Digital Rewards</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Featured Rewards */}
            {selectedCategory === "all" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Featured Rewards</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredRewards.map((reward) => (
                    <Card key={reward.id} className="overflow-hidden">
                      <div className="aspect-square bg-muted">
                        <img
                          src={reward.image || "/placeholder.svg"}
                          alt={reward.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold">{reward.title}</h3>
                            <p className="text-sm text-muted-foreground">{reward.description}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{reward.rating}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">({reward.reviews} reviews)</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Coins className="h-4 w-4 text-tracky-primary" />
                              <span className="font-bold text-tracky-primary">{reward.cost} tokens</span>
                            </div>
                            <Button
                              size="sm"
                              disabled={!reward.inStock || userTokens < reward.cost}
                              className="bg-tracky-primary hover:bg-tracky-primary/90 text-white"
                            >
                              {!reward.inStock
                                ? "Out of Stock"
                                : userTokens < reward.cost
                                  ? "Insufficient Tokens"
                                  : "Redeem"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Rewards */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                {selectedCategory === "all"
                  ? "All Rewards"
                  : `${rewardCategories.find((c) => c.id === selectedCategory)?.name || "Rewards"}`}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredRewards.map((reward) => (
                  <Card key={reward.id} className="overflow-hidden">
                    <div className="aspect-square bg-muted">
                      <img
                        src={reward.image || "/placeholder.svg"}
                        alt={reward.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold">{reward.title}</h3>
                          <p className="text-sm text-muted-foreground">{reward.description}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{reward.rating}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">({reward.reviews} reviews)</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Coins className="h-4 w-4 text-tracky-primary" />
                            <span className="font-bold text-tracky-primary">{reward.cost} tokens</span>
                          </div>
                          <Button
                            size="sm"
                            disabled={!reward.inStock || userTokens < reward.cost}
                            className="bg-tracky-primary hover:bg-tracky-primary/90 text-white"
                          >
                            {!reward.inStock ? "Out of Stock" : userTokens < reward.cost ? "Insufficient" : "Redeem"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Token Transaction History</CardTitle>
                <CardDescription>Track your token earnings and redemptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tokenHistory.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border border-border/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full ${
                            transaction.type === "earned" ? "bg-tracky-secondary/10" : "bg-tracky-primary/10"
                          }`}
                        >
                          {transaction.type === "earned" ? (
                            <Award className="h-5 w-5 text-tracky-secondary" />
                          ) : (
                            <ShoppingCart className="h-5 w-5 text-tracky-primary" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`font-bold ${
                          transaction.amount > 0 ? "text-tracky-secondary" : "text-tracky-primary"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {transaction.amount} tokens
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earn" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-tracky-primary" />
                    Join Campaigns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Participate in environmental campaigns to earn tokens based on your impact.
                  </p>
                  <div className="text-2xl font-bold text-tracky-primary mb-2">50-300 tokens</div>
                  <p className="text-sm text-muted-foreground mb-4">per campaign</p>
                  <Link href="/campaigns">
                    <Button className="w-full bg-tracky-primary hover:bg-tracky-primary/90 text-white">
                      Browse Campaigns
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-tracky-secondary" />
                    Complete Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Unlock achievements and earn bonus tokens for reaching milestones.
                  </p>
                  <div className="text-2xl font-bold text-tracky-secondary mb-2">25-500 tokens</div>
                  <p className="text-sm text-muted-foreground mb-4">per achievement</p>
                  <Link href="/profile?tab=achievements">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Achievements
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Daily Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Complete daily environmental challenges for consistent token rewards.
                  </p>
                  <div className="text-2xl font-bold text-yellow-600 mb-2">10-50 tokens</div>
                  <p className="text-sm text-muted-foreground mb-4">daily</p>
                  <Button variant="outline" className="w-full bg-transparent" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
