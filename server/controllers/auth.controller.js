import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
  try {
    const { fullname, email, phone, password, role } = req.body;
    const image = req.file;

    if (!fullname || !email || !phone || !password || !role) {
      return res.json({ message: "Fill all details", success: false });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.json({ message: "Email already exists", success: false });
    }

    user = await User.findOne({ phone });
    if (user) {
      return res.json({ message: "Phone no already exists", success: false });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    let imageUrl;
    if (image) {
      const fileUri = getDataUri(image);
      console.log("Uploading image to Cloudinary...");
      const cloudResponse = await cloudinary.uploader.upload(fileUri, {
        folder: "JobStack",
      });
      imageUrl = cloudResponse.secure_url;
      console.log("Image uploaded:", cloudResponse.secure_url);
    }

    user = await User.create({
      fullname,
      email,
      phone,
      password: hashedPassword,
      role,
      profile: {
        profilePic: imageUrl,
      },
    });

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({ message: "Registeration success", success: true, user });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Auth Error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.json({ message: "Fill all details", success: false });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not registered", success: false });
    }

    const isHashedPassword = await bcryptjs.compare(password, user.password);
    if (!isHashedPassword) {
      return res.json({ message: "Invalid password", success: false });
    }
    if (role !== user.role) {
      return res.json({ message: "Account not exist", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({ message: `Welcome ${user.fullname}`, success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Auth Error", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logout Success", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Auth Error", success: false });
  }
};

export const resetPassword = async (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found", success: false });
    }

    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `To reset your password, click the following link: ${resetUrl}`,
    };
    await transporter.sendMail(mailOptions);
    return res.json({
      message: "Password reset link sent to your email",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { password, token } = req.body;

    if (!token || !password) {
      return res.json({
        message: "token and password not found🤦‍♂️",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.json({ message: "User not found" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();
    res
      .status(200)
      .json({ message: "Password reset successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
