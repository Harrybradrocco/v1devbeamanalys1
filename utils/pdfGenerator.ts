import jsPDF from 'jspdf'
import 'jspdf-autotable'
import html2canvas from 'html2canvas'

export async function generatePDF(data: any) {
  try {
    console.log('Starting PDF generation');
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;

    // Helper function to add text with automatic line breaks
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number): number => {
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y);
      return y + (lines.length * lineHeight);
    };

    console.log('Adding title and date');
    // Title
    pdf.setFontSize(18);
    pdf.text('Beam Analysis Report', pageWidth / 2, 20, { align: 'center' });
    
    // Date
    pdf.setFontSize(12);
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    pdf.text(`Date: ${date}`, pageWidth / 2, 30, { align: 'center' });
    
    // Enhanced Load Calculator
    pdf.setFontSize(14);
    pdf.text('Enhanced Load Calculator', pageWidth / 2, 40, { align: 'center' });

    let yOffset = 60;

    console.log('Adding beam configuration');
    // 1. Beam Configuration
    pdf.setFontSize(14);
    pdf.text('1. Beam Configuration', margin, yOffset);
    yOffset += 10;
    pdf.setFontSize(12);
    yOffset = addWrappedText(`Type: ${data.beamType}`, margin, yOffset, pageWidth - 2 * margin, 6);
    yOffset = addWrappedText(`Length: ${data.beamLength} mm`, margin, yOffset, pageWidth - 2 * margin, 6);
    yOffset = addWrappedText(`Material: ${data.material}`, margin, yOffset, pageWidth - 2 * margin, 6);
    yOffset = addWrappedText(`Cross Section: ${data.beamCrossSection}`, margin, yOffset, pageWidth - 2 * margin, 6);
    yOffset += 10;

    console.log('Adding applied loads');
    // 2. Applied Loads
    pdf.setFontSize(14);
    pdf.text('2. Applied Loads', margin, yOffset);
    yOffset += 10;
    pdf.setFontSize(12);
    yOffset = addWrappedText(`Load 1:`, margin, yOffset, pageWidth - 2 * margin, 6);
    yOffset = addWrappedText(`  • Type: ${data.loadType.toLowerCase()}`, margin, yOffset, pageWidth - 2 * margin, 6);
    yOffset = addWrappedText(`  • Force: ${data.loadMagnitude}N`, margin, yOffset, pageWidth - 2 * margin, 6);
    yOffset = addWrappedText(`  • Distance: ${data.loadStartPosition} mm`, margin, yOffset, pageWidth - 2 * margin, 6);
    if (data.loadType === 'Uniform Load') {
      yOffset = addWrappedText(`  • End Distance: ${data.loadEndPosition} mm`, margin, yOffset, pageWidth - 2 * margin, 6);
    }
    yOffset = addWrappedText(`  • Angle: 90°`, margin, yOffset, pageWidth - 2 * margin, 6);
    yOffset += 10;

    console.log('Adding analysis results');
    // 3. Analysis Results
    pdf.setFontSize(14);
    pdf.text('3. Analysis Results', margin, yOffset);
    yOffset += 10;
    pdf.setFontSize(12);
    
    pdf.autoTable({
      head: [['Parameter', 'Value', 'Unit']],
      body: [
        ['Resultant Force', data.loadMagnitude.toFixed(2), 'N'],
        ['Resultant Angle', '90.00', '°'],
        ['Max Shear Force', data.results.maxShearForce.toFixed(2), 'N'],
        ['Max Bending Moment', data.results.maxBendingMoment.toFixed(2), 'N·mm'],
        ['Max Normal Stress', data.results.maxNormalStress.toFixed(2), 'MPa'],
        ['Max Shear Stress', data.results.maxShearStress.toFixed(2), 'MPa'],
        ['Max Deflection', '0.00', 'mm'],
        ['Safety Factor', data.results.safetyFactor.toFixed(2), '-'],
      ],
      startY: yOffset,
      margin: { left: margin },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 60 },
        2: { cellWidth: 30 },
      },
    });

    yOffset = (pdf as any).lastAutoTable.finalY + 10;

    console.log('Adding force diagrams');
    // 4. Force Diagrams
    pdf.addPage();
    yOffset = 20;
    pdf.setFontSize(14);
    pdf.text('4. Force Diagrams', margin, yOffset);
    yOffset += 20;

    // Shear Force Diagram
    console.log('Generating shear force diagram');
    const shearForceCanvas = await html2canvas(document.querySelector('#shearForceDiagram') as HTMLElement);
    const shearForceImgData = shearForceCanvas.toDataURL('image/png');
    pdf.addImage(shearForceImgData, 'PNG', margin, yOffset, pageWidth - 2 * margin, 80);
    yOffset += 85;
    pdf.setFontSize(12);
    pdf.text('Figure 4.1: Shear Force Diagram', pageWidth / 2, yOffset, { align: 'center' });
    yOffset += 20;

    // Bending Moment Diagram
    console.log('Generating bending moment diagram');
    const bendingMomentCanvas = await html2canvas(document.querySelector('#bendingMomentDiagram') as HTMLElement);
    const bendingMomentImgData = bendingMomentCanvas.toDataURL('image/png');
    pdf.addImage(bendingMomentImgData, 'PNG', margin, yOffset, pageWidth - 2 * margin, 80);
    yOffset += 85;
    pdf.text('Figure 4.2: Bending Moment Diagram', pageWidth / 2, yOffset, { align: 'center' });

    console.log('Saving PDF');
    pdf.save('beam_analysis_report.pdf');
    console.log('PDF saved successfully');

  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}

