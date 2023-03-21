import express from "express";
import {
  createConversationController,
  getConversationsController,
  getSingleConversationController,
  updateConversationController,
} from "../controllers/conversation.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();
router.post("/", verifyToken, createConversationController);
router.get("/", verifyToken, getConversationsController);
router.get("/single/:id", verifyToken, getSingleConversationController);
router.put("/:id", verifyToken, updateConversationController);

export default router;
