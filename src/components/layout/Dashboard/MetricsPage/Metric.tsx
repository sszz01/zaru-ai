import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';

interface MetricProps {
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
  title: React.ReactNode;
  metric: React.ReactNode;
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
    card:{
        backgroundColor: '#fff',
        borderRadius: '20px',
        padding: '1.5rem',
        border: `2px solid #dddfe2`,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}

export function Metric({colors, title, metric} : MetricProps) {
    return (
        <Grid size={4} sx={styles.card}>
            <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center" height="100%">
            
            {/* Title */}
                <Typography 
                    sx={{ 
                        ...styles.secondary,
                        fontWeight: 500
                    }} 
                    variant="h6"
                >
                    {title}
                </Typography>

            {/* Metric */}    
                <Typography 
                    sx={{ 
                        ...styles.metric,
                        fontWeight: 600
                    }} 
                    variant="h3"
                >
                    {metric}
                </Typography>
            </Box>
        </Grid>
    );
}

export default Metric;