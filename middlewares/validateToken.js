import jwt from 'jsonwebtoken'
import { errorsToken } from "../helpers/errorsToken.js";

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
        // return res.json({status: 400, error: e.message})
        return res.status(401).json({status: 401, error: errorsToken(e.message)})
    }
}