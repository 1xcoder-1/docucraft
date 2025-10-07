export default function Header() {
  return (
    <header className="mb-10 md:mb-12 text-center relative">
      {/* Logo and App Name */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
          DocuCraft
        </h1>
      </div>

      {/* Main title */}
      <h2 className="mt-2 text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900">
        <span className="inline-block transform transition-transform hover:scale-105">
          Code Documentation
        </span>
      </h2>
      
      {/* Subtitle with increased size */}
      <p className="mt-5 text-base md:text-lg text-slate-700 font-bold max-w-2xl mx-auto leading-relaxed">
        Transform your code into{' '}
        <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
          beautiful documentation
        </span>
        {' '}in seconds
      </p>
      
      {/* Decorative line with gradient */}
      <div className="mt-8 w-32 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
    </header>
  );
}