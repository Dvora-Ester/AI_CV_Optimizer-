// server/routes/download.routes.js
import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const GENERATED_DIR = path.join(process.cwd(), "generated");

// router.get("/download/:filename", (req, res) => {
  router.get("/:filename", (req, res) => {

  const { filename } = req.params;

  // הגנה בסיסית נגד ../ וכו'
  if (!/^[a-zA-Z0-9._-]+$/.test(filename)) {
    return res.status(400).json({ error: "Invalid file name" });
  }

  const filePath = path.join(GENERATED_DIR, filename);
console.log("Download request for file:", filePath);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${filename}"`
  );

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);

  // אופציונלי: למחוק אחרי ההורדה (פעם אחת)
  // stream.on("close", () => {
  //   fs.unlink(filePath, (err) => {
  //     if (err) console.error("Error deleting file:", err);
  //   });
  // });
});

export default router;
