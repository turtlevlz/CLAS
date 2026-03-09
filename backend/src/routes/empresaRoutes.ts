import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import { createEmpresa, getEmpresaById } from "../controllers/empresaController";
import { getEmpresas } from "../controllers/empresaController";

const router = Router();

router.post("/", verifyToken, checkRole(1), createEmpresa
);

router.get("/", verifyToken, getEmpresas);

router.get("/:id", verifyToken, getEmpresaById)

export default router;