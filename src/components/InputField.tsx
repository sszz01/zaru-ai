import React, { forwardRef } from "react";
import '@fontsource/poppins/400.css';

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ value, onChange }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        placeholder="Type a message..."
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          outline: "none",
          padding: "0.75rem 0.75rem",
          backgroundColor: "#ffffff",
          borderRadius: "50px",
          color: "#5e646e",
          position: "relative",
          fontWeight: 600,
          border: "2px solid #dddfe2",
          fontFamily: '"Poppins", sans-serif',
        }}
      />
    );
  }
);

export default InputField;
