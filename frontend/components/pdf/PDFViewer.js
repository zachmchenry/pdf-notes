// components/pdf/PDFViewer.js
import React, { useEffect, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ url }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadPDF = async () => {
      const pdf = await pdfjs.getDocument(url).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;
    };

    loadPDF();
  }, [url]);

  return <canvas ref={canvasRef} />;
};

export default PDFViewer;
