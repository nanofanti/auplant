import { Router } from "express";

import {
  createSitterProfile,
  deleteSitterProfile,
  getSitterProfileById,
  getSitterProfiles,
  updateSitterProfile,
} from "../controllers/sitterController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, createSitterProfile);

router.get("/", getSitterProfiles);

router.get("/:id", getSitterProfileById);

router.patch("/:id", protect, updateSitterProfile);

router.delete("/:id", protect, deleteSitterProfile);

export default router;
