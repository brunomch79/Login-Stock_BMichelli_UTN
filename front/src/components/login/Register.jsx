import { useState } from 'react'
import { Form } from './Form'
import { Input } from '../common/Input'
import { Button } from "../common/Button"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"

const Legend = () => {
    return <p className="text-gray-600">¿Ya tienes una cuenta? <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">Inicia Sesión</Link></p>
}

const Register = () => {
    const navigate = useNavigate()
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const url = `${import.meta.env.VITE_API_URL}/user/register`
            const body = {
                fullName,
                email,
                password,
                confirmPassword
            }
            const req = await fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(body)
            })
            const res = await req.json()
            if (res.error) {
                toast.error(res.msg)
                return
            }
            toast.success(res.msg)
            setFullName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            // Redirect to login page after successful registration
            setTimeout(() => navigate('/login'), 1000)
        } catch {
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <Form title="Registrarse" Legend={Legend} onSubmit={handleSubmit}>
            <Input
                name="Fullname"
                type="text"
                id="fullname"
                title="Nombre completo"
                placeholder="Nombre Completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />
            <Input
                name="email"
                type="email"
                title="Correo"
                placeholder="correo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                name="Password"
                title="Contraseña"
                placeholder="Contraseña"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                title="Confirmar Contraseña"
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type='submit' value={`${loading ? "Cargando..." : "Registrarse"}`} />
        </Form>)
}

export default Register