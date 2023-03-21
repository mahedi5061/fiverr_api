import express from "express";
import {
  createMessageController,
  getMessageController,
} from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createMessageController);
router.get("/single/:id", verifyToken, getMessageController);
// router.get("/", getGigsController);
// router.delete("/:id", verifyToken, deleteGigController);

export default router;
