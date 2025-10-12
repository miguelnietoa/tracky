"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, MapPin, Calendar, Users, Target, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { CampaignService } from "@/lib/campaign-service"
import { Campaign, CampaignStatus } from "@/lib/types"

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      const response = await CampaignService.getAllCampaigns()

      if (response.error) {
        setError(response.error.message)
      } else {
        setCampaigns(response.data || [])
      }
    } catch (err) {
      setError('Failed to fetch campaigns')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const getStatusBadgeVariant = (status: CampaignStatus) => {
    switch (status) {
      case CampaignStatus.ACTIVE:
        return "default"
      case CampaignStatus.COMPLETED:
        return "secondary"
      case CampaignStatus.CREATED:
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusText = (status: CampaignStatus) => {
    switch (status) {
      case CampaignStatus.CREATED:
        return "Awaiting Approval"
      case CampaignStatus.ACTIVE:
        return "Active"
      case CampaignStatus.COMPLETED:
        return "Completed"
      case CampaignStatus.CANCELLED:
        return "Cancelled"
      case CampaignStatus.PENDING:
        return "Pending"
      case CampaignStatus.INPROGRESS:
        return "In Progress"
      default:
        return status
    }
  }
  return (
    <div className="min-h-screen bg-background">
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

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-tracky-primary" />
            <span className="ml-2 text-muted-foreground">Loading campaigns...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Campaign Grid */}
        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="border-border/50 bg-card/50 backdrop-blur hover:bg-card/80 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge
                      variant={getStatusBadgeVariant(campaign.campaignStatus)}
                      className={campaign.campaignStatus === CampaignStatus.ACTIVE ? "bg-tracky-secondary text-white" : ""}
                    >
                      {getStatusText(campaign.campaignStatus)}
                    </Badge>
                    <div className="text-right">
                      <div className="text-sm font-medium text-tracky-primary">{campaign.token} tokens</div>
                      <div className="text-xs text-muted-foreground">reward</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{campaign.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                  <div className="pt-2 border-t border-border/50">
                    <div className="text-sm font-medium text-tracky-secondary mb-2">Created by</div>
                    <div className="text-sm text-muted-foreground">{campaign.creator.name} {campaign.creator.lastName}</div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Link href={`/campaigns/${campaign.id}`} className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent">
                        View Details
                      </Button>
                    </Link>
                    {campaign.campaignStatus === CampaignStatus.ACTIVE ? (
                      <Button className="flex-1 bg-tracky-primary hover:bg-tracky-primary/90 text-white">
                        Join Campaign
                      </Button>
                    ) : campaign.campaignStatus === CampaignStatus.CREATED ? (
                      <Button disabled className="flex-1" variant="outline">
                        Awaiting Approval
                      </Button>
                    ) : (
                      <Button disabled className="flex-1" variant="outline">
                        {getStatusText(campaign.campaignStatus)}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && campaigns.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No campaigns found</h3>
            <p className="text-muted-foreground mb-4">Be the first to create an environmental campaign!</p>
            <Link href="/campaigns/create">
              <Button className="bg-tracky-primary hover:bg-tracky-primary/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </Link>
          </div>
        )}

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
