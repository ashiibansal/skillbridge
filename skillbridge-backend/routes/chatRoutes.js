import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import GapAnalysis from "../models/GapAnalysis.js";

import {
  getYouTubeResources,
  getRoadmapResources
} from "../services/resourceService.js";

import { generateAIResponse } from "../services/aiService.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {

  try {

    const { message } = req.body;

    const latestAnalysis = await GapAnalysis.findOne({
      user: req.user.id
    })
      .populate("role")
      .sort({ createdAt: -1 });

    /* =========================
       NO DATA CASE
    ========================= */

    if (!latestAnalysis || !latestAnalysis.skill_gaps) {
      return res.json({
        reply: "⚠️ You haven't completed an assessment yet. Please take one to get personalized guidance."
      });
    }

    const lowerMsg = message.toLowerCase();

    /* =========================
       PREP DATA
    ========================= */

    const topGaps = latestAnalysis.skill_gaps
      .filter(g => g.gap > 0)
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 3);

    /* =========================
       INTENT: CAREER ROLES
    ========================= */

    if (lowerMsg.includes("career") || lowerMsg.includes("role")) {
      return res.json({
        reply: `
🎯 You are currently pursuing:
👉 ${latestAnalysis.role?.title || "a career path"}

💡 Suggested roles:
- Machine Learning Engineer
- AI Engineer
- Data Scientist

Focus on improving your top skills to move into these roles.
`
      });
    }

    /* =========================
       INTENT: SKILL GAPS
    ========================= */

    if (lowerMsg.includes("gap") || lowerMsg.includes("skills")) {

      const gapsText = topGaps.map(g =>
        `- ${g.skill} (gap: ${g.gap}, ${g.priority})`
      ).join("\n");

      return res.json({
        reply: `
🔴 Your Top Skill Gaps:
${gapsText}

💡 Focus on high-priority gaps first.
`
      });
    }

    /* =========================
       INTENT: NEXT STEPS
    ========================= */

    if (
      lowerMsg.includes("next") ||
      lowerMsg.includes("what should i do") ||
      lowerMsg.includes("improve")
    ) {
      return res.json({
        reply: `
🟢 Next Steps:
- Focus on ${topGaps[0]?.skill}
- Build 1–2 projects
- Practice real-world problems
- Follow roadmap resources
`
      });
    }

    /* =========================
       INTENT: RESOURCES
    ========================= */

    if (lowerMsg.includes("resource") || lowerMsg.includes("learn")) {

      let resourceText = "";

      for (const gap of topGaps) {
        resourceText += `
${gap.skill}:
- Tutorial
- Roadmap
`;
      }

      return res.json({
        reply: `
📚 Recommended Learning Resources:
${resourceText}
`
      });
    }

    /* =========================
       BUILD CONTEXT (FOR AI)
    ========================= */

    const context = `
Career Role: ${latestAnalysis.role?.title || "Not specified"}

User Readiness: ${latestAnalysis.readiness_score}%

Top Skill Gaps:
${topGaps.map(g =>
  `${g.skill} (gap: ${g.gap}, priority: ${g.priority})`
).join("\n")}
`;

    /* =========================
       PROMPT (ONLY FOR COMPLEX QUESTIONS)
    ========================= */

    const prompt = `
You are an AI Career Coach.

- Keep response SHORT
- Use bullet points
- Be practical

User Context:
${context}

User Question:
${message}
`;

    /* =========================
       AI RESPONSE (FALLBACK)
    ========================= */

    let reply = await generateAIResponse(prompt);

    if (reply && reply.length > 500) {
      reply = reply.slice(0, 500) + "...";
    }

    res.json({ reply });

  } catch (error) {

    console.error("CHAT ERROR:", error);

    res.json({
      reply: "⚠️ I couldn't process that properly. Try asking about skills, roles, or next steps."
    });

  }

});

export default router;