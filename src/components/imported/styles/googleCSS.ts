import { CSSProperties } from "react";

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const Styles: { [key: string]: CSSProperties } = {
  googlebutton: {
    width: "100%", // Use relative width for responsiveness
    maxWidth: "350px", // Limit the button width
    backgroundColor: "#F2F2F2", // Light background for better contrast
    height: "45px",
    color: "#404040", // Dark text for readability
    fontFamily: "Quicksand, sans-serif",
    fontSize: "15px",
    border: "none", // Remove default border
    borderRadius: "5px", // Add rounded corners
    cursor: "pointer", // Pointer cursor for interactivity
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-color 0.3s ease", // Smooth hover effect
    marginTop: "10px",
    marginBottom: "30px",
  },
  googlebuttonHover: {
    backgroundColor: "#b8d8a9ff", // Slightly darker green on hover
  },

  container: {
    backgroundColor: "lightgrey",
    backgroundSize: "cover", // Ensures the image covers the entire container
    backgroundRepeat: "no-repeat", // Prevents the image from repeating
    backgroundPosition: "center", // Centers the image
    height: `${screenHeight}px`, // Full viewport height
    width: `${screenWidth}px`, // Full viewport width
    margin: 0, // Removes any default margin
    padding: 0, // Removes any default padding
    display: "flex", // Centers content inside
    justifyContent: "center", // Centers content horizontally
    alignItems: "center", // Centers content vertically
    overflow: "hidden", // Prevents overflow
    position: "relative", // Allows for absolute positioning of child elements
    boxSizing: "border-box", // Ensures padding and borders are included in dimensions
  },

  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
    height: "420px",
    width: "400px",
    maxWidth: "90%", // Ensure responsiveness on smaller screens
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  montserrat: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "25px",
    marginBottom: "30px",
  },

  backButton: {
    bottom: "10px",
    borderRadius: "5px",
    margin: "5px",
    backgroundColor: "#c9e4bbff",
    color: "#5496b3ff",
    fontFamily: "Montserrat, sans-serif",
    fontSize: "16px", // Increased font size for better readability
    padding: "10px 60px", // Adjusted padding for better proportions
    cursor: "pointer",
    transition: "background-color 0.3s ease", // Smooth hover effect
  },

  poppins: {
    fontFamily: "Poppins, sans-serif",
    fontSize: "20px",
    color: "#5496b3ff", // Blue text color for consistency
    fontWeight: "500", // Medium weight for better readability
    lineHeight: "1.5", // Improved line spacing
    textAlign: "center", // Center-align the text
    margin: "10px 0", // Add vertical spacing
  },

  fab: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    zIndex: 1, // Ensure the button is above the modal content
    backgroundColor: "transparent",
    color: "#5496b3ff",
    borderRadius: "50%",
    width: "40px", // Fixed size for consistency
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
  },
};

export default Styles;
