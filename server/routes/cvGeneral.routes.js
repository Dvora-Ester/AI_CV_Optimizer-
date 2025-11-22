import express from "express";
import multer from "multer";
import { optimizeGeneralCvController } from "../controllers/cvGeneral.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
console.log("cvGeneralRoutes loaded","cvGeneral.routes.js");
router.post("/optimize/general", upload.single("cv"), (req, res) => { 
  console.log("api cvGeneral.routes.js");
  optimizeGeneralCvController(req, res);
});


export default router;
