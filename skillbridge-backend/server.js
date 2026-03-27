import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import rolesRoutes from "./routes/roles.js";
import assessmentRoutes from "./routes/assessments.js";
import gapAnalysisRoutes from "./routes/gapAnalysis.js";
import roadmapRoutes from "./routes/roadmap.js";
import progressRoutes from "./routes/progress.js";
import resourcesRoutes from "./routes/resources.js";
import profileRoutes from "./routes/profileRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";



connectDB();

const app = express();

/**
 * ✅ FORCE CORS HEADERS FOR EVERY REQUEST
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/**
 * ✅ Body parser
 */
app.use(express.json());

/**
 * ✅ Routes
 */
app.use("/api/auth", authRoutes);

app.use("/api/roles", rolesRoutes);

app.use("/api/assessments", assessmentRoutes);

app.use("/api/gap-analysis", gapAnalysisRoutes);

app.use("/api/roadmap", roadmapRoutes);

app.use("/api/progress", progressRoutes);

app.use("/api/resources", resourcesRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/chat", chatRoutes);


/**
 * ✅ Ping test
 */
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});