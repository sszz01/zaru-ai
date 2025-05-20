import React, { useState, useEffect } from "react";
import { RotateLoader } from "react-spinners";
import Backdrop from "@mui/material/Backdrop";
import { auth } from "../../../backend/db/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../backend/db/firebase/firebase";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
  ArrowRightOutlined,
  RightOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import Styles from "../styles/profile";
import ConfigProvider from "antd/es/config-provider";
import Logo from "../../assets/templogo.svg";
import Button from "antd/es/button";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Dark mode icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Light mode icon
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

interface DashProps {
  setLogin: (isLoggedIn: boolean) => void;
  userPhotoURL: string | null;
  onClose: () => void;
}

interface UserData {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

// Color palette based on existing colors
const colorPalette = {
  light: {
    background: "#e0edf3",
    surface: "#fafcfd",
    surfaceAlt: "#eaf2f5",
    border: "#d4e3ea",
    primary: "#42738a",
    primaryLight: "#4a98bd",
    primaryDark: "#2b5e76",
    text: "#192b34",
    textSecondary: "#70818a",
  },
  dark: {
    background: "#1e2a32",
    surface: "#2d3b45",
    surfaceAlt: "#3d4c57",
    border: "#3d4c57",
    primary: "#e0edf3",
    primaryLight: "#e0edf3",
    primaryDark: "#a5b2b8",
    text: "#e0edf3",
    textSecondary: "#a5b2b8",
  },
};

const Dashboard: React.FC<DashProps> = ({ userPhotoURL, onClose }) => {
  const [userData, setUserData] = useState<UserData>({
    displayName: null,
    email: null,
    photoURL: userPhotoURL,
  });

  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Get current theme colors
  const colors = darkMode ? colorPalette.dark : colorPalette.light;

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // First try to get data from Firebase Auth
        const basicUserData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL || userPhotoURL,
        };

        setUserData(basicUserData);

        // Then try to get additional data from Firestore if available
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const firestoreData = userDoc.data();
            setUserData((prevData) => ({
              ...prevData,
              ...firestoreData,
              photoURL: prevData.photoURL || firestoreData.photoURL,
            }));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [userPhotoURL]);

  const [open, setOpen] = useState(false);
  const handleTransition = (action: () => void) => {
    setOpen(true); // Show backdrop
    setTimeout(() => {
      action(); // Execute the action after delay
      setOpen(false); // Hide backdrop
    }, 850); // Consistent delay
  };

  const handleMenuClick = (key: string) => {
    if (key === "logout") {
      handleTransition(() => {
        auth.signOut();
        onClose();
        Navigate("/");
      });
    } else if (key === "back") {
      handleTransition(onClose);
      Navigate("/chat");
    } else if (key === "1") {
      handleTransition(() => {
        setShowDashboard(true);
        setShowSettings(false);
        setShowPeriod(false);
      });
    } else if (key === "2") {
      handleTransition(() => {
        setShowDashboard(false);
        setShowSettings(true);
        setShowPeriod(false);
      });
    } else if (key === "p1" || key === "p2") {
      handleTransition(() => {
        setShowPeriod(true);
        setShowDashboard(false);
        setShowSettings(false);
      });
    }
  };

  const Navigate = useNavigate();

  const [showDashboard, setShowDashboard] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showPeriod, setShowPeriod] = useState(false);

  // Create theme based on darkMode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? colorPalette.dark.primary : colorPalette.light.primary,
      },
      background: {
        default: darkMode
          ? colorPalette.dark.background
          : colorPalette.light.background,
        paper: darkMode
          ? colorPalette.dark.surface
          : colorPalette.light.surface,
      },
      text: {
        primary: darkMode ? colorPalette.dark.text : colorPalette.light.text,
        secondary: darkMode
          ? colorPalette.dark.textSecondary
          : colorPalette.light.textSecondary,
      },
    },
  });

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const items: MenuProps["items"] = [
    {
      key: "sub1",
      label: "Profile",
      type: "group",
      children: [
        { key: "1", label: "Dashboard", icon: <AppstoreOutlined /> },
        { key: "2", label: "Settings", icon: <SettingOutlined /> },
      ],
    },
    {
      key: "sub2",
      label: "Your Classes",
      style: { font: colors.primary },
      children: [
        {
          key: "g1",
          label: "Odd",
          type: "group",
          children: [
            { key: "p1", label: "Period 1" },
            { key: "p3", label: "Period 3" },
          ],
        },
        {
          key: "g2",
          label: "Even",
          type: "group",
          children: [
            { key: "p2", label: "Period 2" },
            { key: "p4", label: "Period 4" },
          ],
        },
      ],
    },
    {
      key: "back",
      label: "Back to ZaruAI",
      icon: <ArrowRightOutlined />,
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  // Common styles for content panels
  const contentPanelStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "1rem",
    borderRadius: 20,
    padding: "1rem",
    backgroundColor: colors.surface,
    border: `2px solid ${colors.border}`,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.background,
          width: "100vw",
          height: "100vh",
          justifyContent: "stretch",
        }}
      >
        {/* User info and theme toggle bar */}
        <div
          style={{
            width: "12vw",
            height: "7vh",
            backgroundColor: colors.surface,
            borderRadius: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.75rem",
            border: `2px solid ${colors.border}`,
            position: "absolute",
            top: "1rem",
            right: "1rem",
            gap: "1rem",
          }}
        >
          {/* Theme toggle button */}
          <Tooltip
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <IconButton
              onClick={toggleTheme}
              color="inherit"
              style={{ color: colors.textSecondary }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          <NotificationsOutlinedIcon
            style={{
              fontSize: "1.5rem",
              color: colors.textSecondary,
            }}
          />

          <img
            src={userData.photoURL || ""}
            alt="User"
            style={{
              width: "2.5vw",
              height: "2.5vw",
              borderRadius: "50%",
            }}
          />
        </div>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <RotateLoader color="#FFF8F8" />
        </Backdrop>

        {/* Sidebar */}
        <div
          style={{
            width: "15%",
            height: "100%",
            backgroundColor: colors.surface,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflowY: "auto",
            fontFamily: "Montserrat, sans-serif",
            borderBottomRightRadius: "30px",
            borderTopRightRadius: "30px",
            borderTop: `2px solid ${colors.border}`,
            borderRight: `2px solid ${colors.border}`,
            borderBottom: `2px solid ${colors.border}`,
          }}
        >
          {/* Logo and title */}
          <div
            style={{
              width: "100%",
              height: "7%",
              backgroundColor: colors.surface,
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              gap: "0.6rem",
              fontSize: "22px",
              color: colors.primary,
            }}
          >
            <div
              style={{
                width: "2.5vw",
                height: "2.5vw",
                borderRadius: "50%",
                objectFit: "cover",
                backgroundImage: `url(${Logo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginLeft: "1rem",
              }}
            />
            ZaruAI
          </div>

          {/* Menu */}
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemSelectedBg: colors.surfaceAlt,
                  itemSelectedColor: colors.text,
                  colorText: colors.text,
                  itemHoverColor: colors.text,
                  itemHoverBg: colors.surfaceAlt,
                  colorBgElevated: colors.surface,
                  darkSubMenuItemBg: "#36434d",
                  darkItemHoverBg: colors.surfaceAlt,
                  darkItemSelectedBg: colors.surfaceAlt,
                  darkItemSelectedColor: colors.text,
                  darkItemHoverColor: colors.text,
                },
              },
            }}
          >
            <Menu
              style={{
                width: "100%",
                height: "93%",
                backgroundColor: "transparent",
                position: "absolute",
                bottom: 0,
                left: 0,
                fontFamily: "Montserrat, sans-serif",
                fontSize: "14",
                borderBottomRightRadius: "30px",
                borderRight: "none",
                borderTop: `2px solid ${colors.border}`,
                color: colors.text,
              }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub2"]}
              mode="inline"
              items={items}
              onSelect={({ key }) => handleMenuClick(key)}
              theme={darkMode ? "dark" : "light"}
            />
          </ConfigProvider>
        </div>

        {/* Dashboard content */}
        {showDashboard && (
          <div
            style={{
              ...contentPanelStyle,
              width: "60%",
              height: "60%",
              justifyContent: "center",
            }}
            id="dashboard"
          >
            <div
              style={{
                ...Styles.title,
                position: "relative",
                top: "-3vh",
                left: 0,
                textAlign: "center",
                fontSize: "1.75rem",
                fontFamily: "Montserrat, sans-serif",
                color: colors.primary,
              }}
            >
              Profile Dashboard
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "80%",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ ...Styles.label, color: colors.primary }}>
                  Name
                </label>
                <div
                  style={{
                    ...Styles.userInfo,
                    fontFamily: "Montserrat, sans-serif",
                    backgroundColor: colors.surfaceAlt,
                    color: colors.text,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  {userData.displayName || "No name provided"}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ ...Styles.label, color: colors.primary }}>
                  Email
                </label>
                <div
                  style={{
                    ...Styles.userInfo,
                    fontFamily: "Montserrat, sans-serif",
                    backgroundColor: colors.surfaceAlt,
                    color: colors.text,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  {userData.email || "No email provided"}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings content */}
        {showSettings && (
          <div
            style={{
              ...contentPanelStyle,
              width: "80%",
              height: "80%",
            }}
            id="dashboard"
          >
            <h2
              style={{
                color: colors.primary,
                marginBottom: "1rem",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "1.5rem",
              }}
            >
              Coming Soon...
            </h2>
          </div>
        )}

        {/* Period content */}
        {showPeriod && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "80%",
              height: "80%",
              gap: "1rem",
              position: "relative",
            }}
          >
            {/* Student list panel */}
            <div
              style={{
                ...contentPanelStyle,
                width: "25%",
                height: "100%",
              }}
            >
              <h2
                style={{
                  color: colors.primary,
                  marginBottom: "1rem",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1.5rem",
                  position: "relative",
                }}
              >
                Student List
              </h2>

              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      defaultHoverBg: colors.surface,
                      defaultHoverColor: colors.text,
                      defaultBg: colors.surfaceAlt,
                      defaultColor: colors.text,
                    },
                  },
                }}
              >
                <Button
                  type="text"
                  block
                  style={{
                    color: colors.text,
                    border: `2px solid ${colors.border}`,
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "1rem",
                    width: "80%",
                    height: "3vw",
                    justifyContent: "space-evenly",
                  }}
                >
                  James Totaro
                  <RightOutlined />
                </Button>
              </ConfigProvider>
            </div>

            {/* Right side panels */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "50%",
                height: "100%",
                gap: "1rem",
              }}
            >
              {/* AI Summary panel */}
              <div
                style={{
                  ...contentPanelStyle,
                  width: "100%",
                  height: "50%",
                }}
              >
                <h2
                  style={{
                    color: colors.primary,
                    marginBottom: "1rem",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "1.5rem",
                  }}
                >
                  AI Summary
                </h2>
              </div>

              {/* Rules panel */}
              <div
                style={{
                  ...contentPanelStyle,
                  width: "100%",
                  height: "50%",
                }}
              >
                <h2
                  style={{
                    color: colors.primary,
                    marginBottom: "1rem",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "1.5rem",
                  }}
                >
                  Student Warnings
                </h2>
              </div>
            </div>

            <div
              style={{
                ...contentPanelStyle,
                width: "25%",
                height: "100%",
              }}
            >
              <h2
                style={{
                  color: colors.primary,
                  marginBottom: "1rem",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1.5rem",
                  position: "relative",
                }}
              >
                AI Rules
              </h2>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
