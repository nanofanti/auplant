import type { Request, Response } from "express";

import bcrypt from "bcrypt";
import mongoose from "mongoose";

import type { AuthRequest } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import CareRequest from "../models/CareRequest.js";
import SitterProfile from "../models/SitterProfile.js";
import { deleteImage, uploadImage } from "../utils/cloudinaryUpload.js";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: "404: User not found",
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find().select("-password");

  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "A user with this email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    roles: ["owner"],
  });

  const userObject = user.toObject();

  const { password: _, ...safeUser } = userObject;

  return res.status(201).json({
    message: "User created",
    data: safeUser,
  });
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).json({
      message: "Invalid user ID",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid user ID",
    });
  }

  if (id !== req.userId) {
    return res.status(403).json({
      message: "You are not authorized to delete this account",
    });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const careRequests = await CareRequest.find({
    ownerId: user._id,
  });

  const careRequestPhotoPublicIds = careRequests.flatMap((careRequest) =>
    careRequest.photos.map((photo) => photo.publicId),
  );

  const profileImagePublicId = user.profileImagePublicId;

  await SitterProfile.deleteOne({
    userId: user._id,
  });

  await CareRequest.deleteMany({
    ownerId: user._id,
  });

  await user.deleteOne();

  const imagePublicIds = [
    ...careRequestPhotoPublicIds,
    ...(profileImagePublicId ? [profileImagePublicId] : []),
  ];

  await Promise.allSettled(
    imagePublicIds.map((publicId) => deleteImage(publicId)),
  );

  res.clearCookie("token");

  return res.status(200).json({
    message: "User deleted successfully",
  });
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).json({
      message: "Invalid user ID",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid user ID",
    });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (user._id.toString() !== req.userId) {
    return res.status(403).json({
      message: "You are not authorized to update this user",
    });
  }

  const { name, email, profileImage, roles } = req.body;

  if (name !== undefined) {
    user.name = name;
  }

  if (email !== undefined) {
    user.email = email;
  }

  if (profileImage !== undefined) {
    user.profileImage = profileImage;
  }

  if (roles !== undefined) {
    user.roles = roles;
  }

  await user.save();

  return res.status(200).json({
    message: "User profile updated successfully",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      profileImage: user.profileImage,
      isAdmin: user.isAdmin,
    },
  });
};

export const uploadProfileImage = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "No image provided",
    });
  }

  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const oldProfileImagePublicId = user.profileImagePublicId;

  let newProfileImagePublicId: string | null = null;

  try {
    const uploadedImage = await uploadImage(req.file, "auplant/profile-images");

    // Keep track of the new image in case saving the user fails
    newProfileImagePublicId = uploadedImage.publicId;

    user.profileImage = uploadedImage.url;
    user.profileImagePublicId = uploadedImage.publicId;

    await user.save();

    // MongoDB now points to the new image,
    // so the previous Cloudinary image can be removed
    if (oldProfileImagePublicId) {
      await Promise.allSettled([deleteImage(oldProfileImagePublicId)]);
    }

    const userObject = user.toObject();

    const { password: _, ...safeUser } = userObject;

    return res.status(200).json({
      message: "Profile image updated successfully",
      data: safeUser,
    });
  } catch (error) {
    // Cloudinary upload may have succeeded before MongoDB failed.
    // Remove the new image so it doesn't become orphaned.
    if (newProfileImagePublicId) {
      await Promise.allSettled([deleteImage(newProfileImagePublicId)]);
    }

    console.error("Profile image upload error:", error);

    return res.status(500).json({
      message: "Failed to upload profile image",
    });
  }
};
