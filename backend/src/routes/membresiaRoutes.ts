import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import { createMembresia, getMembresias, getMembresiaByID, updateMembresia, deleteMembresia } from "../controllers/membresiaController";

const router = Router();

router.post("/", verifyToken, checkRole(1), createMembresia);

router.get("/", verifyToken, getMembresias);

router.get("/:id", verifyToken, getMembresiaByID);

router.patch("/:id", verifyToken, checkRole(1), updateMembresia);

router.delete("/:id", verifyToken, checkRole(1), deleteMembresia);

export default router;
