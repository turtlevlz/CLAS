import { Router } from "express";
import { login } from "../controllers/authController";
import { register } from "../controllers/authController";
import { forgotPassword } from "../controllers/authController";
import { resetPassword } from "../controllers/authController";

const router = Router();

router.post("/login", login);

router.post("/register", register);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

export default router;
