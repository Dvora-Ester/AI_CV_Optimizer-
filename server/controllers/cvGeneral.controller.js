import { optimizeGeneralCv } from "../services/cv.service.js";

export async function optimizeGeneralCvController(req, res) {
  try {
    console.log('[cvGeneral] Incoming', req.method, req.path, 'Content-Type:', req.headers['content-type'], 'hasFile:', !!req.file, 'bodyKeys:', Object.keys(req.body));
    const file = req.file;
    console.log("!!!!!!!!!!!Received file:");
    if (!file) {
      return res.status(400).json({ error: "CV file is required" });
    }

    const optimizedText = await optimizeGeneralCv(file.buffer);
    res.json({ optimizedText });
  } catch (err) {
    console.error("Error in optimizeGeneralCvController:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
