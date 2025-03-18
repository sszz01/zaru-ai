import React, { useState } from "react";
import Form from "./components/Form";
import "./App.css";

const App: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const handleInputSubmit = async (input: string) => {
    setLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: "user" },
    ]);

    try {
      const res = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response, sender: "bot" },
      ]);
    } catch {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error, please try again.", sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="loading">Loading...</div>}
      </div>
      <Form onSubmit={handleInputSubmit} />
    </div>
  );
};

export default App;
