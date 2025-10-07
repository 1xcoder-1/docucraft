# DocuCraft - AI-Powered Code Documentation Generator

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/AI-Powered-8E44AD?style=for-the-badge&logo=google&logoColor=white" alt="AI Powered">
</p>



**DocuCraft** is an AI-powered tool that automatically generates beautiful, comprehensive documentation for your code. Simply paste your code, and DocuCraft will create well-structured documentation with JSDoc-style comments and Markdown summaries in seconds.

## 🌟 Features

- **AI-Powered Generation**: Uses Google's Gemini AI to analyze and document your code
- **Multi-Language Support**: Works with JavaScript and TypeScript
- **Multiple Formats**: Generates both JSDoc comments and Markdown summaries
- **Real-time Preview**: See your documentation as it's being generated
- **Export Options**: Copy to clipboard, save as text file, or export as PDF
- **Syntax Highlighting**: Beautiful code highlighting in both input and output panels
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Sample Code**: Try with pre-loaded sample code to see how it works

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Google Gemini API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/1xcoder-1/docucraft.git
   cd docucraft
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up your Google Gemini API key:
   - Create a `.env` file in the root directory
   - Add your API key:
     ```
     VITE_GEMINI_API_KEY=your_actual_api_key_here
     ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 🎯 Usage

1. **Paste Your Code**: Enter your JavaScript or TypeScript code in the input panel
2. **Select Options**: Choose your preferred language and documentation format
3. **Generate Documentation**: Click the "Generate Documentation" button
4. **Review Output**: The generated documentation will appear in the output panel
5. **Export**: Use the Copy, Save, or PDF buttons to export your documentation

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **AI Engine**: Google Gemini API
- **Code Highlighting**: PrismJS
- **PDF Generation**: jsPDF, html2canvas
- **Code Editor**: react-simple-code-editor

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Application header with branding
│   ├── Controls.tsx        # Language and format selection controls
│   ├── InputPane.tsx       # Code input panel with editor
│   ├── OutputPane.tsx      # Documentation output panel
│   ├── GenerateButton.tsx  # AI documentation generation button
│   └── Footer.tsx          # Application footer
├── lib/
│   └── genai.ts            # Google Generative AI integration
├── App.tsx                 # Main application component
├── main.tsx                # Application entry point
└── index.css               # Global styles and PrismJS overrides
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following:

```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

### Customization

You can customize the application by modifying:

- **Styling**: Edit `src/index.css` for global styles
- **Components**: Modify components in `src/components/`
- **AI Settings**: Adjust temperature and model in `src/components/GenerateButton.tsx`

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

s.

## 🙏 Acknowledgments

- Google Gemini AI for powering the documentation generation
- PrismJS for syntax highlighting
- Tailwind CSS for styling
- All the open-source libraries that made this project possible

## 📧 Contact

1xcoder - [twitter](https://twitter.com/11xcoder) - 1xcoder@proton.me

Project Link: [https://github.com/your-username/docucraft](https://github.com/1xcoder/docucraft)

---

<p align="center">
  Made with ❤️ by 1xcoder
</p>
