import { Stack, Typography, Box } from "@mui/material";
import { Col, Slider,} from "antd";
interface WordLimitProps {
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
    inputValueStudent: number;
    setInputValueStudent: (value: number) => void;
    inputValueAI: number;
    setInputValueAI: (value: number) => void;
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
        padding: '1rem',
        border: `2px solid #dddfe2`,
    }
}

export function WordLimit({inputValueStudent, setInputValueStudent, inputValueAI, setInputValueAI, colors}: WordLimitProps) {
    return (
        <Stack direction="column" spacing={2} width="100%">
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <Col span={16}>
                    <Slider min={100} max={1000} step={50} value={inputValueStudent} onChange={value => setInputValueStudent((value as number))} tooltip={{
                    formatter: null
                    }} />
                </Col>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '1rem'
                }}>
                    <Typography variant="h6" sx={{ ...styles.primary,
                        color: colors.primary,
                        fontWeight: 700
                    }}>
                        {inputValueStudent}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ ...styles.primary,
                        fontWeight: 600
                    }}>
                        Student Input
                    </Typography>
                </Box>
            </div>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
        }}>
                                <Col span={16}>
                                    <Slider min={100} max={1500} step={50} value={inputValueAI} onChange={value => setInputValueAI((value as number))} tooltip={{
          formatter: null
        }} />
                                </Col>

                                <Typography variant="h6" sx={{ ...styles.primary,
        position: 'relative',
        color: colors.primary,
        fontWeight: 700
      }}>
                                    {inputValueAI}
                                </Typography>
                                <Typography variant="subtitle2" sx={{ ...styles.primary,
        position: 'relative',
        fontWeight: 600
      }}>
                                    AI Response
                                </Typography>
                            </div>
                        </Stack>
    );
}
  