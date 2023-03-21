import express from "express";
import {
  createReviewController,
  deleteReviewController,
  getReviewController,
} from "../controllers/review.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();
router.post("/create", verifyToken, createReviewController);
router.get("/:gigId", getReviewController);
router.delete("/:id", deleteReviewController);

export default router;
