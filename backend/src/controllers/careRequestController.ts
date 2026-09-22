import type { Response, Request } from "express";
import mongoose from "mongoose";
import CareRequest from "../models/CareRequest.js";
import User from "../models/User.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";
import cloudinary from "../config/cloudinary.js";
import type { UploadApiResponse } from "cloudinary";

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

  const files = req.files as Express.Multer.File[];

  try {
    // Upload all selected images to Cloudinary
    const uploadResults = await Promise.all(
      files.map(
        (file) =>
          new Promise<UploadApiResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: "auplant/care-requests",
              },
              (error, result) => {
                if (error) {
                  console.error("Cloudinary upload error:", error);
                  reject(error);
                  return;
                }

                if (!result) {
                  reject(new Error("Cloudinary upload returned no result"));
                  return;
                }

                resolve(result);
              },
            );

            uploadStream.end(file.buffer);
          }),
      ),
    );

    // Get only the URL of each uploaded image
    const photos = uploadResults.map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
    }));

    // Create the Care Request only after all uploads succeed
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
  } catch (error) {
    console.error("Care request creation error:", error);

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

  try {
    // Upload new photos to Cloudinary
    const uploadResults = await Promise.all(
      files.map(
        (file) =>
          new Promise<UploadApiResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: "auplant/care-requests",
              },
              (error, result) => {
                if (error) {
                  console.error("Cloudinary upload error:", error);
                  reject(error);
                  return;
                }

                if (!result) {
                  reject(new Error("Cloudinary upload returned no result"));
                  return;
                }

                resolve(result);
              },
            );

            uploadStream.end(file.buffer);
          }),
      ),
    );

    // Convert Cloudinary results into our photo structure
    const newPhotoObjects = uploadResults.map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
    }));

    // Delete removed photos from Cloudinary
    await Promise.all(
      validRemovedPhotoPublicIds.map((publicId) =>
        cloudinary.uploader.destroy(publicId),
      ),
    );

    // Remove deleted photos from the Care Request
    careRequest.photos = careRequest.photos.filter(
      (photo) => !validRemovedPhotoPublicIds.includes(photo.publicId),
    );

    // Add newly uploaded photos
    careRequest.photos.push(...newPhotoObjects);

    // Save final Care Request
    await careRequest.save();

    return res.status(200).json({
      message: "Care request updated successfully",
      data: careRequest,
    });
  } catch (error) {
    console.error("Care request update error:", error);

    return res.status(500).json({
      message: "Failed to update care request",
    });
  }
};

export const deleteCareRequest = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid care request ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid care request ID" });
  }

  const careRequest = await CareRequest.findById(id);

  if (!careRequest) {
    return res.status(404).json({ message: "Care request not found" });
  }

  if (careRequest.ownerId.toString() !== req.userId) {
    return res.status(403).json({
      message: "You are not authorized to delete this care request",
    });
  }

  await careRequest.deleteOne();

  return res.status(200).json({
    message: "Care request deleted successfully",
  });
};

export const getMyCareRequests = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const myCareRequests = await CareRequest.find({
    ownerId: req.userId,
  }).populate("ownerId", "name profileImage");

  return res.status(200).json({
    data: myCareRequests,
  });
};
