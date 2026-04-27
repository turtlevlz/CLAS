import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import {
    addNecesidadToEmpresa,
    removeNecesidadFromEmpresa,
    getNecesidadesByEmpresa,
    getEmpresasByNecesidad
} from "../controllers/EmpresaNecesidadController"

const router = Router();

router.post("/", verifyToken, checkRole(1, 2), addNecesidadToEmpresa);

router.delete("/:empresa_id/:necesidad_id", verifyToken, checkRole(1, 2), removeNecesidadFromEmpresa);

router.get("/empresa/:empresa_id", verifyToken, getNecesidadesByEmpresa);

router.get("/necesidad/:necesidad_id", verifyToken, getEmpresasByNecesidad);

export default router;
