import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import { 
    createFuncionContacto, 
    getFuncionesContacto, 
    getFuncionContactoById, 
    updateFuncionContacto,
    deleteFuncionContacto 
} from "../controllers/funcionContactoController";

const router = Router();

router.post("/", verifyToken, checkRole(1), createFuncionContacto);

router.get("/", verifyToken, getFuncionesContacto);

router.get("/:id", verifyToken, getFuncionContactoById);

router.patch("/:id", verifyToken, checkRole(1), updateFuncionContacto);

router.delete("/:id", verifyToken, checkRole(1), deleteFuncionContacto);

export default router;