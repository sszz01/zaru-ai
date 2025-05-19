import { useNavigate } from "react-router-dom";
import { Switch, Slider, Col } from "antd";
import { useState } from "react";
import { InputNumberProps } from "antd";

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
        gap: "0rem",
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
        gap: "2rem",
        padding: "1rem",
        marginLeft: "5%",
    },
    ruleRow: {
        display: "flex",
        flexDirection: "row" as const,
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        marginLeft: "2%",
    },
    smallHeader: (colors: RestrictionsProps["colors"]) => ({
        fontSize: 18,
        color: colors.text,
        fontFamily: "Poppins, sans-serif",
        textAlign: "left" as const,
        fontWeight: 600 as const,
        marginLeft: "-2rem",
    }),
    ruleLabel: (colors: RestrictionsProps["colors"]) => ({
        fontSize: 16,
        color: colors.text,
        fontFamily: "Poppins, sans-serif",
        textAlign: "center" as const,
    }),
    sliderRow: (colors: RestrictionsProps["colors"]) => ({
        display: "flex",
        flexDirection: "row" as const,
        alignItems: "center",
        justifyContent: "left",
        gap: "1rem",
        marginLeft: "2%",
        width: "85%",
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

    const [inputValueStudent, setInputValueStudent] = useState<number>(100);
    const [inputValueAI, setInputValueAI] = useState<number>(500);

    return (
        <div style={styles.container} id="dashboard">
            <div style={styles.header(colors)}>
                AI Restrictions and Rules
            </div>

            <div style={styles.section(colors)}></div>

            <div style={styles.main}>
                <div style={styles.leftCard(colors)}>
                    {/* Basic Rules */}
                    <div style={{...styles.card(colors), flex: 2, width: "100%"}}>
                        <div style={styles.cardHeader(colors)}>
                            Basic Rules
                        </div>

                        {/* Rules Container */}
                        <div style={styles.rulesContainer}>
                            <div style={styles.ruleRow}>
                                <Switch defaultChecked onChange={onChange} />
                                <div style={styles.ruleLabel(colors)}>
                                    Disable Paste into Chat
                                </div>
                            </div>

                            <div style={styles.ruleRow}>
                                <Switch defaultChecked onChange={onChange} />
                                <div style={styles.ruleLabel(colors)}>
                                    Disable Copy from AI Response
                                </div>
                            </div>

                            <div style={styles.ruleRow}>
                                <Switch defaultChecked onChange={onChange} />
                                <div style={styles.ruleLabel(colors)}>
                                    Disable Providing Direct Solutions
                                </div>
                            </div>

                            <div style={styles.ruleRow}>
                                <Switch defaultChecked onChange={onChange} />
                                <div style={styles.ruleLabel(colors)}>
                                    Flag Potentially Inappropriate Prompts
                                </div>
                            </div>
                        </div>  
                    </div>

                    {/* Slider Container */}
                    <div style={{...styles.card(colors), flex: 1, width: "100%"}}>
                        <div style={styles.sliderRow(colors)}>
                            <div style={styles.smallHeader(colors)}>
                                Word Limits
                            </div>

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
                                <div style={styles.sliderLabel(colors)}>
                                    Student Input Word Limit
                                </div>
                            </div>

                            <div style={{...styles.sliderRow(colors),}}>
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
                                        AI Response Word Limit
                                    </div>
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
