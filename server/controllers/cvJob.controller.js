import { optimizeJobCv } from "../services/cv.service.js";

export async function optimizeJobCvController(req, res) {
  try {
    console.log('[cvJob] Incoming', req.method, req.path, 'Content-Type:', req.headers['content-type'], 'hasFile:', !!req.file, 'bodyKeys:', Object.keys(req.body));
    const file = req.file;
    const { jobDescription } = req.body;

    if (!file) {
      return res.status(400).json({ error: "CV file is required" });
    }

    if (!jobDescription) {
      return res.status(400).json({ error: "Job description is required" });
    }

    const optimizedText = await optimizeJobCv(file.buffer, jobDescription);
    res.json({ optimizedText });
  } catch (err) {
    console.error("Error in optimizeJobCvController:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
