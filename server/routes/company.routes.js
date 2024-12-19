import express from "express";
import {
  getCompanies,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/update/:id").patch(isAuthenticated, updateCompany);
router.route("/getCompanies").get(isAuthenticated, getCompanies);
router.route("/:id").get(isAuthenticated, getCompanyById);

export default router;
