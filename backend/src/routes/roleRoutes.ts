import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import { createRole, getRoles, getRoleById, updateRole, deleteRole } from "../controllers/roleController";

const router = Router();

router.post("/", verifyToken, checkRole(1), createRole);

router.get("/", verifyToken, getRoles);

router.get("/:id", verifyToken, getRoleById)

router.patch("/:id", verifyToken, checkRole(1), updateRole);

router.delete("/:id", verifyToken, checkRole(1), deleteRole);

export default router;