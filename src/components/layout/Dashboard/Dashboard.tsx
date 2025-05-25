import { DashSide } from './DashSide';
import { Settings } from './Settings';
import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import { auth, db } from "../../../../backend/db/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

//Icons----------------------------------------------
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

//Styles----------------------------------------------
import { colorPalette, getBaseStyles, getMenuConfig, } from "./DashStyles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';

//Components----------------------------------------------
import Tooltip from "@mui/material/Tooltip";
import Overview from "./MetricsPage/Overview";
import { RotateLoader } from "react-spinners";
import Restrictions from "./RestrictionsPage/Restrictions";

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

const Dashboard: React.FC<DashProps> = ({ userPhotoURL, onClose }) => {

  const [userData, setUserData] = useState<UserData>({
    displayName: null,
    email: null,
    photoURL: userPhotoURL,
  });

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

  const [darkMode, setDarkMode] = useState(false);
  const colors = darkMode ? colorPalette.dark : colorPalette.light;
  const toggleTheme = () => setDarkMode((prev) => !prev);

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

  // Dynamic theme and styles
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: colors.primary },
      background: {
        default: colors.background,
        paper: colors.surface,
      },
      text: {
        primary: colors.text,
        secondary: colors.textSecondary,
      },
    },
  });
  const styles = getBaseStyles(colors);
  const menuConfig = getMenuConfig(colors);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <div style={styles.mainContainer}>

      {/* Transition Backdrop */}
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <RotateLoader color="#FFF8F8" />
          </Backdrop>

      {/* Top Right Nav */}
          <div style={styles.userInfoBar}>

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

    {/* Sidebar */}
        <DashSide
          handleMenuClick={handleMenuClick}
          darkMode={darkMode}
          handleTransition={handleTransition}
          onClose={onClose}
          Navigate={Navigate}
          styles={styles}
          menuConfig={menuConfig}
        />

    {/* Dashboard content */}
        {showDashboard && (
          <Overview colors={colors} />
        )}

    {/* Settings content */}
        {showSettings && (
          <Settings contentPanelStyle={contentPanelStyle} colors={colors} />
        )}

    {/* Restrictions content */}
        {showRestrictions && (
          <Restrictions colors={colors} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
