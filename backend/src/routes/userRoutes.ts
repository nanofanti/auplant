import { Router } from "express";
import {
  getUserById,
  getUsers,
  createUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.delete("/:id", protect, deleteUser);

export default router;
