import React, { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import { IconButton, Divider } from "@mui/material";
import BurgerIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import BackgroundImage from "./assets/light_background.svg"; // Ensure this path is correct and the file exists

import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase/firebase";

// import BackgroundImage from "./assets/background1.svg";
import styles from "./components/imported/styles/login";
import Profile from "./components/Profile";
import SideBar from "./components/SideBar";
import Form from "./components/Form";
import Login from "./components/Login";
import LoadingAnimation from "./components/LoadingAnimation";

const App: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string>("default");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userPhotoURL, setUserPhotoURL] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setIsLoadingAuth(true);
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserRole(userData.role || "default");
            setUserPhotoURL(user.photoURL || null);
          } else {
            setUserRole("default");
            setUserPhotoURL(user.photoURL || null);
          }
        } catch (error) {
          setUserRole("default");
          setUserPhotoURL(user.photoURL || null);
        } finally {
          setIsLoggedIn(true);
        }
      } else {
        setIsLoggedIn(false);
        setUserRole("default");
        setUserPhotoURL(null);
        setMessages([]);
        setConversationArray([]);
        setCurrentConversationId(null);
      }
      setIsLoadingAuth(false);
      setLoading(false);
    });

    return () => {
      unsub();
    };
  }, []);

  const handleTransition = (action: () => void) => {
    setOpen(true); // Show backdrop
    setTimeout(() => {
      action(); // Execute the action after delay
      setOpen(false); // Hide backdrop
    }, 850); // Consistent delay
  };

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

  const handleLogin = (photoURL: string | null, role: string) => {
    setIsLoggedIn(true);
    setUserPhotoURL(photoURL);
    setUserRole(role);
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

  const [handleDrawer, setHandleDrawer] = useState(false);

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
          conv.id === currentConversationId
            ? { ...conv, messages: [...messages] }
            : conv
        )
      );
    }
  }, [messages, currentConversationId, conversationArray]);

  const loadConversation = (id: number) => {
    const conversation = conversationArray.find((conv) => conv.id === id);
    if (conversation) {
      setMessages(conversation.messages); // Load the selected conversation's messages
      setCurrentConversationId(id); // Set the current conversation ID
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
          <CircularProgress size={60} />
        </div>
      ) : !isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : showProfile ? (
        <Profile
          setLogin={setIsLoggedIn}
          userPhotoURL={userPhotoURL}
          onClose={() => setShowProfile(false)}
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
            <CircularProgress size={60} color="inherit" />
          </Backdrop>

          <div
            style={{
              height: "10vh",
              width: "100%",
              backgroundColor: "#fafcfd",
              display: "flex",
              alignItems: "center",
              padding: "0 2vw",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              borderBottom: "1px solid #d4e3ea",
            }}
          >
            <IconButton
              onClick={toggleDrawer}
              sx={{
                backgroundColor: "#e0edf3",
                transition: "background-color 0.3s ease",
                "&:hover": { backgroundColor: "#d4e3ea" },
                position: "relative",
                left: "-0.95vw",
                width: "2.5vw",
                height: "2.5vw",
                maxHeight: "3rem",
                maxWidth: "3rem",
                border: "2px solid #d4e3ea",
              }}
            >
              <BurgerIcon sx={{ color: "#4a98bd" }} />
            </IconButton>

            <div
              style={{
                backgroundColor: "#e0edf3",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                height: "80%",
                borderRadius: 50,
                padding: "0 1rem",
                zIndex: 1,
                position: "relative",
                left: "0vw",
                boxShadow: "3px 0px 4px rgba(0, 0, 0, 0)",
                border: "2px solid #d4e3ea",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    color: "#22c55e",
                    right: 0,
                    bottom: 0,
                  }}
                >
                  <div
                    style={{
                      width: "1rem",
                      height: "1rem",
                      backgroundColor: "#22c55e",
                      borderRadius: "50%",
                    }}
                  />
                </span>

                <img
                  src="/img/bot.jpg"
                  alt="bot-img"
                  style={{
                    width: "2.5vw",
                    height: "2.5vw",
                    maxWidth: "3rem",
                    maxHeight: "3rem",
                    borderRadius: "50%",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: "tight",
                }}
              >
                <div
                  style={{
                    fontSize: "1.15rem",
                    marginTop: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#397c9b",
                      marginRight: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    AI Assistant
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "0.775rem",
                    color: "#397c9b",
                    fontWeight: 600,
                    marginTop: "-0.15rem",
                  }}
                >
                  Always Online
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                right: "0vw",
                position: "absolute",
                padding: "0.5rem",
                width: "8vw",
                borderTopLeftRadius: 50,
                borderBottomLeftRadius: 50,
                backgroundColor: "#e0edf3",
                border: "2px solid #d4e3ea",
              }}
            >
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
                  }}
                />
              </button>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{
                  "& .MuiPaper-root": {
                    backgroundColor: "#e0edf3",
                    color: "#4a98bd",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  },
                  "& .MuiMenuItem-root": {
                    "&:hover": {
                      transition: "background-color 0.3s ease-in-out",
                      "&:hover": { backgroundColor: "#d4e3ea" },
                    },
                  },
                }}
              >
                <MenuItem
                  id="profile"
                  sx={{
                    ...styles.poppins,
                    fontSize: 15,
                    borderRadius: 2,
                    color: "#4a98bd",
                    gap: 0.8,
                  }}
                  onClick={() => {
                    handleMenuClose();
                    handleTransition(() => setShowProfile(true));
                  }}
                >
                  <PersonIcon fontSize="large" />
                  Profile
                </MenuItem>
                <MenuItem
                  id="settings"
                  sx={{
                    ...styles.poppins,
                    fontSize: 15,
                    borderRadius: 2,
                    color: "#4a98bd",
                    gap: 0.8,
                  }}
                  onClick={() => {
                    handleMenuClose();
                    handleTransition(() => console.log("Settings clicked"));
                  }}
                >
                  <SettingsIcon fontSize="large" />
                  Settings
                </MenuItem>
                {userRole === "admin" && (
                  <MenuItem
                    sx={{
                      ...styles.poppins,
                      fontSize: 15,
                      borderRadius: 2,
                      color: "#4a98bd",
                      gap: 0.8,
                    }}
                    onClick={() => {
                      handleMenuClose();
                      handleTransition(() =>
                        console.log("Admin Dashboard clicked")
                      );
                    }}
                  >
                    <DashboardIcon fontSize="large" />
                    Admin Dashboard
                  </MenuItem>
                )}
                <Divider sx={{ my: 1, bgcolor: "#e0e0e0" }} />
                <MenuItem
                  id="logout"
                  sx={{
                    ...styles.poppins,
                    fontSize: 15,
                    borderRadius: 2,
                    color: "#F7374F",
                    gap: 0.8,
                  }}
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <LogoutIcon fontSize="large" />
                  Log Out
                </MenuItem>
              </Menu>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1.5vw",
              paddingTop: "1vh",
              paddingBottom: "15vh",
              gap: "1rem",
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
                {msg.sender === "user" && (
                  <img
                    src={userPhotoURL || "/img/user.png"}
                    alt="My profile"
                    style={{
                      width: "4vw",
                      height: "4vw",
                      maxWidth: "2.5rem",
                      maxHeight: "2.5rem",
                      borderRadius: "50%",
                      order: 2,
                    }}
                  />
                )}
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

          <Form onSubmit={handleInputSubmit} />
        </>
      )}
    </div>
  );
};

export default App;
