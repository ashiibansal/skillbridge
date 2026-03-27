import express from "express";
import Role from "../models/Role.js";

const router = express.Router();

// GET all roles
router.get("/", async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
});

// GET role by ID
router.get("/:id", async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json(role);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;