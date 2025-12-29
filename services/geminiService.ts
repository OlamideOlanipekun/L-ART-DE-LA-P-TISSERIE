import { GoogleGenAI, Type } from "@google/genai";

export const getPastryRecommendation = async (mood: string, preferences: string) => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found in process.env.API_KEY");
    return null;
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The user is feeling "${mood}" and usually prefers "${preferences}". Recommend one specific type of luxury French pastry that matches this mood and describe why it fits, along with a suggested beverage pairing. Make it sound sophisticated, poetic, and like a top-tier Parisian sommelier speaking.`,
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

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};