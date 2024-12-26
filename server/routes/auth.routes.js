import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
