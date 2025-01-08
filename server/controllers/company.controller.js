import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.json({ message: "Company name is required" });
    }

    let company = await Company.findOne({ companyName });
    if (company) {
      return res.json({ message: "already registered", success: false });
    }

    company = await Company.create({ companyName, userId: req.id });
    return res
      .status(201)
      .json({ message: "registeration done", success: true, company });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error during register", success: false });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { companyName, description, website, location } = req.body;
    const logo = req.file;

    let company = await Company.findById(req.params.id);
    if (!company) {
      return res.json({ message: "Company not found", success: false });
    }

    if (companyName) company.companyName = companyName;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;
    if (logo) {
      const fileUri = getDataUri(logo);
      const cloudResponse = await cloudinary.uploader.upload(fileUri, {
        folder: "JobStack",
      });
      company.logo = cloudResponse.secure_url;
    }
    await company.save();

    return res.json({ message: "Company updated", success: true, company });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error during update", success: false });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    let company = await Company.findById(req.params.id);
    if (!company) {
      return res.json({ message: "Company not found", success: false });
    }

    return res.json({ success: true, company });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error during update", success: false });
  }
};

export const getCompanies = async (req, res) => {
  try {
    let companies = await Company.find({ userId: req.id });
    if (!companies) {
      return res.json({ message: "Companies not found", success: false });
    }

    return res.json({ success: true, companies });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error during fetch", success: false });
  }
};
