import { Router } from "express";

import {
  createCareRequest,
  getCareRequests,
  getCareRequestById,
  updateCareRequest,
  deleteCareRequest,
} from "../controllers/careRequestController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, createCareRequest);

router.get("/", getCareRequests);

router.get("/:id", getCareRequestById);

router.patch("/:id", protect, updateCareRequest);

router.delete("/:id", protect, deleteCareRequest);

export default router;
