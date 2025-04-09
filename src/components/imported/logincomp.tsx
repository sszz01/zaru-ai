import React from "react";
import Backdrop from "@mui/material/Backdrop";
import SignButton from "./button";
import GoogleModal from "./googlemodal";
import LineDraw from "./linedraw";
import Styles from "./styles/login";

const LoginComp: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);

  // Toggle modal state
  const toggleModal = () => setOpenModal((prev) => !prev);

  return (
    <div style={Styles.container}>
      {/* Backdrop with Google Modal */}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={openModal}
        onClick={toggleModal}
      >
        <GoogleModal closeModal={toggleModal} />
      </Backdrop>

      {/* LineDraw Component */}
      <LineDraw />

      {/* Buttons Container */}
      <div style={{ ...Styles.buttonContainer, bottom: "29.5%" }}>
        {/* Sign In Button */}
        <SignButton
          style={{
            ...Styles.button,
            ...Styles.poppins,
            fontSize: 24,
            marginBottom: 0,
          }}
          onClick={toggleModal}
          aria-label="Sign In"
        >
          Sign In
        </SignButton>

        {/* Watch a Demo Button */}
        <SignButton
          style={{
            ...Styles.extendedFab,
            ...Styles.poppins,
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

export default LoginComp;
