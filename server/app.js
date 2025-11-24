import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cvGeneralRoutes from "./routes/cvGeneral.routes.js";
import cvJobRoutes from "./routes/cvJob.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
	const now = new Date().toISOString();
	console.log(`${now} -> ${req.method} ${req.originalUrl} - Content-Type: ${req.headers['content-type'] || ''}`);
	next();
});
app.use("/api/cv/general", cvGeneralRoutes);
app.use("/api/cv/job", cvJobRoutes);
//'http://localhost:3000/api/cv/optimize/general'
export default app;
