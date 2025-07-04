import Router from "express";
import VideoController from "../controllers/videos.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/upvideos", verifyToken, VideoController.UploadV);
router.get("/videos", verifyToken, VideoController.GetV)
export default router;
