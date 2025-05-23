import React from "react";

interface HalfBoxProps {
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

export function HalfBox({colors, children} : HalfBoxProps) {
    return ( 
        <div style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            borderRadius: "20px",
            border: `2px solid ${colors.border}`,
            gap: "1rem",
            backgroundColor: colors.surface     
        }}>
            {children}
        </div>
  );
}
  