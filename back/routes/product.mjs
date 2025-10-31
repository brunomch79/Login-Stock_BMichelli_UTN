import { Router } from "express"
import { Product } from "../models/product.mjs"

export const productRoutes = Router()

//Obtener todos los productos
productRoutes.get("/", async (req, res) => {
    try {
        const products = await Product.findAll()
        res.json({ error: false, data: products })
    } catch (err) {
    res.status(500).json({ error: true, msg: "No se pudieron cargar los productos" })
    }
})

//Crear un producto
productRoutes.post("/", async (req, res) => {
    try {
        const { name, price, stock } = req.body
        if ([name, price, stock].some(v => v === "" || v == null)) {
            return res.status(400).json({ error: true, msg: "Todos los campos son obligatorios" })
        }
        const product = await Product.create({
            name,
            price: Number(price),
            stock: Number(stock),
        })
        res.json({ error: false, msg: "Producto cargado", data: product })
    } catch (err) {
        res.status(500).json({ error: true, msg: err.message })
    }
})

//Obtener un producto por ID
productRoutes.get("/:id", async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) return res.status(404).json({ error: true, msg: "Producto no encontrado" })
        res.json({ error: false, product });
    } catch {
        res.status(500).json({ error: true, msg: "Error al obtener el producto" })
    }
})

//Actualizar un producto
productRoutes.put("/:id", async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: true, msg: "Producto no encontrado" })
        const { name, price, stock } = req.body
        await product.update({ name, price, stock })
        res.json({ error: false, msg: "Producto actualizado", data: product })
    } catch {
        res.status(500).json({ error: true, msg: "Ocurrió un error al actualizar" })
    }
})

//Eliminar un producto
productRoutes.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) return res.status(404).json({ error: true, msg: "Producto no encontrado" })
        await product.destroy()
        res.json({ error: false, msg: "Producto eliminado" })
    } catch {
        res.status(500).json({ error: true, msg: "Ocurrió un error al eliminar" })
    }
})
