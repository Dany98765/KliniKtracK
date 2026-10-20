import express from "express";
import rootRouter from "./routers/root-router.js";
import cors from "cors"

let app = express();

app.use(cors({
    origin: "https://kliniktrackfrontend.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/", rootRouter);

app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).send("Server error while " + err["error cause"]);
})

export default app;