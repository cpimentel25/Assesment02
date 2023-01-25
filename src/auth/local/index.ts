import { Router } from "express";
import { handleLoginUser } from "./local.controllet";

const router = Router();

// Post /auth/local/login	-> Login user by email/password
router.post('/login', handleLoginUser);

export default router;
