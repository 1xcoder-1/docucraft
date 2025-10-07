import { GoogleGenerativeAI } from '@google/generative-ai';

export function getAI() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  if (!apiKey) {
    throw new Error('Missing VITE_GEMINI_API_KEY in .env file');
  }
  return new GoogleGenerativeAI(apiKey);
}