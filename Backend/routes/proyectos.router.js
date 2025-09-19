import Router from "express";
import Proyectos from "../controllers/proyectos.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";
import  upload  from "../middlewares/vids.middleware.js";


const router = Router();

router.post("/upProyectos", verifyToken, upload.single("Video"), Proyectos.UploadP);
router.get("/getProyectos", verifyToken, Proyectos.GetP);

export default router;