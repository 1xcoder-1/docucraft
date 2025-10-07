import CodeEditor from './CodeEditor';

type InputPaneProps = {
  code: string;
  setCode: (v: string) => void;
  language?: 'javascript' | 'typescript';
};

export default function InputPane({ code, setCode, language = 'javascript' }: InputPaneProps) {
  const clearCode = () => {
    setCode('');
  };

  return (
    <div className="relative bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 shadow-lg p-6 overflow-hidden">
      {/* Decorative corner element */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-500/5 -translate-y-16 translate-x-16"></div>
      
      <div className="relative flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
            <span className="text-2xl text-white">📥</span>
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Code Input</h2>
            <p className="text-xs text-slate-500 font-medium">Paste your code below</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-3 py-1.5">
            <span className="text-xs font-bold text-slate-700">⌨️</span>
            <span className="text-xs font-bold text-slate-700">{code.length}</span>
          </div>
          <button 
            onClick={clearCode}
            disabled={!code}
            className="text-xs px-3 py-1.5 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold flex items-center gap-1"
          >
            <span>🧹</span>
            <span>Clear</span>
          </button>
        </div>
      </div>
      
      <div className="relative rounded-xl overflow-hidden border border-slate-300 shadow-inner">
        <CodeEditor value={code} onChange={setCode} language={language} placeholder="Paste your code here to generate documentation..." />
      </div>
    </div>
  );
}