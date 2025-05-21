import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../backend/db/firebase/firebase.ts";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Styles from "../styles/login.ts";
import { useNavigate } from "react-router-dom";
import PasswordIcon from '@mui/icons-material/Password';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';

//import LineDraw from "./imported/linedraw";
// import Monkey from "../assets/monkeygraphic.jpg";

const Login: React.FC<{
  onLogin: (photoURL: string | null, role: string) => void;
}> = ({ onLogin }) => {
  // ui states
  const [isLogin, setIsLogin] = useState(true);
  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // role selection states
  const [selectedRole, setSelectedRole] = useState<string>("default");

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
        onLogin(userCredential.user.photoURL || null, selectedRole);
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
          role: selectedRole,
        });

        onLogin(userCredential.user.photoURL || null, selectedRole);
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

  if(show === true) {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Determine the role to use
      const roleToUse = Number(code) === randomCode ? "admin" : selectedRole;

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
            role: roleToUse,
          });
        } else {
          await setDoc(
            userRef,
            {
              lastLogin: new Date(),
              photoURL: user.photoURL,
              role: roleToUse,
            },
            { merge: true }
          );
        }
      }
      // Use the determined role
        onLogin(user.photoURL || null, roleToUse);
      } catch (error: unknown) {
        setError("Google login failed. Please try again.");
        if (error instanceof Error) {
          console.error("Google login error:", error.message);
        };
      } finally {
        setLoading(false);
        Navigate("/chat");
      }
    } else {
      console.error("Code must be 6 characters long.");
      setLoadError(true);
    }
  };


  const Navigate = useNavigate();

  const [show, setRequireCharacter] = useState(false);
  const check6Char = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 6) {
      setRequireCharacter(true);
    } else {
      setRequireCharacter(false);
    }
  };

  const randomCode = 123456;
  // Only log the code once on component mount
  React.useEffect(() => {
    console.log(randomCode);
    // eslint-disable-next-line
  }, []);

  const [code, setCode] = useState("");

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
  };

  const [loadError, setLoadError] = useState(false);

  return (
    <div style={Styles.container}>
      <div
        style={{
          maxWidth: "28rem",
          width: "100%",
          padding: "2rem",
          backgroundColor: "#efeff1",
          borderRadius: "1rem",
          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
          position: "absolute",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <h2
            style={{
              fontSize: "1.875rem",
              marginBottom: "1rem",
              fontWeight: "bold",
              color: "#232629",
              letterSpacing: "-0.01562em",
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            {isLogin ? "Welcome back" : "Create account"}
          </h2>
          <p
            style={{
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              fontFamily: '"Poppins", sans-serif',
              color: "#848b95",
            }}
          >
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              style={{
                cursor: "pointer",
                fontWeight: "500",
                color: "#5e646e",
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
            backgroundColor: "#fbfbfb",
            border: "2px solid #dddfe2",
            color: "gray",
            fontWeight: "500",
            transition: "background-color 0.2s ease",
            fontFamily: '"Poppins", sans-serif',
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#dddfe2")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#ffffff")
          }
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
            <span className="px-2 bg-[#efeff1] text-gray-500" style={{ fontFamily: '"Poppins", sans-serif' }}>
              Or continue with
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#848b95]"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              Email address
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                style={{ fontFamily: '"Poppins", sans-serif' }}
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full pl-10 pr-3 py-2 border-1 border-[#dddfe2] rounded-lg bg-[#ffffff] placeholder-gray-400 focus:outline-none focus:ring-[#42738a] focus:border-[#42738a]"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#848b95]"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                style={{ fontFamily: '"Poppins", sans-serif' }}
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full pl-10 pr-3 py-2 border-1 border-[#dddfe2] bg-[#ffffff] rounded-lg placeholder-gray-400 focus:outline-none focus:ring-[#42738a] focus:border-[#42738a] mb-1"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Your Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="default">Default User</option>
              <option value="student">Student</option>
              <option value="admin">Administrator</option>
            </select>
            {selectedRole === "student" && (
              <p className="text-xs text-gray-500 mt-1">
                Note: Student accounts have certain content restrictions in
                accordance with academic integrity policies.
              </p>
            )}
          </div> */}

          <span className="text-xs text-gray-500"> {show ? "" : "Code must be 6 digits"} </span>

          {/* User Role Code Enter */}
          <div className="mt-1 relative">
            <div style={{ position: 'absolute', paddingTop: '0.55rem', paddingLeft: '0.75rem', display: 'flex', alignItems: 'center', pointerEvents: 'none', }}>
              <PasswordIcon style={{ height: '1.25rem', width: '1.25rem', color: '#9CA3AF' }} />
            </div>
            <input 
              placeholder="Enter your code" 
              onChange={(e) => {
                check6Char(e);
                handleCodeChange(e);
                setLoadError(false);
              }}
              value={code}
              style={{
                appearance: "none",
                width: "100%",
                paddingLeft: "2.5rem",
                paddingRight: "0.75rem",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                border: "1px solid #dddfe2",
                backgroundColor: "#ffffff",
                borderRadius: "0.5rem",
                color: "#5e646e",
                fontSize: "1rem",
                fontFamily: '"Poppins", sans-serif',
                outline: "none",
                transition: "all 0.15s ease-in-out",
              }}/>

              {loadError && (
                <span className="text-xs text-gray-500"
                      style={{ color: "#ff0000"}}> 
                  Please enter a valid code 
                </span>
              )}
          </div>

          {isLogin && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                style={{
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#5e646e",
                  transition: "color 0.2s ease",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Forgot your password?
              </button>
            </div>
          )}

          <div
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <button
              type="submit"
              className="submit-button"
              style={{
                cursor: "pointer",
                display: "flex",
                position: "relative",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.5rem 1rem",
                border: "1px solid transparent",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                color: "#e0edf3",
                backgroundColor: "#0066ff",
                transition: "background-color 0.2s ease",
                gap: "0.5rem",
                outline: "none",
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 700,
              }}
              disabled={loading}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0052cc")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#0066ff")
              }
            >
              {loading ? "Loading..." : isLogin ? "Sign in" : "Create account"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;


