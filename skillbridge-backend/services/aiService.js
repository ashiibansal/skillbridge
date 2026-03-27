import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

/* =========================
   GEMINI (SAFE VERSION)
========================= */

const callGemini = async (prompt) => {

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini not configured");
    }
  
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
    // ✅ ONLY use models that work with v1beta
    const models = ["gemini-pro"];
  
    for (const modelName of models) {
      try {
  
        console.log(`Trying Gemini model: ${modelName}`);
  
        const model = genAI.getGenerativeModel({
          model: modelName
        });
  
        const result = await model.generateContent(prompt);
        const response = await result.response;
  
        return response.text();
  
      } catch (err) {
        console.warn(`❌ Gemini model ${modelName} failed:`, err.message);
      }
    }
  
    // ❌ If all models fail
    throw new Error("All Gemini models failed");
  };

/* =========================
   GROQ (UPDATED MODEL)
========================= */

const callGroq = async (prompt) => {

  if (!process.env.GROQ_API_KEY) {
    throw new Error("Groq not configured");
  }

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant", // ✅ FIXED
    messages: [
      {
        role: "system",
        content:
          "You are an AI career coach. Give structured, clear and actionable advice."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7
  });

  return completion.choices[0].message.content;
};

/* =========================
   MAIN ROUTER
========================= */

export const generateAIResponse = async (prompt) => {

  console.log("=== AI REQUEST START ===");

  /* 1️⃣ Gemini */
  try {
    const res = await callGemini(prompt);
    console.log("✅ Gemini used");
    return res;
  } catch (err) {
    console.error("❌ Gemini failed:", err.message);
  }

  /* 2️⃣ Groq */
  try {
    const res = await callGroq(prompt);
    console.log("✅ Groq used");
    return res;
  } catch (err) {
    console.error("❌ Groq failed:", err.message);
  }

  /* 3️⃣ Final fallback */
  console.log("⚠️ Using fallback");

  return "Focus on your highest priority skills and build small projects to improve.";
};