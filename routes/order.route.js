import express from "express";
import {
  confirm,
  getOrderController,
  intent,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrderController);
router.get("/", verifyToken, getOrderController);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);

export default router;
