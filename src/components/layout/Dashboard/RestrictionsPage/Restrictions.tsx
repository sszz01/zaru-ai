import { WordLimit } from './WordLimit';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Segmented from 'antd/lib/segmented';
import ConfigProvider from 'antd/lib/config-provider';
import AdvancedRules from "./AdvancedRules";
import BasicRules from "./BasicRules";

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';

interface RestrictionsProps {
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

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

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
        padding: '1rem',
        border: `2px solid #dddfe2`,
    }
}

const height: number = window.innerHeight;

const theme = {
    theme: {
        token: {
            controlHeight: height/20,
            lineWidth: 4,
            controlPaddingHorizontal: 36,
            fontFamily: 'Poppins',
            trackBg: '#dddfe2',
        },
    },
}

function Restrictions({ colors }: RestrictionsProps) {
    const [inputValueStudent, setInputValueStudent] = useState<number>(30);
    const [inputValueAI, setInputValueAI] = useState<number>(100);

    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

    return (
        <Grid container spacing={2} sx={{ width: "80%", height: "80%", }}>

            <Typography
                sx={{
                    ...styles.primary,
                    fontWeight: 700,
                    position: "absolute",
                    top: "5vh",
                    left: "38vh",
                }}
                variant="h5"
            >
                AI Restrictions and Rules
            </Typography>

        {/* Top Block */}
            <Grid size={12} sx={{...styles.card, height: '10%'}}>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" height="100%" gap="5rem">

                    <ConfigProvider theme={theme.theme}>
                        <Segmented<string>
                            options={['Heavy', 'Normal', 'Light', 'Customize', 'Disable']}
                            onChange={(value) => {
                            console.log(value); // string
                            }}
                            defaultValue="Normal"
                            cellPadding={'0.5rem'}
                            size="large"
                            shape="round"
                        />
                    </ConfigProvider>
                {/* Upload Button */}
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        sx={{
                            fontSize: '1rem',
                            backgroundColor: colors.primary,
                            color: '#fbfbfb',
                            fontWeight: 500,
                            fontFamily: "Poppins, sans-serif",
                            textTransform: "none",
                            padding: '0.5rem 1rem',
                            borderRadius: '10px'
                        }}
                    >
                        Upload Files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => console.log(event.target.files)}
                            multiple
                        />
                    </Button>
                </Box>
            </Grid>

        {/* Bottom Row */}
            <Grid container spacing={2} sx={{ height: '90%', width: "100%" }}>

            {/* Left Column */}
                <Stack direction="column" spacing={2} sx={{ flex: 1, width: '50%', height: '100%' }}>
                    
                {/* Upper Left Block */}
                    <Grid size={12} sx={{ ...styles.card, flex: 3, display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
                        <BasicRules />
                    </Grid>

                {/* Bottom Left Block */}
                    <Stack direction="column" alignItems="flex-start" spacing={2} sx={{ ...styles.card, flex: 1 }}>
                        <Typography variant="h6" sx={{...styles.primary, fontWeight: 600, marginBottom: '1rem'}}>
                            Word Limits
                        </Typography>
                        <WordLimit colors={colors} inputValueStudent={inputValueStudent} setInputValueStudent={setInputValueStudent} inputValueAI={inputValueAI} setInputValueAI={setInputValueAI}  />
                    </Stack>
                </Stack>

            {/* Right Block */}
                <div style={{
                    ...styles.card,
                    width: '50%',
                    height: '100%',
                    overflowY: 'auto',
                }}>
                    <AdvancedRules />
                </div>
            </Grid>
        </Grid>
    );
}

export default Restrictions;
