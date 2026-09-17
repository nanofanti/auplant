import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1h" });

  return res.status(200).json({
    message: "Login successful",
    token,
  });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const userObject = user.toObject();
  const { password: _, ...safeUser } = userObject;

  return res.status(200).json({
    message: "You are authenticated",
    data: safeUser,
  });
};
