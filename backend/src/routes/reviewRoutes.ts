import { Router } from "express";

import {
  createReview,
  getReviewsForUser,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/user/:userId", getReviewsForUser);

router.post("/", protect, createReview);

router.patch("/:reviewId", protect, updateReview);

router.delete("/:reviewId", protect, deleteReview);

export default router;
