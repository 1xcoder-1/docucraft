import  { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Controls from './components/Controls';
import InputPane from './components/InputPane';
import OutputPane from './components/OutputPane';
import GenerateButton from './components/GenerateButton';
import Footer from './components/Footer';

// Test PrismJS functionality
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/themes/prism.min.css';

function App() {
  const [code, setCode] = useState<string>('');
  const [documentation, setDocumentation] = useState<string>('');
  const [language, setLanguage] = useState<string>('javascript');
  const [format, setFormat] = useState<string>('JSDoc comments and Markdown summary');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Test PrismJS on component mount
  useEffect(() => {
    // Test if PrismJS is working
    const testCode = 'const x = 1;';
    try {
      const highlighted = Prism.highlight(testCode, Prism.languages.javascript, 'javascript');
      console.log('PrismJS test - Original:', testCode);
      console.log('PrismJS test - Highlighted:', highlighted);
      console.log('PrismJS test - Languages available:', Object.keys(Prism.languages));
    } catch (error) {
      console.error('PrismJS test failed:', error);
    }
  }, []);

  const makePrompt = (): string => {
    const systemInstruction = `You are an expert code documentation assistant. Your task is to analyze the user's provided code block and generate comprehensive documentation. The target language is ${language}. The required output format is ${format}.`;
    const userPrompt = `Generate documentation for the following code block, which is written in ${language}.

\`\`\`${language}
${code}
\`\`\``;
    return `${systemInstruction}\n\n${userPrompt}`;
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(documentation);
    alert('Documentation copied to clipboard!');
  };

  // Sample code for demo purposes
  const loadSampleCode = () => {
    const samples: Record<string, string> = {
      javascript: `function calculateFactorial(n) {
  if (n < 0) throw new Error("Negative numbers not allowed");
  if (n === 0 || n === 1) return 1;
  return n * calculateFactorial(n - 1);
}

class DataProcessor {
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Process an array of data items
   * @param {Array} items - The data items to process
   * @returns {Array} Processed items
   */
  processItems(items) {
    return items.map(item => ({
      ...item,
      processed: true,
      timestamp: Date.now()
    }));
  }
}`,
      typescript: `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserService {
  private users: User[] = [];

  /**
   * Add a new user to the system
   * @param user - The user object to add
   * @returns The added user with generated ID
   */
  addUser(user: Omit<User, 'id'>): User {
    const newUser = {
      ...user,
      id: this.users.length + 1
    };
    this.users.push(newUser);
    return newUser;
  }

  /**
   * Find a user by ID
   * @param id - The ID of the user to find
   * @returns The user if found, undefined otherwise
   */
  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}`
    };
    
    setCode(samples[language] || samples.javascript);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 py-10 md:py-14">
        <Header />

        {/* Feature Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Lightning Fast</h3>
            </div>
            <p className="text-sm text-slate-600">
              Generate comprehensive documentation in seconds with our AI-powered engine.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">🔄</span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Multi-Format</h3>
            </div>
            <p className="text-sm text-slate-600">
              Supports multiple documentation formats including JSDoc, TSDoc, and Markdown.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-200 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">🌐</span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Multi-Language</h3>
            </div>
            <p className="text-sm text-slate-600">
              Works with JavaScript and TypeScript programming languages.
            </p>
          </div>
        </div>

        {/* Controls Card */}
        <Controls
          language={language}
          setLanguage={setLanguage}
          format={format}
          setFormat={setFormat}
          isLoading={isLoading}
          onGenerate={loadSampleCode}
          actionSlot={
            <GenerateButton
              prompt={makePrompt()}
              temperature={0.1}
              onStart={() => { setIsLoading(true); setError(null); setDocumentation(''); }}
              onSuccess={(text) => { setDocumentation(text); setIsLoading(false); }}
              onError={(msg) => { setError('Failed to generate documentation. Error: ' + msg); setIsLoading(false); }}
              className="h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-black transition-all duration-200 flex items-center justify-center gap-3 shadow-lg"
              label={isLoading ? 'Generating...' : '🚀 Generate Documentation'}
            />
          }
        />

        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mt-2">
          {/* Input Card */}
          <InputPane code={code} setCode={setCode} language={language as 'javascript' | 'typescript'} />

          {/* Output Card */}
          <OutputPane
            documentation={documentation}
            error={error}
            isLoading={isLoading}
            onCopy={copyToClipboard}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;