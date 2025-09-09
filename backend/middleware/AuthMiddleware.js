import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

export const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decodeToken = jwt.verify(
      token,
      process.env.JWT_SECRET || "SecretKey"
    );

    const currentUser = await UserModel.findById(decodeToken.id).select(
      "-password"
    );

    if (!currentUser)
      return res.status(404).json({ message: "User not found" });

    req.user = currentUser;
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
