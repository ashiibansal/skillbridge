import mongoose from "mongoose";

const gapAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    readiness_score: Number,

    skill_gaps: [
      {
        skill: String,
        current_level: Number,
        required_level: Number,
        gap: Number,
        priority: String,
      },
    ],

    ai_insights: String,
  },
  { timestamps: true }
);

export default mongoose.model("GapAnalysis", gapAnalysisSchema);