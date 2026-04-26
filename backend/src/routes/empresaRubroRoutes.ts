import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import {
    addRubroToEmpresa,
    removeRubroFromEmpresa,
    getEmpresasByRubro,
    getRubrosByEmpresa
} from "../controllers/EmpresaRubroController"

const router = Router();

router.post("/", verifyToken, checkRole(1, 2), addRubroToEmpresa);

router.delete("/:empresa_id/:rubro_id", verifyToken, checkRole(1, 2), removeRubroFromEmpresa);

router.get("/rubro/:rubro_id", verifyToken, getEmpresasByRubro);

router.get("/empresa/:empresa_id", verifyToken, getRubrosByEmpresa);

export default router