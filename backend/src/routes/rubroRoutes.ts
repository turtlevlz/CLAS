import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import { createRubro, getRubros, getRubroById, updateRubro, deleteRubro } from "../controllers/rubroController";

const router = Router();

router.post("/", verifyToken, checkRole(1), createRubro);

router.get("/",verifyToken, getRubros);

router.get("/:id", verifyToken, getRubroById);

router.patch("/:id", verifyToken, checkRole(1), updateRubro);

router.delete("/:id", verifyToken, checkRole(1), deleteRubro);

export default router;