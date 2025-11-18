import express from "express";
import multer from "multer";
import { optimizeGeneralCvController } from "../controllers/cvGeneral.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/optimize/general", upload.single("cv"), optimizeGeneralCvController);

export default router;
