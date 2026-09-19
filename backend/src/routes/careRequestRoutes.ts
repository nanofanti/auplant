import { Router } from "express";

import {
  createCareRequest,
  getCareRequests,
  getCareRequestById,
  updateCareRequest,
} from "../controllers/careRequestController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, createCareRequest);

router.get("/", getCareRequests);

router.get("/:id", getCareRequestById);

router.patch("/:id", protect, updateCareRequest);

export default router;
