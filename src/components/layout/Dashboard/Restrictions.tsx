import { useNavigate } from "react-router-dom";
import { Switch, Slider, Col } from "antd";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
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
    }
}

function Restrictions({ colors }: RestrictionsProps) {
    const navigate = useNavigate();
    const [inputValueStudent, setInputValueStudent] = useState<number>(500);
    const [inputValueAI, setInputValueAI] = useState<number>(1000);

    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

    return (
        <div style={{
            width: '80vw',
            height: '80vh',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        }}>

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
                AI Restrictions and Rules
            </Typography>

        {/* Top Block */}
            <div style={{
                height: '25%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: `2px solid ${colors.border}`,
                borderRadius: '20px',
                backgroundColor: colors.surface,
                padding: '1rem'
            }}>

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
            </div>

        {/* Bottom Row */}
            <div style={{
                height: '75%',
                display: 'flex',
                gap: '1rem'
            }}>

            {/* Left Column */}
                <div style={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    gap: '1rem',
                }}>
                    
                {/* Upper Left Block */}
                    <div style={{
                        flex: 3,
                        border: `2px solid ${colors.border}`,
                        borderRadius: '20px',
                        backgroundColor: colors.surface,
                        padding: '1rem',
                        overflowY: 'auto'
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                                ...styles.primary,
                                fontWeight: 600,
                                marginBottom: '1rem',
                            }}
                        >
                            Basic Rules
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                {
                                    title: "Disable Paste into Chat",
                                    description: "Restricts users from pasting text directly into the chat window."
                                },
                                {
                                    title: "Disable Copy from AI Response",
                                    description: "Restricts users from copying text from AI responses."
                                },
                                {
                                    title: "Disable providing direct solutions",
                                    description: "Restricts the AI from providing direct solutions, instead providing guidance and suggestions."
                                },
                                {
                                    title: "Disable Chat History",
                                    description: "Restricts the AI from using previous chat history for context."
                                }
                            ].map((rule, index) => (
                                <div key={index} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <Switch defaultChecked onChange={onChange} />
                                    <div>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                ...styles.primary,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {rule.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                ...styles.secondary,
                                                fontWeight: 400,
                                            }}
                                        >
                                            {rule.description}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                {/* Bottom Left Block */}
                    <div style={{
                        flex: 1,
                        border: `2px solid ${colors.border}`,
                        borderRadius: '20px',
                        backgroundColor: colors.surface,
                        padding: '1rem',
                        overflowY: 'hidden',
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: 700,
                                color: colors.text,
                                fontSize: '1rem'
                            }}
                        >
                            Word Limits
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Col span={12}>
                                    <Slider
                                        min={100}
                                        max={1000}
                                        step={50}
                                        value={inputValueStudent}
                                        onChange={(value) => setInputValueStudent(value as number)}
                                        tooltip={{ formatter: null }}
                                    />
                                </Col>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontFamily: "Poppins, sans-serif",
                                        color: colors.primary,
                                        fontWeight: 700,
                                        fontSize: '1rem'
                                    }}
                                >
                                    {inputValueStudent}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontFamily: "Poppins, sans-serif",
                                        fontWeight: 600,
                                        color: colors.text,
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    Student Input
                                </Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Col span={12}>
                                    <Slider
                                        min={100}
                                        max={1500}
                                        step={50}
                                        value={inputValueAI}
                                        onChange={(value) => setInputValueAI(value as number)}
                                        tooltip={{ formatter: null }}
                                    />
                                </Col>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontFamily: "Poppins, sans-serif",
                                        color: colors.primary,
                                        fontWeight: 700,
                                        fontSize: '1rem'
                                    }}
                                >
                                    {inputValueAI}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontFamily: "Poppins, sans-serif",
                                        fontWeight: 600,
                                        color: colors.text,
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    AI Response
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>

            {/* Right Block */}
                <div style={{
                    width: '50%',
                    height: '100%',
                    border: `2px solid ${colors.border}`,
                    borderRadius: '20px',
                    backgroundColor: colors.surface,
                    padding: '1rem'
                }}>
                    {/* Content for right card if needed */}
                </div>
            </div>
        </div>
    );
}

export default Restrictions;
