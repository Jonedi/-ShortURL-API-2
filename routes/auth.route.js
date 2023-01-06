import express from 'express'
import { body } from "express-validator";
import { login, signup } from '../controllers/auth.controller.js';
import { validationResExpress } from '../middlewares/validationResExpress.js';
const router = express.Router()

router.post('/signup', [
    body('email', "formato de email inválido").trim().isEmail().normalizeEmail(),
    body('password', "Mínino 8 caracteres").trim().isLength({min: 8}),
    body('password')
        .custom((e, {req}) => {
            if (e !== req.body.repassword) {
                throw new Error('Las contraseñas no coinciden')
            }
            return e
        })
    // body('pasword', "La contraseña debe contener más de 8 caracteres, debe incluir mayusculas, minúsculas, por lo menos un número y un caracter especial").isLength({min: 8})
], validationResExpress, signup);

router.post("/login", [
    body('email', "formato de email inválido").trim().isEmail().normalizeEmail(),
    body('password', "Mínino 8 caracteres").trim().isLength({min: 8}),
], validationResExpress, login);

export default router;