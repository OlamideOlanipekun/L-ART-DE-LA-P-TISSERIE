
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

export const getPastryRecommendation = async (mood: string, preferences: string) => {
  if (!API_KEY) return null;
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The user is feeling "${mood}" and usually prefers "${preferences}". Recommend one specific type of luxury French pastry that matches this mood and describe why it fits, along with a suggested beverage pairing. Make it sound sophisticated and poetic.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pastryName: { type: Type.STRING },
            reason: { type: Type.STRING },
            pairing: { type: Type.STRING }
          },
          required: ["pastryName", "reason", "pairing"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
