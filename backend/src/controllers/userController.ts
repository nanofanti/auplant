import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

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
