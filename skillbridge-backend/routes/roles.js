import express from "express";
import Role from "../models/Role.js";

const router = express.Router();

/**
 * GET all roles
 */
router.get("/", async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    console.error("GET ROLES ERROR:", error);
    res.status(500).json({ message: "Failed to fetch roles" });
  }
});

export default router;