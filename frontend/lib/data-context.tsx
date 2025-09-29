"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { InfluencerData } from "./types"

// Sample data matching your backend structure
const sampleData: InfluencerData = {
  name: "Virat Kohli",
  username: "virat.kohli",
  profile_picture:
    "https://scontent-sin11-2.cdninstagram.com/v/t51.2885-19/331017149_3373809859551320_1963035851400324431_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=scontent-sin11-2.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2QFvhIfQlGZizWyc8NEHOLNPYrzBOgl6mJIxyCStGDAd8Z-SMWT_J4gWgA2S7_lRXQc&_nc_ohc=Vm_SzXK3P3kQ7kNvwGXsy2T&_nc_gid=5QQUPHW7hFZF4FH8fAJsuA&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfbM9EA0qoeGWrHPgQn6bOmsRncpmfS_w_cqP83zsKD32A&oe=68E09116&_nc_sid=8b3546",
  followers: 273603911,
  following: 284,
  posts_count: 1038,
  analytics: {
    sample_size: 5,
    avg_likes: 6785779,
    avg_comments: 135003,
    engagement_rate_pct: 2.53,
  },
  recent_posts: [
    {
      id: "DPG-14viCQR",
      thumbnail:
        "https://scontent-sin2-2.cdninstagram.com/v/t51.82787-15/554800141_18532254064064508_6940929483385591374_n.jpg?stp=c288.0.864.864a_dst-jpg_e35_s640x640_tt6&_nc_cat=1&ccb=1-7&_nc_sid=18de74&_nc_ohc=gb8FLWAyWfMQ7kNvwGUy9Tq&_nc_oc=Adk8ki9OKW8L4qe8zHmJl7OB1cNdd5Fg-78Bho6IzoWBPxDCz2RwmHFlHO9L5_B9Df0&_nc_zt=23&_nc_ht=scontent-sin2-2.cdninstagram.com&_nc_gid=IYpn9ss5pWpyM_vgdTwgIQ&oh=00_AfbUIGHubV2E1NARUrvRtFO94AsW8Y-ZPe7HwGdawfHHuA&oe=68E08E9F",
      caption: "Been a minute ✋",
      likes: 14095897,
      comments: 341228,
    },
    {
      id: "DOnxrETjfPD",
      thumbnail:
        "https://scontent-sin2-2.cdninstagram.com/v/t51.71878-15/549232715_1781151172491120_8999460447621304877_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=1&ccb=1-7&_nc_sid=18de74&_nc_ohc=33km57kAF7oQ7kNvwGz_9jR&_nc_oc=Adlmb6Dwq4fU68MK83uJl4ML9zVin9sPMXYJc4xx5DMSf9l24J-epXI5LoYDPBIjd34&_nc_zt=23&_nc_ht=scontent-sin2-2.cdninstagram.com&_nc_gid=z6WYwriPn-8wUJIY5ZaSRg&oh=00_AfboNQbuC-M5n2rdwuGez1Ez7hyLDmQuvTSEbyLr2Q9IEQ&oe=68E091B2",
      caption:
        "Precision in every stroke. Perfection in every detail. When you want the best, you don't settle for anything less.\n\n#Philipsallinone #Trimmer #Sharpfinish #Precision #Beard #Ad",
      likes: 1252719,
      comments: 35646,
    },
    {
      id: "DMjzAl1Nzct",
      thumbnail:
        "https://scontent-sin2-2.cdninstagram.com/v/t51.82787-15/523706620_18520623025064508_6716276986290967676_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=1&ccb=1-7&_nc_sid=18de74&_nc_ohc=pOD8Hq4Fqx8Q7kNvwGMOuZ2&_nc_oc=Adl2pIdi0ui3xB3L4LUPT90XOU-r_Oqc860ZtlvOsRlUxYp0_63sTMwSZMHOgqSUxBU&_nc_zt=23&_nc_ht=scontent-sin2-2.cdninstagram.com&_nc_gid=9dmwO54zP7EtipBGdkW86g&oh=00_AfYXHs10pXT24EXlXuFA3o7ptSnx0y3nAetq37_hU3E0tw&oe=68E0A171",
      caption:
        "Mumbai, we're back.\nLower Parel, you asked and we listened.\nThis isn't just a new spot.\nIt's where mid-week plans turn into late-night laughs, where comfort food gets its groove back, and where your table always feels like the best seat in the house.\nCome by. Bring your people. Let's do this the way only Mumbai knows how.",
      likes: 1664611,
      comments: 35380,
    },
    {
      id: "DLrSRdqTcEQ",
      thumbnail:
        "https://scontent-sin2-2.cdninstagram.com/v/t51.82787-15/514903139_18521806675018979_1565077011870113981_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=1&ccb=1-7&_nc_sid=18de74&_nc_ohc=pVhmnwgE8v4Q7kNvwGmW0-q&_nc_oc=AdnXKcC6of2HI93Qr6sPuNMd6j6L9qRuAprUu1NJ7n1Dxtl9EqfB5HYMXtNxie5s8JQ&_nc_zt=23&_nc_ht=scontent-sin2-2.cdninstagram.com&_nc_gid=s2AonITqVYawgDJ3dp3cjQ&oh=00_AfaluuyANmPvjX9T-6mfNhmfwjRkPirkCIgAOkxdBM8Ktg&oe=68E09FF5",
      caption:
        "From quaint bonfires to spontaneous moments by the beach, join Virat and I as we share highlights of our most memorable Dubai holiday. A destination we hold very close to our hearts, Dubai never ceases to surprise us and every trip has brought us some of our most cherished moments.\nDo you have special someone to surprise on your next Dubai holiday?\n#VisitDubai #Ad",
      likes: 3828750,
      comments: 60010,
    },
    {
      id: "DK7TPPTNsic",
      thumbnail:
        "https://scontent-sin2-2.cdninstagram.com/v/t51.75761-15/506378516_18513982099064508_5755847656407504990_n.jpg?stp=c191.0.576.575a_dst-jpg_e35_s640x640_tt6&_nc_cat=1&ccb=1-7&_nc_sid=18de74&_nc_ohc=qdzvAzblVDoQ7kNvwEaiywJ&_nc_oc=AdlyjxDUkskSBl3CsytAWKqI69AX13tY0gfpyU3oJTmiDuKV6CKewRu_R6c-gQ583AE&_nc_zt=23&_nc_ht=scontent-sin2-2.cdninstagram.com&_nc_gid=qS3dWIUR6UwAjltnJG2Lwg&oh=00_AfYL0LdsQtlyvfN0zYY6NrvA1m7S32Jc-qB74t3_Ez4v6w&oe=68E08F90",
      caption:
        "He taught me to never rely on shortcuts or influence — because if you truly have it in you, hard work will show it.\nAnd if you don't have the will to work for it, then maybe you don't deserve it yet.\n\nWhen I was offered an easier path once, he refused it for me.\nWith calm conviction, he said, \"If you're good enough, you'll find your way. And if not, it's better to know that early.\"\n\nThat one moment shaped how I live, work, and show up in the world.\nHappy Father's Day to all the fathers whose quiet strength becomes our lifelong compass. ❤",
      likes: 13086917,
      comments: 202749,
    },
  ],
  _meta: {
    source: "https://www.instagram.com/api/v1/users/web_profile_info/?username=virat.kohli",
    scraped_at: "2025-09-29T18:35:17.282Z",
  },
}

const DataContext = createContext<InfluencerData | null>(null)

export function DataProvider({ children, data }: { children: ReactNode; data?: InfluencerData }) {
  return <DataContext.Provider value={data || sampleData}>{children}</DataContext.Provider>
}

export function useInfluencerData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useInfluencerData must be used within a DataProvider")
  }
  return context
}
