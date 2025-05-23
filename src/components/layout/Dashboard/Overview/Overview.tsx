import { PieChart } from './PieChart';
import { Metric } from './Metric';
import { HalfBox } from '../HalfBox';
import '@fontsource/poppins/400.css';
import { Typography, Stack, } from '@mui/material';

interface OverviewProps {
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
    }
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
    }
}

const OverviewComponent = ({
    colors,
}: OverviewProps) => {

    return ( 
        <div style={{
                width: "80%",
                height: "80%",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
            }} 
            id="dashboard"
        >

        {/* Title */}      
            <Typography
                sx={{
                    ...styles.primary,
                    fontWeight: 700,
                    position: "absolute",
                    top: "3vh",
                    left: "40vh",
                }}
                variant="h5"
            >
                AI Usage Overview
            </Typography>

        {/* Top Row */}
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    width: "100%",
                    height: "25%",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                }}
            >
                <Metric colors={colors} title="Registered Students" metric="1,200" />
                <Metric colors={colors} title="Total Prompts Asked" metric="5,703" />
                <Metric colors={colors} title="Registered Teachers" metric="102" />
            </Stack>

        {/* Bottom Row */}
            <div style={{
                    width: "100%",
                    height: "75%",
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "1rem",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                }}
            >
            
            {/* Bottom Left Block */}
                <HalfBox colors={colors}>
                    <Typography
                        sx={{
                            ...styles.primary,
                            textAlign: "left",
                            fontWeight: 600,
                            pt: "2rem",
                            pl: "1rem",
                        }}
                        variant="h6"
                    >
                        Frequently Searched Topics
                    </Typography>

                    <PieChart colors={colors}  />   

                </HalfBox>

            {/* Bottom Right Block */}  
                <HalfBox colors={colors}>
                    <Typography
                        sx={{
                            ...styles.primary,
                            mb: "1rem",
                            fontWeight: 600,
                        }}
                        variant="h6"
                    >
                        Frequently Asked Prompts
                    </Typography>
                </HalfBox>
            </div>
        </div>
    );
};

export default OverviewComponent;
