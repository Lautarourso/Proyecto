import Router from "express";
import Form from "../controllers/form.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/numericos", Form.IA);
router.get("/:id", verifyToken, Form.getF);


export default router;
