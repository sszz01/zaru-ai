import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";

dotenv.config({ path: "../.env" });

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  throw new Error("API key is missing");
}

const openai = new OpenAI({ apiKey: openaiApiKey });
const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); // gemini api key

// JinaAI request
async function makeRequest(query) {
  const url = `https://s.jina.ai/?q=${query}`;
  const headers = {
    Authorization: `${process.env.JINA_AI_API_KEY}`,
    "X-Respond-With": "no-content",
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error("Error with Jina AI request:", error);
    return null;
  }
}

async function needsWebSearch(message) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant helping a developer. Assess whether the following query requires real-time data (e.g., news, weather, sports, or updates). Respond with 'yes' if it needs real-time data, otherwise 'no'.",
      },
      { role: "user", content: message },
    ],
  });

  const response = completion.choices?.[0]?.message?.content
    ?.trim()
    .toLowerCase();
  return response === "yes";
}

async function processGemini(res, message) {
  // GEMINI IMPLEMENTATION
  try {
    const response = await gemini.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", text: message }],
      config: {
        tools: [{ googleSearch: {} }], // use google search for scraping
      },
    });
    res.json({
      response: response.text,
    });
  } catch (error) {
    console.error("Error with GEMINI request:", error);
    res.json({
      response: "I'm unable to process this request.",
    });
  }
}

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const messageLowerCase = message.toLowerCase();
    const useGemini = messageLowerCase.includes("gemini");
    const useChatGPT = !useGemini;

    const useWebSearch = await needsWebSearch(message);

    if (useChatGPT) {
      if (useWebSearch) {
        const jinaData = await makeRequest(message);
        const jinaResponse = jinaData
          ? jinaData
          : "No relevant data found from Jina AI.";

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
              role: "user",
              content: `${message} Here's some additional info from Jina AI: ${jinaResponse}`,
            },
          ],
        });

        return res.json({
          response: completion.choices?.[0]?.message?.content,
        });
      } else {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: message },
          ],
        });

        return res.json({
          response: completion.choices?.[0]?.message?.content,
        });
      }
    } else {
      await processGemini(res, message);
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
