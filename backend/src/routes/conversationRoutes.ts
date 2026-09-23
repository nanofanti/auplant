import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  createOrGetConversation,
  getMyConversations,
  getConversationById,
} from "../controllers/conversationController.js";

const router = express.Router();

router.get("/", protect, getMyConversations);

router.get("/:id", protect, getConversationById);

router.post("/", protect, createOrGetConversation);

export default router;
