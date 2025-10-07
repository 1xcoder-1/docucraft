import { getAI } from '../lib/genai';

type Props = {
  prompt: string;
  temperature?: number;
  onStart?: () => void;
  onSuccess?: (text: string) => void;
  onError?: (message: string) => void;
  className?: string;
  label?: string;
};

export default function GenerateButton({ prompt, temperature = 0.1, onStart, onSuccess, onError, className, label = 'Generate Documentation' }: Props) {
  const handleClick = async () => {
    try {
      onStart?.();
      const ai = getAI();
      // Fix: Use getGenerativeModel() to get the model first, then call generateContent()
      const model = ai.getGenerativeModel({ 
        model: 'gemini-2.5-flash-preview-05-20',
        generationConfig: { temperature }
      });
      const result = await model.generateContent(prompt);
      const text: string = result.response.text() ?? '';
      onSuccess?.(text);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      onError?.(msg);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className || 'h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-black transition-all duration-200 flex items-center justify-center gap-3 shadow-lg'}
    >
      {label}
    </button>
  );
}