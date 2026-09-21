import { Router } from "express";
import {
  getUserById,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadProfileImage } from "../controllers/userController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.patch(
  "/profile-image",
  protect,
  upload.single("profileImage"),
  uploadProfileImage,
);

router.patch("/:id", protect, updateUser);

router.delete("/:id", protect, deleteUser);

export default router;
