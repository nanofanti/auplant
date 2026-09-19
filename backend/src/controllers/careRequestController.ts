import type { Response, Request } from "express";
import mongoose from "mongoose";
import CareRequest from "../models/CareRequest.js";
import User from "../models/User.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

export const createCareRequest = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  const userId = new mongoose.Types.ObjectId(req.userId);

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!user.roles.includes("owner")) {
    return res.status(403).json({
      message: "Only owners can create a care request",
    });
  }

  const {
    location,
    startDate,
    endDate,
    numberOfPlants,
    description,
    photos,
    offeredPrice,
  } = req.body;

  const newCareRequest = await CareRequest.create({
    ownerId: userId,
    location,
    startDate,
    endDate,
    numberOfPlants,
    description,
    photos,
    offeredPrice,
  });

  return res.status(201).json({
    message: "Care request created successfully",
    data: newCareRequest,
  });
};

export const getCareRequests = async (req: Request, res: Response) => {
  const allCareRequests = await CareRequest.find().populate(
    "ownerId",
    "name profileImage",
  );

  return res.status(200).json({
    data: allCareRequests,
  });
};

export const getCareRequestById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).json({
      message: "Invalid care request ID",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid care request ID",
    });
  }

  const careRequest = await CareRequest.findById(id).populate(
    "ownerId",
    "name profileImage",
  );

  if (!careRequest) {
    return res.status(404).json({
      message: "Care request not found",
    });
  }

  return res.status(200).json({
    data: careRequest,
  });
};
