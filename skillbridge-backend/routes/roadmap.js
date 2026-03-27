import express from "express";
import Roadmap from "../models/Roadmap.js";
import Assessment from "../models/Assessment.js";
import Role from "../models/Role.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:assessmentId", authMiddleware, async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.assessmentId)
      .populate("role");

    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    const roadmapItems = assessment.answers.map(answer => {
      const requiredSkill = assessment.role.required_skills.find(
        s => s.name === answer.skill
      );

      const requiredLevel = requiredSkill?.required_level || 100;
      const gap = Math.max(requiredLevel - answer.score, 0);

      return {
        skill: answer.skill,
        gap,
        plan: generatePlan(answer.skill, gap),
      };
    });

    const roadmap = await Roadmap.create({
      user: req.user.id,
      assessment: assessment._id,
      items: roadmapItems,
    });

    res.status(201).json(roadmap);

  } catch (error) {
    console.error("ROADMAP ERROR:", error);
    res.status(500).json({ message: "Failed to generate roadmap" });
  }
});

function generatePlan(skill, gap) {
  if (gap === 0) return "You are already strong in this skill. Maintain and build advanced projects.";

  if (gap <= 20)
    return `Strengthen ${skill} with intermediate projects and real-world applications.`;

  if (gap <= 50)
    return `Study core concepts of ${skill}, complete 2-3 structured tutorials, and build a practical project.`;

  return `Start from fundamentals of ${skill}, follow a structured course, practice daily, and build 2 major projects.`;
}

export default router;