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
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "flagged":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
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
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Resource Auditing
          </h1>
          <p className="text-gray-400 text-lg">Real-time monitoring and verification of campaign resources</p>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {auditMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card key={index} className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                      <p className="text-sm text-green-400">{metric.change}</p>
                    </div>
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-900/50 border-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="audits">Recent Audits</TabsTrigger>
            <TabsTrigger value="resources">Resource Categories</TabsTrigger>
            <TabsTrigger value="reports">Audit Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Real-time Status */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-400" />
                    Real-time Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">System Health</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Operational</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Data Sync</span>
                      <span className="text-sm text-green-400">Live</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Last Update</span>
                      <span className="text-sm text-gray-300">2 seconds ago</span>
                    </div>
                  </div>
                  <Separator className="bg-gray-800" />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Verification Progress</span>
                      <span className="text-gray-300">94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Audit Alerts */}
              <Card className="bg-gray-900/50 border-gray-800">
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
                      <p className="text-sm text-gray-300">
                        Resource discrepancy detected in Solar Installation campaign
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm font-medium text-yellow-400">Pending Review</span>
                      </div>
                      <p className="text-sm text-gray-300">3 audits awaiting verification</p>
                    </div>
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-medium text-green-400">Completed</span>
                      </div>
                      <p className="text-sm text-gray-300">15 audits verified today</p>
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search audits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-800 text-white"
                />
              </div>
              <Button variant="outline" className="border-gray-800 text-gray-300 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="border-gray-800 text-gray-300 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            {/* Recent Audits Table */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle>Recent Audits</CardTitle>
                <CardDescription>Latest resource verification activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAudits.map((audit) => (
                    <div key={audit.id} className="p-4 bg-gray-800/30 rounded-lg border border-gray-800">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-white">{audit.id}</span>
                            <Badge className={getStatusColor(audit.status)}>
                              {getStatusIcon(audit.status)}
                              <span className="ml-1 capitalize">{audit.status}</span>
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-400">
                            <p>
                              <span className="text-gray-300">Campaign:</span> {audit.campaign}
                            </p>
                            <p>
                              <span className="text-gray-300">Resource:</span> {audit.resource} ({audit.quantity} units)
                            </p>
                            <p>
                              <span className="text-gray-300">Location:</span> {audit.location}
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-sm text-gray-300">Auditor: {audit.auditor}</p>
                          <p className="text-sm text-gray-400">{audit.timestamp}</p>
                          <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 bg-transparent">
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
                <Card key={index} className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {category.name}
                      <Badge variant="outline" className="border-gray-700 text-gray-300">
                        {category.count} total
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-green-400">{category.verified}</p>
                        <p className="text-xs text-gray-400">Verified</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-yellow-400">{category.pending}</p>
                        <p className="text-xs text-gray-400">Pending</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-red-400">{category.flagged}</p>
                        <p className="text-xs text-gray-400">Flagged</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Verification Rate</span>
                        <span className="text-gray-300">{Math.round((category.verified / category.count) * 100)}%</span>
                      </div>
                      <Progress value={(category.verified / category.count) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-400" />
                  Audit Reports
                </CardTitle>
                <CardDescription>Generate and download comprehensive audit reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="bg-gray-800/30 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <BarChart3 className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Monthly Summary</h3>
                          <p className="text-sm text-gray-400">Comprehensive overview</p>
                        </div>
                      </div>
                      <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/30 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Compliance Report</h3>
                          <p className="text-sm text-gray-400">Regulatory compliance</p>
                        </div>
                      </div>
                      <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/30 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <Shield className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Security Audit</h3>
                          <p className="text-sm text-gray-400">Security assessment</p>
                        </div>
                      </div>
                      <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Separator className="bg-gray-800" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Recent Reports</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Monthly Audit Summary - December 2024", date: "2024-12-01", size: "2.4 MB" },
                      { name: "Compliance Report - Q4 2024", date: "2024-11-30", size: "1.8 MB" },
                      { name: "Security Audit - November 2024", date: "2024-11-15", size: "3.1 MB" },
                    ].map((report, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-white">{report.name}</p>
                            <p className="text-sm text-gray-400">
                              {report.date} • {report.size}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 bg-transparent">
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
