import { Router } from "express";
import { googleLogin, signIn, signUp } from "../controllers/auth.controller.js";
const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google-login", googleLogin);

export const authRoutes = router;
