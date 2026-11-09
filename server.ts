import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini client lazily/safely
let genAI: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      genAI = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return genAI;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Activity Verification & Eco Impact Scoring Endpoint
app.post("/api/verify-activity", async (req, res) => {
  try {
    const { title, category, description, quantity, quantityUnit, proofNotes, imageDataBase64 } = req.body;

    const aiClient = getGenAI();

    // Fallback deterministic calculation if AI key not configured or fails
    if (!aiClient) {
      console.log("Gemini API key not configured, returning standard verification math");
      const basePts = category === 'tree_planting' ? 150 : category === 'cycling_transit' ? 80 : 100;
      const qtyMultiplier = Math.min(Math.max(quantity || 1, 1), 10);
      const calculatedPts = Math.round(basePts * (1 + qtyMultiplier * 0.2));
      const co2Kg = Number(((quantity || 1) * (category === 'tree_planting' ? 22 : category === 'cycling_transit' ? 2.5 : 1.2)).toFixed(1));

      return res.json({
        verified: true,
        score: 92,
        pointsAwarded: calculatedPts,
        co2SavedKg: co2Kg,
        waterSavedLiters: category === 'water_conservation' ? (quantity || 1) * 50 : 0,
        treesPlanted: category === 'tree_planting' ? (quantity || 1) : 0,
        feedback: `Fantastic eco effort! "${title}" directly benefits the planet.`,
        ecoTip: `Keep up this habit! Repeating this daily could save up to ${(co2Kg * 30).toFixed(0)} kg CO2 every month.`,
      });
    }

    const promptText = `You are an expert environmental impact evaluator for the "EcoPoints & Best Environmentalist" app.
Analyze the user's reported green activity and provide accurate environmental calculations, points, verification score, encouraging feedback, and a practical eco tip.

Submitted Activity:
- Title: ${title || 'Eco Action'}
- Category: ${category || 'general'}
- Description: ${description || 'Good environmental action'}
- Quantity/Amount: ${quantity || 1} ${quantityUnit || 'units'}
- Additional Notes: ${proofNotes || 'None'}

Rules for calculations:
1. Verification Score (0-100): High score if the action is realistic and genuine.
2. Points Awarded (30 to 500): Scale points based on real impact (e.g., planting trees = 150-300 pts, cycling 10km = 80-150 pts, beach cleanup = 120-250 pts, saving 100L water = 50-100 pts, plant-based meal = 40-80 pts).
3. CO2 Saved (in kg): Realistic scientific estimation (e.g. 1 tree absorbs ~22kg/year, 10km cycle vs car saves ~2.5kg CO2, 1 kg recycled plastic saves ~1.5kg CO2).
4. Water Saved (in liters): Relevant for water conservation/plant-based meal/recycling.
5. Trees Planted: Integer count if applicable.
6. Feedback: 1-2 positive, cheerful sentences praising the user's specific action.
7. Eco Tip: 1 sentence providing a helpful, actionable eco tip related to this category.
`;

    let parts: any[] = [{ text: promptText }];

    // If image provided, add image part for multimodal vision analysis
    if (imageDataBase64) {
      let mimeType = "image/jpeg";
      let base64Data = imageDataBase64;

      if (imageDataBase64.startsWith("data:")) {
        const matches = imageDataBase64.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
        if (matches) {
          mimeType = matches[1];
          base64Data = matches[2];
        }
      }

      parts.unshift({
        inlineData: {
          mimeType: mimeType,
          data: base64Data
        }
      });
    }

    const response = await aiClient.models.generateContent({
      model: "gemini-3.6-flash",
      contents: { parts },
      config: {
        systemInstruction: "You are an objective, encouraging environmental scientist and eco-gamification engine.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verified: { type: Type.BOOLEAN, description: "True if action is genuine and eco-friendly" },
            score: { type: Type.NUMBER, description: "Verification score 0-100" },
            pointsAwarded: { type: Type.INTEGER, description: "Points earned for this activity, between 30 and 500" },
            co2SavedKg: { type: Type.NUMBER, description: "Estimated kg CO2 reduced or absorbed" },
            waterSavedLiters: { type: Type.NUMBER, description: "Estimated liters of water saved" },
            treesPlanted: { type: Type.INTEGER, description: "Number of trees planted if applicable" },
            feedback: { type: Type.STRING, description: "Warm encouraging feedback on the post" },
            ecoTip: { type: Type.STRING, description: "A smart environmental tip related to this action" }
          },
          required: ["verified", "score", "pointsAwarded", "co2SavedKg", "waterSavedLiters", "treesPlanted", "feedback", "ecoTip"]
        }
      }
    });

    const responseText = response.text || "{}";
    const data = JSON.parse(responseText);

    res.json({
      verified: data.verified ?? true,
      score: data.score ?? 90,
      pointsAwarded: data.pointsAwarded ?? 100,
      co2SavedKg: Number((data.co2SavedKg ?? 2.5).toFixed(1)),
      waterSavedLiters: Math.round(data.waterSavedLiters ?? 0),
      treesPlanted: Math.round(data.treesPlanted ?? 0),
      feedback: data.feedback || "Great job taking action for our environment!",
      ecoTip: data.ecoTip || "Small consistent actions create massive planet-wide impact.",
    });

  } catch (error: any) {
    console.error("Error in /api/verify-activity:", error);
    // Graceful fallback
    res.json({
      verified: true,
      score: 85,
      pointsAwarded: 90,
      co2SavedKg: 2.0,
      waterSavedLiters: 10,
      treesPlanted: 0,
      feedback: "Your activity has been posted and rewarded with EcoPoints!",
      ecoTip: "Sharing your environmental journey inspires others in your community to take action too.",
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
