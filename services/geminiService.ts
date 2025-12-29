
import { GoogleGenAI, Type } from "@google/genai";

export const getPastryRecommendation = async (mood: string, preferences: string) => {
  // Access process.env safely within the function scope
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
  
  if (!apiKey) {
    console.warn("Gemini API Key is not configured. Please ensure process.env.API_KEY is set.");
    return null;
  }
  
  // Create a new instance right before the call as per recommended best practices
  const ai = new GoogleGenAI({ apiKey });
  
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

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
