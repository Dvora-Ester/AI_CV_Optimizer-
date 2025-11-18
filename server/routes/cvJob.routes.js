import express from "express";
import multer from "multer";
import { optimizeJobCvController } from "../controllers/cvJob.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/optimize/job", upload.single("cv"), optimizeJobCvController);

export default router;
