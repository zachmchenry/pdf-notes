// pages/app.js
import React, { useState, useEffect } from 'react';
import PDFViewer from '../components/pdf/PDFViewer';
import RichTextEditor from '../components/notes/RichTextEditor';
import ResizableLayout, { LayoutToggle } from '../components/layout/ResizableLayout';
import ThemeToggle from '../components/ui/ThemeToggle';

const App = () => {
  const [layout, setLayout] = useState('horizontal');
  const [pdfUrl, setPdfUrl] = useState('');
  const [noteContent, setNoteContent] = useState('');
  
  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const fileUrl = URL.createObjectURL(file);
      setPdfUrl(fileUrl);
    }
  };
  
  // Handle note save
  const handleNoteSave = (content) => {
    setNoteContent(content);
    // Save to localStorage instead of backend
    localStorage.setItem('pdfNotes', content);
  };
  
  // Handle layout change
  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
    localStorage.setItem('layout-preference', newLayout);
  };
  
  // Load saved content on mount
  useEffect(() => {
    // Load layout preference
    const savedLayout = localStorage.getItem('layout-preference');
    if (savedLayout) {
      setLayout(savedLayout);
    }
    
    // Load saved notes
    const savedNotes = localStorage.getItem('pdfNotes');
    if (savedNotes) {
      setNoteContent(savedNotes);
    }
  }, []);
  
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">PDF Notes App</h1>
          
          <div className="flex items-center space-x-4">
            <LayoutToggle layout={layout} onLayoutChange={handleLayoutChange} />
            <ThemeToggle />
            <label htmlFor="file-upload" className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded">
              Open PDF
              <input id="file-upload" type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </div>
      </header>
      
      {/* Main content area */}
      <main className="flex-grow overflow-hidden">
        {pdfUrl ? (
          <ResizableLayout 
            direction={layout} 
            defaultSizes={layout === 'horizontal' ? [60, 40] : [50, 50]}
          >
            <PDFViewer url={pdfUrl} />
            <RichTextEditor content={noteContent} onChange={handleNoteSave} />
          </ResizableLayout>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-lg">
              <h2 className="text-2xl font-bold mb-4">Welcome to PDF Notes App</h2>
              <p className="mb-6">
                Upload a PDF file to get started. You'll be able to view the PDF and take notes side by side.
              </p>
              <label htmlFor="file-upload-main" className="cursor-pointer px-6 py-3 bg-blue-500 text-white rounded-lg inline-block">
                Open PDF
                <input id="file-upload-main" type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
