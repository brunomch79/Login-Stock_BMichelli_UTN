import { useEffect, useState } from 'react'
import { Container } from './Container'
import { toast } from 'react-toastify'
import { ProductRow } from './ProductRow'

export const ProductList = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const getProduct = async () => {
            const req = await fetch('http://localhost:3000', {
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
        const url = `http://localhost:3000/?id=${id}`
        const config = {
            method: 'DELETE',
            headers: {
                accept: "application/json"
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
            {
                data.map((d) => <ProductRow key={d.id} data={d} onDelete={handleDelete} />)
            }
        </Container>
    ) 
}