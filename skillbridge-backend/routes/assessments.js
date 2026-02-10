import express from "express";
import Assessment from "../models/Assessment.js";
import Role from "../models/Role.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * GET assessment template for a role
 * (frontend uses this to show sliders/questions)
 */
router.get("/role/:roleId", authMiddleware, async (req, res) => {
  try {
    const role = await Role.findById(req.params.roleId);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json({
      roleId: role._id,
      title: role.title,
      skills: role.skills.map((skill) => ({
        skill,
        maxScore: 100,
      })),
    });
  } catch (error) {
    console.error("ASSESSMENT TEMPLATE ERROR:", error);
    res.status(500).json({ message: "Failed to load assessment" });
  }
});

/**
 * SUBMIT assessment
 */
router.post("/", authMiddleware, async (req, res) => {
    try {
      console.log("ASSESSMENT BODY:", req.body);
      console.log("USER:", req.user);
  
      const { roleId, answers } = req.body;
  
      if (!roleId) {
        return res.status(400).json({ message: "roleId missing" });
      }
  
      if (!Array.isArray(answers)) {
        return res.status(400).json({ message: "answers must be an array" });
      }
  
      const assessment = await Assessment.create({
        user: req.user.id,
        role: roleId,
        answers,
        completed: true,
      });
  
      res.status(201).json({
        message: "Assessment submitted",
        assessmentId: assessment._id,
      });
    } catch (error) {
      console.error("ASSESSMENT SUBMIT ERROR:", error);
      res.status(500).json({ message: error.message });
    }
  });

export default router;