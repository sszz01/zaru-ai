import React, { forwardRef, useState, useEffect } from "react";

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  conversationReady: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ value, onChange, conversationReady }, ref) => {
    const [placeholder, setPlaceholder] = useState("Start a conversation");

    useEffect(() => {
      if (conversationReady) {
        setPlaceholder("Reply to Zaru");
      } else {
        setPlaceholder("Start a conversation");
      }
    }, [conversationReady]);

    return (
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
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
          fontFamily: "Poppins, sans-serif",
        }}
      />
    );
  }
);

export default InputField;