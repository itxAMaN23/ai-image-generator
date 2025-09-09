import express from "express";
import { changeAvatar, UserProfile } from "../controllers/ProfileController.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
import { upload } from "../middleware/multerConfig.js";

const router = express.Router();

router.get("/:username", UserProfile);
router.post(
  "/change-avatar",
  AuthMiddleware,
  upload.single("avatar"),
  changeAvatar
);

export default router;
