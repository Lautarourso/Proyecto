import Router from "express";
import Analisis from "../controllers/analisis.controller.js";

const router = Router();


router.post("/uptiempo", Analisis.UploadT);

export default router;
