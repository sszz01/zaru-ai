import express from "express";
import cors from "cors";
import axios from "axios";
import { marked } from "marked";
import { filterMessage } from "./middleware/contentFilter";
import { openai, gemini, jinaAI } from "./keygen";
import { needsWebSearch } from "./utils/websearchCheck";

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// JinaAI request
async function makeRequest(query) {
  const url = `https://s.jina.ai/?q=${query}`;
  const headers = {
    Authorization: `${jinaAI.apiKey}`,
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

    if (filterResult != null && !filterResult.allowed) {
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
