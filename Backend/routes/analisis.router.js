import Router from "express";
import Analisis from "../controllers/analisis.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();


router.post("/uptiempo", verifyToken, Analisis.UploadT);
router.get("/gettiempo", verifyToken, Analisis.GetT);

export default router;
