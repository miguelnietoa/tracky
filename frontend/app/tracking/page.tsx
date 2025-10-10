"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Filter,
  Shield,
  TrendingUp,
  Activity,
  Globe,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Copy,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock blockchain data
const blockchainStats = {
  totalTransactions: 15847,
  activeContracts: 234,
  totalImpact: "127.5 tons CO2",
  verifiedActions: 8932,
  networkHealth: 98.7,
}

const recentTransactions = [
  {
    id: "0x742d35Cc6634C0532925a3b8D4",
    type: "Volunteer Registration",
    campaign: "Beach Cleanup Initiative",
    timestamp: "2025-01-15T10:30:00Z",
    status: "confirmed",
    gasUsed: "21,000",
    impact: "+50 tokens",
  },
  {
    id: "0x8f3e2b1a9c7d6e5f4a3b2c1d",
    type: "Impact Verification",
    campaign: "Urban Tree Planting",
    timestamp: "2025-01-15T09:15:00Z",
    status: "confirmed",
    gasUsed: "45,000",
    impact: "2.3 tons CO2",
  },
  {
    id: "0x5a4b3c2d1e0f9g8h7i6j5k4l",
    type: "Token Distribution",
    campaign: "River Restoration",
    timestamp: "2025-01-15T08:45:00Z",
    status: "pending",
    gasUsed: "32,000",
    impact: "+200 tokens",
  },
  {
    id: "0x9h8g7f6e5d4c3b2a1z0y9x8w",
    type: "Resource Audit",
    campaign: "Forest Conservation",
    timestamp: "2025-01-15T07:20:00Z",
    status: "confirmed",
    gasUsed: "28,000",
    impact: "Verified $5,000",
  },
]

const impactData = [
  { month: "Jan", co2: 12.5, waste: 850, trees: 120 },
  { month: "Feb", co2: 18.3, waste: 1200, trees: 180 },
  { month: "Mar", co2: 25.1, waste: 1650, trees: 250 },
  { month: "Apr", co2: 31.8, waste: 2100, trees: 320 },
  { month: "May", co2: 42.2, waste: 2800, trees: 420 },
  { month: "Jun", co2: 55.7, waste: 3500, trees: 550 },
]

const networkActivity = [
  { time: "00:00", transactions: 45 },
  { time: "04:00", transactions: 32 },
  { time: "08:00", transactions: 78 },
  { time: "12:00", transactions: 95 },
  { time: "16:00", transactions: 112 },
  { time: "20:00", transactions: 87 },
]

const campaignDistribution = [
  { name: "Cleanup", value: 35, color: "#3B82F6" },
  { name: "Reforestation", value: 28, color: "#10B981" },
  { name: "Restoration", value: 22, color: "#8B5CF6" },
  { name: "Education", value: 15, color: "#F59E0B" },
]

export default function TrackingPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blockchain Impact Tracking</h1>
            <p className="text-muted-foreground mt-2">
              Real-time, transparent monitoring of environmental actions on the blockchain
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-tracky-primary">
                {blockchainStats.totalTransactions.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-tracky-secondary">{blockchainStats.activeContracts}</div>
              <p className="text-xs text-muted-foreground">+8 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Impact</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-tracky-primary">{blockchainStats.totalImpact}</div>
              <p className="text-xs text-muted-foreground">CO2 equivalent saved</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Network Health</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-tracky-secondary">{blockchainStats.networkHealth}%</div>
              <Progress value={blockchainStats.networkHealth} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="impact">Impact Analytics</TabsTrigger>
            <TabsTrigger value="network">Network Status</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Impact Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact Trends</CardTitle>
                  <CardDescription>CO2 savings over time (tons)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={impactData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="co2"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Campaign Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Distribution</CardTitle>
                  <CardDescription>Active campaigns by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={campaignDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {campaignDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {campaignDistribution.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-muted-foreground">
                          {item.name} ({item.value}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Blockchain Activity</CardTitle>
                <CardDescription>Latest verified environmental actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.slice(0, 5).map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 border border-border/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-tracky-primary/10">
                          {tx.status === "confirmed" ? (
                            <CheckCircle className="h-5 w-5 text-tracky-secondary" />
                          ) : (
                            <Clock className="h-5 w-5 text-yellow-500" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{tx.type}</div>
                          <div className="text-sm text-muted-foreground">{tx.campaign}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-tracky-primary">{tx.impact}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(tx.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            {/* Transaction Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search transactions..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Transaction Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="registration">Volunteer Registration</SelectItem>
                  <SelectItem value="verification">Impact Verification</SelectItem>
                  <SelectItem value="distribution">Token Distribution</SelectItem>
                  <SelectItem value="audit">Resource Audit</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transaction List */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Complete record of blockchain transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="border border-border/50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              tx.status === "confirmed"
                                ? "default"
                                : tx.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={tx.status === "confirmed" ? "bg-tracky-secondary text-white" : ""}
                          >
                            {tx.status}
                          </Badge>
                          <span className="font-medium">{tx.type}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{new Date(tx.timestamp).toLocaleString()}</div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Campaign:</span>
                          <div className="font-medium">{tx.campaign}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Transaction ID:</span>
                          <div className="font-mono text-xs flex items-center gap-2">
                            {tx.id.slice(0, 20)}...
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(tx.id)}>
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Gas Used:</span>
                          <div className="font-medium">{tx.gasUsed}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Impact:</span>
                          <div className="font-medium text-tracky-primary">{tx.impact}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View on Explorer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Multi-metric Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Impact Metrics Over Time</CardTitle>
                  <CardDescription>CO2 saved, waste removed, and trees planted</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={impactData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line type="monotone" dataKey="co2" stroke="#10B981" strokeWidth={2} name="CO2 (tons)" />
                      <Line type="monotone" dataKey="waste" stroke="#3B82F6" strokeWidth={2} name="Waste (kg)" />
                      <Line type="monotone" dataKey="trees" stroke="#8B5CF6" strokeWidth={2} name="Trees" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Impact Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Cumulative Impact</CardTitle>
                  <CardDescription>Total environmental benefits achieved</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">CO2 Emissions Saved</span>
                      <span className="text-2xl font-bold text-tracky-secondary">127.5 tons</span>
                    </div>
                    <Progress value={85} className="h-3" />
                    <p className="text-xs text-muted-foreground">85% of annual target achieved</p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Waste Removed</span>
                      <span className="text-2xl font-bold text-tracky-primary">12.8 tons</span>
                    </div>
                    <Progress value={72} className="h-3" />
                    <p className="text-xs text-muted-foreground">72% of annual target achieved</p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Trees Planted</span>
                      <span className="text-2xl font-bold text-tracky-secondary">1,840</span>
                    </div>
                    <Progress value={92} className="h-3" />
                    <p className="text-xs text-muted-foreground">92% of annual target achieved</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Performing Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Campaigns</CardTitle>
                <CardDescription>Campaigns with highest verified impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Urban Tree Planting", impact: "45.2 tons CO2", progress: 89 },
                    { name: "Beach Cleanup Initiative", impact: "32.1 tons CO2", progress: 76 },
                    { name: "River Restoration", impact: "28.7 tons CO2", progress: 68 },
                    { name: "Forest Conservation", impact: "21.5 tons CO2", progress: 54 },
                  ].map((campaign, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-border/50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-sm text-muted-foreground">Impact: {campaign.impact}</div>
                      </div>
                      <div className="text-right min-w-24">
                        <div className="text-sm font-medium">{campaign.progress}%</div>
                        <Progress value={campaign.progress} className="h-2 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Network Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Network Activity (24h)</CardTitle>
                  <CardDescription>Transaction volume throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={networkActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="transactions"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Network Health */}
              <Card>
                <CardHeader>
                  <CardTitle>Network Health Status</CardTitle>
                  <CardDescription>Real-time blockchain network metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Block Time</span>
                      <span className="text-sm text-tracky-secondary">2.3s avg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Gas Price</span>
                      <span className="text-sm text-tracky-primary">12 gwei</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Network Congestion</span>
                      <Badge variant="secondary" className="bg-tracky-secondary/10 text-tracky-secondary">
                        Low
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Active Validators</span>
                      <span className="text-sm text-tracky-primary">1,247</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium">System Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-tracky-secondary" />
                          Smart Contracts
                        </span>
                        <span className="text-tracky-secondary">Operational</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-tracky-secondary" />
                          Token Distribution
                        </span>
                        <span className="text-tracky-secondary">Operational</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          Impact Verification
                        </span>
                        <span className="text-yellow-600">Maintenance</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Node Information */}
            <Card>
              <CardHeader>
                <CardTitle>Network Nodes</CardTitle>
                <CardDescription>Distributed network infrastructure status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { region: "North America", nodes: 342, status: "healthy" },
                    { region: "Europe", nodes: 298, status: "healthy" },
                    { region: "Asia Pacific", nodes: 267, status: "healthy" },
                    { region: "Latin America", nodes: 189, status: "maintenance" },
                  ].map((region, index) => (
                    <div key={index} className="p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{region.region}</span>
                        <Badge
                          variant={region.status === "healthy" ? "default" : "secondary"}
                          className={region.status === "healthy" ? "bg-tracky-secondary text-white" : ""}
                        >
                          {region.status}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-tracky-primary">{region.nodes}</div>
                      <div className="text-sm text-muted-foreground">active nodes</div>
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
