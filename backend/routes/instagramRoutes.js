import express from "express";
import { scrapeInfluencerData } from "../services/scraperService.js";

const router = express.Router();

// Scrape influencer by username
router.get("/scrape/:username", async (req, res) => {
  const { username } = req.params;
  const data = await scrapeInfluencerData(username);
  if (!data) return res.status(500).json({ message: "Failed to scrape data" });
  res.json(data);
});

export default router;
