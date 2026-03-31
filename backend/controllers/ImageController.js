import dotenv from "dotenv";
import axios from "axios";
import ImageModel from "../models/Image.js";
import UserModel from "../models/User.js";

dotenv.config();
const COST_PER_GENERATION = 2;

export const GenerateImages = async (req, res) => {
  const { prompt, isPublic, model, width, height } = req.body;

  let imageUrl;
  let response;
  const startTime = Date.now();

  try {
    if (!prompt)
      return res.status(400).json({ message: "Prompt is required." });

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.credits < COST_PER_GENERATION) {
      return res.status(403).json({ message: "Insufficient credits." });
    }

    if (
      model.includes(":free") ||
      model.includes("seedream") ||
      model.includes("gemini-2.5-flash")
    ) {
      response = await axios.post(
        `https://api.imagerouter.io/v1/openai/images/generations`,
        {
          prompt,
          model,
          size:
            model === "google/nano-banana-2:free"
              ? "512x512"
              : `${width}x${height}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.IMAGEROUTER_API_KEY}`,
          },
        },
      );

      imageUrl = response.data?.data[0]?.url;
    } else if (model.includes("fal-ai")) {
      const { aspect } = req.body;
      response = await axios.post(
        `https://fal.run/${model}`,
        {
          prompt: prompt,
          aspect_ratio: aspect,
          num_images: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Key ${process.env.FAL_API_KEY}`,
          },
        },
      );

      imageUrl = response.data?.images[0]?.url;
    } else if (model.includes("black-forest-labs")) {
      response = await axios.post(
        "https://api.together.xyz/v1/images/generations",
        {
          prompt: prompt,
          model,
          width,
          height,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.IMAGE_API_KEY}`,
          },
        },
      );

      imageUrl = response.data.data[0].url;
    } else {
      return res
        .status(400)
        .json({ message: "Unsupported image model specified." });
    }

    if (!imageUrl) {
      return res
        .status(500)
        .json({ message: "No image returned from the API Server." });
    }

    const endTime = Date.now();
    const generationTime = endTime - startTime;

    const result = await ImageModel.create({
      prompt,
      imageUrl,
      width,
      height,
      model,
      user: req.user.id,
      isPublic: isPublic !== false,
      generationTime,
    });

    const updateUserModel = await UserModel.findByIdAndUpdate(
      req.user.id,
      {
        $push: { creations: result._id },
        $inc: { credits: -COST_PER_GENERATION },
      },
      { new: true },
    ).select("-password");

    res.status(201).json({
      status: "success",
      message: "Image Generation Success.",
      credits: updateUserModel.credits,
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Image generation failed",
      error:
        error?.response?.data?.error?.message ||
        error?.response?.data ||
        error.message,
    });
  }
};

export const MyImages = async (req, res) => {
  try {
    const images = await ImageModel.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(images);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user images", error: err.message });
  }
};

export const PublicImages = async (req, res) => {
  try {
    const images = await ImageModel.find({ isPublic: true }).sort({
      createdAt: -1,
    });
    res.json(images);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching public images", error: err.message });
  }
};

export const SpecificImages = async (req, res) => {
  try {
    const image = await ImageModel.findById(req.params.id).populate("user");
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.json({ status: "success", data: { image: image } });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching image", error: err.message });
  }
};

export const DeleteImage = async (req, res) => {
  try {
    const imageFound = await ImageModel.findById(req.params.id);

    if (!imageFound) {
      return res.status(404).json({ message: "Image not found" });
    }

    if (imageFound.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You do not own this image." });
    }

    await ImageModel.deleteOne(imageFound);

    await UserModel.findByIdAndUpdate(req.user.id, {
      $pull: { creations: imageFound },
    });

    res.json({
      status: "success",
      message: {
        status: "success",
        message: "Image deleted successfully.",
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting image", error: err.message });
  }
};

export const FeaturedImage = async (req, res) => {
  const { imageId } = req.body;

  try {
    if (!imageId) {
      return res.status(400).json({ message: "Image ID is required" });
    }

    const imageFound = await ImageModel.findById(imageId).populate("user");

    if (!imageFound) {
      return res.status(404).json({ message: "Image not found" });
    }

    if (imageFound.user.id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await UserModel.findByIdAndUpdate(req.user.id, {
      $set: { featuredImage: imageFound.imageUrl },
    });

    res.status(200).json({
      status: "success",
      message: "Featured Image Updated Successfully.",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching image", error: err.message });
  }
};
