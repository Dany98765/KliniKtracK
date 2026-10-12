import express from "express";
import rootRouter from "./routers/root-router.js";

let app = express();

app.use(express.json());

app.use("/", rootRouter);

app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).send("Server error while " + err["error cause"]);
})

export default app;