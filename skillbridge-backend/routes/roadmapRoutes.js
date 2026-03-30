import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import GapAnalysis from "../models/GapAnalysis.js";
import { roleRoadmapTemplates } from "../services/roadmapTemplates.js";
import { buildCareerRoadmap } from "../services/roadmapBuilder.js";

const router = express.Router();

const getTemplateForRole = (roleTitle = "") => {
  if (roleRoadmapTemplates[roleTitle]) return roleRoadmapTemplates[roleTitle];

  const normalized = String(roleTitle).trim().toLowerCase();

  const aliases = {
    "frontend engineer": "Frontend Developer",
    "front end developer": "Frontend Developer",
    "front-end developer": "Frontend Developer",
    "backend engineer": "Backend Developer",
    "back end developer": "Backend Developer",
    "back-end developer": "Backend Developer",
    "fullstack developer": "Full Stack Developer",
    "full stack engineer": "Full Stack Developer",
    "full-stack developer": "Full Stack Developer",
  };

  const mappedTitle = aliases[normalized];
  return mappedTitle ? roleRoadmapTemplates[mappedTitle] : null;
};

const getRoleHistory = async (userId) => {
  const analyses = await GapAnalysis.find({ user: userId })
    .populate("role")
    .sort({ createdAt: -1 });

  const seenAssessmentIds = new Set();

  return analyses
    .filter((analysis) => {
      const id = String(analysis.assessment?._id || analysis.assessment || "");
      if (!id || seenAssessmentIds.has(id)) return false;
      seenAssessmentIds.add(id);
      return true;
    })
    .map((analysis) => ({
      assessment_id: String(analysis.assessment?._id || analysis.assessment),
      analysis_id: String(analysis._id),
      role_title: analysis?.role?.title || "Untitled role",
      readiness_score: Number(analysis?.readiness_score || 0),
      created_at: analysis.createdAt,
    }));
};

const buildRoadmapResponse = async ({ userId, assessmentId = null }) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    return { status: 404, body: { message: "User not found" } };
  }

  let query = { user: userId };

  if (assessmentId) {
    query.assessment = assessmentId;
  }

  const analysis = await GapAnalysis.findOne(query)
    .populate("role")
    .sort({ createdAt: -1 });

  if (!analysis) {
    return { status: 404, body: { message: "Gap analysis not found" } };
  }

  const roleTitle = analysis?.role?.title || user?.target_role || "";
  const template = getTemplateForRole(roleTitle);

  if (!template) {
    return {
      status: 400,
      body: { message: `No roadmap template found for role: ${roleTitle}` },
    };
  }

  const roadmap = buildCareerRoadmap({
    assessment: analysis,
    profile: user,
    template,
  });

  const roleHistory = await getRoleHistory(userId);

  return {
    status: 200,
    body: {
      ...roadmap,
      selected_assessment_id: String(analysis.assessment?._id || analysis.assessment),
      selected_analysis_id: String(analysis._id),
      role_history: roleHistory,
    },
  };
};

/* GET LATEST PERSONALISED CAREER ROADMAP */
router.get("/latest", authMiddleware, async (req, res) => {
  try {
    const result = await buildRoadmapResponse({ userId: req.user.id });
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error("GET /career-roadmap/latest error:", error);
    res.status(500).json({ message: "Failed to build latest roadmap" });
  }
});

/* GET PERSONALISED CAREER ROADMAP BY ASSESSMENT */
router.get("/:assessmentId", authMiddleware, async (req, res) => {
  try {
    const result = await buildRoadmapResponse({
      userId: req.user.id,
      assessmentId: req.params.assessmentId,
    });
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error("GET /career-roadmap/:assessmentId error:", error);
    res.status(500).json({ message: "Failed to build roadmap" });
  }
});

export default router;