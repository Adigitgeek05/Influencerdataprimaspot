"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { Users, MapPin, Calendar, Smartphone, Globe, TrendingUp } from "lucide-react"

// Mock audience demographics data
const ageData = [
  { name: "18-24", value: 28, count: 42000 },
  { name: "25-34", value: 35, count: 52500 },
  { name: "35-44", value: 22, count: 33000 },
  { name: "45-54", value: 12, count: 18000 },
  { name: "55+", value: 3, count: 4500 },
]

const genderData = [
  { name: "Female", value: 68, count: 102000 },
  { name: "Male", value: 30, count: 45000 },
  { name: "Other", value: 2, count: 3000 },
]

const locationData = [
  { country: "United States", percentage: 42, followers: 63000 },
  { country: "United Kingdom", percentage: 18, followers: 27000 },
  { country: "Canada", percentage: 12, followers: 18000 },
  { country: "Australia", percentage: 8, followers: 12000 },
  { country: "Germany", percentage: 6, followers: 9000 },
  { country: "France", percentage: 5, followers: 7500 },
  { country: "Others", percentage: 9, followers: 13500 },
]

const deviceData = [
  { device: "Mobile", percentage: 78, users: 117000 },
  { device: "Desktop", percentage: 18, users: 27000 },
  { device: "Tablet", percentage: 4, users: 6000 },
]

const activityData = [
  { hour: "00:00", activity: 12 },
  { hour: "02:00", activity: 8 },
  { hour: "04:00", activity: 5 },
  { hour: "06:00", activity: 15 },
  { hour: "08:00", activity: 35 },
  { hour: "10:00", activity: 45 },
  { hour: "12:00", activity: 65 },
  { hour: "14:00", activity: 55 },
  { hour: "16:00", activity: 70 },
  { hour: "18:00", activity: 85 },
  { hour: "20:00", activity: 95 },
  { hour: "22:00", activity: 75 },
]

const interestData = [
  { category: "Fashion", engagement: 85, followers: 127500 },
  { category: "Beauty", engagement: 78, followers: 117000 },
  { category: "Lifestyle", engagement: 72, followers: 108000 },
  { category: "Travel", engagement: 68, followers: 102000 },
  { category: "Fitness", engagement: 65, followers: 97500 },
  { category: "Food", engagement: 58, followers: 87000 },
]

const COLORS = {
  primary: "hsl(var(--chart-1))",
  secondary: "hsl(var(--chart-2))",
  tertiary: "hsl(var(--chart-3))",
  quaternary: "hsl(var(--chart-4))",
  quinary: "hsl(var(--chart-5))",
}

const PIE_COLORS = [COLORS.primary, COLORS.secondary, COLORS.tertiary, COLORS.quaternary, COLORS.quinary]

export function AudienceDemographics() {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Audience Demographics</h2>
        <Badge variant="outline" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
          <Users className="w-4 h-4 mr-1" />
          150K Total Followers
        </Badge>
      </div>

      {/* Demographics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Age Distribution */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-chart-1" />
              Age Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {ageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {ageData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">{item.value}%</span>
                    <span className="text-muted-foreground ml-2">({formatNumber(item.count)})</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gender Distribution */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-chart-2" />
              Gender Split
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {genderData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">{item.value}%</span>
                    <span className="text-muted-foreground ml-2">({formatNumber(item.count)})</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Usage */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-chart-3" />
              Device Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deviceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="device" type="category" stroke="hsl(var(--muted-foreground))" />
                  <Bar dataKey="percentage" fill={COLORS.tertiary} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {deviceData.map((item, index) => (
                <div key={item.device} className="flex items-center justify-between text-sm">
                  <span>{item.device}</span>
                  <div className="text-right">
                    <span className="font-medium">{item.percentage}%</span>
                    <span className="text-muted-foreground ml-2">({formatNumber(item.users)})</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Distribution */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-chart-4" />
            Geographic Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={locationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="country"
                    stroke="hsl(var(--muted-foreground))"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Bar dataKey="percentage" fill={COLORS.quaternary} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {locationData.map((item, index) => (
                <div key={item.country} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-chart-4" />
                    <span className="font-medium">{item.country}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-chart-4">{item.percentage}%</div>
                    <div className="text-xs text-muted-foreground">{formatNumber(item.followers)} followers</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity & Interests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Timeline */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-chart-5" />
              Daily Activity Pattern
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Area
                    type="monotone"
                    dataKey="activity"
                    stroke={COLORS.quinary}
                    fill={COLORS.quinary}
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 bg-muted/20 rounded-lg">
              <div className="text-sm text-muted-foreground">Peak Activity Hours</div>
              <div className="font-semibold text-chart-5">8:00 PM - 10:00 PM</div>
              <div className="text-xs text-muted-foreground mt-1">Best time to post for maximum engagement</div>
            </div>
          </CardContent>
        </Card>

        {/* Interest Categories */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-chart-1" />
              Interest Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interestData.map((item, index) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.category}</span>
                    <div className="text-right">
                      <span className="font-bold text-chart-1">{item.engagement}%</span>
                      <span className="text-xs text-muted-foreground ml-2">engagement</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div
                      className="bg-chart-1 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.engagement}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatNumber(item.followers)} interested followers
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card className="bg-gradient-to-r from-chart-1/10 to-chart-2/10 border-chart-1/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-chart-1" />
            Key Audience Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-card/50 rounded-lg">
              <div className="text-2xl font-bold text-chart-1">25-34</div>
              <div className="text-sm text-muted-foreground">Primary age group</div>
              <div className="text-xs text-muted-foreground mt-1">35% of total audience</div>
            </div>
            <div className="p-4 bg-card/50 rounded-lg">
              <div className="text-2xl font-bold text-chart-2">68%</div>
              <div className="text-sm text-muted-foreground">Female audience</div>
              <div className="text-xs text-muted-foreground mt-1">Strong female following</div>
            </div>
            <div className="p-4 bg-card/50 rounded-lg">
              <div className="text-2xl font-bold text-chart-3">78%</div>
              <div className="text-sm text-muted-foreground">Mobile users</div>
              <div className="text-xs text-muted-foreground mt-1">Mobile-first content</div>
            </div>
            <div className="p-4 bg-card/50 rounded-lg">
              <div className="text-2xl font-bold text-chart-4">8-10 PM</div>
              <div className="text-sm text-muted-foreground">Peak activity</div>
              <div className="text-xs text-muted-foreground mt-1">Optimal posting time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
