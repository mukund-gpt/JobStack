import express from "express";
import { updateProfile } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.patch(
  "/profile",
  isAuthenticated,
  upload.single("resume"),
  updateProfile
);

export default router;
