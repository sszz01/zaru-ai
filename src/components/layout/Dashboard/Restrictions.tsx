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

// --- Styles ---
const styles = {
    container: {
        width: "80%",
        height: "80%",
        justifyContent: "center",
        flexDirection: "column" as const,
        alignItems: "center",
        backgroundColor: "transparent",
        borderRadius: "20px",
        gap: "1rem",
    },
    header: (colors: RestrictionsProps["colors"]) => ({
        position: "absolute" as const,
        top: "3vh",
        left: "40vh",
        textAlign: "center" as const,
        fontSize: "1.75rem",
        fontFamily: "Poppins, sans-serif",
        color: colors.text,
        fontWeight: "bold" as const,
    }),
    section: (colors: RestrictionsProps["colors"]) => ({
        width: "100%",
        height: "25%",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20px",
        border: `2px solid ${colors.border}`,
        backgroundColor: colors.surface,
        gap: "1rem",
    }),
    main: {
        width: "100%",
        height: "75%",
        display: "flex",
        flexDirection: "row" as const,
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        marginTop: "1rem",
    },
    card: (colors: RestrictionsProps["colors"]) => ({
        width: "50%",
        height: "100%",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "1rem",
        borderRadius: "20px",
        border: `2px solid ${colors.border}`,
        backgroundColor: colors.surface,
    }),
    cardHeader: (colors: RestrictionsProps["colors"]) => ({
        fontSize: "1.5rem",
        fontWeight: "bold" as const,
        color: colors.text,
        fontFamily: "Poppins, sans-serif",
        textAlign: "center" as const,
        marginBottom: "1rem",
        marginLeft: "2%",
        marginTop: "2%",
    }),
    rulesContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "1.5rem",
        padding: "1rem",
        marginLeft: "0%",
    },
    ruleRow: {
        display: "flex",
        flexDirection: "row" as const,
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        marginLeft: "0%",
    },
    smallHeader: (colors: RestrictionsProps["colors"]) => ({
        fontSize: 20,
        color: colors.text,
        fontFamily: "Poppins, sans-serif",
        textAlign: "left" as const,
        fontWeight: 700 as const,
    }),
    ruleLabel: (colors: RestrictionsProps["colors"]) => ({
        fontSize: 16,
        color: colors.text,
        fontFamily: "Poppins, sans-serif",
        textAlign: "center" as const,
        fontWeight: 600,
    }),

    smallRuleLabel : (colors: RestrictionsProps["colors"]) => ({
        fontSize: 12,
        color: colors.textSecondary,
        fontFamily: "Poppins, sans-serif",
        textAlign: "center" as const,
        marginLeft: "2%",
        whiteSpace: 'nowrap'
    }),

    sliderRow: (colors: RestrictionsProps["colors"]) => ({
        display: "flex",
        flexDirection: "row" as const,
        alignItems: "center",
        justifyContent: "left",
        gap: "1rem",
        marginLeft: "2%",
        width: "100%",
    }),
    sliderValue: (colors: RestrictionsProps["colors"]) => ({
        fontSize: 16,
        color: colors.text,
        fontFamily: "Poppins, sans-serif",
        textAlign: "center" as const,
    }),
    sliderLabel: (colors: RestrictionsProps["colors"]) => ({
        fontSize: 16,
        color: colors.text,
        fontFamily: "Poppins, sans-serif",
        textAlign: "center" as const,
        marginLeft: "2%",
        fontWeight: 500,
    }),
    rightCard: (colors: RestrictionsProps["colors"]) => ({
        width: "50%",
        height: "100%",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "1rem",
        borderRadius: "20px",
        border: `2px solid ${colors.border}`,
        backgroundColor: colors.surface,
    }),

    leftCard: (colors: RestrictionsProps["colors"]) => ({
        width: "50%",
        height: "100%",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
    }),
};
// --- End Styles ---

function Restrictions({ colors }: RestrictionsProps) {
    const navigate = useNavigate();

    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

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

    const [inputValueStudent, setInputValueStudent] = useState<number>(500);
    const [inputValueAI, setInputValueAI] = useState<number>(1000);

    return (
        <div style={styles.container} id="dashboard">
            <div style={styles.header(colors)}>
                AI Restrictions and Rules
            </div>

            <div style={styles.section(colors)}>
                 <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    sx={{
                        width: "10vw",
                        height: "5vh",
                        display: "flex",
                        flexDirection: "row" as const,
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem",
                        padding: "1rem",
                        borderRadius: "10px",
                        fontSize: 16,
                        backgroundColor: colors.primary,
                        color: '#fbfbfb',
                        fontWeight: 500,
                        fontFamily: "Poppins, sans-serif",
                        textTransform: "none" as const,
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

            <div style={styles.main}>
                <div style={styles.leftCard(colors)}>
                    {/* Basic Rules */}
                    <div style={{ ...styles.card(colors), flex: 2, width: "100%", minHeight: 0 }}>
                        <div style={styles.smallHeader(colors)}>
                            Basic Rules
                        </div>
                        {/* Rules Container */}
                        <div style={styles.rulesContainer}>
                            <div style={styles.ruleRow}>
                                <Switch defaultChecked onChange={onChange} />
                                <div style={{flexDirection: 'column', alignItems: 'flex-start', display: 'flex',}}>
                                    <div style={styles.ruleLabel(colors)}>
                                        Disable Paste into Chat
                                    </div>
                                    <div style={styles.smallRuleLabel(colors)}>
                                        Restricts users from pasting text directly into the chat window.
                                    </div>
                                </div>
                            </div>
                            <div style={styles.ruleRow}>
                                <Switch defaultChecked onChange={onChange} />
                                 <div style={{flexDirection: 'column', alignItems: 'flex-start', display: 'flex',}}>
                                    <div style={styles.ruleLabel(colors)}>
                                        Disable Copy from AI Response
                                    </div>
                                    <div style={styles.smallRuleLabel(colors)}>
                                        Restricts users from copying text from AI responses.
                                    </div>
                                </div>
                            </div>
                            <div style={styles.ruleRow}>
                                <Switch defaultChecked onChange={onChange} />
                                <div style={{flexDirection: 'column', alignItems: 'flex-start', display: 'flex',}}>
                                    <div style={styles.ruleLabel(colors)}>
                                        Disable providing direct solutions
                                    </div>
                                    <div style={styles.smallRuleLabel(colors)}>
                                        Restricts the AI from providing direct solutions, instead providing guidance and suggestions.
                                    </div>
                                </div>
                            </div>
                            <div style={styles.ruleRow}>
                                <Switch defaultChecked onChange={onChange} />
                                <div style={{flexDirection: 'column', alignItems: 'flex-start', display: 'flex',}}>
                                    <div style={styles.ruleLabel(colors)}>
                                        Flag Potentially Inappropriate Prompts
                                    </div>
                                    <div style={styles.smallRuleLabel(colors)}>
                                        Allows the AI to flag potentially inappropriate prompts.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slider Container */}
                    <div style={{ ...styles.card(colors), flex: 1, width: "100%", minHeight: 0, flexDirection: "column" as const, justifyContent: "flex-start" }}>
                        <div style={styles.smallHeader(colors)}>
                            Word Limits
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%", height: "100%", justifyContent: "center" }}>
                            {/* Student Input Word Limit Slider */}
                            <div style={styles.sliderRow(colors)}>
                                <Col span={12}>
                                    <Slider
                                        min={100}
                                        max={1000}
                                        onChange={(value) => setInputValueStudent(value as number)}
                                        value={typeof inputValueStudent === "number" ? inputValueStudent : 0}
                                        step={50}
                                        tooltip={{ formatter: null }}
                                    />
                                </Col>
                                <div style={styles.sliderValue(colors)}>{inputValueStudent}</div>
                                <div style={{...styles.sliderLabel(colors)}}>
                                    Student Input
                                </div>
                            </div>
                            {/* AI Response Word Limit Slider */}
                            <div style={styles.sliderRow(colors)}>
                                <Col span={12}>
                                    <Slider
                                        min={100}
                                        max={1500}
                                        onChange={(value) => setInputValueAI(value as number)}
                                        value={typeof inputValueAI === "number" ? inputValueAI : 0}
                                        step={50}
                                        tooltip={{ formatter: null }}
                                    />
                                </Col>
                                <div style={styles.sliderValue(colors)}>{inputValueAI}</div>
                                <div style={styles.sliderLabel(colors)}>
                                    AI Response
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={styles.rightCard(colors)} />
            </div>
        </div>
    );
}

export default Restrictions;
