"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, ExternalLink } from "lucide-react"
import { useState } from "react"
import { useInfluencerData } from "@/lib/data-context"

export function PostsGrid() {
  const data = useInfluencerData()
  const [selectedPost, setSelectedPost] = useState<(typeof data.recent_posts)[0] | null>(null)

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Recent Posts</h2>
        <Badge variant="outline" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
          {data.recent_posts.length} Posts
        </Badge>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.recent_posts.map((post) => (
          <Card
            key={post.id}
            className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
            onClick={() => setSelectedPost(post)}
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={post.thumbnail || "/placeholder.svg"}
                alt={`Post ${post.id}`}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <CardContent className="p-4">
              <p className="text-sm text-foreground line-clamp-3 mb-3">{post.caption}</p>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-chart-1 fill-chart-1" />
                    <span className="font-medium">{formatNumber(post.likes)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 text-chart-2" />
                    <span className="font-medium">{formatNumber(post.comments)}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-card border-border">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground">Post Details</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedPost(null)}>
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedPost.thumbnail || "/placeholder.svg"}
                    alt={`Post ${selectedPost.id}`}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Caption</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{selectedPost.caption}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Engagement</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Likes:</span>
                          <span className="font-medium">{formatNumber(selectedPost.likes)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Comments:</span>
                          <span className="font-medium">{formatNumber(selectedPost.comments)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Post ID</h4>
                      <div className="text-sm">
                        <Badge variant="outline" className="font-mono text-xs">
                          {selectedPost.id}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Button className="w-full gap-2" asChild>
                      <a
                        href={`https://www.instagram.com/p/${selectedPost.id}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View on Instagram
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
