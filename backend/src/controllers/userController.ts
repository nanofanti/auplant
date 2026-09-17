import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

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
