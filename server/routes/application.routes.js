import express from "express";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/apply/:id").post(isAuthenticated, applyJob);
router.route("/all").get(isAuthenticated, getAppliedJobs);
router.route("/update/:id").patch(isAuthenticated, updateStatus);
router.route("/applicants/:id").get(isAuthenticated, getApplicants);

export default router;
