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
//import {pdfToBase64} from "./pdfToBase64.js";
import callGemini from "./gemini.service.js";
import { createCvPdfFromText, savePdfBufferToFile } from "./pdfUtils.js";

export async function optimizeGeneralCv(buffer) {
  let originalText;
  try{
   originalText = await extractTextFromPdf(buffer);
}catch(err){
  console.log("Error extracting text from PDF:", err);
  throw err;
}
 const prompt = `
You are a professional CV analyst and optimizer.

You will receive the full text of a candidate's CV.
Your job is to:
1) Identify the main technical and soft skills that should be highlighted.
2) Suggest high-level changes to structure, clarity, and focus.
3) Identify important missing skills or gaps for a typical software developer role.
4) Give an overall match score (0–100) for a generic software developer position.
5) Provide a few specific, practical recommendations for improvement.
6) Return a fully rewritten, improved CV text in English, clean and well structured, suitable for software developer roles.

IMPORTANT:
- Return your answer as a SINGLE JSON object.
- Do NOT include any markdown, explanations or text outside the JSON.
- The JSON MUST match exactly this structure:

{
  "matchScore": number,
  "keySkillsToHighlight": string[],
  "suggestedChangesSummary": string[],
  "missingSkillsOrGaps": string[],
  "specificRecommendations": string[],
  "improvedCvText": string
}

Now analyze the following CV:

----- ORIGINAL_CV -----
${originalText}
`;
const rawResponse = await callGemini(prompt);
const cleaned = extractJsonFromGeminiResponse(rawResponse);

  const analysis = JSON.parse(cleaned);

  // מייצרים PDF מהטקסט המשופר
  const pdfBuffer = await createCvPdfFromText(analysis.improvedCvText, {
    title: "Curriculum Vitae",
  });

  const fileName = `cv_${Date.now()}.pdf`;
  await savePdfBufferToFile(pdfBuffer, fileName);

  // מחזירים ללקוח: גם את הניתוח, גם את שם הקובץ
  return {
    matchScore: analysis.matchScore,
    keySkillsToHighlight: analysis.keySkillsToHighlight,
    suggestedChangesSummary: analysis.suggestedChangesSummary,
    missingSkillsOrGaps: analysis.missingSkillsOrGaps,
    specificRecommendations: analysis.specificRecommendations,
    improvedCvText: analysis.improvedCvText,
    generatedFileName: fileName,
  };
}


export async function optimizeJobCv(buffer, jobDescription) {
  let originalText;
  try {
    originalText = await extractTextFromPdf(buffer);
  } catch (err) {
    console.log("Error extracting text from PDF:", err);
    throw err;
  }

  const prompt = `
You are a professional CV analyst and optimizer.

You will receive:
1) A job description for a software-related position.
2) The candidate's current CV.

Your tasks:
1) Identify the main technical and soft skills from the JOB DESCRIPTION that are important for this role.
2) Evaluate how well the CV matches THIS SPECIFIC JOB.
3) Suggest high-level changes to structure, clarity, and focus with respect to this job.
4) Identify important missing skills, experience, or gaps relative to the job description.
5) Give an overall match score (0–100) for THIS job.
6) Provide several specific, practical recommendations for improving the CV for THIS job.
7) Return a fully rewritten, improved CV text in English, clean and well-structured, optimized for THIS job.

IMPORTANT:
- Return your answer as a SINGLE JSON object.
- Do NOT include any markdown, explanations or text outside the JSON.
- The JSON MUST match exactly this structure:

{
  "matchScore": number,
  "keySkillsToHighlight": string[],
  "suggestedChangesSummary": string[],
  "missingSkillsOrGaps": string[],
  "specificRecommendations": string[],
  "improvedCvText": string
}

----- JOB_DESCRIPTION -----
${jobDescription}

----- ORIGINAL_CV -----
${originalText}
`;

  const rawResponse = await callGemini(prompt);
  const cleaned = extractJsonFromGeminiResponse(rawResponse);

  let analysis;
  try {
    analysis = JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse Gemini job response as JSON:", err);
    throw new Error("Gemini job response is not valid JSON");
  }

  // מייצרים PDF מהטקסט המשופר
  const pdfBuffer = await createCvPdfFromText(analysis.improvedCvText, {
    title: "Curriculum Vitae",
  });

  const fileName = `cv_job_${Date.now()}.pdf`;
  await savePdfBufferToFile(pdfBuffer, fileName);

  // מחזירים ללקוח: גם ניתוח מותאם-משרה, גם שם קובץ
  return {
    matchScore: analysis.matchScore,
    keySkillsToHighlight: analysis.keySkillsToHighlight,
    suggestedChangesSummary: analysis.suggestedChangesSummary,
    missingSkillsOrGaps: analysis.missingSkillsOrGaps,
    specificRecommendations: analysis.specificRecommendations,
    improvedCvText: analysis.improvedCvText,
    generatedFileName: fileName,
  };
}

function extractJsonFromGeminiResponse(text) {
  if (!text) {
    throw new Error("Empty response from Gemini");
  }

  // אם המודל עטף את ה-JSON בבלוק קוד ```json ... ```
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch && fenceMatch[1]) {
    return fenceMatch[1].trim();
  }

  // אחרת – מניחים שהוא כבר JSON "נקי"
  return text.trim();
}