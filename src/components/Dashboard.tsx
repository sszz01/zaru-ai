import React, { useState, useEffect } from "react";
// import CircularProgress from "@mui/material/CircularProgress";
import { RotateLoader } from "react-spinners";
import { auth } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import MenuItem from "@mui/material/MenuItem";



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
  
  return (
    <div style={{ 
        display : "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center", 
    }}>
        <div style={{ 
            width: '15vw', 
            height: '100%', 
            backgroundColor: '#fafcfd', 
            borderRight: "2px solid #d4e3ea", 
            position: "absolute", 
            bottom: 0, 
            left: 0,
            flexDirection: "column",
            alignItems: "center",
        }}>
            <div style={{ 
                width: '100%',
                height: '6vw',
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

        </div>
    </div>
  );
};

export default Dashboard;
