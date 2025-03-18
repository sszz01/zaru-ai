import React from "react";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ value, onChange }) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Ask something..."
    style={{ padding: "10px", textAlign: "center" }}
  />
);

export default InputField;
