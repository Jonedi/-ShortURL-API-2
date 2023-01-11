import { User } from "../models/Users.js";
import { generateToken, generateRefreshToken } from "../utils/tokenManager.js";
import { errorsToken } from "../helpers/errorsToken.js"
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    
    try {
        const { email , password } = req.body

        let user = await User.findOne({ email })
        if (user) return res.json({ status: 401, code: 11000, message: "El usuario ya existe" })
        // if (user) throw new Error("Email ya registrado 😒");

        user = new User({ email, password })
        await user.save()
        
        // Token
        const { token, expiresIn } = generateToken(user.id)
        generateRefreshToken(user.id, res)
        
        return res.json({ token, expiresIn })
        // return res.json({ status: 'signup Ok' })
    } catch (e) {
        console.log(e.code);
        return res.status(500).json({ status: 500, message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        
        let user = await User.findOne({ email })
        if (!user) return res.json({ status: 403, message: "El usuario no existe" })
        // if(!user || !(await user.comparePassword(password))) return throw new Error("Email or password is incorrect")
        if(!user || !(await user.comparePassword(password))) return res.json({ status: 403, message: "Email o contraseña es incorrecto" })

        // Token
        const { token, expiresIn } = generateToken(user.id)
        generateRefreshToken(user.id, res)
        
        return res.json({ token, expiresIn })
        // return res.json({ status: "login OK" })
    } catch (e) {
        console.log(e);
        return res.status(500).json({ status: 500, message: error.message })
    }
}

export const infoUser = async(req, res) => {
    try {
        const user = await User.findById(req.uid).lean()
        delete user.password
        res.json({ok: "Usuario en línea", user})
    } catch (e) {
        console.log(e);
        return res.status(403).json({status: 400, error: e.message})
    }
}

export const refreshToken = (req, res) => {
    try {
        let refreshTokenCookie = req.cookies?.refreshToken
        if(!refreshTokenCookie) throw new Error("No existe el refreshToken")

        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH)

        const { token, expiresIn } = generateToken(uid)

        return res.json({ token, expiresIn })
    } catch (e) {
        console.log(e);
        const data = errorsToken(e)
        return res.status(401).json({status: 401, error: data})
    }
}

export const logout = (req, res) => {
    // https://stackoverflow.com/questions/27978868/destroy-cookie-nodejs
    res.clearCookie("refreshToken");
    return res.json({ ok: true });
};