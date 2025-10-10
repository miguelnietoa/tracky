"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Filter,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  BarChart3,
  TrendingUp,
  Zap,
  Shield,
} from "lucide-react"

export default function AuditingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const auditMetrics = [
    { label: "Total Resources Tracked", value: "2,847", change: "+12%", icon: BarChart3 },
    { label: "Active Audits", value: "156", change: "+8%", icon: Eye },
    { label: "Compliance Rate", value: "94.2%", change: "+2.1%", icon: Shield },
    { label: "Real-time Updates", value: "1,234", change: "+15%", icon: Zap },
  ]

  const recentAudits = [
    {
      id: "AUD-001",
      campaign: "Amazon Reforestation",
      resource: "Tree Seedlings",
      quantity: 5000,
      status: "verified",
      auditor: "Maria Santos",
      timestamp: "2 hours ago",
      location: "Acre, Brazil",
    },
    {
      id: "AUD-002",
      campaign: "Ocean Cleanup",
      resource: "Cleanup Equipment",
      quantity: 25,
      status: "pending",
      auditor: "Carlos Rodriguez",
      timestamp: "4 hours ago",
      location: "Lima, Peru",
    },
    {
      id: "AUD-003",
      campaign: "Solar Installation",
      resource: "Solar Panels",
      quantity: 100,
      status: "flagged",
      auditor: "Ana Gutierrez",
      timestamp: "6 hours ago",
      location: "Mexico City, Mexico",
    },
  ]

  const resourceCategories = [
    { name: "Equipment", count: 847, verified: 92, pending: 15, flagged: 3 },
    { name: "Materials", count: 1234, verified: 95, pending: 8, flagged: 2 },
    { name: "Supplies", count: 456, verified: 88, pending: 22, flagged: 5 },
    { name: "Infrastructure", count: 310, verified: 97, pending: 5, flagged: 1 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-tracky-secondary/20 text-tracky-secondary border-tracky-secondary/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "flagged":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-muted text-muted-foreground border-border/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "flagged":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">
            Resource Auditing
          </h1>
          <p className="text-muted-foreground text-lg">Real-time monitoring and verification of campaign resources</p>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {auditMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card key={index} className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                      <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                      <p className="text-sm text-tracky-secondary">{metric.change}</p>
                    </div>
                    <div className="p-3 bg-tracky-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-tracky-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="audits">Recent Audits</TabsTrigger>
            <TabsTrigger value="resources">Resource Categories</TabsTrigger>
            <TabsTrigger value="reports">Audit Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Real-time Status */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-tracky-primary" />
                    Real-time Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">System Health</span>
                      <Badge className="bg-tracky-secondary/20 text-tracky-secondary border-tracky-secondary/30">Operational</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Data Sync</span>
                      <span className="text-sm text-tracky-secondary">Live</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Last Update</span>
                      <span className="text-sm text-foreground">2 seconds ago</span>
                    </div>
                  </div>
                  <Separator className="bg-border/40" />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Verification Progress</span>
                      <span className="text-foreground">94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Audit Alerts */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    Audit Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <span className="text-sm font-medium text-red-400">High Priority</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Resource discrepancy detected in Solar Installation campaign
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm font-medium text-yellow-400">Pending Review</span>
                      </div>
                      <p className="text-sm text-muted-foreground">3 audits awaiting verification</p>
                    </div>
                    <div className="p-3 bg-tracky-secondary/10 border border-tracky-secondary/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-4 w-4 text-tracky-secondary" />
                        <span className="text-sm font-medium text-tracky-secondary">Completed</span>
                      </div>
                      <p className="text-sm text-muted-foreground">15 audits verified today</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audits" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search audits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="cursor-pointer">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="cursor-pointer">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            {/* Recent Audits Table */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Recent Audits</CardTitle>
                <CardDescription>Latest resource verification activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAudits.map((audit) => (
                    <div key={audit.id} className="p-4 bg-muted/30 rounded-lg border border-border/50">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-foreground">{audit.id}</span>
                            <Badge className={getStatusColor(audit.status)}>
                              {getStatusIcon(audit.status)}
                              <span className="ml-1 capitalize">{audit.status}</span>
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>
                              <span className="text-foreground">Campaign:</span> {audit.campaign}
                            </p>
                            <p>
                              <span className="text-foreground">Resource:</span> {audit.resource} ({audit.quantity} units)
                            </p>
                            <p>
                              <span className="text-foreground">Location:</span> {audit.location}
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-sm text-foreground">Auditor: {audit.auditor}</p>
                          <p className="text-sm text-muted-foreground">{audit.timestamp}</p>
                          <Button size="sm" variant="outline" className="cursor-pointer">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resourceCategories.map((category, index) => (
                <Card key={index} className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {category.name}
                      <Badge variant="outline" className="border-border/50">
                        {category.count} total
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-tracky-secondary">{category.verified}</p>
                        <p className="text-xs text-muted-foreground">Verified</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-yellow-400">{category.pending}</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-red-400">{category.flagged}</p>
                        <p className="text-xs text-muted-foreground">Flagged</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Verification Rate</span>
                        <span className="text-foreground">{Math.round((category.verified / category.count) * 100)}%</span>
                      </div>
                      <Progress value={(category.verified / category.count) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-tracky-primary" />
                  Audit Reports
                </CardTitle>
                <CardDescription>Generate and download comprehensive audit reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="border-border/50 bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-tracky-primary/10 rounded-lg">
                          <BarChart3 className="h-5 w-5 text-tracky-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">Monthly Summary</h3>
                          <p className="text-sm text-muted-foreground">Comprehensive overview</p>
                        </div>
                      </div>
                      <Button size="sm" className="w-full bg-tracky-primary hover:bg-tracky-primary/90 cursor-pointer">
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-tracky-secondary/10 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-tracky-secondary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">Compliance Report</h3>
                          <p className="text-sm text-muted-foreground">Regulatory compliance</p>
                        </div>
                      </div>
                      <Button size="sm" className="w-full bg-tracky-secondary hover:bg-tracky-secondary/90 cursor-pointer">
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                          <Shield className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">Security Audit</h3>
                          <p className="text-sm text-muted-foreground">Security assessment</p>
                        </div>
                      </div>
                      <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 cursor-pointer">
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Separator className="bg-border/40" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Recent Reports</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Monthly Audit Summary - December 2024", date: "2024-12-01", size: "2.4 MB" },
                      { name: "Compliance Report - Q4 2024", date: "2024-11-30", size: "1.8 MB" },
                      { name: "Security Audit - November 2024", date: "2024-11-15", size: "3.1 MB" },
                    ].map((report, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-foreground">{report.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {report.date} • {report.size}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="cursor-pointer">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
