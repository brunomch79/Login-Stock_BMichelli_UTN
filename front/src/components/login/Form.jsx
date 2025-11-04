import logo from '../../assets/logo/bufalooklogo.png'
import backgroundImage from '../../assets/background/login_background.jpg'

export const Form = ({ children, title, Legend, onSubmit }) => {
    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 py-8 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img
                        src={logo}
                        alt="Bufalook Logo"
                        className="h-20 w-auto drop-shadow-2xl"
                    />
                </div>
                <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                    <div className="px-6 py-6 bg-gray-800 text-white text-center">
                        <h2 className="text-2xl font-bold">{title}</h2>
                    </div>
                    <div className="px-8 py-6">
                        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                            {children}
                        </form>
                    </div>
                    <div className="px-8 py-4 bg-gray-50 text-center border-t border-gray-200">
                        <Legend />
                    </div>
                </div>
            </div>
        </div>
    )
}