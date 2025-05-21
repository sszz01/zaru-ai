import { HalfBox } from './HalfBox';
import { ThirdBox } from './ThirdBox';
import React from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import '@fontsource/poppins/400.css';
import { Box, Typography, Stack } from '@mui/material';

interface  OverviewProps {
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
  }
  Styles: {
    title: React.CSSProperties;
  }
}
const OverviewComponent = ({
  colors,
  Styles
}: OverviewProps) => {

    const data = [
        { label: 'Math', value: 10, color: '#1976d2' },
        { label: 'History', value: 20, color: '#9c27b0' },
        { label: 'English', value: 30, color: '#f44336' },
        { label: 'Science', value: 40, color: '#4caf50' },
    ];

    return ( 
        <div style={{
            width: "80%",
            height: "80%",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
        }} id="dashboard">
                
            <div style={{ ...Styles.title,
                position: "absolute",
                top: "3vh",
                left: "40vh",
                textAlign: "center",
                fontSize: "1.75rem",
                fontFamily: "Poppins, sans-serif",
                color: colors.text
            }}>
                AI Usage Overview
            </div>

            <div style={{
                width: "100%",
                height: '25%',
                display: "flex",
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
            }}>

                <ThirdBox colors={colors}>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        height: "100%",
                        paddingLeft: "0rem"
                    }}>
                        <span style={{
                            color: colors.textSecondary,
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "1.25rem",
                            fontWeight: 500,
                            letterSpacing: "1px",
                            marginBottom: "0.5rem",
                            textTransform: "uppercase"
                        }}>
                            Registered Students
                        </span>
                        <span style={{
                            color: colors.primary,
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "2.8rem",
                            fontWeight: 700,
                            lineHeight: 1,
                            letterSpacing: "2px"
                        }}>
                            1,200
                        </span>
                    </div>

                </ThirdBox>

                <ThirdBox colors={colors}>
                    
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        height: "100%",
                        paddingLeft: "1.5rem"
                    }}>
                        <span style={{
                            color: colors.textSecondary,
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "1.25rem",
                            fontWeight: 500,
                            letterSpacing: "1px",
                            marginBottom: "0.5rem",
                            textTransform: "uppercase"
                        }}>
                            Total Prompts Asked
                        </span>
                        <span style={{
                            color: colors.primary,
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "2.8rem",
                            fontWeight: 700,
                            lineHeight: 1,
                            letterSpacing: "2px"
                        }}>
                            5,703
                        </span>
                    </div>

                </ThirdBox>

                <ThirdBox colors={colors}>
                    

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        height: "100%",
                        paddingLeft: "1.5rem"
                    }}>
                        <span style={{
                            color: colors.textSecondary,
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "1.25rem",
                            fontWeight: 500,
                            letterSpacing: "1px",
                            marginBottom: "0.5rem",
                            textTransform: "uppercase"
                        }}>
                            Registered Teachers
                        </span>
                        <span style={{
                            color: colors.primary,
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "2.8rem",
                            fontWeight: 700,
                            lineHeight: 1,
                            letterSpacing: "2px"
                        }}>
                            102
                        </span>
                    </div>
                </ThirdBox>
            </div>

            <div style={{
                width: "100%",
                height: "75%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "1rem",
                gap: "1rem",
            }}>

                <HalfBox colors={colors}>

                    <div style={{
                        fontSize: 18,
                        color: colors.text,
                        fontFamily: "Poppins, sans-serif",
                        textAlign: "left" as const,
                        fontWeight: 600 as const,
                    }}>
                        Basic Rules
                    </div>

                <Box display="flex" alignItems="center" gap={4}>
                    <PieChart
                        series={[
                        {
                            data,
                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            innerRadius: 20,
                            outerRadius: 150,
                        },
                        ]}
                        width={300}
                        height={400}
                        hideLegend={true}
                    />

                    {/* Custom Legend */}
                    <Stack spacing={1}>
                        {data.map((item) => (
                        <Box key={item.label} display="flex" alignItems="center" gap={1}>
                            <Box
                            sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: item.color,
                            }}
                            />
                            <Typography
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: colors.text,
                            }}
                            >
                            {item.label}
                            </Typography>
                        </Box>
                        ))}
                    </Stack>
                    </Box>
                                    
                </HalfBox>

                <HalfBox colors={colors}>
                    <h2 style={{
                        color: colors.text,
                        marginBottom: "1rem",
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "1.3rem",
                        fontWeight: 600,
                    }}>
                        Frequently Asked Prompts
                    </h2>
                </HalfBox>
            
            </div>

        </div>
    );
};

export default OverviewComponent;
