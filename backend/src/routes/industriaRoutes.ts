import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import { createIndustria, getIndustrias, getIndustriaById, updateIndustria, deleteIndustria } from "../controllers/industriaController";

const router = Router();

router.post("/", verifyToken, checkRole(1), createIndustria)

router.get("/", verifyToken, getIndustrias);

router.get("/:id", verifyToken, getIndustriaById);

router.patch("/:id", verifyToken, checkRole(1), updateIndustria);

router.delete("/:id", verifyToken, checkRole(1), deleteIndustria);

export default router;