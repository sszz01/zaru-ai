import React, { useState, useEffect, useRef } from "react";
import Form from "./components/Form";
import Login from "./components/Login";
import LoadingAnimation from "./components/LoadingAnimation";
import DOMPurify from "dompurify";
import { IconButton } from "@mui/material";
import BurgerIcon from "@mui/icons-material/Menu";
import SideBar from "./components/SideBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styles from "./components/imported/styles/login";

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
  const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);

  const addConversation = () => {
    // Clear the messages to start a blank discussion
    setMessages([]);
    setCurrentConversationId(null); // Reset the current conversation ID
  };

  useEffect(() => {

    if (messages.length === 1 && currentConversationId === null) {
      const newConversation = {
        id: conversationArray.length + 1,
        name: "Conversation " + (conversationArray.length + 1),
        messages: [...messages],
      };
      setConversationArray([...conversationArray, newConversation]);
      setCurrentConversationId(newConversation.id); 
    } else if (currentConversationId !== null) {

      setConversationArray((prev) =>
        prev.map((conv) =>
          conv.id === currentConversationId ? { ...conv, messages: [...messages] } : conv
        )
      );
    }
  }, [messages, currentConversationId]);

  const loadConversation = (id: number) => {
    const conversation = conversationArray.find((conv) => conv.id === id);
    if (conversation) {
      setMessages(conversation.messages); // Load the selected conversation's messages
      setCurrentConversationId(id); // Set the current conversation ID
      console.log("Loaded conversation:", conversation);
    }
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", background: "#e0edf3", }}> 
      {isLoggedIn ? (
        <>
        
        <SideBar
            toggleDrawer={toggleDrawer}
            handleDrawer={handleDrawer}
            conversationArray={conversationArray}
            loadConversation={loadConversation} 
            addConversation={addConversation}
          />

          <div style= {{ height: "5rem ", width: "100%", backgroundColor: "#4a98bd", display: "flex", alignItems: "center", padding: "0 1rem", }}>

            <div style={{ backgroundColor: '#fafcfd', display: "flex", alignItems: "center", gap: "1rem", height: "80%", borderRadius:50, padding: "0 1rem", zIndex: 1, boxShadow: "3px 0px 4px rgba(0, 0, 0, 0)", border: "2px solid #d4e3ea" }}>

                <IconButton
                  onClick={toggleDrawer}
                  sx={{
                    backgroundColor: "#397c9b",
                    transition: "background-color 0.3s ease",
                    "&:hover": { backgroundColor: "#4a98bd" },
                  }}
                >
                  <BurgerIcon sx={{ color: "#e0edf3" }} />
                </IconButton>

                <div style={{ height: "65%", width: "3.5px", borderRadius:50, backgroundColor: "#397c9b", }} />
              
                <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "1rem" }}>

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

                    <span style={{ color: "#397c9b", marginRight: "0.75rem", fontWeight: 600, fontSize: "1.25rem" }}>
                      AI Assistant
                    </span>
                  </div>
                  
                  <span style={{ fontSize: "0.875rem", color: "#397c9b" }}>
                    Always Online
                  </span>
                </div>

              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", height: "80%", position:'relative', left:'-4rem', zIndex: 0, padding: "0 3rem", borderRadius:50, backgroundColor: '#e0edf3' }}>
                <button style={{ cursor: "pointer", position: "relative", right: -30 }} onClick={openMenu}>
                  <img
                    src={userPhotoURL || "/img/user.png"}
                    alt="My profile"
                    className="w-10 h-10 rounded-full order-2"
                  />
                </button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  sx={{
                    "& .MuiPaper-root": {
                      backgroundColor: "#4a98bd",
                      color: "#e0edf3",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    },
                    "& .MuiMenuItem-root": {
                      "&:hover": {
                        transition: "background-color 0.3s ease-in-out",
                        "&:hover": { backgroundColor: "#42738a" },
                      },
                    },
                  }}
                >
                  <MenuItem sx={{...styles.poppins, fontSize:16, borderRadius: 2}} onClick={handleMenuClose}>Profile</MenuItem>
                  <MenuItem sx={{...styles.poppins, fontSize:16, borderRadius: 2}} onClick={handleMenuClose}>Settings</MenuItem>
                  <MenuItem sx={{...styles.poppins, fontSize:16, borderRadius: 2}} onClick={() => {
                    handleMenuClose();
                    setIsLoggedIn(false);
                  }}>Logout</MenuItem>
                </Menu>
              </div>
          </div>

          <div
            style={{ flex: 1, overflowY: "auto", padding: "1.5rem", paddingTop: "1rem", paddingBottom: "1rem", gap: "1rem" }}
            id="messages"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  marginBottom: "1rem",
                  fontWeight: "500",
                  transition: "all 0.5s ease-in-out",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.sender !== "user" && (
                  <img
                    src="/img/bot.jpg"
                    alt="Assistant"
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                      order: 1,
                    }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                    maxWidth: "calc(100% - 4rem)",
                    margin: "0 1rem",
                    order: msg.sender === "user" ? 1 : 2,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: msg.sender === "user" ? "#4a98bd" : "#f7fafc",
                      color: msg.sender === "user" ? "#e0edf3" : "#42738a",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem 0 0.5rem 0",
                      overflowWrap: "break-word",
                      border: "2px solid #d4e3ea",
                    }}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                </div>
                {msg.sender === "user" && (
                  <img
                    src={userPhotoURL || "/img/user.png"}
                    alt="My profile"
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                      order: 2,
                    }}
                  />
                )}
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", alignItems: "flex-end", marginBottom: "1rem" }}>
                <img
                  src="/img/bot.jpg"
                  alt="Assistant"
                  style={{ width: "2rem", height: "2rem", borderRadius: "50%", }}
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
