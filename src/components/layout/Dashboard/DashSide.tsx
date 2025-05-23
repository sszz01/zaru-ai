import { ConfigProvider, Menu } from "antd";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "../../../../backend/db/firebase/firebase";
import Typography from  "@mui/material/Typography";
import { getBaseStyles, getMenuConfig } from "./DashStyles";
import { MenuProps } from "antd";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowRightOutlined from '@ant-design/icons/lib/icons/ArrowRightOutlined';
import styles from "../../styles/login";

interface DashSideProps {
    handleMenuClick: (key: string) => void;
    darkMode: boolean;
    handleTransition: (action: () => void) => void;
    onClose: () => void;
    Navigate: any;
    styles: ReturnType<typeof getBaseStyles>;
    menuConfig: ReturnType<typeof getMenuConfig>;
}

const textStyles = {
    primary: {
        color: '#232629',
        fontFamily: 'Poppins, sans-serif',
    },
    secondary: {
        color: '#5e646e',
        fontFamily: 'Poppins, sans-serif',
    },
    secondary1: {
        fontFamily: 'Poppins, sans-serif',
    },
    metric: {
        color: '#0066ff',
        fontFamily: 'Poppins, sans-serif',
    }
}

const items: MenuProps["items"] = [
        { 
            key: '1', 
            label: <Typography variant="body1" style={{...textStyles.secondary1}}>Dashboard</Typography>, 
            icon: <DashboardIcon /> 
        },
        {
            key: 'restrictions',
            label: <Typography variant="body1" style={{...textStyles.secondary1}}>AI Restrictions</Typography>,
            icon: <ToggleOnIcon />,
        },
        {
            key: 'studentlist',
            label: <Typography variant="body1" style={{...textStyles.secondary1}}>Registration</Typography>,
            icon: <FormatListNumberedIcon />,
        },
        { 
            key: '2', 
            label: <Typography variant="body1" style={{...textStyles.secondary1}}>Settings</Typography>, 
            icon: <SettingsIcon /> 
        },
        {
            key: 'back',
            label: <Typography variant="body1" style={{...textStyles.secondary1}}>Back to ZaruAI</Typography>,
            icon: <ArrowRightOutlined />,
        },
];

export function DashSide({ handleMenuClick, darkMode, handleTransition, onClose, Navigate, styles, menuConfig, } : DashSideProps) {
    return (
        <div style={styles.sidebar}>

        {/* Logo and title */}
            <div style={styles.logoContainer}>
                <Typography variant="h5" fontWeight={700} style={textStyles.primary}>ZaruAI</Typography>
            </div>

        {/* Menu */}
            <ConfigProvider theme={menuConfig.theme}>
                <Menu 
                    style={{...styles.menu}}
                    defaultSelectedKeys={['1']} 
                    mode="inline" items={items} 
                    onSelect={({key}) => handleMenuClick(key)} 
                    theme={darkMode ? "dark" : "light"} 
                />
            </ConfigProvider>

        {/* Logout button */}
            <div style={styles.logoutButton} 
                onClick={() => {
                    handleTransition(() => {
                    auth.signOut();
                    onClose();
                    Navigate("/");
                });
                }} onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = "#ff0000";
                    e.currentTarget.style.color = "#fff";
                }} onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#ff0000";
                }}
            >
                <LogoutIcon style={{ fontSize: '1.5rem'}} />
                <Typography variant="body1" component="span" sx={{ marginLeft: 0, fontFamily: 'Poppins, sans-serif' }} >
                    Logout
                </Typography>
            </div>
        </div>
    );
}