import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import { uploadLogo } from "../middleware/uploadEmpresaLogoMiddleware";

import {
    createEmpresa,
    getEmpresas,
    getEmpresaById,
    updateEmpresa,
    deleteEmpresa
} from "../controllers/empresaController";

const router = Router();

router.post(
    "/",
    verifyToken,
    checkRole(1),
    uploadLogo.single("logo"),
    createEmpresa
);

router.get("/", verifyToken, getEmpresas);

router.get("/:id", verifyToken, getEmpresaById);

router.patch(
    "/:id",
    verifyToken,
    uploadLogo.single("logo"),
    updateEmpresa
);

router.delete("/:id", verifyToken, checkRole(1), deleteEmpresa);

export default router;