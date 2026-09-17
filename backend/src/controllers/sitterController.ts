import type { Response, Request } from "express";
import mongoose from "mongoose";

import type { AuthRequest } from "../middleware/authMiddleware.js";
import SitterProfile from "../models/SitterProfile.js";
import User from "../models/User.js";

export const createSitterProfile = async (req: AuthRequest, res: Response) => {
  const { location, bio, experience, pricePerDay, availability, services } =
    req.body;

  // Make sure userId exists before converting it to an ObjectId
  if (!req.userId) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  // Convert the string ID from the JWT into a MongoDB ObjectId
  const userId = new mongoose.Types.ObjectId(req.userId);

  // Find the authenticated user
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // Only users with the "sitter" role can create a sitter profile
  if (!user.roles.includes("sitter")) {
    return res.status(403).json({
      message: "Only sitters can create a sitter profile",
    });
  }

  // A user can only have one sitter profile
  const existingProfile = await SitterProfile.findOne({
    userId,
  });

  if (existingProfile) {
    return res.status(409).json({
      message: "Sitter profile already exists",
    });
  }

  // Create the sitter profile
  const sitterProfile = await SitterProfile.create({
    userId,
    location,
    bio,
    experience,
    pricePerDay,
    availability,
    services,
  });

  return res.status(201).json({
    message: "Sitter profile created successfully",
    data: sitterProfile,
  });
};

export const getSitterProfiles = async (req: Request, res: Response) => {
  const sitterProfiles = await SitterProfile.find().populate(
    "userId",
    "name profileImage",
  );
  return res.status(200).json({
    data: sitterProfiles,
  });
};
