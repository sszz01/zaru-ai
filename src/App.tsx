import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../backend/db/firebase/firebase";
import ChatPage from "./components/chat/ChatPage";
import Login from "./components/auth/Login";
import Dashboard from "./components/layout/Dashboard";
import Profile from "./components/layout/Profile";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string>("default");
  const [userPhotoURL, setUserPhotoURL] = useState<string | null>(null);
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
        } catch {
          setUserRole("default");
          setUserPhotoURL(user.photoURL || null);
        } finally {
          setIsLoggedIn(true);
        }
      } else {
        setIsLoggedIn(false);
        setUserRole("default");
        setUserPhotoURL(null);
      }
      setIsLoadingAuth(false);
    });

    return () => {
      unsub();
    };
  }, []);

  const handleLogin = (photoURL: string | null, role: string) => {
    setIsLoggedIn(true);
    setUserPhotoURL(photoURL);
    setUserRole(role);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/chat"
          element={
            <ChatPage
              isLoggedIn={isLoggedIn}
              isLoadingAuth={isLoadingAuth}
              userPhotoURL={userPhotoURL}
              userRole={userRole}
              onLogin={handleLogin}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              userPhotoURL={userPhotoURL}
              setLogin={setIsLoggedIn}
              onClose={() => {}}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              userPhotoURL={userPhotoURL}
              setLogin={setIsLoggedIn}
              onClose={() => {}}
            />
          }
        />
        <Route path="/" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default App;
