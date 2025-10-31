import { Outlet, useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { useEffect } from 'react'

function Private() {
    const { user, setUser } = useStore()
    const navigate = useNavigate()
    useEffect(() => {
        if (user.token === null) {
        navigate("/")
        }
    }, [user])
    return (
        <div className="p-1 min-h-screen bg-linear-to-r from-[#3c0404] to-[#02023e]">
            <button onClick={
                async () => {
                    setUser({
                        full_name: null,
                        email: null,
                        token: null
                    })
                }       
            } className="w-32 bg-neutral-950 text-neutral-50 p-3 rounded cursor-pointer font-bold hover:bg-red-800">Cerrar Sesion</button>
            <Outlet />
        </div>
    )
}

export default Private