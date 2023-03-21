import express from "express";
import {
  deleteUserController,
  getUserController,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();
router.delete("/:id", verifyToken, deleteUserController);
router.get("/:id", getUserController);

export default router;
