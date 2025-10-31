export const Container = ({ children }) => {
    return (
    <div className=" flex flex-col container mx-auto py-1">
        <a href="/private/product" className="w-37 mb-1 mt-1 bg-neutral-950 text-neutral-50 p-3 rounded cursor-pointer font-bold hover:bg-green-800" >Cargar Producto</a>
        {children}
    </div>
    )
}