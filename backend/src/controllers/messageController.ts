import type { Response } from "express";
import mongoose from "mongoose";

import type { AuthRequest } from "../middleware/authMiddleware.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const sendMessage = async (req: AuthRequest, res: Response) => {
  const { conversationId } = req.params;
  const { content } = req.body;

  if (!req.userId) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  if (typeof conversationId !== "string") {
    return res.status(400).json({
      message: "Invalid conversation ID",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    return res.status(400).json({
      message: "Invalid conversation ID",
    });
  }

  if (typeof content !== "string" || !content.trim()) {
    return res.status(400).json({
      message: "Message cannot be empty",
    });
  }

  const conversation = await Conversation.findOne({
    _id: conversationId,
    participants: req.userId,
  });

  if (!conversation) {
    return res.status(404).json({
      message: "Conversation not found",
    });
  }

  const newMessage = await Message.create({
    conversationId: conversationId,
    senderId: req.userId,
    content: content.trim(),
  });

  await Conversation.findByIdAndUpdate(conversationId, {
    updatedAt: new Date(),
  });

  return res.status(201).json({
    message: "Message sent successfully",
    data: newMessage,
  });
};

export const getMessages = async (req: AuthRequest, res: Response) => {
  const { conversationId } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  if (typeof conversationId !== "string") {
    return res.status(400).json({
      message: "Invalid conversation ID",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    return res.status(400).json({
      message: "Invalid conversation ID",
    });
  }

  const conversation = await Conversation.findOne({
    _id: conversationId,
    participants: req.userId,
  });

  if (!conversation) {
    return res.status(404).json({
      message: "Conversation not found",
    });
  }

  const messages = await Message.find({
    conversationId,
  })
    .populate("senderId", "name profileImage")
    .sort({ createdAt: 1 });

  return res.status(200).json({
    data: messages,
  });
};
