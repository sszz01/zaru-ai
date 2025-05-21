import React from "react";

interface ThirdBoxProps {
  colors: {
    background: string;
    surface: string;
    surfaceAlt: string;
    border: string;
    primary: string;
    primaryLight: string;
    primaryDark: string;
    text: string;
    textSecondary: string;
  };
  children : React.ReactNode;
}
export function ThirdBox({colors, children} : ThirdBoxProps) {
    return (
        <div style={{
            width: window.innerWidth / 3,
            height: '100%',
            display: "flex",
            flexDirection: "column",
            borderRadius: "20px",
            border: `2px solid ${colors.border}`,
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            backgroundColor: colors.surface
        }}>
            {children}         
        </div>
    );
}
  