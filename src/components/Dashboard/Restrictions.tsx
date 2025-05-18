import { useNavigate } from "react-router-dom";
import { Switch } from "antd";

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

function Restrictions({colors} : RestrictionsProps) {
    const navigate = useNavigate();

    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

    return (
        <div style={{
            width: "80%",
            height: "80%",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "transparent",
            borderRadius: "20px",
            gap: "1rem",
        }} id="dashboard">
            <div style={{
                position: "absolute",
                top: "3vh",
                left: "40vh",
                textAlign: "center",
                fontSize: "1.75rem",
                fontFamily: "Poppins, sans-serif",
                color: colors.text,
                fontWeight: "bold",
            }}>
                AI Restrictions and Rules
            </div>

            <div style={{
                width: "100%",
                height: "25%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "20px",
                border: `2px solid ${colors.border}`,
                backgroundColor: colors.surface,
                gap: "1rem",
            }}>
            
            </div>

            <div style={{
                width: "100%",
                height: "75%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginTop : "1rem",
            }}>
                
                <div style={{
                        width: "50%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        gap: "1rem",
                        padding: "1rem",
                        borderRadius: "20px",
                        border: `2px solid ${colors.border}`,
                        backgroundColor: colors.surface,
                }}>
                    <div style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: colors.text,
                        fontFamily: "Poppins, sans-serif",
                        textAlign: "center",
                        marginBottom: "1rem",
                        marginLeft: "2%",
                        marginTop: "2%",
                    }}>
                        Basic Rules
                    </div>

                    {/*Rules Container*/}

                    <div style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        gap: "2.5rem",
                        padding: "1rem",
                        marginLeft: "5%",
                    }}>
                        <Switch defaultChecked onChange={onChange} />
                        <Switch defaultChecked onChange={onChange} />
                        <Switch defaultChecked onChange={onChange} />
                        <Switch defaultChecked onChange={onChange} />
                    </div>
                </div>

                <div style={{
                        width: "50%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem",
                        padding: "1rem",
                        borderRadius: "20px",
                        border: `2px solid ${colors.border}`,
                        backgroundColor: colors.surface,
                }}/>

            </div>
        
        </div>
    );            
}

export default Restrictions;