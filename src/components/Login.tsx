import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.ts";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Styles from "./imported/styles/login";
import SignButton from "./imported/button";
import LineDraw from "./imported/linedraw";

const Login: React.FC<{ onLogin: (photoURL: string | null) => void }> = ({
  onLogin,
}) => {
  // ui states
  const [openModal, setOpenModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // toggle modal state
  const toggleModal = () => {
    setOpenModal((prev) => {
      if (prev === true) {
        setLoading(false);
        setError(null);
      }
      return !prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const userRef = doc(db, "users", email);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          setError("Account not found. Please sign up.");
          setLoading(false);
          return;
        }

        // handle sign-in
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Logged in:", userCredential.user);
        onLogin(userCredential.user.photoURL || null);
        toggleModal();
      } else {
        // check if email already exists
        const userRef = doc(db, "users", email);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setError("Account already exists. Please sign in.");
          setLoading(false);
          return;
        }

        // handle sign-up
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // store user info in Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date(),
          authMethod: "email",
        });

        onLogin(userCredential.user.photoURL || null);
        toggleModal();
      }
    } catch (error: unknown) {
      if (error instanceof Error && "code" in error) {
        const firebaseError = error as { code: string; message: string };

        switch (firebaseError.code) {
          case "auth/email-already-in-use":
            setError("This email is already in use. Please sign in instead.");
            break;
          case "auth/invalid-email":
            setError("Invalid email address.");
            break;
          case "auth/weak-password":
            setError("Password should be at least 6 characters.");
            break;
          case "auth/user-not-found":
            setError("Account not found. Please sign up.");
            break;
          case "auth/wrong-password":
            setError("Incorrect password. Please try again.");
            break;
          default:
            setError(firebaseError.message);
        }
      } else {
        setError("An unknown error occurred.");
      }
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName,
            createdAt: new Date(),
            authMethod: "google",
          });
        } else {
          await setDoc(
            userRef,
            { lastLogin: new Date(), photoURL: user.photoURL },
            { merge: true }
          );
        }
      }

      onLogin(user.photoURL || null);
      toggleModal();
    } catch (error: unknown) {
      setError("Google login failed. Please try again.");
      if (error instanceof Error) {
        console.error("Google login error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={Styles.container}>
      <Backdrop
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={openModal}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setLoading(false);
            setError(null);
            setOpenModal(false);
          }
        }}
      >
        <div
          className="max-w-md w-full space-y-8 bg-[#eaf2f5] p-8 rounded-xl shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#1a202c", letterSpacing: "-0.01562em", fontFamily: "Montserrat, sans-serif" }}>
              {isLogin ? "Welcome back" : "Create account"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                style={{
                  cursor: "pointer",
                  fontWeight: "500",
                  color: "#649bb4",
                  transition: "color 0.2s ease",
                }}
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center mb-4">{error}</div>
          )}

          <button
            onClick={handleGoogleLogin}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              width: "100%",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              backgroundColor: "#fafcfd",
              border: "2px solid #d4e3ea",
              color: "gray",
              fontWeight: "500",
              transition: "background-color 0.2s ease",
            }}
            disabled={loading}
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            {loading ? "Loading..." : "Continue with Google"}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#eaf2f5] text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#42738a]"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border-2 border-[#d4e3ea] rounded-lg bg-[#fafcfd] placeholder-gray-400 focus:outline-none focus:ring-[#42738a] focus:border-[#42738a]"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#42738a]"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border-2 border-[#d4e3ea] bg-[#fafcfd] rounded-lg placeholder-gray-400 focus:outline-none focus:ring-[#42738a] focus:border-[#42738a]"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  style={{
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#649bb4",
                    transition: "color 0.2s ease",
                  }}
                >
                  Forgot your password?
                </button>
              </div>
            )}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => {
                  setLoading(false);
                  setError(null);
                  setOpenModal(false);
                }}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.5rem 1rem",
                  border: "2px solid",
                  borderColor: "#d4e3ea",
                  borderRadius: "0.5rem",
                  color: "#649bb4",
                  backgroundColor: "#fff",
                  transition: "background-color 0.2s ease",
                  gap: "0.5rem",
                  outline: "none",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="submit-button"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.5rem 1rem",
                  border: "1px solid transparent",
                  borderRadius: "0.5rem",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  color: "#e0edf3",
                  backgroundColor: "#4a98bd",
                  transition: "background-color 0.2s ease",
                  gap: "0.5rem",
                  outline: "none",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                }}
                disabled={loading}
              >
                {loading ? "Loading..." : isLogin ? "Sign in" : "Create account"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </Backdrop>

      <LineDraw />

      <div style={{ ...Styles.buttonContainer, bottom: "38%" }}>
        <SignButton
          style={{
            ...Styles.button,
            ...Styles.poppins,
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            fontSize: 24,
            marginBottom: 0,
          }}
          onClick={toggleModal}
          aria-label="Sign In"
        >
          Sign In
        </SignButton>

        <SignButton
          style={{
            ...Styles.extendedFab,
            ...Styles.poppins,
            fontFamily: "Montserrat, sans-serif",
            color: "#4a98bd",
            fontWeight: 700,
            borderRadius: 50,
            padding: "10px 30px",
            fontSize: 16,
          }}
          aria-label="Watch a Demo"
        >
          Watch a Demo
        </SignButton>
      </div>
    </div>
  );
};

export default Login;
