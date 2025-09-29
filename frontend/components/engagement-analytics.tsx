"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Heart, MessageCircle, BarChart3 } from "lucide-react"
import { useInfluencerData } from "@/lib/data-context"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export function EngagementAnalytics() {
  const { data } = useInfluencerData()

  if (!data) {
    return null
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const postEngagementData = data.recent_posts.map((post, index) => ({
    name: `Post ${index + 1}`,
    likes: post.likes,
    comments: post.comments,
    id: post.id,
  }))

  const totalLikes = data.recent_posts.reduce((sum, post) => sum + post.likes, 0)
  const totalComments = data.recent_posts.reduce((sum, post) => sum + post.comments, 0)
  const engagementDistribution = [
    { name: "Likes", value: totalLikes, color: "rgb(var(--chart-1))" },
    { name: "Comments", value: totalComments, color: "rgb(var(--chart-2))" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Engagement Analytics</h2>
        <Badge variant="outline" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
          Based on {data.analytics.sample_size} Posts
        </Badge>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg. Likes</p>
                <p className="text-2xl font-bold text-foreground">{formatNumber(data.analytics.avg_likes)}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-chart-1" />
                  <span className="text-sm text-chart-1 font-medium">Per Post</span>
                </div>
              </div>
              <div className="p-3 bg-chart-1/10 rounded-lg">
                <Heart className="w-6 h-6 text-chart-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg. Comments</p>
                <p className="text-2xl font-bold text-foreground">{formatNumber(data.analytics.avg_comments)}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-chart-2" />
                  <span className="text-sm text-chart-2 font-medium">Per Post</span>
                </div>
              </div>
              <div className="p-3 bg-chart-2/10 rounded-lg">
                <MessageCircle className="w-6 h-6 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Engagement Rate</p>
                <p className="text-2xl font-bold text-foreground">{data.analytics.engagement_rate_pct}%</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-chart-3" />
                  <span className="text-sm text-chart-3 font-medium">Overall</span>
                </div>
              </div>
              <div className="p-3 bg-chart-3/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Post-by-Post Engagement */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Post-by-Post Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={postEngagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
                <XAxis dataKey="name" stroke="rgb(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="rgb(var(--muted-foreground))" fontSize={12} tickFormatter={formatNumber} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgb(var(--card))",
                    border: "1px solid rgb(var(--border))",
                    borderRadius: "8px",
                    color: "rgb(var(--foreground))",
                  }}
                  formatter={(value: number) => formatNumber(value)}
                />
                <Bar dataKey="likes" fill="rgb(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Distribution */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Engagement Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={engagementDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {engagementDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgb(var(--card))",
                      border: "1px solid rgb(var(--border))",
                      borderRadius: "8px",
                      color: "rgb(var(--foreground))",
                    }}
                    formatter={(value: number) => formatNumber(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {engagementDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <span className="text-sm font-medium text-foreground">{formatNumber(item.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
