import React from "react";
import ArrowUpOutlined from "@ant-design/icons/lib/icons/ArrowUpOutlined";

interface SubmitButtonProps {
  disabled: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        padding: "0.75rem",
        backgroundColor: "#0066ff",
        color: "#e0edf3",
        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
        marginRight: "0.5rem",
        width: "2.5rem",
        height: "2.5rem",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "#0052cc";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "#0066ff";
      }}
    >
      <ArrowUpOutlined style={{ position: "relative" }} />
    </button>
  );
};

export default SubmitButton;
