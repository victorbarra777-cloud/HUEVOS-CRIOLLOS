import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEggRecipe = async (preferences: string): Promise<Recipe | null> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      Eres un chef experto en gastronomía sostenible y saludable. 
      Genera una receta creativa y deliciosa cuyo ingrediente principal sean huevos criollos (orgánicos).
      
      Preferencia del usuario: "${preferences}"
      
      Si el usuario no especifica nada, sugiere un desayuno clásico pero elevado.
      La respuesta DEBE ser un objeto JSON válido con la estructura solicitada.
      El idioma de respuesta debe ser ESPAÑOL.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Título atractivo de la receta" },
            description: { type: Type.STRING, description: "Breve descripción apetitosa" },
            ingredients: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Lista de ingredientes con cantidades"
            },
            steps: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Pasos detallados de preparación"
            },
            cookingTime: { type: Type.STRING, description: "Tiempo estimado (ej. 15 min)" },
            difficulty: { type: Type.STRING, description: "Fácil, Media, o Difícil" }
          },
          required: ["title", "description", "ingredients", "steps", "cookingTime", "difficulty"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text) as Recipe;
  } catch (error) {
    console.error("Error generating recipe:", error);
    return null;
  }
};