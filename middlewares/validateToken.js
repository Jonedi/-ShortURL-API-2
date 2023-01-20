import jwt from 'jsonwebtoken'
import { errorsToken } from "../utils/tokenManager.js";

export const validateToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization
        if (!token) res.json({ status: 'error', message: 'No existe el token'})

        token = token.split(" ")[1]
        const { uid } = jwt.verify(token, process.env.JWT_SECRET)
        req.uid = uid
        next()
    } catch (e) {
        console.log(e);
        // return res.status(401).json({status: 405, error: e.message})
        return res.status(401).json({status: 405, message: e.message, error: errorsToken(e.message)})
    }
}
export const validateRefreshToken = (req, res, next) => {
    try {
        let refreshTokenCookie = req.cookies?.refreshToken
        if(!refreshTokenCookie) throw new Error("No existe el refreshToken")

        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH)
        
        req.uid = uid
        next()
    } catch (e) {
        console.log(e);
        // return res.status(401).json({status: 401, error: e.message })
        return res.status(401).json({status: 401, error: errorsToken(e.message)})
    }
}