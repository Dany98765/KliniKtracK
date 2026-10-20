import express from "express";
import * as rootController from "../controllers/root-controller.js";

let router = express.Router();

router.post("/signup", rootController.createUser);
router.post("/login", rootController.authorizeLogin);
router.route("/actions{/:id}").get(rootController.fetchActions).post(rootController.createAction);
router.route("/conditions{/:id}").get(rootController.fetchConditions).post(rootController.createCondition);
router.get("/actions-to-conditions{/:id}{/:actionId}", rootController.fetchConditionsForAction);
router.get("/conditions-to-actions{/:id}{/:conditionId}", rootController.fetchActionsForCondition);
router.get("/profile-stats{/:id}", rootController.fetchProfileStats);
router.post("/grant-permission{/:id}", rootController.grantPermission);
router.post("/request-permission{/:id}", rootController.requestPermission);
router.patch("/decide-permission{/:id}", rootController.decidePermission);
router.get("/permissions{/:id}", rootController.fetchPermissions);

export default router;