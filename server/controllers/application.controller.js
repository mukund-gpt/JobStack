import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const applicantId = req.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    const existingApp = await Application.findOne({ jobId, applicantId });
    if (existingApp) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    const newApplication = await Application.create({
      jobId,
      applicantId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res
      .status(200)
      .json({ success: true, newApplication, message: "Success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error during apply", success: false });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const applicantId = req.id;
    const applications = await Application.find({ applicantId })
      .sort({ createdAt: -1 })
      .populate({
        path: "jobId",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!applications) {
      return res
        .status(404)
        .json({ message: "No applications found", success: false });
    }

    return res.status(200).json({ success: true, applications });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error during fetch", success: false });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicantId",
      },
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    return res.status(200).json({ success: true, job: job.applications });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error during fetch", success: false });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res
        .status(400)
        .json({ message: "Status is required", success: false });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res
        .status(404)
        .json({ message: "Application not found", success: false });
    }
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error during update", success: false });
  }
};
