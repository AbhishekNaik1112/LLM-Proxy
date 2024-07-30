// llm.js
import OpenAI from "openai";
import readline from "readline";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_KEY;

const openai = new OpenAI({
  apiKey: API_KEY,
  baseURL: "https://api.pawan.krd/cosmosrp/v1",
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = () => {
  rl.question(
    'Enter your message (type "exit" to quit): ',
    async (userInput) => {
      if (userInput.toLowerCase() === "exit") {
        rl.close();
        return;
      }

      try {
        const chatCompletion = await openai.chat.completions.create({
          messages: [{ role: "user", content: userInput }],
          model: "gpt-3.5-turbo",
        });

        console.log(chatCompletion.choices[0].message.content);
      } catch (error) {
        console.error("Error:", error);
      }

      askQuestion();
    }
  );
};

askQuestion();
