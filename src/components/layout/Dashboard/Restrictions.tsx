import { useNavigate } from "react-router-dom";
import { Switch, Slider, Col } from "antd";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
                        flex: 2,
                        border: `2px solid ${colors.border}`,
                        borderRadius: '20px',
                        backgroundColor: colors.surface,
                        padding: '1rem',
                        overflowY: 'hidden'
                    }}>
                        <h2 style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: colors.text,
                            marginBottom: '1rem'
                        }}>Basic Rules</h2>
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
                            ].map((rule, index) => (
                                <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <Switch defaultChecked onChange={onChange} />
                                    <div>
                                        <div style={{ fontWeight: 600, color: colors.text, fontFamily: "Poppins, sans-serif" }}>{rule.title}</div>
                                        <div style={{ fontSize: '0.875rem', color: colors.textSecondary, fontFamily: "Poppins, sans-serif" }}>{rule.description}</div>
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
                        <h2 style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: colors.text
                        }}>Word Limits</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                                <span style={{ fontFamily: "Poppins, sans-serif", color: colors.text }}>{inputValueStudent}</span>
                                <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, color: colors.text }}>Student Input</span>
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
                                <span style={{ fontFamily: "Poppins, sans-serif", color: colors.text }}>{inputValueAI}</span>
                                <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, color: colors.text }}>AI Response</span>
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
