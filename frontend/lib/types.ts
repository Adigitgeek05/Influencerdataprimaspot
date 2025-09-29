export interface InfluencerData {
  name: string
  username: string
  profile_picture: string
  followers: number
  following: number
  posts_count: number
  analytics: {
    sample_size: number
    avg_likes: number
    avg_comments: number
    engagement_rate_pct: number
  }
  recent_posts: Array<{
    id: string
    thumbnail: string
    caption: string
    likes: number
    comments: number
  }>
  _meta: {
    source: string
    scraped_at: string
  }
}
