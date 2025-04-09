import { motion } from "framer-motion";
// import { Grow } from "@mui/material";
import React from "react";

interface ButtonProps {
  onClick?: () => void; // Optional onClick handler
  style?: React.CSSProperties; // Optional inline styles
  children?: React.ReactNode; // Accepts children (text or elements)
}

const SignButton: React.FC<ButtonProps> = ({ onClick, style, children }) => {
  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        style={style}
        onClick={onClick}
      >
        {children}
      </motion.button>
    </div>
  );
};

export default SignButton;
