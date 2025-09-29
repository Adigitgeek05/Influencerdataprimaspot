"use client"

import { ProfileHeader } from "./profile-header"
import { EngagementAnalytics } from "./engagement-analytics"
import { PostEngagementChart } from "./post-engagement-chart"
import { PostsGrid } from "./posts-grid"
import { SearchBar } from "./search-bar"
import { DataProvider, useInfluencerData } from "@/lib/data-context"
import { AlertCircle, Loader2 } from "lucide-react"

function InfluencerContent() {
  const { data, isLoading, error, searchInfluencer } = useInfluencerData()

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <h1 className="text-xl font-semibold text-foreground">InfluenceAnalytics</h1>
                <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                  <button className="hover:text-foreground transition-colors">Overview</button>
                  <button className="hover:text-foreground transition-colors">Analytics</button>
                  <button className="hover:text-foreground transition-colors">Content</button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Search Section */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Search Instagram Influencers</h2>
            <p className="text-muted-foreground">Enter an Instagram username to analyze their profile and engagement</p>
          </div>
          <SearchBar onSearch={searchInfluencer} isLoading={isLoading} />

          {/* Error State */}
          <div className="mt-8 flex items-center justify-center">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md">
              <div className="flex items-center gap-3 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <div>
                  <h3 className="font-medium">Error Loading Data</h3>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-semibold text-foreground">InfluenceAnalytics</h1>
              <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                <button className="hover:text-foreground transition-colors">Overview</button>
                <button className="hover:text-foreground transition-colors">Analytics</button>
                <button className="hover:text-foreground transition-colors">Content</button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Search Instagram Influencers</h2>
          <p className="text-muted-foreground">Enter an Instagram username to analyze their profile and engagement</p>
        </div>
        <SearchBar onSearch={searchInfluencer} isLoading={isLoading} />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center">
            <div className="bg-card/50 border border-border rounded-lg p-8">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
                <div>
                  <h3 className="font-medium text-foreground">Loading Profile Data</h3>
                  <p className="text-sm mt-1">Fetching influencer analytics...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {data && !isLoading && (
        <div className="max-w-7xl mx-auto px-6 pb-8 space-y-8">
          <ProfileHeader />
          <EngagementAnalytics />
          <PostEngagementChart />
          <PostsGrid />
        </div>
      )}
    </div>
  )
}

export function InfluencerProfile() {
  return (
    <DataProvider>
      <InfluencerContent />
    </DataProvider>
  )
}
