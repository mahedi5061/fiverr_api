import express from "express";
import {
  createGigController,
  deleteGigController,
  getGigController,
  getGigsController,
} from "../controllers/gig.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/create", verifyToken, createGigController);
router.get("/single/:id", getGigController);
router.get("/", getGigsController);
router.delete("/:id", verifyToken, deleteGigController);

export default router;
