"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { CalendarIcon, MapPin, Target, Users, Leaf, ArrowLeft, Plus, X } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

export default function CreateCampaignPage() {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [impactMetrics, setImpactMetrics] = useState([{ id: 1, name: "Plastic Waste Removed", unit: "kg", target: "" }])

  const addImpactMetric = () => {
    setImpactMetrics([...impactMetrics, { id: Date.now(), name: "", unit: "", target: "" }])
  }

  const removeImpactMetric = (id: number) => {
    setImpactMetrics(impactMetrics.filter((metric) => metric.id !== id))
  }

  const updateImpactMetric = (id: number, field: string, value: string) => {
    setImpactMetrics(impactMetrics.map((metric) => (metric.id === id ? { ...metric, [field]: value } : metric)))
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
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create New Campaign</h1>
            <p className="text-muted-foreground mt-2">
              Set up a transparent environmental campaign with verifiable impact tracking
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Provide the essential details about your environmental campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Campaign Title</Label>
                  <Input id="title" placeholder="e.g., Beach Cleanup Initiative" className="text-base" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your campaign's purpose, activities, and expected outcomes..."
                    className="min-h-32 text-base"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cleanup">Cleanup</SelectItem>
                        <SelectItem value="reforestation">Reforestation</SelectItem>
                        <SelectItem value="restoration">Restoration</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="conservation">Conservation</SelectItem>
                        <SelectItem value="renewable">Renewable Energy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="location" placeholder="City, Country" className="pl-10" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Timeline</CardTitle>
                <CardDescription>Set the duration for your environmental campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Impact Metrics */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Impact Metrics</CardTitle>
                    <CardDescription>Define measurable goals for your campaign's environmental impact</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={addImpactMetric}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Metric
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {impactMetrics.map((metric, index) => (
                  <div key={metric.id} className="flex gap-4 items-end">
                    <div className="flex-1 space-y-2">
                      <Label>Metric Name</Label>
                      <Input
                        placeholder="e.g., Plastic Waste Removed"
                        value={metric.name}
                        onChange={(e) => updateImpactMetric(metric.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="w-24 space-y-2">
                      <Label>Unit</Label>
                      <Input
                        placeholder="kg"
                        value={metric.unit}
                        onChange={(e) => updateImpactMetric(metric.id, "unit", e.target.value)}
                      />
                    </div>
                    <div className="w-32 space-y-2">
                      <Label>Target</Label>
                      <Input
                        placeholder="500"
                        value={metric.target}
                        onChange={(e) => updateImpactMetric(metric.id, "target", e.target.value)}
                      />
                    </div>
                    {impactMetrics.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeImpactMetric(metric.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Participation Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Participation Settings</CardTitle>
                <CardDescription>Configure how volunteers can join and participate in your campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Maximum Participants</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="maxParticipants" type="number" placeholder="100" className="pl-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tokenReward">Token Reward per Participant</Label>
                  <Input id="tokenReward" type="number" placeholder="150" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Application</Label>
                    <p className="text-sm text-muted-foreground">Volunteers must apply and be approved to join</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Real-time Tracking</Label>
                    <p className="text-sm text-muted-foreground">Track volunteer actions on the blockchain</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Campaign Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Target className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Campaign preview will appear here</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Campaign Title</h3>
                  <p className="text-sm text-muted-foreground">Your campaign description will appear here...</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">Category</Badge>
                  <Badge variant="outline" className="bg-tracky-secondary/10 text-tracky-secondary">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Blockchain Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  <span className="text-sm">Automated token rewards</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-tracky-secondary rounded-full"></div>
                  <span className="text-sm">Verifiable impact certificates</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full bg-tracky-primary hover:bg-tracky-primary/90 text-white">
                Create Campaign
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Save as Draft
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
