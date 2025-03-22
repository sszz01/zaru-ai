import React, { useState } from "react";
import { Paperclip, Camera, Smile, Send } from "lucide-react";

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
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 bg-gray-200 rounded-lg py-3"
        />
        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none cursor-pointer"
          >
            <Paperclip className="h-6 w-6 text-gray-600" />
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none cursor-pointer"
          >
            <Camera className="h-6 w-6 text-gray-600" />
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none cursor-pointer"
          >
            <Smile className="h-6 w-6 text-gray-600" />
          </button>
          <button
            type="submit"
            disabled={!input.trim()}
            className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none cursor-pointer"
          >
            <span className="font-bold">Send</span>
            <Send className="h-6 w-6 ml-2" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
