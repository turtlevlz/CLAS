import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import { 
    createContacto, 
    getContactosByEmpresa, 
    getContactobyId, 
    updateContacto, 
    deleteContacto 
} from "../controllers/contactoController";

const router = Router();

router.post("/", verifyToken, checkRole(1, 2), createContacto);

router.get("/empresa/:empresa_id", verifyToken, getContactosByEmpresa);

router.get("/:id", verifyToken, getContactobyId);

router.patch("/:id", verifyToken, checkRole(1, 2), updateContacto);

router.delete("/:id", verifyToken, checkRole(1, 2), deleteContacto);

export default router;