import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function generateFeedback(content) {
  const response = await genAI.models.generateContent({
    model: "gemini-1.5-pro",
    contents: content,
  });

  return response.text;
}
