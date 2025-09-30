"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Leaf, ArrowLeft, Heart, Share2, Flag, Reply, MessageSquare, Eye, Pin, Star, CheckCircle } from "lucide-react"
import Link from "next/link"

// Mock discussion data
const discussion = {
  id: 1,
  title: "Best practices for organizing beach cleanup events",
  content: `I'm planning to organize a beach cleanup in my local area and would love to hear from experienced organizers about best practices, safety considerations, and how to maximize impact.

Here are some specific questions I have:

1. **Safety protocols** - What safety measures should be in place?
2. **Equipment** - What tools and supplies are essential?
3. **Volunteer coordination** - How do you manage large groups effectively?
4. **Impact measurement** - How do you track and verify the environmental impact?
5. **Community engagement** - Tips for getting local community involved?

I've done some research but would really appreciate insights from those who have organized successful cleanups. Any resources, checklists, or lessons learned would be incredibly helpful!

Looking forward to your responses and hopefully organizing an impactful event for our community.`,
  author: {
    name: "Maria Rodriguez",
    username: "@maria_eco",
    avatar: "/placeholder.svg?height=40&width=40",
    reputation: 4.8,
    level: "Eco Champion",
    badges: ["Beach Guardian", "Community Leader"],
    joinDate: "2024-03-15",
    posts: 76,
    helpfulAnswers: 54,
  },
  category: "Organization",
  tags: ["beach-cleanup", "organization", "safety", "community"],
  createdAt: "2025-01-14T10:30:00Z",
  updatedAt: "2025-01-14T10:30:00Z",
  views: 156,
  likes: 45,
  dislikes: 2,
  isPinned: true,
  isAnswered: false,
  replies: [
    {
      id: 1,
      content: `Great questions, Maria! I've organized over 20 beach cleanups and here are my key recommendations:

**Safety First:**
- Always have a first aid kit and trained person on site
- Provide gloves (nitrile work best) and grabbers/pickers
- Brief volunteers on hazardous items (needles, chemicals) - don't touch, mark location
- Have emergency contact numbers readily available
- Check tide schedules and weather conditions

**Essential Equipment:**
- Heavy-duty trash bags and recycling bags
- Gloves, grabbers, and buckets
- Data collection sheets for tracking waste types
- Scales for weighing collected waste
- Hand sanitizer and water stations
- Sunscreen and basic first aid supplies

**Volunteer Management:**
- Create teams of 5-8 people with team leaders
- Assign specific beach sections to each team
- Use a check-in/check-out system
- Provide clear instructions and safety briefing
- Have volunteers sign waivers

The key is preparation and clear communication. Happy to share more specific details if needed!`,
      author: {
        name: "Carlos Silva",
        username: "@carlos_ocean",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 4.9,
        level: "Impact Leader",
        badges: ["Ocean Guardian", "Mentor"],
      },
      createdAt: "2025-01-14T11:15:00Z",
      likes: 23,
      dislikes: 0,
      isHelpful: true,
      replies: [
        {
          id: 11,
          content:
            "This is incredibly helpful, Carlos! Do you have any recommendations for data collection apps or tools?",
          author: {
            name: "Maria Rodriguez",
            username: "@maria_eco",
            avatar: "/placeholder.svg?height=40&width=40",
            reputation: 4.8,
            level: "Eco Champion",
          },
          createdAt: "2025-01-14T11:45:00Z",
          likes: 5,
          dislikes: 0,
        },
      ],
    },
    {
      id: 2,
      content: `Adding to Carlos's excellent advice - here are some community engagement tips:

**Before the Event:**
- Partner with local environmental groups, schools, and businesses
- Use social media to create buzz and share educational content
- Contact local media for coverage
- Create a simple website or event page with all details

**During the Event:**
- Take lots of photos and videos (with permission)
- Have volunteers share their experience on social media
- Provide educational materials about marine pollution
- Consider having a marine biologist or expert speak briefly

**After the Event:**
- Share results and impact data with participants
- Thank volunteers publicly and individually
- Submit data to marine debris databases
- Plan follow-up activities or next cleanup

The key is making it educational and community-building, not just cleanup work. People are more likely to return and bring friends when they feel part of something meaningful.`,
      author: {
        name: "Ana Martinez",
        username: "@ana_green",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 4.6,
        level: "Tech Advocate",
        badges: ["Community Builder"],
      },
      createdAt: "2025-01-14T12:30:00Z",
      likes: 18,
      dislikes: 0,
      isHelpful: true,
      replies: [],
    },
    {
      id: 3,
      content: `For impact measurement, I highly recommend using the Marine Debris Tracker app or similar tools. It helps standardize data collection and contributes to global research.

Also, consider these metrics:
- Total weight of debris collected
- Number of volunteers and hours contributed
- Types of debris (plastic bottles, cigarette butts, etc.)
- Area covered (in square meters)
- Before/after photos of the cleanup area

Document everything for future reference and to show sponsors/supporters the real impact of their support.`,
      author: {
        name: "Diego Lopez",
        username: "@diego_data",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 4.4,
        level: "Green Innovator",
        badges: ["Data Analyst"],
      },
      createdAt: "2025-01-14T14:20:00Z",
      likes: 12,
      dislikes: 0,
      isHelpful: false,
      replies: [],
    },
  ],
}

export default function DiscussionDetailPage({ params }: { params: { id: string } }) {
  const [newReply, setNewReply] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [likedReplies, setLikedReplies] = useState<Set<number>>(new Set())
  const [isLiked, setIsLiked] = useState(false)

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

  const handleLikeReply = (replyId: number) => {
    const newLikedReplies = new Set(likedReplies)
    if (newLikedReplies.has(replyId)) {
      newLikedReplies.delete(replyId)
    } else {
      newLikedReplies.add(replyId)
    }
    setLikedReplies(newLikedReplies)
  }

  const handleSubmitReply = () => {
    if (newReply.trim()) {
      // Handle reply submission
      setNewReply("")
      setReplyingTo(null)
    }
  }

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
              <Link href="/community" className="text-sm font-medium text-tracky-primary">
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
          <Link href="/community">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Community
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Original Post */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {discussion.isPinned && <Pin className="h-5 w-5 text-tracky-primary" />}
                          <h1 className="text-2xl font-bold text-foreground">{discussion.title}</h1>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Button variant="outline" size="sm">
                          <Flag className="h-4 w-4 mr-2" />
                          Report
                        </Button>
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {discussion.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{discussion.author.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {discussion.author.level}
                          </Badge>
                          <span>{formatTimeAgo(discussion.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                      {discussion.content}
                    </div>
                  </div>

                  <Separator />

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsLiked(!isLiked)}
                        className={isLiked ? "text-red-500" : ""}
                      >
                        <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                        {discussion.likes + (isLiked ? 1 : 0)}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {discussion.replies.length} replies
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {discussion.views} views
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Replies */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                {discussion.replies.length} {discussion.replies.length === 1 ? "Reply" : "Replies"}
              </h2>

              {discussion.replies.map((reply) => (
                <Card key={reply.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Reply Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={reply.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {reply.author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{reply.author.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {reply.author.level}
                              </Badge>
                              <span>{formatTimeAgo(reply.createdAt)}</span>
                              {reply.isHelpful && (
                                <Badge variant="secondary" className="bg-tracky-secondary/10 text-tracky-secondary">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Helpful
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Reply Content */}
                      <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed ml-13">
                        {reply.content}
                      </div>

                      {/* Reply Actions */}
                      <div className="flex items-center gap-4 ml-13">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLikeReply(reply.id)}
                          className={likedReplies.has(reply.id) ? "text-red-500" : ""}
                        >
                          <Heart className={`h-4 w-4 mr-2 ${likedReplies.has(reply.id) ? "fill-current" : ""}`} />
                          {reply.likes + (likedReplies.has(reply.id) ? 1 : 0)}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setReplyingTo(reply.id)}>
                          <Reply className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Flag className="h-4 w-4 mr-2" />
                          Report
                        </Button>
                      </div>

                      {/* Nested Replies */}
                      {reply.replies && reply.replies.length > 0 && (
                        <div className="ml-13 space-y-4 border-l-2 border-border/50 pl-4">
                          {reply.replies.map((nestedReply) => (
                            <div key={nestedReply.id} className="space-y-3">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={nestedReply.author.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>
                                    {nestedReply.author.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-sm">{nestedReply.author.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {formatTimeAgo(nestedReply.createdAt)}
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground ml-11">{nestedReply.content}</div>
                              <div className="flex items-center gap-4 ml-11">
                                <Button variant="ghost" size="sm" className="text-xs h-8">
                                  <Heart className="h-3 w-3 mr-1" />
                                  {nestedReply.likes}
                                </Button>
                                <Button variant="ghost" size="sm" className="text-xs h-8">
                                  <Reply className="h-3 w-3 mr-1" />
                                  Reply
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Form */}
                      {replyingTo === reply.id && (
                        <div className="ml-13 space-y-3">
                          <Textarea
                            placeholder="Write your reply..."
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            className="min-h-24"
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleSubmitReply}>
                              Post Reply
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* New Reply Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Your Reply</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Share your thoughts, experiences, or ask follow-up questions..."
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  className="min-h-32"
                />
                <div className="flex gap-3">
                  <Button
                    onClick={handleSubmitReply}
                    className="bg-tracky-primary hover:bg-tracky-primary/90 text-white"
                  >
                    Post Reply
                  </Button>
                  <Button variant="outline">Preview</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Author Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About the Author</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {discussion.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{discussion.author.name}</div>
                    <div className="text-sm text-muted-foreground">{discussion.author.username}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Reputation</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{discussion.author.reputation}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Posts</span>
                    <span>{discussion.author.posts}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Helpful Answers</span>
                    <span>{discussion.author.helpfulAnswers}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Member Since</span>
                    <span>{new Date(discussion.author.joinDate).getFullYear()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Badges</div>
                  <div className="flex flex-wrap gap-1">
                    {discussion.author.badges.map((badge) => (
                      <Badge key={badge} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Discussion Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Discussion Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Views</span>
                  <span>{discussion.views}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Replies</span>
                  <span>{discussion.replies.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Likes</span>
                  <span>{discussion.likes}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Created</span>
                  <span>{formatTimeAgo(discussion.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Last Activity</span>
                  <span>{formatTimeAgo(discussion.updatedAt)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Related Discussions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Discussions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Equipment recommendations for cleanup events",
                  "Measuring environmental impact effectively",
                  "Building community partnerships",
                ].map((title, index) => (
                  <Link key={index} href="#" className="block text-sm hover:text-tracky-primary transition-colors">
                    {title}
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
