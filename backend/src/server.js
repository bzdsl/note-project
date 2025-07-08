/** @format */

import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port http://localhost:" + PORT);
});
