// services/pdf.service.js
// import Tesseract from 'tesseract.js';
// import fs from 'fs';


// export default function extractTextFromPdfUsingOCR(pdfPath) {
//   // המרת PDF לתמונות (במקרה הזה המרת דף אחד לתמונה)
//   pdf2image(pdfPath)
//     .then((images) => {
//       // עכשיו נבצע OCR על התמונה
//       Tesseract.recognize(
//         images[0],  // התמונה הראשונה
//         'eng',  // או 'heb' אם מדובר בעברית
//         {
//           logger: (m) => console.log(m), // לוג של תהליך ה-OCR
//         }
//       ).then(({ data: { text } }) => {
//         console.log("טקסט שנמצא:", text);
//       }).catch((error) => {
//         console.error('שגיאה במהלך ה-OCR:', error);
//       });
//     })
//     .catch((error) => {
//       console.error('שגיאה בהמרת ה-PDF לתמונה:', error);
//     });
// }



import { PDFDocument } from 'pdf-lib';

export async function extractTextFromPdf(buffer) {
  const pdfDoc = await PDFDocument.load(buffer);
  const pages = pdfDoc.getPages();
  const page = pages[0]; // דף ראשון
  // אך אין API ישיר לחילוץ טקסט עם pdf-lib
  return "לא ניתן לחלץ טקסט עם pdf-lib";
}



