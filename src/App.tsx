import React, { useState, useEffect, useRef } from "react";
import Form from "./components/Form";
import Login from "./components/Login";
import LoadingAnimation from "./components/LoadingAnimation";
import DOMPurify from "dompurify";

const App: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userPhotoURL, setUserPhotoURL] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      const sanitizedResponse = DOMPurify.sanitize(data.response);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "", sender: "bot" },
      ]);

      let i = 0;
      const typeText = () => {
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          const lastIndex = newMessages.length - 1;

          if (
            sanitizedResponse &&
            i < sanitizedResponse.length &&
            newMessages[lastIndex]?.sender === "bot"
          ) {
            newMessages[lastIndex] = {
              ...newMessages[lastIndex],
              text: sanitizedResponse.slice(0, i + 1),
            };
            i++;
            setTimeout(typeText, Math.random() * (120 - 80) + 80);
          }
          return newMessages;
        });
      };

      requestAnimationFrame(typeText);
    } catch {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Request failed. Is your backend server running?",
          sender: "bot",
        },
      ]);
    }

    setLoading(false);
  };

  const handleLogin = (photoURL: string | null) => {
    setIsLoggedIn(true);
    setUserPhotoURL(photoURL);
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {isLoggedIn ? (
        <>
          <div className="flex items-center justify-between py-3 border-b-2 border-gray-200 bg-white shadow-md px-6">
            <div className="relative flex items-center space-x-4">
              <div className="relative">
                <span className="absolute text-green-500 right-0 bottom-0">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </span>
                <img
                  src="/img/bot.jpg"
                  alt="bot-img"
                  className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <div className="text-2xl mt-1 flex items-center">
                  <span className="text-gray-700 mr-3 font-semibold text-xl">
                    AI Assistant
                  </span>
                </div>
                <span className="text-sm text-gray-600">Always Online</span>
              </div>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
            id="messages"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end mb-4 transition-all duration-500 ease-in-out ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender !== "user" && (
                  <img
                    src="/img/bot.jpg"
                    alt="Assistant"
                    className="w-8 h-8 rounded-full order-1"
                  />
                )}
                <div
                  className={`flex flex-col space-y-2 text-sm max-w-xs mx-2 ${
                    msg.sender === "user"
                      ? "order-1 items-end"
                      : "order-2 items-start"
                  }`}
                >
                  <div
                    className={`${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-300 text-gray-600 rounded-bl-none"
                    } px-4 py-2 rounded-lg inline-block transition-all duration-200 ease-in-out shadow-md`}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                </div>
                {msg.sender === "user" && (
                  <img
                    src={userPhotoURL || "/img/user.png"}
                    alt="My profile"
                    className="w-8 h-8 rounded-full order-2"
                  />
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-end mb-4">
                <img
                  src="/img/bot.jpg"
                  alt="Assistant"
                  className="w-8 h-8 rounded-full"
                />
                <LoadingAnimation />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <Form onSubmit={handleInputSubmit} />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
