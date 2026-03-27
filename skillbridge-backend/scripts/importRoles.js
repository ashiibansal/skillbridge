import mongoose from "mongoose";
import dotenv from "dotenv";
import Role from "../models/Role.js";
import roles from "../data/roles.json" with { type: "json" };

dotenv.config();

async function importData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Role.deleteMany({});
    console.log("Old roles cleared");

    await Role.insertMany(roles);
    console.log("New roles inserted successfully");

    process.exit();
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
}

importData();