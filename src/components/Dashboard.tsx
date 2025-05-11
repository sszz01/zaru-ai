import React, { useState, useEffect } from "react";
// import CircularProgress from "@mui/material/CircularProgress";
import { RotateLoader } from "react-spinners";
import { auth } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Menu } from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';


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

  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    { key: '15', label: 'Profile Dashboard', style: {fontFamily: "Montserrat, sans-serif", fontWeight: 500}, },
    {
      key: 'sub1',
      label: 'Class Periods',
      style: {fontFamily: "Montserrat, sans-serif", fontWeight: 500},
      children: [
        {
          key: 'g1',
          label: 'Odd Day',
          type: 'group',
          children: [
            { key: '1', label: 'Period 1' },
            { key: '2', label: 'Period 3' },
            { key: '3', label: 'Period 5' },
            { key: '4', label: 'Period 7' },
          ],
        },
        {
          key: 'g2',
          label: 'Even Day',
          type: 'group',
          children: [
            { key: '5', label: 'Period 2' },
            { key: '6', label: 'Period 4' },
            { key: '7', label: 'Period 6' },
            { key: '8', label: 'Period 8' },
          ],
        },
      ],
    },
    {
      key: 'sub2',
      label: 'Navigation Two',
      icon: <AppstoreOutlined />,
      style: {fontWeight: 600},
      children: [
        { key: '5', label: 'Option 5' },
        { key: '6', label: 'Option 6' },
        {
          key: 'sub3',
          label: 'Submenu',
          children: [
            { key: '7', label: 'Option 7' },
            { key: '8', label: 'Option 8' },
          ],
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'sub4',
      label: 'Navigation Three',
      icon: <SettingOutlined />,
      children: [
        { key: '9', label: 'Option 9' },
        { key: '10', label: 'Option 10' },
        { key: '11', label: 'Option 11' },
        { key: '12', label: 'Option 12' },
      ],
    },
    {
      key: 'grp',
      label: 'Group',
      type: 'group',
      children: [
        { key: '13', label: 'Option 13' },
        { key: '14', label: 'Option 14' },
      ],
    },
  ];
  
  return (
    <div style={{ 
        display : "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center", 
    }}>

    <Menu
      style={{ width: 256, height: "100%", backgroundColor: '#fafcfd', borderRight: "2px solid #d4e3ea", position: "absolute", bottom: 0, left: 0 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
      onSelect={({ key }) => console.log(key)}
    />
        {/* <div style={{ 
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

        </div> */}
    </div>
  );
};

export default Dashboard;
