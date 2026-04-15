import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import { 
    createTipoOrganizacion, 
    getTipoOrganizaciones, 
    getTipoOrganizacionById, 
    updateTipoOrganizacion, 
    deleteTipoOrganizacion 
} from "../controllers/tipoOrganizacionController";

const router = Router();

router.post("/", verifyToken, checkRole(1), createTipoOrganizacion);

router.get("/", verifyToken, getTipoOrganizaciones);

router.get("/:id", verifyToken, getTipoOrganizacionById);

router.patch("/:id", verifyToken, checkRole(1), updateTipoOrganizacion);

router.delete("/:id", verifyToken, checkRole(1), deleteTipoOrganizacion);

export default router;