import React, { useState } from "react";
import { Paperclip, Camera, Smile } from "lucide-react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import Button from "./Button";

interface FormProps {
  onSubmit: (input: string) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t-2 border-gray-200 px-6 py-4 bg-white"
    >
      <div className="relative flex">
        <InputField value={input} onChange={(e) => setInput(e.target.value)} />
        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex space-x-2">
          <Button Icon={Paperclip} />
          <Button Icon={Camera} />
          <Button Icon={Smile} />
          <SubmitButton disabled={!input.trim()} />
        </div>
      </div>
    </form>
  );
};

export default Form;
