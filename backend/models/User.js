import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: { type: String, required: true, select: false },
    image: { type: String, default: "" },
    credits: {
      type: Number,
      required: true,
      default: 20,
      min: 0,
    },
    creations: [{ type: mongoose.Schema.Types.ObjectId, ref: "image" }],
    featuredImage: { type: String, default: "" },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
