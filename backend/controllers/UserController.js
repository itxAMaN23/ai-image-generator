import bcrypt from "bcryptjs";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateFromEmail } from "unique-username-generator";
dotenv.config();

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find({});
    res.status(200).json({
      status: "success",
      users: allUsers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", info: err });
  }
};

export const CurrentUser = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", info: err });
  }
};

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ status: "error", message: "Email address already in use." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const username = generateFromEmail(email, 3);

    const newUser = new UserModel({
      name,
      username: username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      status: "success",
      message:
        "User registered successfully. Please login to start generating images.",
      userInfo: {
        data: {
          name: name,
          username: username,
          email: email,
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", info: err });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await UserModel.findOne({ email }).select("+password");

    if (!userExists) {
      return res.status(400).json({ message: "Invalid login or password" });
    }

    const Credentials = await bcrypt.compare(password, userExists.password);

    if (!Credentials) {
      return res.status(400).json({ message: "Invalid login or password" });
    }

    const token = jwt.sign(
      {
        id: userExists._id,
        email: userExists.email,
      },
      process.env.JWT_SECRET || "SecretKey",
      { expiresIn: "1d" }
    );

    await UserModel.findByIdAndUpdate(userExists._id, {
      lastLoginAt: new Date(),
    });

    const { password: pass, ...userData } = userExists._doc;

    res.status(200).json({
      status: "success",
      message: "successfully logged in.",
      token,
      credits: userExists.credits,
      userInfo: [userData],
    });
  } catch (err) {
    console.error("[ERROR IN LOGIN]: ", err.message);
    res.status(500).json({ message: "Server error", info: err.message });
  }
};
