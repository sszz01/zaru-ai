import React from "react";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ value, onChange }) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Type your message..."
    className="input-field"
  />
);

export default InputField;
