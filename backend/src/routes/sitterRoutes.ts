import { Router } from "express";

import { createSitterProfile } from "../controllers/sitterController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, createSitterProfile);

export default router;
