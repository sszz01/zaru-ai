import { CSSProperties } from "react";
import BackgroundImage from "../../../assets/background.svg";

// const screenWidth = window.innerWidth;
// const screenHeight = window.innerHeight;

const styles: { [key: string]: CSSProperties } = {
  container: {
    backgroundImage: `url(${BackgroundImage})`, // Preload this image in index.html
    backgroundSize: "cover", // Ensures the image covers the entire container
    backgroundRepeat: "no-repeat", // Prevents the image from repeating
    backgroundPosition: "center", // Centers the image
    height: "100vh", // Use relative units for better responsiveness
    width: "100vw", // Use relative units for better responsiveness
    margin: 0, // Removes any default margin
    padding: 0, // Removes any default padding
    display: "flex", // Centers content inside
    justifyContent: "center", // Centers content horizontally
    alignItems: "center", // Centers content vertically
    overflow: "hidden", // Prevents overflow
    boxSizing: "border-box", // Ensures padding and borders are included in dimensions
  },
  fab: {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "#c9e4bbff",
    color: "#5496b3ff",
    borderRadius: "50%", // Add rounded corners for consistency
    width: "40px", // Fixed size for consistency
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer", // Pointer cursor for interactivity
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add subtle shadow
  },
  buttonContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    bottom: "20%", // Use relative positioning for better responsiveness
  },
  button: {
    width: "250px",
    backgroundColor: "#a8d4a0", // Green background for consistency
    height: "65px",
    color: "#5496b3ff", // Blue text color for contrast
    fontWeight: "bold",
    fontFamily: "Quicksand, sans-serif",
    fontSize: "1.5rem", // Use relative units for better scaling
    textAlign: "center",
    borderRadius: "8px", // Add rounded corners for a modern look
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add subtle shadow
    cursor: "pointer", // Pointer cursor for interactivity
    transition: "background-color 0.3s ease", // Smooth hover effect
  },
  extendedFab: {
    backgroundColor: "#a8d4a0",
    color: "#5496b3ff",
    fontWeight: "bold",
    fontFamily: "Quicksand, sans-serif",
    fontSize: "1rem", // Use relative units for better scaling
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add subtle shadow
    cursor: "pointer", // Pointer cursor for interactivity
    transition: "background-color 0.3s ease", // Smooth hover effect
  },

  poppins: {
    fontFamily: "Poppins, sans-serif",
    fontSize: "20px",
    color: "#5496b3ff", // Blue text color for consistency
    fontWeight: "700", // Medium weight for better readability
    lineHeight: "1.5", // Improved line spacing
    textAlign: "center", // Center-align the text
    margin: "10px 0", // Add vertical spacing
  },
};

export default styles;
