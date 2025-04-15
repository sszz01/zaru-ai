# AI Input Filter Assistant

A web app that filters user input based on custom rules before sending to AI models. Built with Express.js backend and React frontend.

✨ Key Features
--------------

-   **Custom Input Filtering System**: Apply your own rules to allow, modify, or block user inputs
-   **GPT Model Integration**: Connect to OpenAI's powerful language models
-   **Multi-Model Support**: Optional integration with Google Gemini when specified
-   **Real-Time Data Access**: Smart detection of time-sensitive queries
-   **Modern React Frontend**: Clean, responsive user interface with typing animations
-   **Firebase Authentication**: Secure user management system

How Filtering Works
-------------------

Before any user input is sent to the OpenAI API, it goes through a **custom filtering function**. This function is designed to:

-   Check for forbidden keywords or phrases (e.g. "write my essay", "generate homework answers")
-   Detect prompt patterns that violate ethical guidelines
-   Return a warning or block the prompt entirely if it doesn't meet standards

You can find the filter logic in:

```
/server/utils/filterInput.js
```

Want to customize it? Just add your own rules and conditions!

🚀 Getting Started
------------------

### Installation

1.  Clone the repository

```
git clone https://github.com/sszz01/filtered-chatgpt.git
```

2.  Install dependencies

```
npm install
```

3.  Rename .env_example to .env and insert your API keys by following the sample

### Running the Application

To run the application locally, follow these steps:

1.  Navigate to filtered-chatgpt/backend directory
2.  Run backend:

```
node server.ts
```

3.  Go back to the root directory and run the app:

```
npm run dev
```

Request Processing Flow
-----------------------

1.  **Client Input**: User submits a message through the chat interface
2.  **Express Server Receives Request**: The request is received by the Express.js server
3.  **Input Filtering**: The custom filtering system analyzes the input to:
    -   Check if it violates any defined rules
    -   Apply any transformations or modifications if needed
    -   Decide whether to allow, modify, or block the request
4.  **Model Selection** (if enabled):
    -   Routes to different AI models based on input analysis
5.  **API Request**: Filtered input is sent to the appropriate AI model
6.  **Response Processing**: Server processes and formats the AI response
7.  **Delivery**: Sends the response back to the client with typing animation effect

🔧 Customizing the Filter
-------------------------

TBD
