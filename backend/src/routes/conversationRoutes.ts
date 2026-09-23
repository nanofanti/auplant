import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  createOrGetConversation,
  getMyConversations,
  getConversationById,
} from "../controllers/conversationController.js";

import { sendMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.get("/", protect, getMyConversations);

router.get("/:id", protect, getConversationById);

router.post("/", protect, createOrGetConversation);

router.get("/:conversationId/messages", protect, getMessages);

router.post("/:conversationId/messages", protect, sendMessage);

export default router;
