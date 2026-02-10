import express from "express";
import Assessment from "../models/Assessment.js";
import Role from "../models/Role.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * GET /api/gap-analysis/:assessmentId
 */
router.get("/:assessmentId", authMiddleware, async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.assessmentId)
      .populate("role");

    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    const REQUIRED_LEVEL = 80;

    const skillAnalysis = assessment.answers.map((a) => {
      const gap = Math.max(REQUIRED_LEVEL - a.score, 0);

      return {
        skill: a.skill,
        currentLevel: a.score,
        requiredLevel: REQUIRED_LEVEL,
        gap,
      };
    });

    // Career Readiness Score (simple average)
    const readinessScore = Math.round(
      skillAnalysis.reduce((sum, s) => sum + s.currentLevel, 0) /
        skillAnalysis.length
    );

    res.json({
      role: assessment.role.title,
      readinessScore,
      skills: skillAnalysis,
      gaps: skillAnalysis.filter((s) => s.gap > 0),
    });
  } catch (error) {
    console.error("Gap analysis error:", error);
    res.status(500).json({ message: "Failed to generate gap analysis" });
  }
});

export default router;