import  { useState } from 'react';
import { Switch, List, Typography, Divider } from 'antd';
const { Text } = Typography;

const basicRules = [
    {
        key: 'disableCopying',
        label: 'Disable Copying',
        description: 'Prevents students from copying AI responses.',
    },
    {
        key: 'disablePasting',
        label: 'Disable Pasting',
        description: 'Prevents students from pasting content into the input field.',
    },
    {
        key: 'enableProfanityFilter',
        label: 'Enable Profanity Filter',
        description: 'Filters offensive or inappropriate language.',
    },
    {
        key: 'disableEssayHelp',
        label: 'Disable Essay Help',
        description: 'Blocks AI-generated long-form essay content.',
    },
    {
        key: 'disableRoleplay',
        label: 'Disable Roleplay',
        description: 'Disallows the AI from engaging in roleplay or fictional personas.',
    },
];

const fontFamilyStyle = { fontFamily: 'Poppins, sans-serif' };

const BasicRules = () => {
        const [settings, setSettings] = useState<Record<string, boolean>>({});

        interface SettingsState {
                [key: string]: boolean;
        }

        const handleToggle = (key: string, checked: boolean) => {
                setSettings((prev: SettingsState) => ({ ...prev, [key]: checked }));
                // Optional: Send update to backend here
        };
        return (
                <div style={{ padding: "0 24px 0 24px", ...fontFamilyStyle }}>
                        <Typography.Title level={4} style={fontFamilyStyle}>Basic Rules</Typography.Title>
                        <List
                                itemLayout="horizontal"
                                dataSource={basicRules}
                                renderItem={({ key, label, description }) => (
                                        <List.Item
                                                actions={[
                                                        <Switch
                                                                checked={!!settings[key]}
                                                                onChange={checked => handleToggle(key, checked)}
                                                        />
                                                ]}
                                                style={fontFamilyStyle}
                                        >
                                                <List.Item.Meta
                                                        title={<Text strong style={fontFamilyStyle}>{label}</Text>}
                                                        description={<span style={fontFamilyStyle}>{description}</span>}
                                                />
                                        </List.Item>
                                )}
                        />
                </div>
        );
};

export default BasicRules;