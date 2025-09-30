"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, ExternalLink, TrendingUp } from "lucide-react"
import { useInfluencerData } from "@/lib/data-context"
import { getProxiedImageUrl } from "@/lib/utils"

export function ProfileHeader() {
  const { data } = useInfluencerData()
  console.log(data);

  if (!data) {
    return null
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Image and Basic Info */}
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-primary/20">
                <AvatarImage src={data.profile_picture ? getProxiedImageUrl(data.profile_picture) : "/placeholder.svg"} alt={data.name} />
                <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
                  {data.name
                    ? data.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "?"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-chart-1 rounded-full p-2">
                <Instagram className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{data.name}</h1>
                </div>
                <p className="text-lg text-muted-foreground mb-2">@{data.username}</p>
                <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                  Instagram Influencer
                </Badge>
              </div>

              <div className="whitespace-pre-line text-foreground leading-relaxed">
                Scraped from Instagram • Last updated: {new Date(data._meta.scraped_at).toLocaleDateString()}
              </div>

              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={()=> window.open(`https://instagram.com/${data.username}`, "_blank")}>
                  <ExternalLink className="w-4 h-4" />
                  View on Instagram
                </Button>
                <Button size="sm" className="bg-chart-1 hover:bg-chart-1/90 text-white gap-2">
                  <Instagram className="w-4 h-4" />@{data.username}
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="lg:min-w-[400px]">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-muted/30 rounded-lg border border-border/50">
                <div className="text-2xl font-bold text-foreground mb-1">{formatNumber(data.posts_count)}</div>
                <div className="text-sm text-muted-foreground">Posts</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg border border-border/50">
                <div className="text-2xl font-bold text-foreground mb-1">{formatNumber(data.followers)}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg border border-border/50">
                <div className="text-2xl font-bold text-foreground mb-1">{formatNumber(data.following)}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-chart-1/5 rounded-lg border border-chart-1/20">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-chart-1" />
                  <span className="text-sm font-medium text-foreground">Engagement Rate</span>
                </div>
                <span className="text-lg font-bold text-chart-1">{data.analytics.engagement_rate_pct}%</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-chart-2/5 rounded-lg border border-chart-2/20">
                <span className="text-sm font-medium text-foreground">Avg. Likes</span>
                <span className="text-lg font-bold text-chart-2">{formatNumber(data.analytics.avg_likes)}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-chart-3/5 rounded-lg border border-chart-3/20">
                <span className="text-sm font-medium text-foreground">Avg. Comments</span>
                <span className="text-lg font-bold text-chart-3">{formatNumber(data.analytics.avg_comments)}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                <span className="text-sm font-medium text-foreground">Sample Size</span>
                <span className="text-lg font-bold text-foreground">{data.analytics.sample_size} posts</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
