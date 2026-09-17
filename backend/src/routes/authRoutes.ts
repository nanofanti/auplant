import { Router } from "express";
import { login, logout, getMe } from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", login);

router.get("/me", protect, getMe);

router.post("/logout", logout);

export default router;
