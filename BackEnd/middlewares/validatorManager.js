import { validationResult, body, cookie, header, param } from "express-validator";
import axios from "axios";

export const validationResExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next()
}

export const bodySignupValidator = [
  body('email', "formato de email inválido").trim().isEmail().normalizeEmail(),
  body('password', "Mínino 8 caracteres").trim().isLength({min: 8}),
  body('password')
    .custom((e, {req}) => {
      if (e !== req.body.repassword) {
        throw new Error('Las contraseñas no coinciden')
      }
      return e
    }
  ),
  validationResExpress
]

export const bodyLoginValidator = [
  body('email', "formato de email inválido").trim().isEmail().normalizeEmail(),
  validationResExpress
]

export const tokenHeaderValidator = [
  header("refreshToken", "No existe el Token")
    .trim()
    .notEmpty()
    .escape(),
  validationResExpress
]

export const tokenCookieValidator = [
  cookie("refreshToken", "No esiste el refresh Token")
    .trim()
    .notEmpty()
    .escape(),
  validationResExpress
]

export const linkValidator = [
  body("longLink", "Formato link incorrecto")
    .trim()
    .notEmpty()
    .custom(async (value) => {
      try {
        if (!value.startsWith("http")) {
          value = `https://${value}`
        }
        await axios.get(value);
        return value;

      } catch (error) {
          throw new Error("Link no encontrado");
      }
    }),
  validationResExpress
]

export const paramsLinkValidator = [
  param("id", "Formato Id Incorrecto")
    .trim()
    .notEmpty()
    .escape(),
  validationResExpress
]

export const paramNanolinkValidator = [
  param("nanoLink", "Fromato no válido")
    .trim()
    .notEmpty()
    .escape(),
  validationResExpress
]