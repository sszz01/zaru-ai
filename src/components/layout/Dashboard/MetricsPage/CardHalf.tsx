import Grid from '@mui/material/Grid';
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

const styles = {
    primary: {
        color: '#232629',
        fontFamily: 'Poppins',
    },
    secondary: {
        color: '#5e646e',
        fontFamily: 'Poppins',
    },
    metric: {
        color: '#0066ff',
        fontFamily: 'Poppins',
    },
    card: {
		backgroundColor: '#fff',
		borderRadius: '20px',
		padding: '1.5rem',
		border: `2px solid #dddfe2`,
		height: '100%',
		display: 'flex',
		flexDirection: 'column' as const,
    }
}

export function HalfBox({colors, children} : HalfBoxProps) {
    return ( 
        <Grid size={6} sx={styles.card}>
            {children}
        </Grid>
  );
}
