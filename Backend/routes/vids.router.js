import Router from "express";
import VideoController from "../controllers/videos.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";
import  upload  from "../middlewares/vids.middleware.js";

const router = Router();

router.get("/:id", verifyToken, VideoController.GetV); // sin multer
router.post("/upload",  verifyToken, upload.single("video"),  VideoController.UploadV  );

export default router;
