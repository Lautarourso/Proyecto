import Router from "express";
import VideoController from "../controllers/videos.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";
import  upload  from "../middlewares/vids.middleware.js";

const router = Router();

router.get("/videos", verifyToken, VideoController.GetV); // sin multer


export default router;
