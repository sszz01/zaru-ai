import { Burger } from "../layout/Burger";
import React, { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import Backdrop from "@mui/material/Backdrop";

import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import BackgroundImage from "../../assets/newbg2.svg";
import BurgerIcon from "../../assets/burgericon.svg";

import { signOut } from "firebase/auth";
import { auth } from "../../../backend/db/firebase/firebase";

import styles from "../styles/login";
import Profile from "../layout/Profile";
import SideBar from "../layout/SideBar";
import Form from "./Form";
import LoadingAnimation from "../ui/LoadingAnimation";
import { RotateLoader } from "react-spinners";
import { Dropdown } from "../layout/Dropdown";
import Dashboard from "../layout/Dashboard/Dashboard";
import { useNavigate, Navigate } from "react-router-dom";

interface ChatPageProps {
  isLoggedIn: boolean;
  isLoadingAuth: boolean;
  userPhotoURL: string | null;
  userRole: string;
  onLogin: (photoURL: string | null, role: string) => void;
}

const ChatPage: React.FC<ChatPageProps> = ({
  isLoggedIn,
  isLoadingAuth,
  userPhotoURL,
  userRole,
}) => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [open, setOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleTransition = (action: () => void) => {
    setOpen(true);
    setTimeout(() => {
      action();
      setOpen(false);
    }, 850);
  };

  React.useEffect(() => {
      console.log('User role:', userRole);
      // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputSubmit = async (input: string) => {
    setLoading(true);

    if (currentConversationId === null) {
      const newId = conversationArray.length + 1;
      setCurrentConversationId(newId);
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: "user" },
    ]);

    try {
      const res = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          userRole: userRole,
        }),
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

  const handleLogout = () => {
    handleMenuClose();
    handleTransition(async () => {
      try {
        await signOut(auth);
        console.log("Firebase signOut successful.");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    });
  };

  const [handleDrawer, setHandleDrawer] = useState(true);

  const toggleDrawer = () => {
    setHandleDrawer((prev) => !prev);
  };

  const [conversationArray, setConversationArray] = useState<
    { id: number; name: string; messages: { text: string; sender: string }[] }[]
  >([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    number | null
  >(null);

  const addConversation = () => {
    setMessages([]);
    setCurrentConversationId(null);
  };

  useEffect(() => {
    if (currentConversationId !== null && messages.length > 0) {
      const conversationExistsInArray = conversationArray.some(
        (conv) => conv.id === currentConversationId
      );

      if (!conversationExistsInArray) {
        const newConversation = {
          id: currentConversationId,
          name: `Conversation ${currentConversationId}`,
          messages: [...messages],
        };
        setConversationArray((prevArray) => [...prevArray, newConversation]);
      } else {
        setConversationArray((prevArray) =>
          prevArray.map((conv) =>
            conv.id === currentConversationId
              ? { ...conv, messages: [...messages] }
              : conv
          )
        );
      }
    }
  }, [messages, currentConversationId]);

  const loadConversation = (id: number) => {
    const conversation = conversationArray.find((conv) => conv.id === id);
    if (conversation) {
      setMessages(conversation.messages);
      setCurrentConversationId(id);
      console.log("Loaded conversation:", conversation);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {isLoadingAuth ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <RotateLoader color="#999999" />
        </div>
      ) : !isLoggedIn ? (
        <Navigate to="/" replace />
      ) : showProfile ? (
        <Profile
          setLogin={() => {}}
          userPhotoURL={userPhotoURL}
          onClose={() => setShowProfile(false)}
        />
      ) : showDashboard ? (
        <Dashboard
          setLogin={() => {}}
          userPhotoURL={userPhotoURL}
          onClose={() => setShowDashboard(false)}
        />
      ) : (
        <>
          <SideBar
            toggleDrawer={toggleDrawer}
            handleDrawer={handleDrawer}
            conversationArray={conversationArray}
            loadConversation={loadConversation}
            addConversation={addConversation}
          />

          <Backdrop
            sx={(theme) => ({
              color: "#fff",
              zIndex: theme.zIndex.drawer + 1,
            })}
            open={open}
          >
            <RotateLoader color="#FFF8F8" />
          </Backdrop>

          <div
            style={{
              height: "10vh",
              width: "100%",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              padding: "0 2vw",
              overflow: "hidden",
              position: "absolute",
              top: "0",
              left: "0",
            }}
          >
            <Burger toggleDrawer={toggleDrawer} BurgerIcon={BurgerIcon} />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                right: "-1vw",
                position: "absolute",
                padding: "0.5rem",
                width: "8vw",
                borderTopLeftRadius: 50,
                borderBottomLeftRadius: 50,
                backgroundColor: "transparent",
              }}
            >
              <DownOutlined
                style={{
                  fontSize: "0.8rem",
                  color: "#848b95",
                  marginRight: "-0.25rem",
                  cursor: "pointer",
                }}
                onClick={openMenu}
              />
              <button
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={openMenu}
              >
                <img
                  src={userPhotoURL || "/img/user.png"}
                  alt="My profile"
                  style={{
                    width: "2.5vw",
                    height: "2.5vw",
                    maxWidth: "3rem",
                    maxHeight: "3rem",
                    borderRadius: "50%",
                    zIndex: "1000",
                  }}
                />
              </button>

              <Dropdown 
                anchorEl={anchorEl} 
                open={Boolean(anchorEl)}
                handleMenuClose={handleMenuClose} 
                handleTransition={handleTransition} 
                navigate={navigate} 
                userRole={userRole} 
                styles={styles}
                handleLogout={handleLogout}  
              />
            </div>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              padding: "5vw",
              paddingRight: "15.5vw",
              paddingLeft: "15.5vw",
              paddingTop: "8vh",
              paddingBottom: "0vh",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              gap: "1rem",
              height: "100%",
              transition: "margin-left 0.3s cubic-bezier(0.4,0,0.2,1)",
              marginLeft: handleDrawer ? "12vw" : "0", // Adjust 18vw to your drawer width
            }}
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
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.sender !== "user" && (
                  <img
                    src="/img/bot.jpg"
                    alt="Assistant"
                    style={{
                      width: "4vw",
                      height: "4vw",
                      maxWidth: "2.5rem",
                      maxHeight: "2.5rem",
                      borderRadius: "50%",
                      order: 1,
                    }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems:
                      msg.sender === "user" ? "flex-end" : "flex-start",
                    maxWidth: "70vw",
                    margin: "0 1rem",
                    order: msg.sender === "user" ? 1 : 2,
                  }}
                >
                  <div
                    style={{
                      backgroundColor:
                        msg.sender === "user" ? "#4a98bd" : "#f7fafc",
                      color: msg.sender === "user" ? "#e0edf3" : "#42738a",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem 0 0.5rem 0",
                      overflowWrap: "break-word",
                      border: "2px solid #d4e3ea",
                    }}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                </div>
              </div>
            ))}
            {loading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src="/img/bot.jpg"
                  alt="Assistant"
                  style={{
                    width: "4vw",
                    height: "4vw",
                    maxWidth: "2.5rem",
                    maxHeight: "2.5rem",
                    borderRadius: "50%",
                  }}
                />
                <LoadingAnimation />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <Form
            onSubmit={handleInputSubmit}
            drawer={handleDrawer}
            conversationId={currentConversationId}
          />
        </>
      )}
    </div>
  );
};

export default ChatPage;
