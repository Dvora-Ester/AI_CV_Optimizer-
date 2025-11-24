import fs from "fs";

export function pdfToBase64(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return fileBuffer.toString("base64");
}

const base64PDF = pdfToBase64("./uploads/resume.pdf");
console.log(base64PDF);
