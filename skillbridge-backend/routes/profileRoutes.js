import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* GET USER PROFILE */

router.get("/", authMiddleware, async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select("-password");

    res.json(user);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Failed to load profile" });

  }

});


/* UPDATE PROFILE */

router.put("/", authMiddleware, async (req, res) => {

  try {

    const { name, bio, location, career_goal } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, location, career_goal },
      { new: true }
    ).select("-password");

    res.json(user);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Failed to update profile" });

  }

});

export default router;