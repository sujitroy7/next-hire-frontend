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

    return { text: response.text, data: response?.data };
  } catch (error) {
    console.error("Error Occured :", error);
    return { error: "Failed to generate response. Please try again." };
  }
};
