import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("api key is missing");
}

const openai = new OpenAI(apiKey);

const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "user",
      content: "Write a haiku about recursion in programming.",
    },
  ],
  store: true,
});

console.log(completion.choices[0].message.content);
