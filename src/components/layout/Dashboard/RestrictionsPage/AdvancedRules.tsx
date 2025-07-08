import { useState } from "react";
import { Switch, List, Typography, Divider } from "antd";

const { Text } = Typography;

interface Rule {
  key: string;
  label: string;
  description: string;
}

interface Section {
  category: string;
  rules: Rule[];
}

const sections: Section[] = [
  {
    category: "Input Restrictions",
    rules: [
      {
        key: "disablePasting",
        label: "Disable Pasting",
        description:
          "Prevents students from pasting content into the input field.",
      },
      {
        key: "disableCopying",
        label: "Disable Copying",
        description: "Prevents students from copying AI responses.",
      },
      {
        key: "disableRoleplay",
        label: "Disable Roleplay",
        description:
          "Disallows the AI from engaging in roleplay or fictional personas.",
      },
    ],
  },
  {
    category: "Security & Privacy",
    rules: [
      {
        key: "disableFileUploads",
        label: "Disable File Uploads",
        description: "Blocks students from uploading any files.",
      },
      {
        key: "disableExternalLinks",
        label: "Disable External Links",
        description: "Removes all hyperlinks from AI responses.",
      },
      {
        key: "restrictPersonalQueries",
        label: "(AUTOMATIC)Restrict Personal Data Queries",
        description:
          "Prevents asking for personal or identifiable information.",
      },
      {
        key: "enableProfanityFilter",
        label: "Enable Profanity Filter",
        description: "Filters offensive or inappropriate language.",
      },
    ],
  },
  {
    category: "Academic Integrity",
    rules: [
      {
        key: "disableEssayHelp",
        label: "Disable Essay Help",
        description: "Blocks AI-generated long-form essay content.",
      },
      {
        key: "restrictMathSolving",
        label: "Restrict Math Solving",
        description: "Limits AI from solving complex math problems.",
      },
      {
        key: "disableCodeGeneration",
        label: "Disable Code Generation",
        description: "Prevents AI from generating or explaining code.",
      },
      {
        key: "lockHomeworkHelp",
        label: "(TBD)Lock Homework Help (School Hours)",
        description: "Disables help features during school hours.",
      },
      {
        key: "disableTestAnswering",
        label: "Disable Test Answering",
        description: "Prevents AI from assisting with test-related content.",
      },
    ],
  },
  {
    category: "Student Behavior & Guidance",
    rules: [
      {
        key: "restrictPersonality",
        label: "Restrict AI Personality",
        description: "Keeps AI responses strictly academic and neutral.",
      },
      {
        key: "disableHumor",
        label: "Disable Humor or Jokes",
        description: "Prevents the AI from generating humorous content.",
      },
      {
        key: "limitInteractions",
        label: "Limit Interactions",
        description: "Restricts number of requests per session.",
      },
      {
        key: "disableCreativeWriting",
        label: "Disable Creative Writing",
        description:
          "Blocks poetry, storytelling, or fictional content generation.",
      },
    ],
  },
  {
    category: "Teacher/Admin Tools",
    rules: [
      {
        key: "enableFlagNotifications",
        label: "Notify on Flagged Content",
        description: "Sends alerts when students access restricted topics.",
      },
    ],
  },
];

const AdminToggleRulesPanel = () => {
  const [settings, setSettings] = useState<Record<string, boolean>>({});

  const handleToggle = (key: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: checked }));
  };

  const fontFamilyStyle = {
    fontFamily: "Poppins",
  };

  return (
    <div style={{ padding: "0 24px 0 24px" }}>
      <Typography.Title level={4} style={fontFamilyStyle}>
        Advanced Rules
      </Typography.Title>
      {sections.map((section) => (
        <div key={section.category}>
          <Divider orientation="left" style={fontFamilyStyle}>
            {section.category}
          </Divider>
          <List
            itemLayout="horizontal"
            dataSource={section.rules}
            renderItem={({ key, label, description }) => (
              <List.Item
                actions={[
                  <Switch onChange={(checked) => handleToggle(key, checked)} />,
                ]}
              >
                <List.Item.Meta
                  title={
                    <Text strong style={fontFamilyStyle}>
                      {label}
                    </Text>
                  }
                  description={description}
                  style={fontFamilyStyle}
                />
              </List.Item>
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default AdminToggleRulesPanel;
