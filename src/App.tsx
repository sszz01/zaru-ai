import React, { useState, useEffect, useRef } from "react";
import Form from "./components/Form";
import Login from "./components/Login";
import LoadingAnimation from "./components/LoadingAnimation";
import DOMPurify from "dompurify";
import { IconButton } from "@mui/material";
import BurgerIcon from "@mui/icons-material/Menu";
import SideBar from "./components/SideBar";

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

  const [handleDrawer, setHandleDrawer] = useState(false);

  const toggleDrawer = () => {
    setHandleDrawer((prev) => !prev);
  };

  const [conversationArray, setConversationArray] = useState<
    { id: number; name: string; messages: { text: string; sender: string }[] }[]
  >([]);

  const addConversation = () => {
    if (messages.length === 0) {
      alert("No messages to save as a conversation.");
      return;
    }

    const newConversation = {
      id: conversationArray.length + 1,
      name: `Conversation ${conversationArray.length + 1}`,
      messages: [...messages], // Save the current messages array
    };

    setConversationArray([...conversationArray, newConversation]);
    setMessages([]); // Optionally clear the current messages array
  };

  const loadConversation = (id: number) => {
    const conversation = conversationArray.find((conv) => conv.id === id);
    if (conversation) {
      setMessages(conversation.messages);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {isLoggedIn ? (
        <>
        
        <SideBar
            toggleDrawer={toggleDrawer}
            handleDrawer={handleDrawer}
            conversationArray={conversationArray}
            loadConversation={loadConversation} 
            addConversation={addConversation}
          />

          <div className="flex items-center justify-between py-3 border-b-2 border-gray-200 bg-white shadow-md px-6">

            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "1rem" }}>

                <IconButton
                  onClick={toggleDrawer}
                  sx={{
                    position: "absolute",
                    left: -11.5,
                    backgroundColor: "#d9d9d9",
                    transition: "background-color 0.3s ease",
                    "&:hover": { backgroundColor: "#b3b3b3" },
                  }}
                >
                  <BurgerIcon />
                </IconButton>

                <div style={{ height: "75%", width: "3px", borderRadius:50, backgroundColor: "lightgrey", position: "absolute", left: 40 }} />
              
                <div style={{ position: "relative", marginLeft: '3.6rem' }}>

                  <span style={{ position: "absolute", color: "#22c55e", right: 0, bottom: 0 }}>
                    <div style={{ width: "1rem", height: "1rem", backgroundColor: "#22c55e", borderRadius: "50%" }}/>
                  </span>

                  <img
                    src="/img/bot.jpg"
                    alt="bot-img"
                    style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", lineHeight: "tight" }}>

                  <div style={{ fontSize: "1.25rem", marginTop: "0.25rem", display: "flex", alignItems: "center" }}>

                    <span style={{ color: "#4b5563", marginRight: "0.75rem", fontWeight: 600, fontSize: "1.25rem" }}>
                      AI Assistant
                    </span>
                  </div>
                  
                  <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                    Always Online
                  </span>
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
