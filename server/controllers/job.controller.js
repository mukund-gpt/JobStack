import { Job } from "../models/job.model.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      experienceLevel,
      jobType,
      location,
      position,
      companyId,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !experienceLevel ||
      !jobType ||
      !location ||
      !position ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ message: "fill all details", success: false });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      experienceLevel,
      jobType,
      location,
      position,
      createdBy: req.id,
      company: companyId,
    });

    return res
      .status(200)
      .json({ message: "Job created successfully", success: true, job });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error during create", success: false });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res
        .status(404)
        .json({ message: "jobs not found", success: false });
    }
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error during fetch", success: false });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate({
      path: "applications",
    });

    if (!job) {
      return res.status(404).json({ message: "job not found", success: false });
    }
    return res.status(200).json({ success: true, job });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error during fetch", success: false });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.id }).populate({
      path: "company",
      createdAt: -1,
    });

    if (!jobs) {
      return res
        .status(404)
        .json({ message: "jobs not found", success: false });
    }
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error during fetch", success: false });
  }
};
