import  "dotenv/config"
import "./database/connectDB.js"
import express from "express"
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.route.js"

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use("/api/v1/auth", authRoutes);
app.use(express.static('public'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Servidor iniciado 🔥🔥🔥 http://localhost:${PORT}`));