import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import rolesRoutes from "./routes/roles.js";
import assessmentRoutes from "./routes/assessments.js";
import gapAnalysisRoutes from "./routes/gapAnalysis.js";
import progressRoutes from "./routes/progress.js";
import resourcesRoutes from "./routes/resources.js";
import profileRoutes from "./routes/profileRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.trim().replace(/\/$/, "");
      const normalizedAllowedOrigins = allowedOrigins.map((item) =>
        String(item).trim().replace(/\/$/, "")
      );

      const isExactMatch = normalizedAllowedOrigins.includes(normalizedOrigin);

      const isVercelPreview =
        normalizedOrigin.includes("skillbridge") &&
        normalizedOrigin.endsWith(".vercel.app");

      if (isExactMatch || isVercelPreview) {
        return callback(null, true);
      }

      console.error(`CORS blocked origin: ${normalizedOrigin}`);
      return callback(new Error(`Not allowed by CORS: ${normalizedOrigin}`));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/gap-analysis", gapAnalysisRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/resources", resourcesRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/career-roadmap", roadmapRoutes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});