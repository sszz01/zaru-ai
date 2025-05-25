import React from "react";

interface SettingsProps {
    contentPanelStyle: React.CSSProperties;
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
}
export function Settings({ contentPanelStyle, colors } : SettingsProps) {
    return ( 
        <div style={{ ...contentPanelStyle,
            width: "80%",
            height: "80%"
        }} id="dashboard">
            <h2 style={{
                color: colors.primary,
                marginBottom: "1rem",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "1.5rem"
            }}>
                Coming Soon...
            </h2>
        </div>
    );        
}
  