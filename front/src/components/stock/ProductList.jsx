import { useEffect, useState } from 'react'
import { Container } from './Container'
import { toast } from 'react-toastify'
import { ProductRow } from './ProductRow'
import { useStore } from '../../store/useStore'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../common/Navbar'

export const ProductList = () => {
    const [data, setData] = useState([])
    const { user } = useStore()
    const navigate = useNavigate()
    const isLoggedIn = user?.token !== null

    useEffect(() => {
        const getProduct = async () => {
            const req = await fetch(`${import.meta.env.VITE_API_URL}/product`, {
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json'
                }
            })
            const res = await req.json()
            if (res.error) {
                toast.error(res.msg)
                return
            }
            setData(res.data)
        }
        getProduct()
    }, [])

    async function handleDelete(id) {
        const x = confirm("Desea eliminar el producto")
        if (!x) {
            toast.info("Producto no eliminado")
            return
        }
        try {
            const url = `${import.meta.env.VITE_API_URL}/product/${id}`
            const config = {
                method: 'DELETE',
                headers: {
                    accept: "application/json",
                    authorization: user.token
                }
            }
            const req = await fetch(url, config)
            const res = await req.json()
            if (res.error) {
                toast.error(res.msg)
                return
            }
            toast.info("Producto eliminado correctamente")
            location.reload()
        } catch {
            toast.error("Ocurrio un error inesperado")
        }
    }

    return (
        <Container>
            <Navbar />

            <div className="container mx-auto px-6 py-8">
                {isLoggedIn && (
                    <div className="mb-4 flex justify-end">
                        <button
                            onClick={() => navigate('/product/new')}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Agregar Producto
                        </button>
                    </div>
                )}
                
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 bg-gray-800 text-white">
                        <h1 className="text-2xl font-bold">Listado de Productos</h1>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Producto
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Precio
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Stock
                                    </th>
                                    {isLoggedIn && (
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.length > 0 ? (
                                    data.map((d) => <ProductRow key={d.id} data={d} onDelete={handleDelete} />)
                                ) : (
                                    <tr>
                                        <td colSpan={isLoggedIn ? 4 : 3} className="px-6 py-8 text-center text-gray-500">
                                            No hay productos disponibles
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Container>
    )
}