import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import { createUser, getUsers, getUsersByEmpresa, getUserById, updateUser, deleteUser } from "../controllers/userController";

const router = Router();

router.post("/", verifyToken, checkRole(1, 2), createUser);

router.get("/", verifyToken, checkRole(1), getUsers);

router.get("/:id", verifyToken, getUserById);

router.get("/empresa/:empresa_id", verifyToken, checkRole(1, 2, 3), getUsersByEmpresa);

router.patch("/:id", verifyToken, checkRole(1, 2, 3) ,updateUser);

router.delete("/:id", verifyToken, checkRole(1, 2, 3), deleteUser);

export default router;