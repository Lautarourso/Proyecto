import Router from "express";
import Analisis from "../controllers/analisis.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();


router.get("/:id", verifyToken, Analisis.GetT);
router.post("/numericos", Analisis.IA)

export default router;
