import React, { useState } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

interface FormProps {
  onSubmit: (input: string) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input) {
      onSubmit(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField value={input} onChange={setInput} />
      <SubmitButton onClick={() => handleSubmit({} as React.FormEvent)} />
    </form>
  );
};

export default Form;
