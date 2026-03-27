import express from "express";
import GapAnalysis from "../models/GapAnalysis.js";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  getYouTubeResources,
  getRoadmapResources
} from "../services/resourceService.js";

const router = express.Router();

/*
Fallback learning tips
*/
const learningTips = {
  React: "Build small projects using hooks and reusable components.",
  JavaScript: "Practice closures, promises, and async/await.",
  "Node.js": "Build REST APIs and implement authentication.",
  Backend: "Focus on API design, databases, and authentication.",
  Docker: "Practice containerizing apps using Dockerfiles.",
  Kubernetes: "Learn deployments, scaling, and service networking.",
  DevOps: "Focus on CI/CD pipelines and infrastructure automation."
};

/*
Priority order for sorting
*/
const priorityOrder = {
  High: 3,
  Medium: 2,
  Low: 1,
  None: 0
};

router.get("/", authMiddleware, async (req, res) => {

  try {

    const latest = await GapAnalysis.findOne({
      user: req.user.id
    }).sort({ createdAt: -1 });

    if (!latest) {
      return res.json([]);
    }

    /*
    Sort skill gaps by priority
    */
    const sortedGaps = [...latest.skill_gaps].sort((a, b) => {
      return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
    });

    const recommendations = await Promise.all(

      sortedGaps
        .filter(gap => gap.gap > 0)
        .map(async (gap) => {

          const videos = await getYouTubeResources(gap.skill);

          const roadmap = getRoadmapResources(gap.skill);

          const tip =
            learningTips[gap.skill] ||
            `Practice ${gap.skill} by building small projects and reading documentation.`;

          return {
            skill: gap.skill,
            priority: gap.priority,
            gap: gap.gap,
            resources: [...videos, ...roadmap],
            learning_tip: tip
          };

        })

    );

    res.json(recommendations);

  } catch (error) {

    console.error("RESOURCE ENGINE ERROR:", error);

    res.status(500).json({
      message: "Failed to generate resources"
    });

  }

});

export default router;