"use client"

import { ProfileHeader } from "./profile-header"
import { EngagementAnalytics } from "./engagement-analytics"
import { PostEngagementChart } from "./post-engagement-chart"
import { PostsGrid } from "./posts-grid"
import { DataProvider } from "@/lib/data-context"

export function InfluencerProfile() {
  return (
    <DataProvider>
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

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          <ProfileHeader />
          <EngagementAnalytics />
          <PostEngagementChart />
          <PostsGrid />
        </div>
      </div>
    </DataProvider>
  )
}
