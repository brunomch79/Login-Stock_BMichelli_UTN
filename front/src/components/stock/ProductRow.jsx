export const ProductRow = ({ data, onDelete }) => {
    return (
        <div className="flex rounded gap-1 p-1 m-0.5 bg-white/50 text-black font-bold justify-between items-center">
            <p className="flex-2">{data.name}</p>
            <p className="flex-1">${data.price}</p>
            <p className="flex-1">{data.stock}</p>
            <section>
                <button className="p-1 bg-neutral-950 text-neutral-50 rounded m-1 cursor-pointer hover:bg-red-800 shadow "
                    onClick={() => onDelete(data.id)}>Borrar</button>
                <a className="p-1 bg-neutral-950 text-neutral-50 rounded m-1 cursor-pointer hover:bg-sky-800 inline-block"
                    href={`/private/product/${data.id}`}>Editar</a>
            </section>
        </div>
    )
}