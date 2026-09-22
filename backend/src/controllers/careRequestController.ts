import type { Request, Response } from "express";
import mongoose from "mongoose";

import type { AuthRequest } from "../middleware/authMiddleware.js";

import CareRequest from "../models/CareRequest.js";
import User from "../models/User.js";

import {
  deleteImage,
  uploadImage,
  type UploadedImage,
} from "../utils/cloudinaryUpload.js";

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
    offeredPrice,
  } = req.body;

  const files = (req.files as Express.Multer.File[] | undefined) ?? [];

  const uploadedPhotos: UploadedImage[] = [];

  try {
    // Upload selected images one by one.
    // This allows us to keep track of successful uploads
    // in case a later upload or MongoDB operation fails.
    for (const file of files) {
      const uploadedPhoto = await uploadImage(file, "auplant/care-requests");

      uploadedPhotos.push(uploadedPhoto);
    }

    // Create the Care Request only after all uploads succeed
    const newCareRequest = await CareRequest.create({
      ownerId: userId,
      location,
      startDate,
      endDate,
      numberOfPlants,
      description,
      photos: uploadedPhotos,
      offeredPrice,
    });

    return res.status(201).json({
      message: "Care request created successfully",
      data: newCareRequest,
    });
  } catch (error) {
    console.error("Care request creation error:", error);

    // If an upload or MongoDB operation failed,
    // remove any images that were already uploaded.
    await Promise.allSettled(
      uploadedPhotos.map((photo) => deleteImage(photo.publicId)),
    );

    return res.status(500).json({
      message: "Failed to create care request",
    });
  }
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

export const updateCareRequest = async (req: AuthRequest, res: Response) => {
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

  const careRequest = await CareRequest.findById(id);

  if (!careRequest) {
    return res.status(404).json({
      message: "Care request not found",
    });
  }

  if (careRequest.ownerId.toString() !== req.userId) {
    return res.status(403).json({
      message: "You are not authorized to update this care request",
    });
  }

  const {
    location,
    startDate,
    endDate,
    numberOfPlants,
    description,
    offeredPrice,
    status,
  } = req.body;

  // Parse removed photo IDs from FormData
  let removedPhotoPublicIds: string[] = [];

  if (req.body.removedPhotoPublicIds) {
    try {
      removedPhotoPublicIds = JSON.parse(req.body.removedPhotoPublicIds);
    } catch {
      return res.status(400).json({
        message: "Invalid removed photo data",
      });
    }
  }

  // Make sure the parsed value is really an array of strings
  if (
    !Array.isArray(removedPhotoPublicIds) ||
    !removedPhotoPublicIds.every((publicId) => typeof publicId === "string")
  ) {
    return res.status(400).json({
      message: "Invalid removed photo data",
    });
  }

  const files = (req.files as Express.Multer.File[] | undefined) ?? [];

  // Only allow removal of photos belonging to this Care Request
  const validRemovedPhotoPublicIds = removedPhotoPublicIds.filter((publicId) =>
    careRequest.photos.some((photo) => photo.publicId === publicId),
  );

  if (validRemovedPhotoPublicIds.length !== removedPhotoPublicIds.length) {
    return res.status(400).json({
      message: "One or more photos do not belong to this care request",
    });
  }

  // Check maximum final number of photos
  const remainingPhotoCount =
    careRequest.photos.length - validRemovedPhotoPublicIds.length;

  const finalPhotoCount = remainingPhotoCount + files.length;

  if (finalPhotoCount > 5) {
    return res.status(400).json({
      message: "A care request can have a maximum of 5 photos",
    });
  }

  // Update normal fields
  if (location !== undefined) {
    careRequest.location = location;
  }

  if (startDate !== undefined) {
    careRequest.startDate = startDate;
  }

  if (endDate !== undefined) {
    careRequest.endDate = endDate;
  }

  if (numberOfPlants !== undefined) {
    careRequest.numberOfPlants = numberOfPlants;
  }

  if (description !== undefined) {
    careRequest.description = description;
  }

  if (offeredPrice !== undefined) {
    careRequest.offeredPrice = offeredPrice;
  }

  if (status !== undefined) {
    careRequest.status = status;
  }

  const uploadedPhotos: UploadedImage[] = [];

  try {
    // Upload new photos one by one so successful uploads
    // can be cleaned up if something later fails.
    for (const file of files) {
      const uploadedPhoto = await uploadImage(file, "auplant/care-requests");

      uploadedPhotos.push(uploadedPhoto);
    }

    // Remove selected photos from the MongoDB document.
    // We do NOT delete them from Cloudinary yet.
    careRequest.photos = careRequest.photos.filter(
      (photo) => !validRemovedPhotoPublicIds.includes(photo.publicId),
    );

    // Add newly uploaded photos to the document
    careRequest.photos.push(...uploadedPhotos);

    // Save MongoDB first
    await careRequest.save();

    // MongoDB successfully saved the new photo state.
    // We can now safely remove the old Cloudinary images.
    await Promise.allSettled(
      validRemovedPhotoPublicIds.map((publicId) => deleteImage(publicId)),
    );

    return res.status(200).json({
      message: "Care request updated successfully",
      data: careRequest,
    });
  } catch (error) {
    console.error("Care request update error:", error);

    // The update failed, so remove any newly uploaded
    // Cloudinary images to avoid orphaned assets.
    await Promise.allSettled(
      uploadedPhotos.map((photo) => deleteImage(photo.publicId)),
    );

    return res.status(500).json({
      message: "Failed to update care request",
    });
  }
};

export const deleteCareRequest = async (req: AuthRequest, res: Response) => {
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

  const careRequest = await CareRequest.findById(id);

  if (!careRequest) {
    return res.status(404).json({
      message: "Care request not found",
    });
  }

  if (careRequest.ownerId.toString() !== req.userId) {
    return res.status(403).json({
      message: "You are not authorized to delete this care request",
    });
  }

  // Keep the Cloudinary IDs before deleting the MongoDB document
  const photoPublicIds = careRequest.photos.map((photo) => photo.publicId);

  try {
    // Delete the Care Request from MongoDB first
    await careRequest.deleteOne();

    // Then clean up its images from Cloudinary
    await Promise.allSettled(
      photoPublicIds.map((publicId) => deleteImage(publicId)),
    );

    return res.status(200).json({
      message: "Care request deleted successfully",
    });
  } catch (error) {
    console.error("Care request deletion error:", error);

    return res.status(500).json({
      message: "Failed to delete care request",
    });
  }
};

export const getMyCareRequests = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  const myCareRequests = await CareRequest.find({
    ownerId: req.userId,
  }).populate("ownerId", "name profileImage");

  return res.status(200).json({
    data: myCareRequests,
  });
};
