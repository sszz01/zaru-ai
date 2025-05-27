import { openai } from "./keygen";

export async function needsWebSearch(message) {
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
