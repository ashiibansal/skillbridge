import mongoose from "mongoose";
import dotenv from "dotenv";
import Role from "./models/Role.js";

dotenv.config();

const roles = [
    {
      title: "Frontend Developer",
      description: "Build interactive user interfaces",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      roadmap: [
        "HTML & CSS Basics",
        "JavaScript Fundamentals",
        "React Basics",
        "Advanced React",
      ],
      level: "Beginner",
    },
    {
      title: "Backend Developer",
      description: "Design APIs and server-side logic",
      skills: ["Node.js", "Express", "MongoDB"],
      roadmap: [
        "Node.js Basics",
        "Express APIs",
        "Databases",
        "Authentication",
      ],
      level: "Intermediate",
    },
  ];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Role.deleteMany(); // clean old data
    await Role.insertMany(roles);
    console.log("✅ Roles seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seed();