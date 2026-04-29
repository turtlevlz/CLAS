import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import {
    addProcesoToEmpresa,
    removeProcesoFromEmpresa,
    getProcesosByEmpresa,
    getEmpresasByProceso
} from "../controllers/EmpresaProcesoController"

const router = Router();

router.post("/", verifyToken, checkRole(1, 2), addProcesoToEmpresa);

router.delete("/:empresa_id/:proceso_id", verifyToken, checkRole(1, 2), removeProcesoFromEmpresa);

router.get("/empresa/:empresa_id", verifyToken, getProcesosByEmpresa);

router.get("/proceso/:proceso_id", verifyToken, getEmpresasByProceso);

export default router;
