import { Router } from "express";
import { login, signup, infoUser, refreshToken, logout } from '../controllers/auth.controller.js';
import { bodyLoginValidator, bodySignupValidator } from '../middlewares/validatorManager.js';
import { validateToken, validateRefreshToken } from '../middlewares/validateToken.js';

const router = Router()

router.post('/signup', bodySignupValidator, signup)

router.post("/login", bodyLoginValidator, login)

router.get("/protected", validateToken, infoUser)

router.get("/refresh", validateRefreshToken, refreshToken)

router.get("/logout", logout)

export default router;