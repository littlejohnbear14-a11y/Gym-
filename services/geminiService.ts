import { GoogleGenAI, Type, Schema } from "@google/genai";
import { INVENTORY } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const inventoryString = INVENTORY.map(i => i.name).join(", ");

const AlternativeSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    alternatives: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of the alternative exercise" },
          reason: { type: Type.STRING, description: "Why this is a good alternative based on equipment" },
          setup: { type: Type.STRING, description: "Brief setup instruction" }
        },
        required: ["name", "reason", "setup"]
      }
    }
  },
  required: ["alternatives"]
};

export const getAlternatives = async (exerciseName: string, muscleGroup: string) => {
  try {
    const prompt = `
      Act as an expert fitness coach.
      User wants an alternative for the exercise: "${exerciseName}" which targets the "${muscleGroup}".
      
      The user ONLY has the following equipment available in their home gym:
      [${inventoryString}]

      Provide 3 alternative exercises that use ONLY the available equipment.
      Keep the intensity and muscle focus as close as possible to the original.
      Respond in Spanish/Catalan mixed (as the user prefers).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: AlternativeSchema,
        temperature: 0.3
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const data = JSON.parse(text);
    return data.alternatives || [];

  } catch (error) {
    console.error("Error fetching alternatives:", error);
    return [];
  }
};
