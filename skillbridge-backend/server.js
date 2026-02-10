import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import rolesRoutes from "./routes/roles.js";
import assessmentRoutes from "./routes/assessments.js";
import gapAnalysisRoutes from "./routes/gapAnalysis.js";

dotenv.config();
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