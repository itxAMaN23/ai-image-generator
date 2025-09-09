import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    model: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    generationTime: {
      type: Number, // Time in milliseconds
      default: null,
    },
  },
  { timestamps: true }
);

const ImageModel = mongoose.model("image", ImageSchema);

export default ImageModel;
