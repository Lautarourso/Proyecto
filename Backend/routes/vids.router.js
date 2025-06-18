import Router from "express";
import VideoController from "../controllers/videos.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyToken, //verifyId);
);
