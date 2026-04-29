import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import {
    addIndustriaToEmpresa,
    removeIndustriaFromEmpresa,
    getIndustriasByEmpresa,
    getEmpresasByIndustria
} from "../controllers/EmpresaIndustriaController"

const router = Router();

router.post("/", verifyToken, checkRole(1, 2), addIndustriaToEmpresa);

router.delete("/:empresa_id/:industria_id", verifyToken, checkRole(1, 2), removeIndustriaFromEmpresa);

router.get("/empresa/:empresa_id", verifyToken, getIndustriasByEmpresa);

router.get("/industria/:industria_id", verifyToken, getEmpresasByIndustria);

export default router;
