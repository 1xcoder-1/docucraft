// Import Prism core first
import Prism from 'prismjs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// Then import only the languages we need
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-typescript.min.js';

type OutputPaneProps = {
  documentation: string;
  error: string | null;
  isLoading: boolean;
  onCopy: () => void;
};

export default function OutputPane({ documentation, error, isLoading, onCopy }: OutputPaneProps) {
  const handleDownload = () => {
    try {
      const blob = new Blob([documentation], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'documentation.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (_) {
      // no-op
    }
  };

  const handleDownloadPDF = async () => {
    try {
      // Create a temporary element for PDF generation with simplified styling
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.width = '700px'; // Standard width for better rendering
      tempContainer.style.padding = '30px';
      tempContainer.style.background = 'white';
      tempContainer.style.fontFamily = 'Arial, sans-serif';
      tempContainer.style.fontSize = '12px';
      tempContainer.style.lineHeight = '1.6';
      tempContainer.style.color = '#333';
      
      // Add title
      const title = document.createElement('h1');
      title.textContent = 'Code Documentation';
      title.style.fontSize = '20px';
      title.style.fontWeight = 'bold';
      title.style.marginBottom = '20px';
      title.style.color = '#000';
      title.style.borderBottom = '2px solid #333';
      title.style.paddingBottom = '10px';
      tempContainer.appendChild(title);
      
      // Add generated date
      const date = document.createElement('div');
      date.textContent = `Generated on: ${new Date().toLocaleString()}`;
      date.style.fontSize = '11px';
      date.style.marginBottom = '20px';
      date.style.color = '#666';
      tempContainer.appendChild(date);
      
      // Add documentation content with proper formatting
      const content = document.createElement('div');
      content.style.whiteSpace = 'pre-wrap';
      content.style.wordBreak = 'break-word';
      content.style.fontFamily = 'monospace';
      content.style.fontSize = '11px';
      content.style.lineHeight = '1.5';
      
      // Process the documentation content to preserve formatting
      const lines = documentation.split('\n');
      lines.forEach((line) => {
        const lineElement = document.createElement('div');
        lineElement.textContent = line;
        lineElement.style.marginBottom = '2px';
        content.appendChild(lineElement);
      });
      
      tempContainer.appendChild(content);
      
      // Add to document
      document.body.appendChild(tempContainer);
      
      // Generate canvas from the simplified content
      const canvas = await html2canvas(tempContainer, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: tempContainer.scrollWidth,
        windowHeight: tempContainer.scrollHeight
      });
      
      // Create PDF with proper dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });
      
      // Calculate dimensions for better fit
      const imgWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add first page
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add additional pages if content is too long
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Save PDF
      pdf.save('documentation.pdf');
      
      // Clean up
      document.body.removeChild(tempContainer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  // Calculate word count
  const wordCount = documentation ? documentation.trim().split(/\s+/).length : 0;

  // Safe highlighting function for PrismJS with comprehensive error handling
  const highlightDocumentation = () => {
    try {
      // Check if Prism is properly loaded
      if (typeof Prism === 'undefined') {
        console.warn('Prism is not loaded');
        return documentation;
      }

      // Check if languages object exists
      if (!Prism.languages) {
        console.warn('Prism languages not available');
        return documentation;
      }

      // Check if javascript language is available
      if (!Prism.languages.javascript) {
        console.warn('Prism javascript language not available');
        return documentation;
      }

      // Try to highlight the code
      const highlighted = Prism.highlight(documentation, Prism.languages.javascript, 'javascript');
      
      // Log to verify highlighting is working
      console.log('Documentation highlighted successfully');
      console.log('Original documentation length:', documentation.length);
      console.log('Highlighted documentation length:', highlighted.length);
      
      // Check if highlighting actually added HTML tags
      if (highlighted.includes('<span') || highlighted.includes('<code')) {
        console.log('Documentation highlighting contains HTML tags - should be visible');
      } else {
        console.log('Documentation highlighting does not contain HTML tags - might be plain text');
      }
      
      return highlighted;
    } catch (error) {
      console.warn('Error highlighting documentation with PrismJS:', error);
      // Return plain text as fallback to prevent app crashes
      return documentation;
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 shadow-lg p-6 overflow-hidden">
      {/* Decorative corner element */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-purple-500/5 -translate-y-16 translate-x-16"></div>
      
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-md">
            <span className="text-2xl text-white">📤</span>
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Documentation Output</h2>
            <p className="text-xs text-slate-500 font-medium">Generated documentation</p>
          </div>
        </div>
        
        {documentation && (
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-3 py-1.5">
              <span className="text-xs font-bold text-slate-700">📝</span>
              <span className="text-xs font-bold text-slate-700">{wordCount}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onCopy}
                className="h-10 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black transition-colors duration-200 flex items-center gap-2 shadow-md"
                title="Copy to clipboard"
              >
                <span className="sm:hidden">📋</span>
                <span className="hidden sm:inline">📋</span>
                <span className="hidden xs:inline">Copy</span>
              </button>
              <button
                onClick={handleDownload}
                className="h-10 px-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-black transition-colors duration-200 flex items-center gap-2 shadow-md"
                title="Save as text file"
              >
                <span className="sm:hidden">💾</span>
                <span className="hidden sm:inline">💾</span>
                <span className="hidden xs:inline">Save</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="h-10 px-3 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-black transition-colors duration-200 flex items-center gap-2 shadow-md"
                title="Save as PDF"
              >
                <span className="sm:hidden">📄</span>
                <span className="hidden sm:inline">📄</span>
                <span className="hidden xs:inline">PDF</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="relative mb-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 text-red-700 px-5 py-4 text-sm font-medium shadow-md">
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">⚠️</span>
            <div className="flex-1">{error}</div>
          </div>
        </div>
      )}

      {!documentation && !isLoading && !error && (
        <div className="h-[500px] flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-500 text-sm bg-gradient-to-br from-slate-50/50 to-transparent relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-purple-500/10 blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl"></div>
          
          <div className="relative z-10 text-center max-w-xs">
            <div className="text-6xl mb-4 opacity-40">📄</div>
            <h3 className="font-bold text-lg text-slate-700 mb-2">Documentation Preview</h3>
            <p className="font-medium mb-1">Your generated documentation will appear here</p>
            <p className="text-xs opacity-70">Click "Generate Documentation" to start</p>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="h-[500px] rounded-xl border border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100 p-6 overflow-hidden relative shadow-inner flex items-center justify-center">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-blue-500/10 blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl"></div>
          
          {/* Loading content - centered */}
          <div className="relative flex flex-col items-center text-center space-y-6">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center animate-pulse shadow-lg">
                <span className="text-2xl text-white">✨</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-800">Generating Documentation</h3>
              <p className="text-slate-600 max-w-md">
                AI is analyzing your code and crafting comprehensive documentation...
              </p>
            </div>
            
            {/* Loading indicators */}
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}

      {documentation && !isLoading && (
        <div className="relative h-[500px] w-full rounded-xl border border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden shadow-inner documentation-content-container">
          {/* Decorative header bar */}
          <div className="h-8 bg-slate-200/50 border-b border-slate-300 flex items-center px-4">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            </div>
          </div>
          <pre className="h-[calc(500px-2rem)] w-full px-0 py-0 overflow-x-auto overflow-y-auto !bg-transparent" 
               style={{ color: '#333', backgroundColor: 'transparent' }}>
            <code className="language-javascript block px-5 py-4 text-sm leading-relaxed !whitespace-pre !bg-transparent" 
                  style={{ color: '#333', backgroundColor: 'transparent' }}
                  dangerouslySetInnerHTML={{ 
                    __html: highlightDocumentation()
                  }} />
          </pre>
        </div>
      )}
    </div>
  );
}