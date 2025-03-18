import React from "react";

interface SubmitButtonProps {
  onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick }) => (
  <button
    type="submit"
    style={{ marginLeft: "10px", padding: "10px" }}
    onClick={onClick}
  >
    Submit
  </button>
);

export default SubmitButton;
