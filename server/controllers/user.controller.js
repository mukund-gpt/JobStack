import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const updateProfile = async (req, res) => {
  const { fullname, email, phone, bio, skills } = req.body;

  const profile = req.files.profile ? req.files.profile[0] : null;
  const resume = req.files.resume ? req.files.resume[0] : null;

  try {
    const user = await User.findById(req.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",").map((s) => s.trim());

    if (profile) {
      const fileUri = getDataUri(profile);
      const cloudResponse = await cloudinary.uploader.upload(fileUri, {
        folder: "JobStack",
      });
      user.profile.profilePic = cloudResponse.secure_url;
    }

    if (resume) {
      const fileUri = getDataUri(resume);
      const cloudResponse = await cloudinary.uploader.upload(fileUri, {
        folder: "JobStack",
      });
      // console.log(cloudResponse);
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = resume.originalname;
    }

    await user.save();
    return res.json({ success: true, message: "Profile updated", user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error in Updating profile", success: false });
  }
};

export const getAllBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.id).populate({
      path: "bookmarks",
      populate: { path: "company", select: "companyName logo" },
      select: "title description",
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    return res.json({ success: true, bookmarks: user.bookmarks });
  } catch (error) {
    console.error(error);
    return res.json({ message: error.message, success: false });
  }
};

export const bookmarkJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    // Find the user by ID
    const user = await User.findById(req.id).populate({
      path: "bookmarks",
      populate: { path: "company", select: "companyName logo" },
      select: "title description",
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Check if the job is already bookmarked
    const isBookmarked = user.bookmarks.some(
      (bookmark) => bookmark._id.toString() === jobId
    );
    if (isBookmarked) {
      await user.updateOne({ $pull: { bookmarks: jobId } });
    } else {
      await user.updateOne({ $addToSet: { bookmarks: jobId } });
    }

    // Reload user with updated bookmarks
    const updatedUser = await User.findById(req.id).populate({
      path: "bookmarks",
      populate: { path: "company", select: "companyName logo" },
      select: "title description",
    });

    return res.json({
      type: isBookmarked ? "removed" : "saved",
      success: true,
      message: isBookmarked ? "Bookmark removed" : "Bookmark added",
      bookmarks: updatedUser.bookmarks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
