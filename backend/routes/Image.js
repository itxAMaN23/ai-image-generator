import express from "express";
import {
  GenerateImages,
  PublicImages,
  MyImages,
  SpecificImages,
  DeleteImage,
  FeaturedImage,
} from "../controllers/ImageController.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/generate", AuthMiddleware, GenerateImages);
router.get("/myImages", AuthMiddleware, MyImages);
router.post("/featured-image", AuthMiddleware, FeaturedImage);
router.get("/images", PublicImages);
router.get("/:id", SpecificImages);
router.delete("/:id/delete", AuthMiddleware, DeleteImage);

export default router;
