import express from "express";
import { updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.patch("/update/:id", updateProfile);

export default router;
