import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import {
    createProceso,
    getProcesos,
    getProcesoById,
    updateProceso,
    deleteProceso
} from "../controllers/procesoController";

const router = Router();

router.post("/", verifyToken, checkRole(1), createProceso);

router.get("/", verifyToken, getProcesos);

router.get("/:id", verifyToken, getProcesoById);

router.patch("/:id", verifyToken, checkRole(1), updateProceso);

router.delete("/:id", verifyToken, checkRole(1), deleteProceso);

export default router;
