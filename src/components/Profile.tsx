import React, { useState, useEffect } from 'react'
import Styles from "./imported/styles/profile";
import EditIcon from '@mui/icons-material/Edit';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from '@mui/material/CircularProgress';
import { auth } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import LineDraw from "./imported/linedraw";

interface ProfileProps {
    setLogin: (isLoggedIn: boolean) => void;
    userPhotoURL: string | null;
    onClose: () => void;
}

interface UserData {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}

const Profile: React.FC<ProfileProps> = ({ setLogin, userPhotoURL, onClose }) => {
    const [showDashboard, setShowDashboard] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        displayName: null,
        email: null,
        photoURL: userPhotoURL
    });
    
    useEffect(() => {
        const fetchUserData = async () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                // First try to get data from Firebase Auth
                const basicUserData = {
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL || userPhotoURL
                };
                
                setUserData(basicUserData);
                
                // Then try to get additional data from Firestore if available
                try {
                    const userDocRef = doc(db, "users", currentUser.uid);
                    const userDoc = await getDoc(userDocRef);
                    
                    if (userDoc.exists()) {
                        const firestoreData = userDoc.data();
                        setUserData(prevData => ({
                            ...prevData,
                            ...firestoreData,
                            photoURL: prevData.photoURL || firestoreData.photoURL
                        }));
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        
        fetchUserData();
    }, [userPhotoURL]);
    
    const handleOpen = () => {
        setOpen(true);
        setTimeout(() => {
            onClose();
            setLogin(false);
            setShowDashboard(false);
            setShowSettings(false);
            setOpen(false); // Reset the state
        }, 850); // delay
    };

    const handleBackOpen = () => {
      setOpen(true);
      setTimeout(() => {
          onClose();
          setShowDashboard(false);
          setShowSettings(false);
          setOpen(false); // Reset the state
      }, 850); // delay
    }

    const handleMenuClick = (menu: string) => () => {
        if (menu === "dashboard") {
            setShowDashboard(true);
            setShowSettings(false);
        } else if (menu === "settings") {
            setShowDashboard(false);
            setShowSettings(true);
        }
        else if (menu === "back") {
            handleBackOpen();
        }
        else if (menu === "sign out") {
            handleOpen();
        }
    }

    return (
      <div style={{ ...Styles.container, gap: '2.5rem' }}>
        <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={open}
        >
          <CircularProgress size={60} color="inherit" />
        </Backdrop>

        {/* <LineDraw/> */}
    
        <div
          style={{
            ...Styles.profileContainer,
            flexDirection: 'column',
            position: 'relative',
            height: '45vh',
          }}
        >
          <img
            src={userData.photoURL || '/img/user.png'}
            alt="Profile"
            style={{
              width: '8vw',
              height: '8vw',
              maxWidth: '85px',
              maxHeight: '85px',
              borderRadius: '50%',
              marginBottom: '1rem',
              border: '3px solid #42738a',
              position: 'absolute',
              top: '-3rem',
            }}
          />
    
          <button
            style={{
              height: '4vh',
              width: '4vh',
              maxHeight: '2.5rem',
              maxWidth: '2.5rem',
              borderRadius: '50%',
              backgroundColor: '#42738a',
              position: 'absolute',
              top: '0.9rem',
              right: '4vw',
              cursor: 'pointer',
            }}
          >
            <EditIcon sx={{ color: '#e0edf3', fontSize: '1.25rem' }} />
          </button>
    
          {['Dashboard', 'Settings', 'Back', 'Sign Out'].map((label, index) => (
            <button
              key={label}
              style={{
                ...Styles.menuButton,
                marginTop: index === 0 ? '1.25rem' : 0,
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d4e3ea')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = Styles.menuButton.backgroundColor)}
              onClick={handleMenuClick(label.toLowerCase())}
            >
              <span style={{ ...Styles.menuButtonText }}>{label}</span>
            </button>
          ))}
        </div>
    
        {showDashboard && (
          <div
            id="dashboard"
            style={{
              ...Styles.profileContainer,
              width: '90vw',
              maxWidth: '600px',
              height: '50vh',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                ...Styles.title,
                position: 'relative',
                top: '-3rem',
                left: 0,
                textAlign: 'center',
                fontSize: '1.5rem',
              }}
            >
              Profile Dashboard
            </div>
    
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '80%',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ ...Styles.label }}>Name</label>
                <div style={{ ...Styles.userInfo }}>
                  {userData.displayName || 'No name provided'}
                </div>
              </div>
    
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ ...Styles.label }}>Email</label>
                <div style={{ ...Styles.userInfo }}>
                  {userData.email || 'No email provided'}
                </div>
              </div>
            </div>
          </div>
        )}
    
        {showSettings && (
          <div
            id="settings"
            style={{
              ...Styles.profileContainer,
              width: '90vw',
              maxWidth: '600px',
              height: '50vh',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h2
              style={{
                color: '#42738a',
                marginBottom: '1rem',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '1.5rem',
              }}
            >
              Coming Soon...
            </h2>
            {/* <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '80%',
                gap: '1rem',
              }}
            >
              <button
                style={{
                  backgroundColor: '#4a98bd',
                  color: '#e0edf3',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 500,
                  fontSize: '1rem',
                }}
              >
                Change Password
              </button>
              <button
                style={{
                  backgroundColor: '#4a98bd',
                  color: '#e0edf3',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 500,
                  fontSize: '1rem',
                }}
              >
                Update Profile
              </button>
            </div> */}
          </div>
        )}
      </div>
    );    
  };

export default Profile
