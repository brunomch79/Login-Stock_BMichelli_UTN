import { Outlet, useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { useEffect } from 'react'

function Private() {
    const { user } = useStore()
    const navigate = useNavigate()
    useEffect(() => {
        if (user.token === null) {
            navigate("/login")
        }
    }, [user])
    return <Outlet />
}

export default Private