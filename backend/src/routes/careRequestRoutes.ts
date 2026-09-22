import { Router } from "express";

import {
  createCareRequest,
  getCareRequests,
  getCareRequestById,
  updateCareRequest,
  deleteCareRequest,
  getMyCareRequests,
} from "../controllers/careRequestController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = Router();

router.post("/", protect, upload.array("photos", 5), createCareRequest);

router.get("/", getCareRequests);

router.get("/me", protect, getMyCareRequests);

router.get("/:id", getCareRequestById);

router.patch("/:id", protect, upload.array("photos", 5), updateCareRequest);

router.delete("/:id", protect, deleteCareRequest);

export default router;
