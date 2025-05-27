import { openai } from "./keygen";

export async function generateTitle(message: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `**Objective:** Your job is to generate a short and descriptive title for a conversation based on the user's first message. The title should be concise, relevant, and no longer than 6 words`,
      },
      { role: "user", content: message },
    ],
  });

  const response = completion.choices?.[0]?.message?.content
    ?.trim()
    .toLowerCase();
  return response || "New Conversation";
}
