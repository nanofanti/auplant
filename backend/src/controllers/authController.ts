import type { Request, Response } from "express";
import bcrypt from "bcrypt";
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

  return res.status(200).json({ message: "Login successful" });
};
