import { Router } from "express";
import { getLinks, createLink, getLink, removeLink, updateLink } from "../controllers/link.controller.js";
import { validateToken } from "../middlewares/validateToken.js";
import { linkValidator, paramsLinkValidator, tokenHeaderValidator } from "../middlewares/validatorManager.js";

const router = Router()

// router.get('/', tokenHeaderValidator, validateToken, getLinks)
router.get('/', validateToken, getLinks)

// router.get('/:id', validateToken, getNanoLink)
router.get('/:nanoLink', getLink)

router.post('/', validateToken, linkValidator, createLink)

router.patch('/:id', validateToken, paramsLinkValidator, linkValidator, updateLink)

// router.delete('/:id', tokenHeaderValidator, validateToken, paramsLinkValidator, removeLink)
router.delete('/:id', validateToken, paramsLinkValidator, removeLink)

export default router
