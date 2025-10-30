export const ProductRow = ({ data, onDelete }) => {
    return (
        <div className="flex rounded shadow gap-2 p-2 bg-green-900 text-neutral-50 justify-between items-center mb-5">
            <p className="flex-2">{data.name}</p>
            <p className="flex-1">${data.price}</p>
            <p className="flex-1">{data.stock}</p>
            <section>
                <button className="p-1 bg-neutral-950 text-neutral-50 rounded m-1 cursor-pointer hover:bg-red-600 shadow "
                    onClick={() => onDelete(data.id)}>Borrar</button>
                <a className="p-1 bg-neutral-950 text-neutral-50 rounded m-1 cursor-pointer hover:bg-sky-700 inline-block"
                    href={`/product/${data.id}`}>Editar</a>
            </section>
        </div>
    )
}