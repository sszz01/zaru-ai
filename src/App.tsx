import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase/firebase";
import ChatPage from "./components/ChatPage";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import { RotateLoader } from "react-spinners";

const ProtectedRoute = ({
  children,
  isLoggedIn,
  isLoadingAuth,
  redirectPath = "/login",
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
  isLoadingAuth: boolean;
  redirectPath?: string;
}) => {
  if (isLoadingAuth) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <RotateLoader color="#999999" />
      </div>
    );
  }
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return <>{children}</>;
};

const AdminRoute = ({
  children,
  userRole,
  isLoggedIn,
  isLoadingAuth,
}: {
  children: React.ReactNode;
  userRole: string;
  isLoggedIn: boolean;
  isLoadingAuth: boolean;
}) => {
  if (isLoadingAuth) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <RotateLoader color="#999999" />
      </div>
    );
  }
  if (!isLoggedIn || userRole !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const LoginPageWrapper = ({
  onLogin,
}: {
  onLogin: (photoURL: string | null, role: string) => void;
}) => {
  const navigate = useNavigate();
  const handleLoginSuccess = (photoURL: string | null, role: string) => {
    onLogin(photoURL, role);
    navigate("/");
  };
  return <Login onLogin={handleLoginSuccess} />;
};

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
            setUserPhotoURL(user.photoURL || null); // use photoURL from auth user first
          } else {
            // user document doesn't exist, maybe first login, set defaults
            setUserRole("default");
            setUserPhotoURL(user.photoURL || null);
            console.log("User document not found, using default role.");
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
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
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPageWrapper onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              isLoadingAuth={isLoadingAuth}
            >
              <ChatPage
                isLoggedIn={isLoggedIn}
                isLoadingAuth={isLoadingAuth}
                userPhotoURL={userPhotoURL}
                userRole={userRole}
                // onLogin prop is removed as ChatPage is protected and shouldn't trigger login
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              isLoadingAuth={isLoadingAuth}
            >
              <Profile
                // setLogin={() => {}} // removed, Profile is a protected route
                userPhotoURL={userPhotoURL}
                onClose={() => {}}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              isLoadingAuth={isLoadingAuth}
            >
              <Navigate to="/profile" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AdminRoute
              isLoggedIn={isLoggedIn}
              isLoadingAuth={isLoadingAuth}
              userRole={userRole}
            >
              <Dashboard
                // setLogin={() => {}} // removed, Dashboard is a protected admin route
                userPhotoURL={userPhotoURL}
                onClose={() => {}}
              />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
