import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import {
    createProductoFabricado,
    getProductosByEmpresa,
    getProductoFabricadoById,
    updateProductoFabricado,
    deleteProductoFabricado
} from "../controllers/productoFabricadoController";

const router = Router();

router.post("/", verifyToken, checkRole(1, 2), createProductoFabricado);

router.get("/empresa/:empresa_id", verifyToken, checkRole(1, 2), getProductosByEmpresa);

router.get("/:id", verifyToken, checkRole(1, 2), getProductoFabricadoById);

router.patch("/:id", verifyToken, checkRole(1, 2), updateProductoFabricado);

router.delete("/:id", verifyToken, checkRole(1, 2), deleteProductoFabricado);

export default router;
