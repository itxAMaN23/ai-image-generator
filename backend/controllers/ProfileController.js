import dotenv from "dotenv";
import UserModel from "../models/User.js";

dotenv.config();

export const UserProfile = async (req, res) => {
  try {
    const userInfo = await UserModel.findOne({
      username: req.params.username,
    })
      .select("-password")
      .populate("creations");

    if (!userInfo) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: userInfo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An internal server error occurred. Please try again later.",
    });
  }
};

export const changeAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file was provided." });
    }

    const user = await UserModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // prettier-ignore
    const newImageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    user.image = newImageUrl;
    await user.save();

    res.status(200).json({
      message: "Avatar updated successfully",
      newImageUrl: newImageUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while updating avatar." });
  }
};
