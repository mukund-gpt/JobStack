import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, phone, password, role } = req.body;

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
    user = await User.create({
      fullname,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
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
        sameSite: "strict",
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
