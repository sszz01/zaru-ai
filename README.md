# AI Input Filter Assistant

A specialized web application that provides intelligent chat assistance while applying custom filtering rules to user inputs. Built with Express.js on the backend and React on the frontend, this project focuses on safe, controlled interactions with large language models.

## 🔍 Core Purpose

This project's primary focus is implementing **customizable filtering rules** that process and validate user inputs before they reach AI models. It serves as both a practical chat application and a framework for controlling what kinds of requests can be sent to language models.

## ✨ Key Features

- **Custom Input Filtering System**: Apply your own rules to allow, modify, or block user inputs
- **GPT Model Integration**: Connect to OpenAI's powerful language models
- **Express.js Backend**: Efficient server-side processing of requests
- **Multi-Model Support**: Optional integration with Google Gemini when specified
- **Real-Time Data Access**: Smart detection of time-sensitive queries
- **Modern React Frontend**: Clean, responsive user interface with typing animations
- **Firebase Authentication**: Secure user management system

## 🧼 How Filtering Works

Before any user input is sent to the OpenAI API, it goes through a **custom filtering function**. This function is designed to:

- Check for forbidden keywords or phrases (e.g. "write my essay", "generate homework answers")
- Detect prompt patterns that violate ethical guidelines
- Return a warning or block the prompt entirely if it doesn't meet standards

You can find the filter logic in:

```bash
/server/utils/filterInput.js
```

Want to customize it? Just add your own rules and conditions!

## 🛠️ Tech Stack

### Frontend

- React with TypeScript
- Material UI components
- Firebase Authentication
- Lucide Icons for UI elements
- DOMPurify for client-side sanitization

### Backend

- Express.js server as the main backend framework
- Custom middleware for input filtering and validation
- OpenAI API integration for language model access
- Optional Google Gemini API integration
- Jina AI for supplementary web search capabilities
- Marked for Markdown parsing
- CORS support for cross-origin requests

## 📋 Prerequisites

Before you begin, ensure you have the following:

- Node.js (v16 or later)
- API keys for:

  - OpenAI (required)
  - Jina AI (required)
  - Google Gemini (optional)

- Firebase project with authentication enabled

## 🚀 Getting Started

### Installation

1. Clone the repository
```bash
git clone https://github.com/sszz01/filtered-chatgpt.git
```
2. Install dependencies

```bash
npm install
```

3. Create a .env file in the root directory by following an example.
4. Create a firebase.ts file in the client/src directory with your Firebase configuration.

### Running the Application

To run the application locally, follow these steps:

1. Navigate to filtered-chatgpt/backend directory
2. Run backend:

```bash
node server.ts
```

3.Run frontend:

```bash
npm run dev
```

4. Use Live Server plugin to open your browser and navigate to http://localhost:5173

## 🧠 Request Processing Flow

1.  **Client Input**: User submits a message through the chat interface
2.  **Express Server Receives Request**: The request is received by the Express.js server
3.  **Input Filtering**: The custom filtering system analyzes the input to:

    - Check if it violates any defined rules
    - Apply any transformations or modifications if needed
    - Decide whether to allow, modify, or block the request

4.  **Model Selection** (if enabled):

    - Routes to different AI models based on input analysis

5.  **API Request**: Filtered input is sent to the appropriate AI model
6.  **Response Processing**: Server processes and formats the AI response
7.  **Delivery**: Sends the response back to the client with typing animation effect

## 🔧 Customizing the Filter

TBD
