// import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
// import fs from 'fs/promises';

// // Convert a PDF buffer or file path to a base64 string
// export async function pdfBufferToBase64({ buffer, path } = {}) {
//   if (!buffer && !path) throw new Error('Provide buffer or path');
//   if (!buffer) buffer = await fs.readFile(path);
//   return buffer.toString('base64');
// }

// // Create a simple PDF and return a Buffer
// export async function createSimplePdfBuffer({ title = 'New PDF', lines = [] } = {}) {
//   const pdfDoc = await PDFDocument.create();
//   let page = pdfDoc.addPage([595, 842]); // A4-like
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const fontSize = 12;

//   page.drawText(title, {
//     x: 50,
//     y: 800,
//     size: 18,
//     font,
//     color: rgb(0, 0, 0),
//   });

//   let y = 770;
//   for (const line of lines) {
//     page.drawText(line, { x: 50, y, size: fontSize, font, color: rgb(0, 0, 0) });
//     y -= fontSize + 6;
//     if (y < 40) {
//       page = pdfDoc.addPage([595, 842]);
//       y = 800;
//     }
//   }

//   const pdfBytes = await pdfDoc.save(); // Uint8Array
//   return Buffer.from(pdfBytes);
// }

// // Optional helper: save buffer to file
// export async function savePdfBufferToFile(buffer, outPath) {
//   await fs.writeFile(outPath, buffer);
// }
// pdf.service.js
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs/promises";
import path from "path";

// יצירת PDF מקרי"ט טקסט אחד גדול (עם ירידת שורות ועימוד בסיסי)
export async function createCvPdfFromText(text, { title = "Curriculum Vitae" } = {}) {
  const pdfDoc = await PDFDocument.create();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 595;   // A4 בערך
  const pageHeight = 842;
  const margin = 50;
  const fontSize = 11;
  const lineHeight = fontSize * 1.3;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  // כותרת עליונה
  page.drawText(title, {
    x: margin,
    y,
    size: 18,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  y -= 30;

  const maxWidth = pageWidth - 2 * margin;

  // מפצלים לפסקאות לפי רווח של שורה
  const paragraphs = text.split(/\n\s*\n/);

  for (const para of paragraphs) {
    const lines = wrapText(para, { font, fontSize, maxWidth });

    for (const line of lines) {
      if (y < margin) {
        // עמוד חדש
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      }

      page.drawText(line, {
        x: margin,
        y,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });

      y -= lineHeight;
    }

    // רווח קטן בין פסקאות
    y -= lineHeight * 0.5;
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

// עוטף טקסט לשורות לפי רוחב העמוד
function wrapText(text, { font, fontSize, maxWidth }) {
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const tentative = currentLine ? currentLine + " " + word : word;
    const width = font.widthOfTextAtSize(tentative, fontSize);

    if (width <= maxWidth) {
      currentLine = tentative;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

// אופציונלי: שמירת ה-PDF לקובץ
export async function savePdfBufferToFile(buffer, outFileName) {
  const outDir = path.join(process.cwd(), "generated");
  await fs.mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, outFileName);
  await fs.writeFile(outPath, buffer);
  return outPath;
}
