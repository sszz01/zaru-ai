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
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50px",
        padding: "0.5rem 0.75rem",
        backgroundColor: "#4a98bd",
        height: "75%",
        color: "#e0edf3",
        transition: "all 0.5s ease-in-out",
        cursor: "pointer",
        marginRight: "0.5rem",
      }}
    >
      <span className="font-bold">Send</span>
      <Send style={{ height: "1.5rem", width: "1.5rem", marginLeft: "0.5rem", color: "#e0edf3" }} />
    </button>
  );
};

export default SubmitButton;
