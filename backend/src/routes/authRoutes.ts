import { Router } from "express";
import {
  login,
  logout,
  getMe,
  register,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", protect, getMe);

router.post("/logout", logout);

export default router;
