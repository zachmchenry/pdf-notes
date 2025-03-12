// components/notes/NoteExport.js
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

const NoteExport = ({ noteContent, noteTitle = 'Untitled Note' }) => {
  const [isExporting, setIsExporting] = useState(false);
  
  const exportAsMarkdown = () => {
    setIsExporting(true);
    try {
      // Create and download file
      const blob = new Blob([noteContent], { type: 'text/markdown;charset=utf-8' });
      saveAs(blob, `${noteTitle.replace(/\s+/g, '_')}.md`);
    } catch (error) {
      console.error('Error exporting as Markdown:', error);
    } finally {
      setIsExporting(false);
    }
  };
  
  const exportAsPDF = () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      
      // Simple conversion (for complex HTML, use html2pdf or similar)
      doc.text(noteContent, 10, 10);
      doc.save(`${noteTitle.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error exporting as PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <div className="flex space-x-2">
      <button
        onClick={exportAsMarkdown}
        disabled={isExporting}
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md flex items-center transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Export as Markdown
      </button>
      <button
        onClick={exportAsPDF}
        disabled={isExporting}
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md flex items-center transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Export as PDF
      </button>
    </div>
  );
};

export default NoteExport;
