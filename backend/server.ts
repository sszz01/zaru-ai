import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import axios from "axios";

dotenv.config({ path: "../.env" });

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("API key is missing");
}

const openai = new OpenAI({ apiKey });

// JinaAI request
async function makeRequest(query) {
  const url = `https://s.jina.ai/?q=${query}`;
  const headers = {
    Authorization:
      "Bearer jina_c4f11f03e3024de699db5dc78388a616SykHnWs8JzmkThwRzet4S7k3ZIHo",
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

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const useWebSearch = await needsWebSearch(message);

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

      res.json({ response: completion.choices[0].message.content });
    } else {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
      });

      res.json({ response: completion.choices[0].message.content });
    }
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
