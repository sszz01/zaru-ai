import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export async function filterMessage(message, role) {
  if (role !== "student") {
    return { allowed: true, reason: null };
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a content filter that determines if a request should be allowed based on user role.
          
Current role: ${role}

For students, the following types of requests are PROHIBITED:
1. Writing essays, reports, or assignments for them
2. Directly solving homework problems without explanation
3. Creating content that would constitute academic dishonesty
4. Bypassing academic integrity checks
5. Writing code solutions for assignments without educational context

Analyze the user message and respond with:
- "ALLOWED" if the request is appropriate for the role
- "BLOCKED: [reason]" if the request should be rejected, including a brief explanation

Be permissive with general knowledge questions, explanations, and learning assistance.`,
        },
        { role: "user", content: message },
      ],
    });

    const response = completion.choices[0].message.content.trim();

    if (response.startsWith("ALLOWED")) {
      return { allowed: true, reason: null };
    } else if (response.startsWith("BLOCKED:")) {
      const reason = response.substring(8).trim();
      return { allowed: false, reason };
    } else {
      return { allowed: true, reason: null };
    }
  } catch (error) {
    console.error("Error in content filtering:", error);
    return { allowed: true, reason: null };
  }
}
