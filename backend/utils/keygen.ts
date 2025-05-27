import OpenAI from "openai";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config({ path: "../.env" });

const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  throw new Error("OpenAI API key is missing");
}
const jinaApiKey = process.env.JINA_AI_API_KEY;
if (!jinaApiKey) {
  throw new Error("JinaAI API key is missing");
}

const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
  throw new Error("Gemini API key is missing");
}

export const openai = new OpenAI({ apiKey: openaiApiKey });
export const gemini = new GoogleGenAI({ apiKey: geminiApiKey });
export const jinaAI = { apiKey: jinaApiKey };
