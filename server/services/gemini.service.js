
import { GoogleGenerativeAI } from "@google/generative-ai";

// NOTE:
// Don't read the API key at module-evaluation time. In ESM the import graph
// is evaluated before app code (like dotenv.config()) runs in the importer
// which can result in undefined API keys. Read the env var lazily inside
// the function (or ensure dotenv.config runs before imports).

// Lazy factory for the client so we only create it when we have a valid key.
function createGenAIFromEnv() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log("GEMINI_API_KEY not found in environment");
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
}

export async function callGemini(prompt) {
  const genAI = createGenAIFromEnv();
  if (!genAI) throw new Error("GEMINI_API_KEY not set");

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);

  // Try to return a clean text if available
  const text = result?.response?.text?.();
  return text ?? JSON.stringify(result, null, 2);
}

export default callGemini;
