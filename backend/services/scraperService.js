import puppeteer from "puppeteer";
import pool from "../config/db.js";
import { calculateEngagement } from "../utils/calculateEngagement.js";

// Simple tag generator
const generateTags = (caption) => {
  if (!caption) return [];
  return caption
    .toLowerCase()
    .split(" ")
    .filter(word => word.length > 3)
    .slice(0, 5);
};

// Determine vibe based on keywords
const determineVibe = (caption) => {
  if (!caption) return "casual";
  if (caption.includes("luxury")) return "luxury/lavish";
  if (caption.includes("travel")) return "travel";
  if (caption.includes("party")) return "energetic";
  return "casual";
};

export const scrapeInfluencerData = async (username) => {
  const url = `https://www.instagram.com/${username}/`;
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    // Extract JSON data from window._sharedData
    const profileData = await page.evaluate(() => {
      const script = Array.from(document.querySelectorAll('script[type="text/javascript"]'))
        .find(s => s.textContent.includes('window._sharedData'));
      if (!script) return null;

      const jsonText = script.textContent
        .replace('window._sharedData = ', '')
        .replace(/;$/, '');
      const data = JSON.parse(jsonText);

      const user = data.entry_data.ProfilePage[0].graphql.user;

      return {
        name: user.full_name,
        profilePic: user.profile_pic_url_hd,
        postsCount: user.edge_owner_to_timeline_media.count,
        followers: user.edge_followed_by.count,
        following: user.edge_follow.count,
        posts: user.edge_owner_to_timeline_media.edges.map(edge => ({
          image_url: edge.node.display_url,
          caption: edge.node.edge_media_to_caption.edges[0]?.node.text || "",
          likes: edge.node.edge_liked_by.count,
          comments: edge.node.edge_media_to_comment.count
        })).slice(0, 10) // first 10 posts
      };
    });

    if (!profileData) {
      await browser.close();
      return null;
    }

    // Add tags and vibe to posts
    profileData.posts.forEach(post => {
      post.tags = generateTags(post.caption);
      post.vibe = determineVibe(post.caption);
    });

    // Calculate engagement metrics
    const avgLikes = profileData.posts.reduce((a,b)=>a+b.likes,0)/profileData.posts.length || 0;
    const avgComments = profileData.posts.reduce((a,b)=>a+b.comments,0)/profileData.posts.length || 0;
    const engagementRate = calculateEngagement(avgLikes, avgComments, profileData.followers);

    // Save influencer in DB
    const { rows } = await pool.query(
      `INSERT INTO influencers (name, username, profile_pic_url, followers, following, posts_count)
       VALUES ($1,$2,$3,$4,$5,$6)
       ON CONFLICT (username) DO UPDATE
       SET name = EXCLUDED.name, profile_pic_url = EXCLUDED.profile_pic_url, followers = EXCLUDED.followers,
           following = EXCLUDED.following, posts_count = EXCLUDED.posts_count
       RETURNING id`,
      [profileData.name, username, profileData.profilePic, profileData.followers, profileData.following, profileData.postsCount]
    );
    const influencerId = rows[0].id;

    // Save posts in DB
    for (let post of profileData.posts) {
      await pool.query(
        `INSERT INTO posts (influencer_id, caption, likes, comments, image_url, tags, vibe)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         ON CONFLICT DO NOTHING`,
        [influencerId, post.caption, post.likes, post.comments, post.image_url, post.tags, post.vibe]
      );
    }

    await browser.close();

    return {
      profile: {
        name: profileData.name,
        profilePic: profileData.profilePic,
        postsCount: profileData.postsCount,
        followers: profileData.followers,
        following: profileData.following
      },
      engagement: { avgLikes, avgComments, engagementRate },
      posts: profileData.posts
    };

  } catch (err) {
    await browser.close();
    console.error("Scraping error:", err);
    return null;
  }
};
