// //services/pdf.service.js
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



// // import { PDFDocument } from 'pdf-lib';

// // export async function extractTextFromPdf(buffer) {
// //   const pdfDoc = await PDFDocument.load(buffer);
// //   const pages = pdfDoc.getPages();
// //   const page = pages[0]; // דף ראשון
// //   // אך אין API ישיר לחילוץ טקסט עם pdf-lib
// //   return "לא ניתן לחלץ טקסט עם pdf-lib";
// // }



// server/services/pdf.service.js

import { createRequire } from "module";
const require = createRequire(import.meta.url);

// pdf-parse הוא CommonJS, אז מייבאים אותו עם require.
// Some environments (or newer bundlers) may expose the function on `.default`.
const _pdfParse = require("pdf-parse");
const pdfParse = typeof _pdfParse === "function" ? _pdfParse : (_pdfParse && _pdfParse.default) ? _pdfParse.default : _pdfParse;
if (typeof pdfParse !== "function") {
  console.warn("pdf-parse import did not resolve to a function. Value:", typeof pdfParse);
}
function sanitizePdfText(text) {
  if (!text) return "";

  const replacements = {
    "→": "->",
    "←": "<-",
    "↔": "<->",
    "•": "-",
    "–": "-",
    "—": "-",
    "’": "'",
    "‘": "'",
    "“": "\"",
    "”": "\"",
  };

  return text
    .split("")
    .map((ch) => {
      if (replacements[ch]) return replacements[ch];

      const code = ch.charCodeAt(0);
      // תווים מעל 255 – נזרוק (WinAnsi לא תומך)
      if (code > 255) return "";
      return ch;
    })
    .join("");
}

export async function extractTextFromPdf(buffer) {
  try {
    const data = await pdfParse(buffer); // כאן זה כבר פונקציה אמיתית
    const rawText = data.text || "";

    // sanitize the extracted text (not the raw buffer)
    const sanitized = sanitizePdfText(rawText);

    const cleaned = sanitized
      .replace(/\r/g, "")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{2,}/g, "\n\n")
      .trim();

    return cleaned;
  } catch (err) {
    console.error("Error extracting text from PDF:", err);
    throw err;
  }
}
