import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";
import mongoose from "mongoose";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "404: User not found" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, roles } = req.body;

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
    roles,
  });

  const userObject = user.toObject();
  const { password: _, ...safeUser } = userObject;

  res.status(201).json({ message: "User created", data: safeUser });
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  if (req.params.id !== req.userId) {
    return res.status(403).json({
      message: "You are not authorized to delete this account",
    });
  }

  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.clearCookie("token");

  return res.status(200).json({
    message: "User deleted successfully",
  });
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
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
