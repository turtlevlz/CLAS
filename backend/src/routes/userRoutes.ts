import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import { createUser, getUsers, getUserById, updateUser, deleteUser } from "../controllers/userController";

const router = Router();

router.post("/", verifyToken, checkRole(1, 2), createUser);

router.get("/", verifyToken, checkRole(1), getUsers);

router.get("/:id", verifyToken, getUserById);

router.patch("/:id", verifyToken, updateUser);

router.delete("/:id", verifyToken, checkRole(1, 2), deleteUser);

export default router;