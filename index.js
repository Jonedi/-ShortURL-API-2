import  "dotenv/config"
import "./database/connectDB.js"
import express from "express"
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.route.js"
import linkRoutes from "./routes/link.route.js"
import redirectRoutes from "./routes/redirect.route.js"
import cors from 'cors'

const app = express()
const whiteList = [process.env.ORIGIN1]

app.use(cors({
    origin: function(origin, callback) {
        if (whiteList.includes(origin)) return callback(null, origin)
        return callback( `No autorizado por CORS. origin: ${origin}. No autorizado` )
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