import { Router } from "express";
import { redirectNanoLink } from "../controllers/redirect.controller.js";

const router = Router()

router.get('/:nanoLink', redirectNanoLink)

export default router