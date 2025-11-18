// import { extractTextFromPdf } from "./pdf.service.js";
// import callGemini  from "./gemini.service.js";

// export async function optimizeGeneralCv(buffer) {
//   const originalText = await extractTextFromPdf(buffer);

//   const prompt = `
// You are a professional CV optimizer.
// Improve the following CV. 
// Return a clean, well-structured CV in English, suitable for software developer roles.

// ----- CV -----
// ${originalText}
//   `;

//   return await callGemini(prompt);
// }

// export async function optimizeJobCv(buffer, jobDescription) {
//   const originalText = await extractTextFromPdf(buffer);

//   const prompt = `
// You are a professional CV optimizer.
// Improve the CV to match the following job description.
// Focus on relevant skills, projects and experience for this role.
// Return only the improved CV in English.

// ----- JOB DESCRIPTION -----
// ${jobDescription}

// ----- ORIGINAL CV -----
// ${originalText}
//   `;

//   return await callGemini(prompt);
// }
// server/services/cv.service.js
import { extractTextFromPdf } from "./pdf.service.js";
import callGemini from "./gemini.service.js";

export async function optimizeGeneralCv(buffer) {
  const originalText = await extractTextFromPdf(buffer);

  const prompt = `
You are a professional CV optimizer.
Improve the following CV.
Return a clean, well-structured CV in English, suitable for software developer roles.

----- CV -----
${originalText}
  `;

  return await callGemini(prompt);
}

export async function optimizeJobCv(buffer, jobDescription) {
  const originalText = await extractTextFromPdf(buffer);

  const prompt = `
You are a professional CV optimizer.
Improve the CV to match the following job description.
Focus on relevant skills, projects and experience for this role.
Return only the improved CV in English.

----- JOB DESCRIPTION -----
${jobDescription}

----- ORIGINAL CV -----
${originalText}
  `;

  return await callGemini(prompt);
}
