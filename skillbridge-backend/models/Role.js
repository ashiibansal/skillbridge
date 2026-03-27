import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    average_salary: String,
    growth_rate: String,
    required_skills: [
      {
        name: {
          type: String,
          required: true
        },
        category: {
          type: String,
          required: true
        },
        required_level: {
          type: Number,
          required: true,
          min: 1,
          max: 5
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Role", roleSchema);