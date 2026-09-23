import type { Response } from "express";
import mongoose from "mongoose";

import type { AuthRequest } from "../middleware/authMiddleware.js";
import CareRequest from "../models/CareRequest.js";
import Conversation from "../models/Conversation.js";
import User from "../models/User.js";

export const createOrGetConversation = async (
  req: AuthRequest,
  res: Response,
) => {
  const { recipientId, careRequestId } = req.body;

  if (!req.userId) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  if (!recipientId) {
    return res.status(400).json({
      message: "Recipient is required",
    });
  }

  if (req.userId === recipientId) {
    return res.status(400).json({
      message: "You cannot start a conversation with yourself",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(recipientId)) {
    return res.status(400).json({
      message: "Invalid recipient ID",
    });
  }

  const recipient = await User.findById(recipientId);

  if (!recipient) {
    return res.status(404).json({
      message: "Recipient not found",
    });
  }

  // Validate the care request when one is provided
  if (careRequestId) {
    if (!mongoose.Types.ObjectId.isValid(careRequestId)) {
      return res.status(400).json({
        message: "Invalid care request ID",
      });
    }

    const careRequest = await CareRequest.findById(careRequestId);

    if (!careRequest) {
      return res.status(404).json({
        message: "Care request not found",
      });
    }

    if (!careRequest.ownerId.equals(recipientId)) {
      return res.status(400).json({
        message: "Recipient is not the owner of this care request",
      });
    }
  }

  // Check whether these two users already have a conversation
  const existingConversation = await Conversation.findOne({
    participants: {
      $all: [req.userId, recipientId],
    },
  });

  if (existingConversation) {
    return res.status(200).json({
      message: "Conversation found",
      data: existingConversation,
    });
  }

  // Otherwise create a new conversation
  const newConversation = await Conversation.create({
    participants: [req.userId, recipientId],
    ...(careRequestId && { careRequestId }),
  });

  return res.status(201).json({
    message: "Conversation created successfully",
    data: newConversation,
  });
};

export const getMyConversations = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  const conversations = await Conversation.find({
    participants: req.userId,
  })
    .populate("participants", "name profileImage")
    .populate("careRequestId", "location startDate endDate status")
    .sort({ updatedAt: -1 });

  return res.status(200).json({
    data: conversations,
  });
};

export const getConversationById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  if (typeof id !== "string") {
    return res.status(400).json({
      message: "Invalid conversation ID",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid conversation ID",
    });
  }

  const conversation = await Conversation.findOne({
    _id: id,
    participants: req.userId,
  })
    .populate("participants", "name profileImage")
    .populate("careRequestId", "location startDate endDate status");

  if (!conversation) {
    return res.status(404).json({
      message: "Conversation not found",
    });
  }

  return res.status(200).json({
    data: conversation,
  });
};
