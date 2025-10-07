import Editor from 'react-simple-code-editor';
// Import Prism core first
import Prism from 'prismjs';
// Then import only the languages we need
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-typescript.min.js';

type Props = {
  value: string;
  onChange: (val: string) => void;
  language: 'javascript' | 'typescript';
  placeholder?: string;
};

// Function to safely highlight code with comprehensive error handling
const safeHighlight = (code: string, language: string) => {
  try {
    // Check if Prism is properly loaded
    if (typeof Prism === 'undefined') {
      console.warn('Prism is not loaded');
      return code;
    }

    // Check if languages object exists
    if (!Prism.languages) {
      console.warn('Prism languages not available');
      return code;
    }

    // Check if the specific language is available
    if (!Prism.languages[language]) {
      console.warn(`Prism language '${language}' not available`);
      return code;
    }

    // Try to highlight the code
    const highlighted = Prism.highlight(code, Prism.languages[language], language);
    
    // Log to verify highlighting is working
    console.log('Code highlighted successfully');
    console.log('Original code length:', code.length);
    console.log('Highlighted code length:', highlighted.length);
    
    // Check if highlighting actually added HTML tags
    if (highlighted.includes('<span') || highlighted.includes('<code')) {
      console.log('Highlighting contains HTML tags - should be visible');
    } else {
      console.log('Highlighting does not contain HTML tags - might be plain text');
    }
    
    return highlighted;
  } catch (error) {
    console.warn(`Error highlighting code with language ${language}:`, error);
    // Return plain text as fallback to prevent app crashes
    return code;
  }
};

export default function CodeEditor({ value, onChange, language, placeholder }: Props) {
  const highlight = (code: string) => {
    return safeHighlight(code, language);
  };

  return (
    <div className="relative h-[450px] w-full rounded-lg overflow-x-auto overflow-y-auto">
      <Editor
        value={value}
        onValueChange={onChange}
        highlight={highlight}
        padding={24}
        className="text-sm font-mono bg-transparent text-slate-800 leading-relaxed min-h-full !whitespace-pre"
        style={{ 
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          color: '#333'
        }}
        textareaClassName="focus:outline-none"
        preClassName="!whitespace-pre"
      />
      {!value && placeholder && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 pointer-events-none px-8 text-center">
          <div className="text-5xl mb-4 opacity-40">💻</div>
          <p className="text-lg font-medium">{placeholder}</p>
        </div>
      )}
    </div>
  );
}