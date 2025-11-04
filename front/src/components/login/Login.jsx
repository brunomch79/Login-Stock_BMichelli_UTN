import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from './Form'
import { Input } from "../common/Input"
import { Button } from "../common/Button"
import { toast } from 'react-toastify'
import { useStore } from '../../store/useStore'

const Legend = () => {
    return <p className="text-gray-600">¿No tienes una cuenta? <Link to="/login/register" className="text-blue-600 hover:text-blue-700 font-medium" >Regístrate</Link></p>
}

const Login = () => {
    const navigate = useNavigate()
    const { setUser } = useStore()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const body = {
                email,
                password
            }
            const url = `${import.meta.env.VITE_API_URL}/user/login`
            const config = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(body)
            }
            const req = await fetch(url, config)
            const res = await req.json()
            if (res.error) {
                toast.error(res.msg)
                return
            }
            setUser(res.user)
            toast.success("Sesion iniciada")
            setTimeout(() => navigate('/'), 1000)
        } catch {
        }
    }
    return (
        <Form title="Iniciar Sesión" Legend={Legend} onSubmit={handleSubmit}>
            <Input
                type="email"
                id="email"
                name="email"
                title="Email"
                placeholder="correo@correo.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
            />
            <Input
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                title="Contraseña"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
            />
            <Button type='submit' value="Iniciar Sesión" />
        </Form>
    )
}

export default Login