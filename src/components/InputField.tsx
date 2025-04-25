import React, { forwardRef } from "react";

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
          backgroundColor: "#eaf2f5",
          borderRadius: "50px",
          color: "#718096",
          position: "relative",
          fontWeight: 600,
          border: "2px solid #d4e3ea",
        }}
      />
    );
  }
);

export default InputField;
