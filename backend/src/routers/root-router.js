import express from "express";
import * as rootController from "../controllers/root-controller.js";

let router = express.Router();

router.post("/signup", rootController.createNewUser);
router.post("/login", rootController.authorizeLogin);
router.route("/actions").get(rootController.fetchActions).post(rootController.createAction);

export default router;