import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { sequelize } from "./config/db.mjs"
import { userRoutes } from "./routes/user.mjs"
import { productRoutes } from "./routes/product.mjs"

dotenv.config()
const app = express()
const PORT = process.env.PORT ?? 7001

// Middleware
app.use(cors())
app.use(express.json())

// Rutas principales
app.use("/user", userRoutes)
app.use("/product", productRoutes)

// Inicio del servidor
app.listen(PORT, async () => {
    try {
        await sequelize.sync()
        console.log("Base de datos conectada")
        console.log(`Servidor corriendo en http://localhost:${PORT}`)
    } catch (err) {
        console.error("Error al conectar la base de datos:", err.message)
    }
})
