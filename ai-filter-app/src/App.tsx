import React, { useState } from "react";

const App: React.FC = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch {
      setResponse("Error, please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="centered-container">
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          style={{ padding: "10px", textAlign: "center" }}
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "10px" }}>
          Submit
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {response && (
        <p>
          <strong>Response:</strong> {response}
        </p>
      )}
    </div>
  );
};

export default App;
