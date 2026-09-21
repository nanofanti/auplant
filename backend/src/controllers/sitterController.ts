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

export const getSitterProfileById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid sitter profile ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid sitter profile ID" });
  }

  const sitterProfile = await SitterProfile.findById(id).populate(
    "userId",
    "name profileImage",
  );
  if (!sitterProfile) {
    return res.status(404).json({ message: "Sitter profile not found" });
  }

  return res.status(200).json({
    data: sitterProfile,
  });
};

export const updateSitterProfile = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid sitter profile ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid sitter profile ID" });
  }

  const sitterProfile = await SitterProfile.findById(id);

  if (!sitterProfile) {
    return res.status(404).json({ message: "Sitter profile not found" });
  }

  if (sitterProfile.userId.toString() !== req.userId) {
    return res.status(403).json({
      message: "You are not authorized to update this sitter profile",
    });
  }

  const { location, bio, experience, pricePerDay, availability, services } =
    req.body;

  if (location !== undefined) {
    sitterProfile.location = location;
  }

  if (bio !== undefined) {
    sitterProfile.bio = bio;
  }

  if (experience !== undefined) {
    sitterProfile.experience = experience;
  }
  if (pricePerDay !== undefined) {
    sitterProfile.pricePerDay = pricePerDay;
  }
  if (availability !== undefined) {
    sitterProfile.availability = availability;
  }
  if (services !== undefined) {
    sitterProfile.services = services;
  }

  await sitterProfile.save();

  return res.status(200).json({
    message: "Sitter profile updated successfully",
    data: sitterProfile,
  });
};

export const deleteSitterProfile = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid sitter profile ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid sitter profile ID" });
  }

  const sitterProfile = await SitterProfile.findById(id);

  if (!sitterProfile) {
    return res.status(404).json({ message: "Sitter profile not found" });
  }

  if (sitterProfile.userId.toString() !== req.userId) {
    return res.status(403).json({
      message: "You are not authorized to delete this sitter profile",
    });
  }

  await sitterProfile.deleteOne();

  return res.status(200).json({
    message: "Sitter profile deleted successfully",
  });
};

export const getMySitterProfile = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const mySitterProfile = await SitterProfile.findOne({
    userId: req.userId,
  }).populate("userId", "name profileImage");

  if (!mySitterProfile) {
    return res.status(404).json({
      message: "Sitter profile not found",
    });
  }

  return res.status(200).json({
    data: mySitterProfile,
  });
};
