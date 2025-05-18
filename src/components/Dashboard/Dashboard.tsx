import { Settings } from './Settings';
import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

//Icons----------------------------------------------
import {
  ArrowRightOutlined,
} from "@ant-design/icons";
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import LogoutIcon from '@mui/icons-material/Logout';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

//Styles----------------------------------------------
import type { MenuProps } from "antd";
import Styles from "../imported/styles/profile";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';

//Components----------------------------------------------
import ConfigProvider from "antd/es/config-provider";
import Tooltip from "@mui/material/Tooltip";
import { Menu } from "antd";
import BackgroundImage from "../../assets/newbg2.svg";
import Overview from "./Overview";
import { RotateLoader } from "react-spinners";
import Restrictions from "./Restrictions";

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
    background: '#efeff1',
    surface: '#ffffff',
    surfaceAlt: '#fbfbfb',
    border: '#dddfe2',
    primary: '#0066ff',
    primaryLight: '#3385ff',
    primaryDark: '#0052cc',
    text: '#232629',
    textSecondary: '#5e646e',
  },
  dark: {
    background: '#1e2a32',
    surface: '#2d3b45',
    surfaceAlt: '#3d4c57',
    border: '#3d4c57',
    primary: '#e0edf3',
    primaryLight: '#e0edf3',
    primaryDark: '#a5b2b8',
    text: '#fbfbfb',
    textSecondary: '#d6d8dc',
  }
};

const Dashboard: React.FC<DashProps> = ({
  userPhotoURL,
  onClose,
}) => {
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
      handleTransition(() =>Navigate("/chat"));
    }
    else if (key === "1") {
      handleTransition(() => {
        setShowDashboard(true);
        setShowSettings(false);
        setShowRestrictions(false);
      });
    } else if (key === "2") {
      handleTransition(() => {
        setShowDashboard(false);
        setShowSettings(true);
        setShowRestrictions(false);
      });
    }
    else if (key === "restrictions") {
      handleTransition(() => {
        setShowDashboard(false);
        setShowSettings(false);
        setShowRestrictions(true);
      });
    }
  };

  const Navigate = useNavigate();

  const [showDashboard, setShowDashboard] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showRestrictions, setShowRestrictions] = useState(false);

  // Create theme based on darkMode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? colorPalette.dark.primary : colorPalette.light.primary,
      },
      background: {
        default: darkMode ? colorPalette.dark.background : colorPalette.light.background,
        paper: darkMode ? colorPalette.dark.surface : colorPalette.light.surface,
      },
      text: {
        primary: darkMode ? colorPalette.dark.text : colorPalette.light.text,
        secondary: darkMode ? colorPalette.dark.textSecondary : colorPalette.light.textSecondary,
      },
    },
  });

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  const items: MenuProps["items"] = [
    { 
      key: '1', 
      label: 'Dashboard', 
      icon: <DashboardIcon /> 
    },
    {
      key: 'restrictions',
      label: 'AI Restrictions',
      icon: <ToggleOnIcon />,
    },
    {
      key: 'studentlist',
      label: 'Registered Persons',
      icon: <FormatListNumberedIcon />,
    },
    { 
      key: '2', 
      label: 'Settings', 
      icon: <SettingsIcon /> 
    },
    {
      key: 'back',
      label: 'Back to ZaruAI',
      icon: <ArrowRightOutlined />,
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

  // Extracted styles
  const styles = {
    mainContainer: {
      display: "flex", 
      flexDirection: "row" as const, 
      alignItems: "center", 
      backgroundColor: colors.background,
      backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "100vw",
      height: "100vh",
      justifyContent: "stretch",
    },
    userInfoBar: {
      width: '12vw',
      height: '7vh',
      backgroundColor: colors.surface,
      borderRadius: '20px',
      display: "flex",
      flexDirection: "row" as const,
      alignItems: "center",
      justifyContent: "center",
      padding: "0.75rem",
      border: `2px solid ${colors.border}`,
      position: "absolute" as const,
      top: "1rem",
      right: "1rem",
      gap: "1rem",
    },
    userAvatar: {
      width: "2.5vw",
      height: "2.5vw",
      borderRadius: "50%",
    },
    icon: {
      fontSize: '1.5rem', 
      color: colors.textSecondary 
    },
    sidebar: {
      width: '15%', 
      height: '100%', 
      backgroundColor: '#fff',
      position: "relative" as const, 
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      overflowY: "auto" as const,
      fontFamily: "Poppins, sans-serif",
      borderBottomRightRadius: "30px",
      borderTopRightRadius: "30px",
      borderTop: `2px solid ${colors.border}`,
      borderRight: `2px solid ${colors.border}`,
      borderBottom: `2px solid ${colors.border}`,
    },
    logoContainer: {
      width: '75%',
      height: '7%',
      backgroundColor: '#fff',
      display: "flex",
      alignItems: "center",
      justifyContent: "left",
      gap: "0.6rem",
      fontSize: "22px",
      color: colors.text,
      fontWeight: "bold",
    },
    menu: {
      width: '92%', 
      height: "90%", 
      backgroundColor: 'transparent', 
      fontFamily: "Poppins, sans-serif",  
      fontSize: "16", 
      marginTop: "1.25rem",
      fontWeight: "500",
      borderBottomRightRadius: "30px", 
      borderRight: 'none', 
      color: colors.textSecondary,
    },
    logoutButton: {
      width: '92%',
      height: '5%',
      backgroundColor: '#fff',
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.6rem",
      fontSize: "16px",
      color: '#ff0000',
      fontWeight: "bold",
      fontFamily: "Poppins, sans-serif",
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
      position: "absolute" as const,
      bottom: "2vh",
      borderRadius: "10px",
    },
    periodContainer: {
      display: "flex",
      flexDirection: "row" as const,
      alignItems: "center",
      width: "80%",
      height: "80%",
      gap: "1rem",
      position: "relative" as const,
    },
    studentListPanel: {
      ...contentPanelStyle,
      width: "25%",
      height: "100%",
    },
    rightPanelsContainer: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      width: "50%",
      height: "100%",
      gap: "1rem",
    },
    halfHeightPanel: {
      ...contentPanelStyle,
      width: "100%",
      height: "50%",
    },
    panelTitle: {
      color: colors.primary,
      marginBottom: "1rem",
      fontFamily: "Poppins, sans-serif",
      fontSize: "1.5rem",
      position: "relative" as const,
    },
    studentButton: {
      color: colors.text,
      border: `2px solid ${colors.border}`,
      fontFamily: "Montserrat, sans-serif",
      fontSize: "1rem",
      width: "80%",
      height: "3vw",
      justifyContent: "space-evenly"
    }
  };

  const menuConfig = {
    theme: {
      components: {
        Menu: {
          itemSelectedBg: colors.primary,
          itemSelectedColor: '#fbfbfb',
          colorText: colors.textSecondary,
          itemHoverColor:'#fbfbfb',
          itemHoverBg: colors.primary,
          colorBgElevated: colors.surface,
          darkSubMenuItemBg: '#36434d',
          darkItemHoverBg: colors.surfaceAlt,
          darkItemSelectedBg: colors.surfaceAlt,
          darkItemSelectedColor: colors.text,
          darkItemHoverColor: colors.text,
          fontSize: 16,
          padding: 24,
          itemBorderRadius: 10,
          itemHeight: 48,
        },
        Button: {
          defaultHoverBg: colors.surface,
          defaultHoverColor: colors.text,
          defaultBg: colors.surfaceAlt,
          defaultColor: colors.text,
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={styles.mainContainer}>
        {/* User info and theme toggle bar */}
        <div style={styles.userInfoBar}>
          {/* Theme toggle button */}
          <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <IconButton 
              onClick={toggleTheme} 
              color="inherit" 
              style={{ color: colors.textSecondary }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          <NotificationsOutlinedIcon style={styles.icon} />

          <img
            src={userData.photoURL || ""}
            alt="User"
            style={styles.userAvatar}
          />  
        </div>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <RotateLoader color="#FFF8F8" />
        </Backdrop>

        {/* Sidebar */}
        <div style={styles.sidebar}>
          {/* Logo and title */}
          <div style={styles.logoContainer}>
            ZaruAI
          </div>

          {/* Menu */}
          <ConfigProvider theme={menuConfig.theme}>
            <Menu
              style={styles.menu}
              defaultSelectedKeys={['1']}
              mode="inline"
              items={items}
              onSelect={({ key }) => handleMenuClick(key)}
              theme={darkMode ? "dark" : "light"}
            />
          </ConfigProvider>

          {/* Logout button */}
          <div
            style={styles.logoutButton}
            onClick={() => {
              handleTransition(() => {
                auth.signOut();
                onClose();
                Navigate("/");
              });
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#ff0000";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#ff0000";
            }}
          >
            <LogoutIcon style={{ fontSize: '1.5rem' }} />
            Logout
          </div>
        </div>

        {/* Dashboard content */}
        {showDashboard && (
          <Overview contentPanelStyle={contentPanelStyle} colors={colors} Styles={{ title: Styles.title }} />
        )}

        {/* Settings content */}
        {showSettings && (
          <Settings contentPanelStyle={contentPanelStyle} colors={colors} />
        )}

        {/* Period content */}
        {showRestrictions && (
          <Restrictions colors={colors} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
