import React, { Suspense } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Styles from "./styles/googleCSS";
import SignButton from "./button";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Grow,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  Divider,
  Chip,
} from "@mui/material";
import CrossIcon from "@mui/icons-material/Close";

// Lazy load non-critical components
const Backdrop = React.lazy(() => import("@mui/material/Backdrop"));
const CircularProgress = React.lazy(
  () => import("@mui/material/CircularProgress")
);

interface GoogleModalProps {
  closeModal: () => void;
}

const GoogleModal: React.FC<GoogleModalProps> = ({ closeModal }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLogin = useGoogleLogin({
    onSuccess: (response) => {
      setOpen(true); // Show the loading spinner
      console.log("Login Success:", response);
      setTimeout(() => {
        navigate("/chat");
      }, 850); // delay
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  const handleClose = () => {
    setOpen(true); // Show the loading spinner
    setTimeout(() => {
      navigate("/chat");
    }, 850); // delay
  };

  return (
    <>
      {/* Lazy-loaded Backdrop and Spinner */}
      <Suspense fallback={null}>
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.modal + 10,
          }}
          open={open}
        >
          <CircularProgress size={60} color="inherit" />
        </Backdrop>
      </Suspense>

      {/* Modal Content */}
      <div style={Styles.modal} onClick={(event) => event.stopPropagation()}>
        {/* Header */}
        <h1
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: 25,
            marginBottom: 30,
            fontWeight: 700,
            color: "#5496b3ff",
          }}
        >
          Sign In
        </h1>

        {/* Close Button */}
        <div style={Styles.fab} onClick={closeModal}>
          <CrossIcon />
        </div>

        {/* Google Sign-In Button */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 0,
          }}
        >
          <SignButton
            style={{
              ...Styles.googlebutton,
              fontFamily: "Poppins, sans-serif",
              color: "#6e6e6e",
              fontSize: 15,
              width: "100%",
              padding: "10px 50px",
            }}
            onClick={() => handleLogin()}
          >
            <img
              src="https://cdn.freebiesupply.com/logos/large/2x/google-icon-logo-svg-vector.svg"
              alt="Google Icon"
              style={{ width: 24, height: 24, marginRight: 10 }}
            />
            Sign in with Google
          </SignButton>
        </div>

        {/* Divider */}
        <Divider sx={{ width: "85%", marginY: 1.5 }}>
          <Chip
            label="or"
            size="small"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 12,
              fontWeight: "bold",
            }}
          />
        </Divider>

        {/* Email and Password Fields */}
        <Grow in={true}>
          <div>
            <FormControl
              sx={{ marginBottom: 2, width: "35ch" }}
              variant="filled"
            >
              <InputLabel
                sx={{
                  ...Styles.poppins,
                  fontSize: "14",
                  lineHeight: "1.5",
                  margin: 0,
                }}
                htmlFor="filled-adornment-email"
              >
                Email
              </InputLabel>
              <FilledInput id="filled-adornment-email" type="text" />
            </FormControl>
          </div>
        </Grow>

        <Grow in={true} style={{ transformOrigin: "0 0 0" }}>
          <FormControl sx={{ marginBottom: 1, width: "35ch" }} variant="filled">
            <InputLabel
              sx={{
                ...Styles.poppins,
                fontSize: "14",
                lineHeight: "1.5",
                margin: 0,
              }}
              htmlFor="filled-adornment-password"
            >
              Password
            </InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grow>

        {/* Forgot Password and Sign In Button */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 11,
              marginBottom: 5,
              color: "gray",
              textAlign: "center",
            }}
          >
            Forgot Your Password?
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <SignButton
              style={{
                ...Styles.backButton,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: 16,
                borderRadius: 50,
                width: "100%",
              }}
              onClick={handleClose}
            >
              Sign In
            </SignButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleModal;
