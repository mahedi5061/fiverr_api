import express from "express";
import {
  logoutController,
  registerController,
  signinController,
} from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/register", registerController);
router.post("/signin", signinController);
router.post("/logout", logoutController);

export default router;
