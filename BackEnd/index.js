import  "dotenv/config"
import "./database/connectDB.js"
import express from "express"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import session from "express-session"
import authRoutes from "./routes/auth.route.js"
import linkRoutes from "./routes/link.route.js"
import redirectRoutes from "./routes/redirect.route.js"

const app = express()
const whiteList = [process.env.ORIGIN1]

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || whiteList.includes(origin)) return callback(null, origin)
        return callback( `No autorizado por CORS. origin: ${origin}. No autorizado` )
    },
    credentials: true
}))
app.use(session({
    secret: process.env.JWT_REFRESH,
    saveUninitialized: true,
    resave: true,
    cookie: {
        expires: new Date(Date.now() + 1000 * 60 * 60),
        httpOnly: true,
        secure: (process.env.MODO === "developer"),
        sameSite: 'none',
    }

}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/links", linkRoutes);
app.use("/", redirectRoutes) // Ejemplo redirect desde Backend (Opcional)

app.use(express.static('public'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Servidor iniciado 🔥🔥🔥 http://localhost:${PORT}`));