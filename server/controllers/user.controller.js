import { User } from "../models/user.model.js";

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phone, bio, skills } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");
    await user.save();
    return res.json({ success: true, message: "Profile updated", user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error in Updating profile", success: false });
  }
};
