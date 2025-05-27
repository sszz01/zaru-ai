export async function generateTitle(message: string): Promise<string> {
  try {
    const res = await fetch("http://localhost:5001/api/title", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    return data.title || "New Conversation";
  } catch (error) {
    console.error("Title generation error:", error);
    return "New Conversation";
  }
}
