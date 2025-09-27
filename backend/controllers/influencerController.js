import pool from "../db.js";

// Get influencer by username
export const getInfluencer = async (req, res) => {
  const { username } = req.params;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM influencers WHERE username = $1",
      [username]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Influencer not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
