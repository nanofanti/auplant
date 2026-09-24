import type { Request, Response } from "express";

import type { AuthRequest } from "../middleware/authMiddleware.js";

import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { sendPasswordResetEmail } from "../services/emailService.js";

//REGISTER
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "An account with this email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign({ userId: newUser._id }, jwtSecret, {
    expiresIn: "1h",
  });

  res.cookie("token", token, { httpOnly: true });

  const userObject = newUser.toObject();

  const { password: _, ...safeUser } = userObject;

  return res.status(201).json({
    message: "Account created successfully",
    data: safeUser,
  });
};

//LOGIN
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

  res.cookie("token", token, { httpOnly: true });

  return res.status(200).json({
    message: "Login successful",
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

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");

  return res.status(200).json({
    message: "Logout successful",
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(200).json({
      message:
        "If an account with that email exists, password reset instructions have been sent.",
    });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;

  user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);

  await user.save();

  try {
    await sendPasswordResetEmail(user.email, resetToken);
  } catch (error) {
    await User.updateOne(
      { _id: user._id },
      {
        $unset: {
          resetPasswordToken: 1,
          resetPasswordExpires: 1,
        },
      },
    );

    console.error("Failed to send password reset email:", error);
  }

  return res.status(200).json({
    message:
      "If an account with that email exists, password reset instructions have been sent.",
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token || Array.isArray(token)) {
    return res.status(400).json({
      message: "Invalid reset token",
    });
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: {
      $gt: new Date(),
    },
  });

  if (!user) {
    return res.status(400).json({
      message: "Reset token is invalid or has expired",
    });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        password: hashedPassword,
      },
      $unset: {
        resetPasswordToken: 1,
        resetPasswordExpires: 1,
      },
    },
  );

  return res.status(200).json({
    message: "Password has been reset successfully",
  });
};
