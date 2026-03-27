import express from "express";
import Assessment from "../models/Assessment.js";
import Role from "../models/Role.js";
import GapAnalysis from "../models/GapAnalysis.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:assessmentId", authMiddleware, async (req, res) => {
  try {

    const assessment = await Assessment.findById(req.params.assessmentId);

    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    const role = await Role.findById(assessment.role);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    const skillGaps = [];

    let totalRequired = 0;
    let totalCurrent = 0;

    role.required_skills.forEach((requiredSkill) => {

      const answer = assessment.answers.find(
        (a) => a.skill === requiredSkill.name
      );

      const currentLevel = answer ? answer.score : 1;

      const requiredLevel = requiredSkill.required_level || 3;

      const gap = Math.max(requiredLevel - currentLevel, 0);

      totalRequired += requiredLevel;
      totalCurrent += currentLevel;

      let priority = "None";

      if (gap >= 3) priority = "High";
      else if (gap === 2) priority = "Medium";
      else if (gap === 1) priority = "Low";

      skillGaps.push({
        skill: requiredSkill.name,
        current_level: currentLevel,
        required_level: requiredLevel,
        gap,
        priority
      });

    });

    // Sort highest priority gaps first
    skillGaps.sort((a, b) => b.gap - a.gap);

    const readinessScore = Math.round(
      (totalCurrent / totalRequired) * 100
    );

    // AI insight logic
    let insight = "";

    if (readinessScore >= 80) {
      insight =
        "You are very close to being job-ready. Focus on refining advanced topics.";
    } else if (readinessScore >= 60) {
      insight =
        "You have a solid foundation. Strengthen high-priority gaps.";
    } else {
      insight =
        "You are at the early stage. Focus on core fundamentals first.";
    }

    // ⭐ SAVE GAP ANALYSIS
    let analysis = await GapAnalysis.findOne({
      user: req.user.id,
      role: role._id
    });
    
    if (analysis) {
      // update existing progress
      analysis.readiness_score = readinessScore;
      analysis.skill_gaps = skillGaps;
      analysis.ai_insights = insight;
      analysis.assessment = assessment._id;
    
      await analysis.save();
    } else {
      // create new progress
      analysis = await GapAnalysis.create({
        user: req.user.id,
        role: role._id,
        assessment: assessment._id,
        readiness_score: readinessScore,
        skill_gaps: skillGaps,
        ai_insights: insight
      });
    }
    
    res.json(analysis);

    // Return saved analysis
    res.json(analysis);

  } catch (error) {
    console.error("GAP ANALYSIS ERROR:", error);
    res.status(500).json({ message: "Failed to generate gap analysis" });
  }
});

export default router;