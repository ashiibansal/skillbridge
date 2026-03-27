import express from "express";
import GapAnalysis from "../models/GapAnalysis.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {

    const analyses = await GapAnalysis.find({ user: req.user.id })
      .populate("role", "title")
      .sort({ createdAt: -1 });

    res.json(analyses);

  } catch (error) {
    console.error("PROGRESS ERROR:", error);
    res.status(500).json({ message: "Failed to load progress" });
  }
});

export default router;