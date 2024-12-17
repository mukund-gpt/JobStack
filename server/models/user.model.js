import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },
    profile: {
      bio: String,
      profilePic: {
        type: String,
        default: "",
      },
      skills: [{ type: String }],
      resume: String,
      resumeOriginalName: String,
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
