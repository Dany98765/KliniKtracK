import express from "express";
import * as rootController from "../controllers/root-controller.js";

let router = express.Router();

router.post("/signup", rootController.createNewUser);
router.post("/login", rootController.authorizeLogin);
router.get("/actions", rootController.fetchActions);

export default router;