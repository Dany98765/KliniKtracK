import express from "express";
import rootRouter from "./routers/root-router.js";

let app = express();

app.use(express.json());

app.use("/", rootRouter);

export default app;