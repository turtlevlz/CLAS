import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import {
    addCertificacionToEmpresa,
    removeCertificacionFromEmpresa,
    getCertificacionesByEmpresa,
    getEmpresasByCertificacion
} from "../controllers/EmpresaCertificacionController"

const router = Router();

router.post("/", verifyToken, checkRole(1, 2), addCertificacionToEmpresa);

router.delete("/:empresa_id/:certificacion_id", verifyToken, checkRole(1, 2), removeCertificacionFromEmpresa);

router.get("/empresa/:empresa_id", verifyToken, getCertificacionesByEmpresa);

router.get("/certificacion/:certificacion_id", verifyToken, getEmpresasByCertificacion);

export default router;