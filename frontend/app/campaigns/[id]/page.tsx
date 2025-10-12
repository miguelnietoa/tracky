"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
  Loader2,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { CampaignService } from "@/lib/campaign-service"
import { Campaign } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CampaignDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true)
        const response = await CampaignService.getCampaignById(params.id)

        if (response.error) {
          setError(response.error.message)
          toast({
            variant: "destructive",
            title: "Error Loading Campaign",
            description: response.error.message
          })
        } else if (response.data) {
          setCampaign(response.data)
        }
      } catch (error) {
        setError('Failed to load campaign')
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load campaign details"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCampaign()
  }, [params.id, toast])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading campaign details...</span>
        </div>
      </div>
    )
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-background">
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
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/campaigns">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Campaigns
              </Button>
            </Link>
          </div>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || 'Campaign not found'}
            </AlertDescription>
          </Alert>
        </div>
        <Toaster />
      </div>
    )
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
                      {campaign.campaignStatus}
                    </Badge>
                    <Badge variant="outline">Environmental</Badge>
                  </div>
                  <h1 className="text-4xl font-bold text-foreground">{campaign.name}</h1>
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
                  {campaign.city}, {campaign.country}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(campaign.startDate).toLocaleDateString()} -{" "}
                  {new Date(campaign.endDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2" />
                  {campaign.currentParticipants}/{campaign.totalParticipants} participants
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
                    <p className="text-muted-foreground leading-relaxed">{campaign.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Organizer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{campaign.creator.name.charAt(0)}{campaign.creator.lastName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{campaign.creator.name} {campaign.creator.lastName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Campaign Creator • {campaign.creator.email}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Progress</CardTitle>
                    <CardDescription>Track participation and campaign development</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Participation Progress</span>
                        <span className="text-muted-foreground">
                          {campaign.currentParticipants} / {campaign.totalParticipants} participants
                        </span>
                      </div>
                      <Progress value={(campaign.currentParticipants / campaign.totalParticipants) * 100} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        {Math.round((campaign.currentParticipants / campaign.totalParticipants) * 100)}% of target reached
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="text-sm font-medium">Campaign Status</Label>
                        <p className="text-sm text-muted-foreground capitalize">{campaign.campaignStatus}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Token Reward</Label>
                        <p className="text-sm text-muted-foreground">{campaign.token} tokens</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Created Date</Label>
                        <p className="text-sm text-muted-foreground">
                          {new Date(campaign.createAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Location</Label>
                        <p className="text-sm text-muted-foreground">{campaign.address}</p>
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
                      Blockchain Features
                    </CardTitle>
                    <CardDescription>Transparent and immutable tracking capabilities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Available Features</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 bg-tracky-secondary rounded-full"></div>
                          <span className="text-sm">Immutable impact tracking</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 bg-tracky-secondary rounded-full"></div>
                          <span className="text-sm">Transparent resource allocation</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 bg-tracky-secondary rounded-full"></div>
                          <span className="text-sm">Automated token rewards: {campaign.token} tokens</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 bg-tracky-secondary rounded-full"></div>
                          <span className="text-sm">Verifiable impact certificates</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="updates" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Campaign Updates</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Created on {new Date(campaign.createAt).toLocaleDateString()}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Campaign "{campaign.name}" was successfully created and is currently {campaign.campaignStatus.toLowerCase()}.
                      Join this initiative to contribute to environmental sustainability.
                    </p>
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
                      <span className="text-sm text-muted-foreground">By {campaign.creator.name} {campaign.creator.lastName}</span>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact Creator
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
                  <div className="text-3xl font-bold text-tracky-primary mb-2">{campaign.token}</div>
                  <div className="text-sm text-muted-foreground">tokens reward</div>
                </div>
                <Button className="w-full bg-tracky-primary hover:bg-tracky-primary/90 text-white">
                  Join Campaign
                </Button>
                <div className="text-xs text-center text-muted-foreground">
                  {campaign.totalParticipants - campaign.currentParticipants} spots remaining
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
                <CardTitle className="text-lg">Campaign Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Current Participants:</span>
                    <span className="font-medium">{campaign.currentParticipants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Capacity:</span>
                    <span className="font-medium">{campaign.totalParticipants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Available Spots:</span>
                    <span className="font-medium">{campaign.totalParticipants - campaign.currentParticipants}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Join {campaign.currentParticipants} other volunteers making a difference
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
