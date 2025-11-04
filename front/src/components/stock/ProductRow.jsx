import { useStore } from '../../store/useStore'

export const ProductRow = ({ data, onDelete }) => {
    const { user } = useStore()
    const isLoggedIn = user?.token !== null

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 text-gray-800">{data.name}</td>
            <td className="px-6 py-4 text-gray-800">${data.price.toFixed(2)}</td>
            <td className="px-6 py-4 text-gray-800">{data.stock}</td>
            {isLoggedIn && (
                <td className="px-6 py-4">
                    <div className="flex gap-2">
                        <a
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors inline-block text-center"
                            href={`/product/edit/${data.id}`}
                        >
                            Editar
                        </a>
                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            onClick={() => onDelete(data.id)}
                        >
                            Borrar
                        </button>
                    </div>
                </td>
            )}
        </tr>
    )
}