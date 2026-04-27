import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import { createNecesidad, getNecesidades, getNecesidadById, updateNecesidad, deleteNecesidad } from "../controllers/necesidadController";

const router = Router();

router.post("/", verifyToken, checkRole(1), createNecesidad)

router.get("/", verifyToken, getNecesidades);

router.get("/:id", verifyToken, getNecesidadById);

router.patch("/:id", verifyToken, checkRole(1), updateNecesidad);

router.delete("/:id", verifyToken, checkRole(1), deleteNecesidad);

export default router;