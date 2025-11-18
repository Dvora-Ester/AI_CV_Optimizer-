// src/services/pdf.service.js
// services/pdf.service.js
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pdfParse = require("pdf-parse");



export async function extractTextFromPdf(buffer) {
  const pdfData = await pdfParse(buffer);
  // כאן אפשר לעשות ניקוי טקסט, אם תרצי
  return pdfData.text;
}
