import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  createJob,
  getAdminJobs,
  getAllJobs,
  getJobById,
} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createJob);
router.route("/").get(getAllJobs);
router.route("/admin").get(isAuthenticated, getAdminJobs);
router.route("/:id").get(getJobById);

export default router;
