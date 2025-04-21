import React, { useState } from 'react'
import Styles from "./imported/styles/profile";
import EditIcon from '@mui/icons-material/Edit';

interface ProfileProps {
    setLogin: (isLoggedIn: boolean) => void;
    userPhotoURL: string | null;
    onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ setLogin, userPhotoURL, onClose }) => {

    const [showDashboard, setShowDashboard] = useState(true);
    const [showSettings, setShowSettings] = useState(false);

    const handleMenuClick = (menu: string) => () => {
        if (menu === "dashboard") {
            setShowDashboard(true);
            setShowSettings(false);
        } else if (menu === "settings") {
            setShowDashboard(false);
            setShowSettings(true);
        }
    }

    return (
      <div style={{ ...Styles.container, gap: '2.5rem' }}>
        <div style={{ ...Styles.profileContainer, flexDirection: 'column', position: 'relative', height: '40%' }}>
            <img 
                src={userPhotoURL || "/img/user.png"} 
                alt="Profile" 
                style={{ 
                width: "100px", 
                height: "100px", 
                borderRadius: "50%", 
                marginBottom: "1rem",
                border: "3px solid #42738a",
                position: "absolute",
                top: "-3rem",
                }} 
            />

            <button style={{height: '2rem', width: '2rem', borderRadius: '50%', backgroundColor: '#42738a', position: 'absolute', top: '1rem', right: '5.5rem', cursor: 'pointer'}}>
                <EditIcon sx={{ color: "#e0edf3", fontSize: '1.25rem' }} />
            </button>

            <button style={{...Styles.menuButton,position: 'relative', left:0, border: '2px solid #d4e3ea', backgroundColor: '#fafcfd', marginTop: '1rem'}} onClick={handleMenuClick("dashboard")}>Profile</button>
            <button style={{...Styles.menuButton,position: 'relative', left:0, border: '2px solid #d4e3ea', backgroundColor: '#fafcfd',}} onClick={handleMenuClick("settings")}>Settings</button>
            <button style={{...Styles.menuButton,position: 'relative', left:0, border: '2px solid #d4e3ea', backgroundColor: '#fafcfd',}} onClick={onClose}>Help</button>
            <button style={{...Styles.menuButton,position: 'relative', left:0, border: '2px solid #d4e3ea', backgroundColor: '#fafcfd',}} onClick={() => { onClose(); setLogin(false)}}>Logout</button>

        </div>

        {showDashboard && (
          <div id="dashboard" style={{ ...Styles.profileContainer, width: "45%", height: "50%", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {/* Dashboard content goes here */}
          </div>
        )}
        {showSettings && (
          <div id="settings" style={{ ...Styles.profileContainer, width: "45%", height: "50%", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {/* Settings content goes here */}
          </div>
        )}
      </div>
    );
  };

export default Profile
