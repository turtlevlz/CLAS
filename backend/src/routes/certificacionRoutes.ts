import { Router } from "express";
import { checkRole } from "../middleware/roleMiddleware";
import { createCertificacion, getCertificaciones, getCertificacionById, updateCertificacion, deleteCertificacion } from "../controllers/certificacionController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/", verifyToken, checkRole(1), createCertificacion);

router.get("/", verifyToken, getCertificaciones);

router.get("/:id", verifyToken, getCertificacionById);

router.patch("/:id", verifyToken, checkRole(1), updateCertificacion);

router.delete("/:id", verifyToken, checkRole(1), deleteCertificacion);

export default router;
