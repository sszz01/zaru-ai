import React, { forwardRef, useState, useEffect } from "react";

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  conversationId: number | null;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ value, onChange, conversationId }, ref) => {
    const [placeholder, setPlaceholder] = useState("Start a conversation");

    useEffect(() => {
      if (conversationId !== null) {
        setPlaceholder("How can I assist you today?");
      } else {
        setPlaceholder("Start a conversation");
      }
    }, [conversationId]);

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
        }}
      />
    );
  }
);

export default InputField;
