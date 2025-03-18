import React from "react";

interface Message {
  sender: string;
  content: string;
}

interface ChatBoxProps {
  messages: Message[];
  loading: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, loading }) => {
  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          <p>{msg.content}</p>
        </div>
      ))}
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default ChatBox;
