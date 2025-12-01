import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return chatSession;
  } catch (error) {
    console.error("Error initializing Gemini chat:", error);
    throw error;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Извините, сервис временно недоступен (API Key missing). Пожалуйста, позвоните нам.";
  }

  try {
    const chat = initializeChat();
    const result = await chat.sendMessage({ message });
    return result.text || "Извините, я не понял вопрос.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Произошла ошибка связи. Пожалуйста, попробуйте позже.";
  }
};