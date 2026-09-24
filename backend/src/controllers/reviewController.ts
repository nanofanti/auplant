import type { Request, Response } from "express";

import mongoose from "mongoose";

import type { AuthRequest } from "../middleware/authMiddleware.js";
import Conversation from "../models/Conversation.js";
import Review from "../models/Review.js";
import User from "../models/User.js";

export const createReview = async (req: AuthRequest, res: Response) => {
  const { reviewedUserId, rating, comment } = req.body;

  const reviewerId = req.userId;

  if (!reviewerId) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  if (reviewerId === reviewedUserId) {
    return res.status(400).json({
      message: "You cannot review yourself",
    });
  }

  const reviewedUser = await User.findById(reviewedUserId);

  if (!reviewedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({
      message: "Rating must be an integer between 1 and 5",
    });
  }

  const conversation = await Conversation.findOne({
    participants: {
      $all: [reviewerId, reviewedUserId],
    },
  });

  if (!conversation) {
    return res.status(403).json({
      message: "You can only review users you have interacted with",
    });
  }

  const existingReview = await Review.findOne({
    reviewerId,
    reviewedUserId,
  });

  if (existingReview) {
    return res.status(409).json({
      message: "You have already reviewed this user",
    });
  }

  const review = await Review.create({
    reviewerId,
    reviewedUserId,
    rating,
    comment,
  });

  return res.status(201).json({
    message: "Review created successfully",
    data: review,
  });
};

export const getReviewsForUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (typeof userId !== "string" || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      message: "Invalid user ID",
    });
  }

  const reviews = await Review.find({
    reviewedUserId: userId,
  })
    .populate("reviewerId", "name profileImage")
    .sort({
      createdAt: -1,
    });

  const totalRating = reviews.reduce(
    (total, review) => total + review.rating,
    0,
  );

  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

  return res.status(200).json({
    message: "Reviews found",
    data: {
      reviews,
      averageRating,
      reviewCount: reviews.length,
    },
  });
};
