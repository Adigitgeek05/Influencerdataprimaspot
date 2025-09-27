import express from "express";
import dotenv from "dotenv";
import instagramRoutes from "./routes/instagramRoutes.js";
import { createAllTables } from "./models/tables.js";

dotenv.config();
const app = express();
app.use(express.json());

// Create tables on server start
createAllTables();

app.use("/api/influencers", instagramRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
