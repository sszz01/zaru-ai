# ZaruAI Input Filter Assistant

ZaruAI is a web app that filters user input based on custom rules before sending to AI models. Built with Express.js backend and React frontend.

✨ Key Features
--------------

- **Custom Input Filtering System**: Apply your own rules to allow, modify, or block user inputs
- **GPT Model Integration**: Connect to OpenAI's powerful language models
- **Multi-Model Support**: Optional integration with Google Gemini when specified
- **Real-Time Data Access**: Smart detection of time-sensitive queries
- **Modern React Frontend**: Clean, responsive user interface with typing animations
- **Firebase Authentication**: Secure user management system

How Filtering Works
-------------------

Before any user input is sent to the OpenAI API, it goes through a **custom filtering function**. This function is designed to:

- Check for forbidden keywords or phrases (e.g. "write my essay", "generate homework answers")
- Detect prompt patterns that violate ethical guidelines
- Return a warning or block the prompt entirely if it doesn't meet standards

You can find the filter logic in ``` contentFilter.ts ``` which is a middleware for the main backend server.


🚀 Getting Started
------------------

### Installation

1. Clone the repository

```
git clone https://github.com/sszz01/filtered-chatgpt.git
```

2. Install dependencies

```
npm install
```

3. Rename .env_example to .env and insert your API keys by following the sample

### Running the Application

To run the application locally, follow these steps:

1. Navigate to filtered-chatgpt/backend directory
2. Run backend server:

```
npx tsx server.ts
```

3. Create a new terminal
4. In the new terminal, run the app from the root folder:

```
npm run dev
```

Request Processing Flow
-----------------------

1. User submits a message through the chat interface
2. The request is received by the Express.js server
3. The custom filtering system analyzes the input to:
    -   Check if it violates any defined rules
    -   Apply any transformations or modifications if needed
    -   Decide whether to allow, modify, or block the request
4. Model Selection(if enabled):
    -   Routes to different AI models based on input analysis
5. Filtered input is sent to the appropriate AI model
6. Server processes and formats the AI response
7. Sends the response back to the client with typing animation effect

🔧 Customizing the Filter
-------------------------
Want to customize it? Just add your own rules and conditions!
Here's how to do it:
COMING SOON



