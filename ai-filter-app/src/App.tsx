import React, { useState } from "react";
import Form from "./components/Form";
import Response from "./components/Response";

const App: React.FC = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputSubmit = async (input: string) => {
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
      <Form onSubmit={handleInputSubmit} />
      <Response response={response} loading={loading} />
    </div>
  );
};

export default App;
