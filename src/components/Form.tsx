import React, { useState, useRef, useEffect } from "react";
import { Paperclip, Camera, Smile } from "lucide-react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import Button from "./ChatButton";

interface FormProps {
  onSubmit: (input: string) => void;
  drawer: boolean;
}

const Form: React.FC<FormProps> = ({ onSubmit, drawer }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput("");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (tag !== "input" && tag !== "textarea") {
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      position: "relative", 
      bottom: 0, width: "100vw", 
      boxSizing: "border-box", 
      overflow: "hidden", 
      transition: "margin-left 0.3s cubic-bezier(0.4,0,0.2,1)", 
      marginLeft: drawer ? "7.5vw" : "0" 
      }}
    >
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "1.5rem",
        backgroundColor: "#fafcfd",
        width: '80%',
        borderTopRightRadius: "50px",
        borderTopLeftRadius: "50px",
        border: "2px solid #d4e3ea",
      }}
    >
      <div className="relative flex">
        <InputField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ref={inputRef}
        />
        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex space-x-2">
          <Button Icon={Paperclip} />
          <Button Icon={Camera} />
          <Button Icon={Smile} />
          <SubmitButton disabled={!input.trim()} />
        </div>
      </div>
    </form>
    </div>
  );
};

export default Form;
