
import { jsPDF } from 'jspdf';

export const generateContractPDF = (content: string, logoUrl: string | null, fileName: string) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  let currentY = 25;

  // 1. Cabecera Minimalista
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(60, 60, 60);
  doc.text('OTILIA', margin, currentY);
  
  // 2. Logo (si existe)
  if (logoUrl) {
    try {
      doc.addImage(logoUrl, 'JPEG', pageWidth - margin - 35, 10, 35, 35);
    } catch (e) {
      console.error("Error adding logo to PDF", e);
    }
  }

  currentY += 12;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 15;

  // 3. Procesar Texto con Salto de Página
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(40, 40, 40);
  
  // Split text and iterate to handle pagination
  const lines = doc.splitTextToSize(content, contentWidth);
  const lineHeight = 5; // Altura de línea aproximada para tamaño 9.5
  
  lines.forEach((line: string) => {
    if (currentY + lineHeight > pageHeight - margin) {
      doc.addPage();
      currentY = margin;
    }
    doc.text(line, margin, currentY);
    currentY += lineHeight;
  });

  doc.save(`${fileName}.pdf`);
};
