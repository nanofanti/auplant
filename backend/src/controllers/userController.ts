import type { Request, Response } from "express";
import User from "../models/User.js";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "404: User not found" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, roles } = req.body;
};
