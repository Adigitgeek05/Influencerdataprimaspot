import pool from "../config/db.js";

export const createAllTables = async () => {
  const query = `
    -- 1. Influencers
    CREATE TABLE IF NOT EXISTS influencers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      username VARCHAR(100) NOT NULL UNIQUE,
      profile_pic_url TEXT,
      followers BIGINT DEFAULT 0,
      following BIGINT DEFAULT 0,
      posts_count BIGINT DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    -- 2. Posts
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      influencer_id INT REFERENCES influencers(id) ON DELETE CASCADE,
      caption TEXT,
      likes BIGINT DEFAULT 0,
      comments BIGINT DEFAULT 0,
      image_url TEXT,
      posted_at TIMESTAMP DEFAULT NOW(),
      tags TEXT[],
      vibe VARCHAR(50),
      lighting VARCHAR(50),
      appeal_score NUMERIC(3,2),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    -- 3. Reels
    CREATE TABLE IF NOT EXISTS reels (
      id SERIAL PRIMARY KEY,
      influencer_id INT REFERENCES influencers(id) ON DELETE CASCADE,
      caption TEXT,
      thumbnail_url TEXT,
      views BIGINT DEFAULT 0,
      likes BIGINT DEFAULT 0,
      comments BIGINT DEFAULT 0,
      tags TEXT[],
      vibe VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    -- 4. Engagement Metrics
    CREATE TABLE IF NOT EXISTS engagement_metrics (
      influencer_id INT PRIMARY KEY REFERENCES influencers(id) ON DELETE CASCADE,
      avg_likes NUMERIC(10,2),
      avg_comments NUMERIC(10,2),
      engagement_rate NUMERIC(5,2),
      last_updated TIMESTAMP DEFAULT NOW()
    );

    -- 5. Audience Demographics
    CREATE TABLE IF NOT EXISTS audience_demographics (
      influencer_id INT REFERENCES influencers(id) ON DELETE CASCADE,
      gender VARCHAR(10),
      age_group VARCHAR(20),
      country VARCHAR(50),
      percentage NUMERIC(5,2),
      PRIMARY KEY (influencer_id, gender, age_group, country)
    );
  `;

  try {
    const client = await pool.connect();
    await client.query(query);
    console.log("All tables created successfully!");
    client.release();
  } catch (err) {
    console.error("Error creating tables:", err);
  }
};
