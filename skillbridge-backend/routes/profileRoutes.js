import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* GET USER PROFILE */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("GET /profile error:", error);
    res.status(500).json({ message: "Failed to load profile" });
  }
});

/* UPDATE PROFILE */
router.put("/", authMiddleware, async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "headline",
      "bio",
      "background",
      "motivation",
      "current_challenge",
      "desired_outcome",
      "location",
      "career_goal",
      "target_role",
      "secondary_role",
      "preferred_domain",
      "experience_level",
      "weekly_hours",
      "job_timeline",
      "focus_skill",
      "current_project",
      "next_milestone",
      "github_url",
      "linkedin_url",
      "portfolio_url",
      "known_skills",
      "weak_areas",
      "learning_style",
      "avatar",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const arrayFields = ["known_skills", "weak_areas", "learning_style"];

    arrayFields.forEach((field) => {
      if (updates[field] !== undefined) {
        updates[field] = Array.isArray(updates[field])
          ? updates[field]
              .map((item) => String(item).trim())
              .filter(Boolean)
          : [];
      }
    });

    const stringFields = allowedFields.filter(
      (field) => !arrayFields.includes(field)
    );

    stringFields.forEach((field) => {
      if (updates[field] !== undefined && typeof updates[field] === "string") {
        updates[field] = updates[field].trim();
      }
    });

    if (updates.name === "") {
      return res.status(400).json({ message: "Name cannot be empty" });
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("PUT /profile error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

export default router;