import React from "react";
import { Send } from "lucide-react";

interface SubmitButtonProps {
  disabled: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none cursor-pointer"
    >
      <span className="font-bold">Send</span>
      <Send className="h-6 w-6 ml-2" />
    </button>
  );
};

export default SubmitButton;
