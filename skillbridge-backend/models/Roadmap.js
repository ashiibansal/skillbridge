import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
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
    items: [
      {
        skill: String,
        gap: Number,
        plan: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Roadmap", roadmapSchema);