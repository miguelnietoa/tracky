"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  Download,
  FileText,
  BarChart3,
  TrendingUp,
  Globe,
  CalendarIcon,
  Share,
  Eye,
  Users,
  Leaf,
  Zap,
} from "lucide-react"
import { format } from "date-fns"

export default function ReportsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  })

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "pt", name: "Português", flag: "🇧🇷" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ]

  const reportMetrics = [
    { label: "Total Impact Reports", value: "1,247", change: "+18%", icon: FileText },
    { label: "Active Campaigns", value: "89", change: "+12%", icon: Leaf },
    { label: "Community Members", value: "15,432", change: "+25%", icon: Users },
    { label: "Environmental Impact", value: "2.4M kg CO₂", change: "+8%", icon: Zap },
  ]

  const impactData = [
    { month: "Jan", campaigns: 12, volunteers: 450, impact: 180 },
    { month: "Feb", campaigns: 18, volunteers: 620, impact: 240 },
    { month: "Mar", campaigns: 25, volunteers: 780, impact: 320 },
    { month: "Apr", campaigns: 32, volunteers: 950, impact: 410 },
    { month: "May", campaigns: 28, volunteers: 1100, impact: 380 },
    { month: "Jun", campaigns: 35, volunteers: 1250, impact: 450 },
  ]

  const regionData = [
    { name: "Brazil", value: 35, color: "#3B82F6" },
    { name: "Mexico", value: 25, color: "#10B981" },
    { name: "Argentina", value: 20, color: "#F59E0B" },
    { name: "Colombia", value: 12, color: "#EF4444" },
    { name: "Others", value: 8, color: "#8B5CF6" },
  ]

  const translations = {
    en: {
      title: "Impact Reports",
      subtitle: "Comprehensive analytics and reporting dashboard",
      overview: "Overview",
      campaigns: "Campaigns",
      environmental: "Environmental",
      community: "Community",
      generateReport: "Generate Report",
      exportData: "Export Data",
      shareReport: "Share Report",
      viewDetails: "View Details",
      totalImpact: "Total Impact",
      activeCampaigns: "Active Campaigns",
      communityMembers: "Community Members",
      environmentalImpact: "Environmental Impact",
    },
    es: {
      title: "Informes de Impacto",
      subtitle: "Panel integral de análisis e informes",
      overview: "Resumen",
      campaigns: "Campañas",
      environmental: "Ambiental",
      community: "Comunidad",
      generateReport: "Generar Informe",
      exportData: "Exportar Datos",
      shareReport: "Compartir Informe",
      viewDetails: "Ver Detalles",
      totalImpact: "Impacto Total",
      activeCampaigns: "Campañas Activas",
      communityMembers: "Miembros de la Comunidad",
      environmentalImpact: "Impacto Ambiental",
    },
    pt: {
      title: "Relatórios de Impacto",
      subtitle: "Painel abrangente de análises e relatórios",
      overview: "Visão Geral",
      campaigns: "Campanhas",
      environmental: "Ambiental",
      community: "Comunidade",
      generateReport: "Gerar Relatório",
      exportData: "Exportar Dados",
      shareReport: "Compartilhar Relatório",
      viewDetails: "Ver Detalhes",
      totalImpact: "Impacto Total",
      activeCampaigns: "Campanhas Ativas",
      communityMembers: "Membros da Comunidade",
      environmentalImpact: "Impacto Ambiental",
    },
    fr: {
      title: "Rapports d'Impact",
      subtitle: "Tableau de bord complet d'analyses et de rapports",
      overview: "Aperçu",
      campaigns: "Campagnes",
      environmental: "Environnemental",
      community: "Communauté",
      generateReport: "Générer un Rapport",
      exportData: "Exporter les Données",
      shareReport: "Partager le Rapport",
      viewDetails: "Voir les Détails",
      totalImpact: "Impact Total",
      activeCampaigns: "Campagnes Actives",
      communityMembers: "Membres de la Communauté",
      environmentalImpact: "Impact Environnemental",
    },
  }

  const t = translations[selectedLanguage as keyof typeof translations]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Language Selector */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-gray-400 text-lg">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-40 bg-gray-900/50 border-gray-800">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800">
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} className="text-white">
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {reportMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card key={index} className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">
                        {t[metric.label.toLowerCase().replace(/\s+/g, "") as keyof typeof t] || metric.label}
                      </p>
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

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileText className="h-4 w-4 mr-2" />
            {t.generateReport}
          </Button>
          <Button variant="outline" className="border-gray-800 text-gray-300 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            {t.exportData}
          </Button>
          <Button variant="outline" className="border-gray-800 text-gray-300 bg-transparent">
            <Share className="h-4 w-4 mr-2" />
            {t.shareReport}
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-gray-800 text-gray-300 bg-transparent">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={(range) => range && setDateRange(range as { from: Date; to: Date })}
                numberOfMonths={2}
                className="text-white"
              />
            </PopoverContent>
          </Popover>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-900/50 border-gray-800">
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="campaigns">{t.campaigns}</TabsTrigger>
            <TabsTrigger value="environmental">{t.environmental}</TabsTrigger>
            <TabsTrigger value="community">{t.community}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Impact Trends */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    Impact Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={impactData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Line type="monotone" dataKey="impact" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="volunteers" stroke="#10B981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Regional Distribution */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-green-400" />
                    Regional Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Campaign Performance */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-400" />
                  Campaign Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={impactData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="campaigns" fill="#3B82F6" />
                    <Bar dataKey="volunteers" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Amazon Reforestation", status: "Active", progress: 78, volunteers: 245 },
                { name: "Ocean Cleanup", status: "Active", progress: 92, volunteers: 189 },
                { name: "Solar Installation", status: "Completed", progress: 100, volunteers: 156 },
                { name: "Urban Gardens", status: "Active", progress: 45, volunteers: 203 },
                { name: "Waste Reduction", status: "Active", progress: 67, volunteers: 178 },
                { name: "Clean Water", status: "Planning", progress: 12, volunteers: 89 },
              ].map((campaign, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <Badge
                        className={
                          campaign.status === "Active"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : campaign.status === "Completed"
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-gray-300">{campaign.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${campaign.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{campaign.volunteers} volunteers</span>
                      </div>
                      <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        {t.viewDetails}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="environmental" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "CO₂ Reduced", value: "2.4M kg", icon: "🌱", color: "text-green-400" },
                { label: "Trees Planted", value: "15,432", icon: "🌳", color: "text-green-400" },
                { label: "Waste Recycled", value: "890 tons", icon: "♻️", color: "text-blue-400" },
                { label: "Water Saved", value: "1.2M L", icon: "💧", color: "text-blue-400" },
              ].map((metric, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-2">{metric.icon}</div>
                    <p className={`text-2xl font-bold ${metric.color} mb-1`}>{metric.value}</p>
                    <p className="text-sm text-gray-400">{metric.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>Top Contributors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Maria Santos", contributions: 45, tokens: 2340 },
                    { name: "Carlos Rodriguez", contributions: 38, tokens: 1980 },
                    { name: "Ana Gutierrez", contributions: 32, tokens: 1650 },
                    { name: "Luis Martinez", contributions: 28, tokens: 1420 },
                    { name: "Sofia Lopez", contributions: 25, tokens: 1290 },
                  ].map((contributor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-white">{contributor.name}</p>
                          <p className="text-sm text-gray-400">{contributor.contributions} contributions</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {contributor.tokens} tokens
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>Community Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={impactData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Line type="monotone" dataKey="volunteers" stroke="#10B981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
