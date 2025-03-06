import express from "express";
import { bookmarkJob, updateProfile } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.patch(
  "/profile",
  isAuthenticated,
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateProfile
);

router.patch("/bookmark/:jobId", isAuthenticated, bookmarkJob);

export default router;
