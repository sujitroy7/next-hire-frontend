"use server";

import { envRequired } from "@/lib/envRequired";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: envRequired("GEMINI_API_KEY"),
});

export const generateAIResponseAction = async (input: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: input,
    });
    return response;
  } catch (error) {
    console.error("Error Occured :", error);
  }
};
