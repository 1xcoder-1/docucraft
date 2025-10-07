import { useState } from 'react';

type ControlsProps = {
  language: string;
  setLanguage: (v: string) => void;
  format: string;
  setFormat: (v: string) => void;
  isLoading: boolean;
  onGenerate?: () => void;
  actionSlot?: React.ReactNode;
};

export default function Controls({ language, setLanguage, format, setFormat, isLoading, onGenerate, actionSlot }: ControlsProps) {
  const [showLanguageInfo, setShowLanguageInfo] = useState(false);
  const [showFormatInfo, setShowFormatInfo] = useState(false);

  // Language descriptions
  const languageDescriptions: Record<string, string> = {
    javascript: "JavaScript with React support - Perfect for frontend components",
    typescript: "TypeScript with TSDoc support - Enhanced type safety",
    python: "Python with docstring support - Ideal for data science projects",
    java: "Java with Javadoc support - Great for enterprise applications",
    c: "C programming language - Foundation for system programming",
    cpp: "C++ with Doxygen support - Object-oriented extensions to C",
    csharp: "C# with XML documentation - Microsoft's object-oriented language",
    go: "Go with Godoc support - Simple, efficient language by Google",
    ruby: "Ruby with RDoc support - Dynamic, interpreted language",
    php: "PHP with PHPDoc support - Server-side scripting language",
    rust: "Rust with rustdoc support - Systems programming language focused on safety",
    swift: "Swift with SwiftDoc support - Apple's modern programming language",
    kotlin: "Kotlin with KDoc support - Modern language for JVM and Android",
    scala: "Scala with Scaladoc support - Object-oriented and functional language",
    perl: "Perl with POD documentation - Powerful scripting language",
    lua: "Lua with comment support - Lightweight embeddable scripting language",
    dart: "Dart with doc comments - Client-optimized language for fast apps",
    elixir: "Elixir with moduledoc support - Functional, concurrent language"
  };

  // Format descriptions
  const formatDescriptions: Record<string, string> = {
    "JSDoc comments and Markdown summary": "Detailed JSDoc/TSDoc comments with a comprehensive Markdown overview",
    "README.md section": "Formatted documentation ready to be added to your README file",
    "Clean Markdown summary only": "Concise Markdown documentation without code comments"
  };

  return (
    <div className="relative bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 shadow-lg p-6 mb-8 overflow-hidden">
      {/* Decorative corner element */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-indigo-500/5 -translate-y-16 translate-x-16"></div>
      
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
        <label className="flex flex-col gap-2.5">
          <span className="text-sm font-black text-slate-700 flex items-center gap-2.5">
            <span className="text-lg">💻</span> 
            <span className="tracking-wide">Programming Language</span>
            <button 
              onMouseEnter={() => setShowLanguageInfo(true)}
              onMouseLeave={() => setShowLanguageInfo(false)}
              className="text-sm text-blue-500 hover:text-blue-700 font-bold"
            >
              ⓘ
            </button>
          </span>
          {showLanguageInfo && (
            <div className="absolute z-10 mt-2 p-4 bg-white border border-slate-200 rounded-xl shadow-lg text-sm max-w-xs font-medium">
              {languageDescriptions[language] || "Select a programming language"}
            </div>
          )}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="h-12 rounded-xl border border-slate-300 bg-white px-5 text-base font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer shadow-sm"
          >
            <option value="javascript">🟨 JavaScript (React)</option>
            <option value="typescript">🔷 TypeScript (TSDoc)</option>
            <option value="python">🐍 Python (Docstrings)</option>
            <option value="java">☕ Java (Javadoc)</option>
            <option value="c">🇨 C (Doxygen)</option>
            <option value="cpp">🇨‌🇵‌🇵 C++ (Doxygen)</option>
            <option value="csharp">☪ C# (XML Docs)</option>
            <option value="go">🇬 Go (Godoc)</option>
            <option value="ruby">🇷 Ruby (RDoc)</option>
            <option value="php">🇵 PHP (PHPDoc)</option>
            <option value="rust">🇷‌🇺‌🇸‌🇹 Rust (rustdoc)</option>
            <option value="swift">🇸 Swift (SwiftDoc)</option>
            <option value="kotlin">🇰 Kotlin (KDoc)</option>
            <option value="scala">🇸‌🇨 Scala (Scaladoc)</option>
            <option value="perl">🇵‌🇪 Perl (POD)</option>
            <option value="lua">🇱 Lua (Comments)</option>
            <option value="dart">🇩 Dart (Doc Comments)</option>
            <option value="elixir">🇪 Elixir (Moduledoc)</option>
          </select>
        </label>

        <label className="flex flex-col gap-2.5">
          <span className="text-sm font-black text-slate-700 flex items-center gap-2.5">
            <span className="text-lg">📝</span> 
            <span className="tracking-wide">Documentation Format</span>
            <button 
              onMouseEnter={() => setShowFormatInfo(true)}
              onMouseLeave={() => setShowFormatInfo(false)}
              className="text-sm text-blue-500 hover:text-blue-700 font-bold"
            >
              ⓘ
            </button>
          </span>
          {showFormatInfo && (
            <div className="absolute z-10 mt-2 p-4 bg-white border border-slate-200 rounded-xl shadow-lg text-sm max-w-xs font-medium md:left-auto md:right-0">
              {formatDescriptions[format] || "Select a documentation format"}
            </div>
          )}
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="h-12 rounded-xl border border-slate-300 bg-white px-5 text-base font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer shadow-sm"
          >
            <option value="JSDoc comments and Markdown summary">📚 JSDoc/TSDoc & Markdown</option>
            <option value="README.md section">📖 README.md Section</option>
            <option value="Clean Markdown summary only">✨ Markdown Summary Only</option>
          </select>
        </label>

        {actionSlot ?? (
          <button
            onClick={onGenerate}
            disabled={isLoading}
            className="h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-black transition-all duration-200 flex items-center justify-center gap-3 shadow-lg"
          >
            {isLoading ? (
              <>
                <span className="animate-spin text-lg">🌀</span>
                <span className="text-base">Generating...</span>
              </>
            ) : (
              <>
                <span className="text-lg">🚀</span>
                <span className="text-base">Generate Documentation</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}