import express from "express";
import rootRouter from "./routers/root-router.js";

let app = express();

app.use(express.json());

app.use("/", rootRouter);

app.use((err, req, res, next) => {
    res.send(500);
})

export default app;