import React, { useState, useEffect } from "react";
import { RotateLoader } from "react-spinners";
import Backdrop from "@mui/material/Backdrop";
import { auth } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Menu } from "antd";
import { AppstoreOutlined, SettingOutlined, LogoutOutlined, ProfileOutlined, ArrowRightOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Styles from "./imported/styles/profile";

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

const Dashboard: React.FC<DashProps> = ({
  userPhotoURL,
  onClose,
}) => {
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
      });
    } else if (key === "back") {
      handleTransition(onClose)
    }
    else if (key === "1") {
      handleTransition(() => {
        setShowDashboard(true);
        setShowSettings(false);
      });
    } else if (key === "2") {
      handleTransition(() => {
        setShowDashboard(false);
        setShowSettings(true);
      });
    }
  };

  const [showDashboard, setShowDashboard] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const items: MenuProps["items"] = [
    {
      key: 'sub1',
      label: 'Profile',
      icon: <ProfileOutlined />,
      children: [
        { key: '1', label: 'Dashboard', icon: <AppstoreOutlined /> },
        { key: '2', label: 'Settings', icon: <SettingOutlined /> },
      ]
    },
    {
      key: 'sub2',
      label: 'Class Periods',
      children: [
        { key: '4', label: 'Period 1' },
        { key: '5', label: 'Period 2' },
        { key: '6', label: 'Period 3' },
        { key: '7', label: 'Period 4' },
        { key: '8', label: 'Period 5' },
        { key: '9', label: 'Period 6' },
        { key: '10', label: 'Period 7' },
        { key: '11', label: 'Period 8' },
      ],
    },
    {
      key: 'back',
      label: 'Back to ZaruAI',
      icon: <ArrowRightOutlined />,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
    }
  ];

  return (
    <div style={{ 
        display : "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
    }}>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <RotateLoader color="#FFF8F8" />
      </Backdrop>

      <div style={{ 
          width: '15%', 
          height: '100%', 
          backgroundColor: '#fafcfd', 
          borderRight: "2px solid #d4e3ea", 
          position: "relative", 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
        }}>
            <div style={{ 
                width: '100%',
                height: '12%',
                backgroundColor: '#eaf2f5',
                borderBottom: "2px solid #d4e3ea",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <img
                    src={userData.photoURL || ""}
                    alt="User"
                    style={{
                        width: "3.5vw",
                        height: "3.5vw",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #d4e3ea",
                    }}
                />  
            </div>
        
              <Menu
                style={{ width: '100%', height: "88%", backgroundColor: '#fafcfd', position: "absolute", bottom: 0, left: 0, fontFamily: "Montserrat, sans-serif", fontSize: "14" }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
                onSelect={({ key }) => handleMenuClick(key)}
              />
        </div>

        {showDashboard && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
              height: "80%",
              gap: "1rem",
              borderRadius: 10,
              padding: "1rem",
              backgroundColor: '#eaf2f5',
              border: "2px solid #d4e3ea",
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
                fontSize: "1.5rem",
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
                <label style={{ ...Styles.label }}>Name</label>
                <div style={{ ...Styles.userInfo }}>
                  {userData.displayName || "No name provided"}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ ...Styles.label }}>Email</label>
                <div style={{ ...Styles.userInfo }}>
                  {userData.email || "No email provided"}
                </div>
              </div>
            </div>
          </div>
        )}

        {showSettings && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "80%",
              height: "80%",
              gap: "1rem",
              borderRadius: 10,
              padding: "1rem",
              backgroundColor: "#fafcfd",
              border: "2px solid #d4e3ea",
            }}
            id="dashboard"
          >
            <h2
              style={{
                color: "#42738a",
                marginBottom: "1rem",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "1.5rem",
              }}
            >
              Coming Soon...
            </h2>
          </div>
        )}
    </div>
  );
};

export default Dashboard;