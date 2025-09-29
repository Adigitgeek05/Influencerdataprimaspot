"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useInfluencerData } from "@/lib/data-context"

export function PostEngagementChart() {
  const data = useInfluencerData()

  // Transform posts data for the chart
  const chartData = data.recent_posts.map((post, index) => ({
    post: `Post ${index + 1}`,
    postId: post.id,
    likes: post.likes,
    comments: post.comments,
    engagement: post.likes + post.comments,
    caption: post.caption.slice(0, 50) + "...",
  }))

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Post-by-Post Engagement</CardTitle>
        <CardDescription className="text-muted-foreground">
          Individual post performance showing likes and comments for recent posts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            likes: {
              label: "Likes",
              color: "#06B6D4",
            },
            comments: {
              label: "Comments",
              color: "#F97316",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="post" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
                  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
                  return value.toString()
                }}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value, name) => [
                  typeof value === "number" ? value.toLocaleString() : value,
                  name === "likes" ? "Likes" : "Comments",
                ]}
                labelFormatter={(label) => {
                  const post = chartData.find((p) => p.post === label)
                  return post ? `${label}: ${post.caption}` : label
                }}
              />
              <Bar dataKey="likes" fill="#06B6D4" name="Likes" radius={[2, 2, 0, 0]} />
              <Bar dataKey="comments" fill="#F97316" name="Comments" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
