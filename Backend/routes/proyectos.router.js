import Router from "express";
import Proyectos from "../controllers/proyectos.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/upProyectos", verifyToken, Proyectos.UploadP);
router.get("/getProyectos", verifyToken, Proyectos.GetP);

export default router;