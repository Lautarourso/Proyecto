import Router from "express";
import AuthController from "../controllers/auth.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";


const router = Router();

router.get("/", verifyAdmin, AuthController.getUsuarios);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;
