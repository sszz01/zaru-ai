import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import axios from "axios";
import { marked } from "marked";
import { GoogleGenAI } from "@google/genai";
import { filterMessage } from "./middleware/contentFilter";

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
const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
        content: `**Objective:** Determine if accurately answering the user's query necessitates information created or changed *after* your knowledge cutoff date. Your goal is to trigger an external web search tool when needed to ensure factual, up-to-date responses.

**Instructions:** Respond with 'yes' if *any* of the following conditions are met. It is not limited to those conditions only, you must take an objective decision of whether a query actually requires realtime data, but those are just an example of what a realtime query might look like. Otherwise, respond 'no'.

1.  **Explicit Time Sensitivity:** Does the query explicitly use terms like 'current', 'latest', 'today', 'recent', 'now', 'this year/month/week', or ask about ongoing events?
2.  **Implicit Time Sensitivity:** Could the accurate answer have realistically changed between your knowledge cutoff and the present moment? Consider:
    * **Evolving Facts & Figures:** Statistics (e.g., population, economic data, infection rates), rankings, records (e.g., tallest building, fastest runner).
    * **Changing States:** Current status of events (e.g., ongoing conflicts, project statuses, game scores), availability (e.g., product stock, service uptime), conditions (e.g., weather forecasts, traffic reports), prices (e.g., stock prices, product costs).
    * **Positions & Roles:** Queries about 'who is/are' in current positions of authority, leadership, representation, or official roles (e.g., CEO, president, team captain, spokesperson). Default to 'yes' *unless* the query specifically asks about a *past* holder or a clearly historical context.
    * **Policies & Regulations:** Current laws, government policies, company terms of service, official guidelines.
    * **Recent Developments:** News headlines, recently published research findings, product releases/updates, company announcements.
3.  **Post-Cutoff Events/Information:** Does the query relate to specific events, discoveries, publications, or developments known or likely to have occurred *after* your knowledge cutoff?
4.  **Comparative Test:** Would a definitive answer provided today potentially differ from one given six months ago (or just before your knowledge cutoff)? If yes, this indicates time sensitivity.
5.  **Uncertainty Clause:** If you are uncertain whether the information required is stable and within your knowledge base or if it might have changed post-cutoff, err on the side of caution and respond 'yes' to prioritize accuracy.

Analyze the query's substance, not just keywords. Focus solely on whether *up-to-date, post-cutoff information* is required for a reliable answer.`,
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
    const content = response.text;
    if (content) {
      res.json({
        response: marked.parse(content),
      });
    }
  } catch (error) {
    console.error("Error with GEMINI request:", error);
    res.json({
      response: "I'm unable to process this request.",
    });
  }
}

app.post("/api/chat", async (req, res) => {
  try {
    const { message, userRole = "default" } = req.body;
    const filterResult = await filterMessage(message, userRole); // apply content filter based on user role

    if (!filterResult.allowed) {
      return res.json({
        response: marked.parse(
          `I'm unable to assist with this request. ${filterResult.reason}`
        ),
      });
    }

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
            {
              role: "system",
              content: `You are a helpful assistant. The user has the role: ${userRole}.`,
            },
            {
              role: "user",
              content: `${message} Here's some additional info from Jina AI: ${jinaResponse}`,
            },
          ],
        });

        const content = completion.choices?.[0]?.message?.content;
        if (content) {
          return res.json({
            response: marked.parse(content),
          });
        }
      } else {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant. The user has the role: ${userRole}.`,
            },
            { role: "user", content: message },
          ],
        });

        const content = completion.choices?.[0]?.message?.content;
        if (content) {
          return res.json({
            response: marked.parse(content),
          });
        }
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
