import type { Response } from "express";
import mongoose from "mongoose";

import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import CareRequest from "../models/CareRequest.js";
import User from "../models/User.js";

import type { AuthRequest } from "../middleware/authMiddleware.js";

// Create a new conversation or return an existing one
export const createOrGetConversation = async (
  req: AuthRequest,
  res: Response,
) => {
  if (!req.userId) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  const { recipientId, careRequestId } = req.body;

  if (!recipientId) {
    return res.status(400).json({
      message: "Recipient ID is required",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(recipientId)) {
    return res.status(400).json({
      message: "Invalid recipient ID",
    });
  }

  if (recipientId === req.userId) {
    return res.status(400).json({
      message: "You cannot start a conversation with yourself",
    });
  }

  const recipient = await User.findById(recipientId);

  if (!recipient) {
    return res.status(404).json({
      message: "Recipient not found",
    });
  }

  if (careRequestId && !mongoose.Types.ObjectId.isValid(careRequestId)) {
    return res.status(400).json({
      message: "Invalid care request ID",
    });
  }

  if (careRequestId) {
    const careRequest = await CareRequest.findById(careRequestId);

    if (!careRequest) {
      return res.status(404).json({
        message: "Care request not found",
      });
    }

    if (careRequest.ownerId.toString() !== recipientId) {
      return res.status(400).json({
        message: "Recipient is not the owner of this care request",
      });
    }
  }

  const existingConversation = await Conversation.findOne({
    participants: {
      $all: [req.userId, recipientId],
    },
  });

  if (existingConversation) {
    return res.status(200).json({
      data: existingConversation,
    });
  }

  const conversation = await Conversation.create({
    participants: [req.userId, recipientId],
    ...(careRequestId && { careRequestId }),
  });

  return res.status(201).json({
    data: conversation,
  });
};

// Get all conversations belonging to the logged-in user
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

  const conversationsWithLatestMessage = await Promise.all(
    conversations.map(async (conversation) => {
      const latestMessage = await Message.findOne({
        conversationId: conversation._id,
      })
        .populate("senderId", "name profileImage")
        .sort({ createdAt: -1 });

      return {
        ...conversation.toObject(),
        latestMessage,
      };
    }),
  );

  return res.status(200).json({
    data: conversationsWithLatestMessage,
  });
};

// Get one conversation
export const getConversationById = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  const { id } = req.params;

  if (!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid conversation ID",
    });
  }

  const conversation = await Conversation.findById(id)
    .populate("participants", "name profileImage")
    .populate("careRequestId", "location startDate endDate status");

  if (!conversation) {
    return res.status(404).json({
      message: "Conversation not found",
    });
  }

  const isParticipant = conversation.participants.some(
    (participant) => participant._id.toString() === req.userId,
  );

  if (!isParticipant) {
    return res.status(403).json({
      message: "You are not allowed to view this conversation",
    });
  }

  return res.status(200).json({
    data: conversation,
  });
};
