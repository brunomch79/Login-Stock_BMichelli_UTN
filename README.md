Proyecto: Sistema de Login y Gestión de Stock

# 1. Descripción general

El presente proyecto consiste en una **aplicación web full stack** que permite a los usuarios **registrarse, iniciar sesión y gestionar un stock de productos**.  
El sistema está compuesto por:

- **Backend (API REST)** desarrollado con **Node.js**, **Express** y **Sequelize**.
- **Frontend** creado con **React**, **Zustand** y **Tailwind CSS**.

El objetivo principal es brindar una base sólida para la gestión de usuarios y productos mediante autenticación y operaciones CRUD.


# 2. Tecnologías utilizadas

| Área | Herramienta | Descripción |
|------|--------------|-------------|
| Lenguaje principal | **JavaScript** | Usado en frontend y backend. |
| Backend | **Node.js** | Entorno de ejecución del servidor. |
| Framework | **Express** | Framework para crear la API REST. |
| ORM | **Sequelize** | Conexión y manipulación de la base de datos MySQL. |
| Base de datos | **MySQL** | Sistema de base de datos relacional. |
| Frontend | **React** | Biblioteca para construir interfaces interactivas. |
| Estado global | **Zustand** | Manejo del estado del usuario. |
| Estilos | **Tailwind CSS** | Framework CSS para estilos modernos. |
| Seguridad | **bcrypt**, **jsonwebtoken** | Encriptación de contraseñas y manejo de tokens JWT. |
| Variables de entorno | **dotenv** | Configuración de claves y puertos. |


# Arquitectura del proyecto

Login-Stock/
├── back/ → Servidor (Node + Express)
│ ├── config/ → Configuración de la base de datos
│ ├── models/ → Modelos Sequelize (User, Product)
│ ├── routes/ → Rutas de usuario y productos
│ └── index.mjs → Punto de entrada del backend
│
├── front/ → Interfaz (React + Zustand)
│ ├── src/
│ │ ├── components/ → Componentes visuales
│ │ ├── store/ → Estado global (useStore)
│ │ └── pages/ → Login, Registro y Stock
│ └── vite.config.js → Configuración de Vite
│
└── .env → Variables de entorno (DB, puertos, claves)


# 4. Funcionamiento general

1. El **usuario** se registra en el sistema.
2. El **backend** recibe los datos, los valida y los guarda en la base de datos.
3. El usuario puede **iniciar sesión**, y el servidor genera un **token JWT**.
4. El **frontend** guarda el usuario autenticado usando **Zustand**.
5. El usuario puede acceder al **panel de stock** y realizar operaciones **CRUD**.
6. Las acciones se comunican con el backend mediante **peticiones HTTP (fetch)**.


# 5. Backend (Node.js + Express + Sequelize)

`index.mjs`
Punto de entrada del servidor:

```js
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { sequelize } from "./config/db.mjs"
import { userRoutes } from "./routes/user.mjs"
import { productRoutes } from "./routes/product.mjs"

dotenv.config()
const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

app.use("/user", userRoutes)
app.use("/product", productRoutes)

app.listen(PORT, async () => {
  try {
    await sequelize.sync()
    console.log("Base de datos conectada")
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  } catch (err) {
    console.error("Error al conectar la base de datos:", err.message)
  }
})

···config/db.mjs···
Configuración de conexión con la base de datos MySQL:
import { Sequelize } from "sequelize"

export const sequelize = new Sequelize(
  process.env.NAME_DB,
  process.env.USER_DB,
  process.env.PASS_DB,
  {
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    dialect: process.env.DIALECT_DB
  }
)

···Modelo User···
import { DataTypes } from "sequelize"
import { sequelize } from "../config/db.mjs"

export const User = sequelize.define("users", {
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  hash: { type: DataTypes.STRING, allowNull: false },
  isActivate: { type: DataTypes.BOOLEAN, defaultValue: true },
})

···Modelo Product···
import { DataTypes } from "sequelize"
import { sequelize } from "../config/db.mjs"

export const Product = sequelize.define("products", {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false }
})

···Rutas / user···
import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user.mjs"

export const userRoutes = express.Router()

userRoutes.post("/register", async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body
  if (password !== confirmPassword)
    return res.json({ error: true, msg: "Las contraseñas no coinciden" })
  const hash = await bcrypt.hash(password, 10)
  await User.create({ fullName, email, hash })
  res.json({ msg: "Usuario registrado correctamente" })
})

userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ where: { email } })
  if (!user) return res.json({ error: true, msg: "Usuario no encontrado" })
  const valid = await bcrypt.compare(password, user.hash)
  if (!valid) return res.json({ error: true, msg: "Contraseña incorrecta" })
  const token = jwt.sign({ id: user.id }, process.env.SECRET)
  res.json({ msg: "Login exitoso", user, token })
})

···Rutas / product···
Permiten crear, leer, actualizar y eliminar productos (CRUD).
Cada endpoint recibe y devuelve JSON, interactuando directamente con Sequelize.

6. Frontend (React + Zustand)
Estructura
src/
├── components/
│   ├── common/        → Input, Button, Form
│   ├── login/         → Login.jsx, Register.jsx
│   └── stock/         → CRUD de productos
├── store/
│   └── useStore.js
└── main.jsx

···Estado global con Zustand···
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(persist(
  (set) => ({
    user: { full_name: null, email: null, token: null },
    setUser: (newuser) => set({ user: newuser })
  }),
  { name: "token_login_web" }
))

Explicación:
Guarda el usuario logueado.
Usa persist para mantener la sesión incluso si se recarga la página.

···Login.jsx···
Formulario para iniciar sesión:

const handleSubmit = async (e) => {
  e.preventDefault()
  const body = { email, password }
  const url = `${import.meta.env.VITE_API_URL}/user/login`
  const req = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  })
  const res = await req.json()
  if (res.error) return toast.error(res.msg)
  setUser(res.user)
  toast.success("Sesión iniciada correctamente")
}

···Register.jsx···
Formulario de registro de usuarios:

const handleSubmit = async (e) => {
  e.preventDefault()
  const body = { fullName, email, password, confirmPassword }
  const url = `${import.meta.env.VITE_API_URL}/user/register`
  const req = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  })
  const res = await req.json()
  if (res.error) return toast.error(res.msg)
  toast.success(res.msg)
}

# 7. Flujo del sistema
Registro: el usuario se da de alta en /user/register.

Login: envía email y contraseña a /user/login.

Validación: el servidor verifica credenciales y devuelve un token.

Persistencia: el frontend guarda el usuario con Zustand.

Stock: el usuario puede crear, editar y eliminar productos desde el panel.

# 8. Seguridad
Contraseñas encriptadas con bcrypt.

Generación de tokens JWT.

Variables sensibles protegidas con .env.

Middleware CORS activado.

⚙️ 9. Variables de entorno (.env)
env
Copiar código
PORT=3000
HOST_DB=localhost
PORT_DB=3306
USER_DB=root
PASS_DB=
NAME_DB=login_stock
DIALECT_DB=mysql
SECRET=midetokensecreto
🧠 10. Conclusión
El proyecto implementa una arquitectura cliente-servidor moderna, con separación de responsabilidades, autenticación segura y persistencia de datos.
Sirve como ejemplo funcional de una aplicación full stack JavaScript, aplicando buenas prácticas de desarrollo web.

