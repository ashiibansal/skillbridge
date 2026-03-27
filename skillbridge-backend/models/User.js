import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    headline: {
      type: String,
      default: "",
      trim: true,
    },

    bio: {
      type: String,
      default: "",
      trim: true,
    },

    background: {
      type: String,
      default: "",
      trim: true,
    },

    motivation: {
      type: String,
      default: "",
      trim: true,
    },

    current_challenge: {
      type: String,
      default: "",
      trim: true,
    },

    desired_outcome: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    career_goal: {
      type: String,
      default: "",
      trim: true,
    },

    target_role: {
      type: String,
      default: "",
      trim: true,
    },

    secondary_role: {
      type: String,
      default: "",
      trim: true,
    },

    preferred_domain: {
      type: String,
      default: "",
      trim: true,
    },

    experience_level: {
      type: String,
      default: "",
      trim: true,
    },

    weekly_hours: {
      type: String,
      default: "",
      trim: true,
    },

    job_timeline: {
      type: String,
      default: "",
      trim: true,
    },

    focus_skill: {
      type: String,
      default: "",
      trim: true,
    },

    current_project: {
      type: String,
      default: "",
      trim: true,
    },

    next_milestone: {
      type: String,
      default: "",
      trim: true,
    },

    github_url: {
      type: String,
      default: "",
      trim: true,
    },

    linkedin_url: {
      type: String,
      default: "",
      trim: true,
    },

    portfolio_url: {
      type: String,
      default: "",
      trim: true,
    },

    known_skills: {
      type: [String],
      default: [],
    },

    weak_areas: {
      type: [String],
      default: [],
    },

    learning_style: {
      type: [String],
      default: [],
    },

    avatar: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);