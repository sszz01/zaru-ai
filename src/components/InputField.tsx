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
        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 bg-gray-200 rounded-lg py-3"
      />
    );
  }
);

export default InputField;
