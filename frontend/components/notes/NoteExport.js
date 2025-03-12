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
        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
      >
        Export as Markdown
      </button>
      <button
        onClick={exportAsPDF}
        disabled={isExporting}
        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
      >
        Export as PDF
      </button>
    </div>
  );
};

export default NoteExport;
