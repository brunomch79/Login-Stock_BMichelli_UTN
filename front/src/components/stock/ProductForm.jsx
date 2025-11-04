import { Input } from '../common/Input'
import { useState, useEffect } from 'react'
import { toast } from "react-toastify"
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { Navbar } from '../common/Navbar'
import { Container } from './Container'

export const ProductForm = () => {
    const params = useParams()
    const navigate = useNavigate()
    const { user } = useStore()
    const [id, setId] = useState(params.id ?? "")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")

    useEffect(() => {
        const getProduct = async () => {
            try {
                if (id === "") return
                const url = `${import.meta.env.VITE_API_URL}/product/${params.id}`
                const config = {
                    method: "GET",
                    headers: {
                        "accept": "application/json"
                    }
                }
                const req = await fetch(url, config)
                const res = await req.json()
                if (res.error) {
                    toast.error(`${res.msg}`)
                    return
                }
                console.log(res.product)
                setName(res.product.name)
                setPrice(res.product.price)
                setStock(res.product.stock)
            } catch (err) {
                toast.error(`${err.message}`)
            }
        }
        getProduct()
    }, [])

    const updateProduct = async () => {
        try {
            const config = {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "authorization": user.token
                },
                body: JSON.stringify({
                    name: name,
                    price: price,
                    stock: stock
                })
            }
            const url = `${import.meta.env.VITE_API_URL}/product/${id}`
            const req = await fetch(url, config)
            const res = await req.json()
            if (res.error) {
                toast.error(res.msg)
                return
            }
            toast.success(res.msg)
            setTimeout(() => navigate('/'), 700)
        } catch (er) {
            console.log(er)
            toast.error("Ha ocurrido un error")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (id !== "") {
            await updateProduct()
            return
        }
        try {
            const config = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": user.token
                },
                body: JSON.stringify({
                    name: name,
                    price: price,
                    stock: stock
                })
            }
            const url = `${import.meta.env.VITE_API_URL}/product`
            const req = await fetch(url, config)
            const res = await req.json()
            if (res.error) {
                toast.error(res.msg)
                return
            }
            toast.success(res.msg)
            setName("")
            setPrice("")
            setStock("")
        } catch (er) {
            console.log(er)
            toast.error("Ha ocurrido un error")
        }
    }

    return (
        <Container>
            <Navbar />
            
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="px-6 py-4 bg-gray-800 text-white">
                            <h2 className="text-2xl font-bold">
                                {id !== "" ? "Editar Producto" : "Nuevo Producto"}
                            </h2>
                        </div>
                        
                        <div className="px-8 py-6">
                            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                <Input
                                    type="text"
                                    name="Nombre_Producto"
                                    title="Nombre del Producto"
                                    placeholder="Ingrese el producto"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Input
                                    type="number"
                                    name="Precio"
                                    title="Precio"
                                    placeholder="Ingrese el precio"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <Input
                                    name="Cantidad"
                                    type="number"
                                    title="Stock"
                                    placeholder="Ingrese la cantidad"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                                
                                <div className="flex gap-3 mt-4">
                                    <button 
                                        type="submit"
                                        className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
                                    >
                                        {id !== "" ? "Actualizar Producto" : "Crear Producto"}
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => navigate('/')}
                                        className="px-4 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-semibold"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}