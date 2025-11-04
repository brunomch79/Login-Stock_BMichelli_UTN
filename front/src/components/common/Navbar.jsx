import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { toast } from 'react-toastify'
import logo from '../../assets/logo/bufalooklogo.png'

export const Navbar = () => {
    const { user, setUser } = useStore()
    const navigate = useNavigate()
    const isLoggedIn = user?.token !== null
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const handleLogout = () => {
        setUser({ email: null, full_name: null, token: null })
        toast.info("Sesión cerrada")
        setDropdownOpen(false)
        navigate('/')
    }

    const getInitial = () => {
        return user.full_name ? user.full_name[0].toUpperCase() : user.email[0].toUpperCase()
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        src={logo}
                        alt="Bufalook Logo"
                        className="h-12 w-auto cursor-pointer"
                        onClick={() => navigate('/')}
                    />
                </div>
                <div className="flex items-center gap-4">
                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
                            >
                                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                                    {getInitial()}
                                </div>
                                <span className="text-gray-700 font-medium">
                                    {user.full_name || user.email}
                                </span>
                                <svg 
                                    className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                    <button
                                        onClick={() => {
                                            setDropdownOpen(false)
                                            handleLogout()
                                        }}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
                        >
                            Iniciar Sesión
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}
