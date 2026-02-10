import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: { type: [String], default: [] },
    roadmap: { type: [String], default: [] }, // 👈 ADD THIS
    level: { type: String, default: "Beginner" },
  },
  { timestamps: true }
);

export default mongoose.model("Role", roleSchema);