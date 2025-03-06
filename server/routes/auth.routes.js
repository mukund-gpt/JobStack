import express from "express";
import {
  googleAuth,
  login,
  logout,
  register,
  resetPassword,
  verifyToken,
} from "../controllers/auth.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.get("/logout", logout);

router.post("/reset-password", resetPassword);
router.post("/verify-token", verifyToken);

router.post("/google-auth", googleAuth);

export default router;
