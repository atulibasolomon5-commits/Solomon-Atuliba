
import { GoogleGenAI } from "@google/genai";
import type { Message } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const formatHistoryForGemini = (history: Message[]) => {
    // Gemini works best if we give it a clear prompt structure.
    return history.map(msg => {
        if (msg.sender === 'me') {
            return `You: ${msg.text}`;
        }
        return `Them (${msg.sender.name}): ${msg.text}`;
    }).join('\n');
};

export const getChatReply = async (history: Message[]): Promise<string> => {
    try {
        const lastMessage = history[history.length - 1];
        if (lastMessage.sender === 'me') {
            const contact = history.find(msg => msg.sender !== 'me')?.sender;
            if (typeof contact === 'object') {
                const prompt = `
You are pretending to be ${contact.name}, having a conversation in a chat app.
Your personality should be helpful and friendly. Keep your responses concise and conversational, like a real text message.
Here is the conversation history:
---
${formatHistoryForGemini(history)}
---
Now, provide a natural response as ${contact.name} to the last message.
`;

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: {
                        temperature: 0.8,
                        topP: 0.95,
                    }
                });

                return response.text.trim();
            }
        }
        return "I'm not sure how to respond to that.";
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Sorry, I encountered an error. Please try again.";
    }
};
