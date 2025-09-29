"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Heart, MessageCircle, Share, Eye, Video, Music, Zap, MapPin } from "lucide-react"
import { useState } from "react"

// Mock reels data with video analysis
const reelsData = [
  {
    id: 1,
    thumbnail: "/placeholder.svg?key=reel1",
    caption:
      "Morning routine that changed my life! ✨ Starting with gratitude and movement sets the tone for everything",
    views: 2847392,
    likes: 184729,
    comments: 3847,
    shares: 1247,
    duration: "0:45",
    date: "2024-01-07",
    videoAnalysis: {
      objects: ["person", "bedroom", "yoga mat", "plants"],
      events: ["morning routine", "stretching", "meditation"],
      vibe: "wellness",
      ambience: "calm morning",
      tags: ["wellness", "morning routine", "self-care", "lifestyle"],
      qualityScore: 9.2,
      engagement: "very-high",
      location: "indoor",
      lighting: "natural",
    },
  },
  {
    id: 2,
    thumbnail: "/placeholder.svg?key=reel2",
    caption: "Beach day vibes in Santorini! 🌊 The water was absolutely perfect and the sunset was magical",
    views: 1923847,
    likes: 156384,
    comments: 2947,
    shares: 892,
    duration: "0:32",
    date: "2024-01-06",
    videoAnalysis: {
      objects: ["beach", "ocean", "person", "sunset"],
      events: ["swimming", "walking on beach", "sunset viewing"],
      vibe: "travel luxury",
      ambience: "vacation paradise",
      tags: ["travel", "beach", "luxury", "vacation", "sunset"],
      qualityScore: 9.8,
      engagement: "very-high",
      location: "outdoor",
      lighting: "golden hour",
    },
  },
  {
    id: 3,
    thumbnail: "/placeholder.svg?key=reel3",
    caption:
      "Quick 5-minute makeup look for busy mornings! 💄 Perfect for when you're running late but still want to look put together",
    views: 1456789,
    likes: 98472,
    comments: 1847,
    shares: 634,
    duration: "0:58",
    date: "2024-01-05",
    videoAnalysis: {
      objects: ["makeup", "mirror", "brushes", "cosmetics"],
      events: ["applying makeup", "tutorial", "beauty routine"],
      vibe: "beauty tutorial",
      ambience: "professional",
      tags: ["beauty", "makeup", "tutorial", "quick", "morning"],
      qualityScore: 8.7,
      engagement: "high",
      location: "indoor",
      lighting: "studio",
    },
  },
  {
    id: 4,
    thumbnail: "/placeholder.svg?key=reel4",
    caption: "Dancing through the weekend! 💃 This song has been on repeat all week - who else is obsessed?",
    views: 3247891,
    likes: 247382,
    comments: 4729,
    shares: 1847,
    duration: "0:28",
    date: "2024-01-04",
    videoAnalysis: {
      objects: ["person", "room", "lights", "music"],
      events: ["dancing", "choreography", "performance"],
      vibe: "party",
      ambience: "energetic nightlife",
      tags: ["dance", "music", "party", "entertainment", "trending"],
      qualityScore: 9.5,
      engagement: "viral",
      location: "indoor",
      lighting: "colorful",
    },
  },
  {
    id: 5,
    thumbnail: "/placeholder.svg?key=reel5",
    caption: "Trying the viral pasta recipe everyone's talking about! 🍝 Spoiler alert: it's absolutely delicious",
    views: 987654,
    likes: 67384,
    comments: 1234,
    shares: 456,
    duration: "1:12",
    date: "2024-01-03",
    videoAnalysis: {
      objects: ["kitchen", "pasta", "ingredients", "cooking utensils"],
      events: ["cooking", "food preparation", "recipe tutorial"],
      vibe: "food review",
      ambience: "cozy kitchen",
      tags: ["food", "cooking", "recipe", "viral", "tutorial"],
      qualityScore: 8.3,
      engagement: "high",
      location: "indoor",
      lighting: "warm",
    },
  },
]

export function ReelsSection() {
  const [selectedReel, setSelectedReel] = useState<(typeof reelsData)[0] | null>(null)

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getVibeColor = (vibe: string) => {
    switch (vibe) {
      case "travel luxury":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "wellness":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "beauty tutorial":
        return "bg-pink-500/10 text-pink-600 border-pink-500/20"
      case "party":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20"
      case "food review":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case "viral":
        return "text-red-500"
      case "very-high":
        return "text-green-500"
      case "high":
        return "text-blue-500"
      case "medium":
        return "text-yellow-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Recent Reels Analysis</h2>
        <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20">
          <Video className="w-4 h-4 mr-1" />
          Video Content
        </Badge>
      </div>

      {/* Reels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {reelsData.map((reel) => (
          <Card
            key={reel.id}
            className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
            onClick={() => setSelectedReel(reel)}
          >
            <div className="relative overflow-hidden rounded-t-lg aspect-[9/16]">
              <img
                src={reel.thumbnail || "/placeholder.svg"}
                alt={`Reel ${reel.id}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 rounded-full p-3">
                  <Play className="w-6 h-6 text-black fill-current" />
                </div>
              </div>

              {/* Duration Badge */}
              <div className="absolute top-3 right-3">
                <Badge className="bg-black/70 text-white border-0 text-xs">{reel.duration}</Badge>
              </div>

              {/* Vibe Badge */}
              <div className="absolute top-3 left-3">
                <Badge className={`${getVibeColor(reel.videoAnalysis.vibe)} border text-xs`}>
                  {reel.videoAnalysis.vibe}
                </Badge>
              </div>

              {/* Views Counter */}
              <div className="absolute bottom-3 left-3">
                <div className="flex items-center gap-1 bg-black/70 rounded-full px-2 py-1">
                  <Eye className="w-3 h-3 text-white" />
                  <span className="text-xs text-white font-medium">{formatNumber(reel.views)}</span>
                </div>
              </div>
            </div>

            <CardContent className="p-3">
              <p className="text-xs text-foreground line-clamp-2 mb-2">{reel.caption}</p>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    <span>{formatNumber(reel.likes)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{formatNumber(reel.comments)}</span>
                  </div>
                </div>
                <span className={`font-medium text-xs ${getEngagementColor(reel.videoAnalysis.engagement)}`}>
                  {reel.videoAnalysis.engagement}
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {reel.videoAnalysis.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reel Detail Modal */}
      {selectedReel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">Reel Video Analysis</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedReel(null)}>
                ✕
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Video Preview */}
                <div className="space-y-4">
                  <div className="relative aspect-[9/16] max-w-sm mx-auto bg-black rounded-lg overflow-hidden">
                    <img
                      src={selectedReel.thumbnail || "/placeholder.svg"}
                      alt={`Reel ${selectedReel.id}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-4">
                        <Play className="w-8 h-8 text-black fill-current" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-black/70 text-white border-0">{selectedReel.duration}</Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Caption</h3>
                    <p className="text-sm text-muted-foreground">{selectedReel.caption}</p>
                  </div>
                </div>

                {/* Analysis Details */}
                <div className="space-y-6">
                  {/* Performance Metrics */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Performance Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Eye className="w-4 h-4 text-chart-1" />
                          <span className="text-sm font-medium">Views</span>
                        </div>
                        <span className="text-lg font-bold text-chart-1">{formatNumber(selectedReel.views)}</span>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Heart className="w-4 h-4 text-chart-2" />
                          <span className="text-sm font-medium">Likes</span>
                        </div>
                        <span className="text-lg font-bold text-chart-2">{formatNumber(selectedReel.likes)}</span>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <MessageCircle className="w-4 h-4 text-chart-3" />
                          <span className="text-sm font-medium">Comments</span>
                        </div>
                        <span className="text-lg font-bold text-chart-3">{formatNumber(selectedReel.comments)}</span>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Share className="w-4 h-4 text-chart-4" />
                          <span className="text-sm font-medium">Shares</span>
                        </div>
                        <span className="text-lg font-bold text-chart-4">{formatNumber(selectedReel.shares)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Video Analysis */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">AI Video Analysis</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/20 rounded-lg space-y-3">
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4 text-chart-1" />
                          <span className="text-sm font-medium">Quality Score:</span>
                          <span className="font-bold text-chart-1">{selectedReel.videoAnalysis.qualityScore}/10</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-chart-2" />
                          <span className="text-sm font-medium">Engagement Level:</span>
                          <Badge
                            className={`${getEngagementColor(selectedReel.videoAnalysis.engagement)} bg-transparent border-0 p-0`}
                          >
                            {selectedReel.videoAnalysis.engagement}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                          <Music className="w-4 h-4 text-chart-3" />
                          <span className="text-sm font-medium">Vibe:</span>
                          <Badge className={`${getVibeColor(selectedReel.videoAnalysis.vibe)} border`}>
                            {selectedReel.videoAnalysis.vibe}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-chart-4" />
                          <span className="text-sm font-medium">Location:</span>
                          <span className="text-sm">{selectedReel.videoAnalysis.location}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm">{selectedReel.videoAnalysis.lighting} lighting</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-foreground mb-2">Detected Objects</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedReel.videoAnalysis.objects.map((object, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {object}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-foreground mb-2">Events & Activities</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedReel.videoAnalysis.events.map((event, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-foreground mb-2">Content Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedReel.videoAnalysis.tags.map((tag, index) => (
                            <Badge key={index} className="bg-primary/10 text-primary border-primary/20 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
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
