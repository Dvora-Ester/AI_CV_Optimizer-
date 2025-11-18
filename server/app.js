import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cvGeneralRoutes from "./routes/cvGeneral.routes.js";
import cvJobRoutes from "./routes/cvJob.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/cv",() =>{cvGeneralRoutes,
    console.log("cvGeneralRoutes loaded")});

app.use("/api/cv", cvJobRoutes);

export default app;
