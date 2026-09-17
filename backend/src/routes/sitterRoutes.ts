import { Router } from "express";

import {
  createSitterProfile,
  getSitterProfiles,
} from "../controllers/sitterController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, createSitterProfile);

router.get("/", getSitterProfiles);

export default router;
