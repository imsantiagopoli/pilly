import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getHealthInsight = async (prompt: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "AI Service Unavailable (Missing API Key)";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a friendly, empathetic health assistant named Dr. Brainy. Your tone is encouraging, concise, and warm. You help users stay motivated with their medication adherence. Keep answers under 100 words.",
      }
    });
    return response.text || "I couldn't generate an insight right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to my brain right now.";
  }
};
