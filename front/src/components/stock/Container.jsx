export const Container = ({ children }) => {
    return (
    <div className="container mx-auto py-5">
        <a href="/product" className="bg-neutral-950 text-neutral-50 p-3 rounded shadow cursor-pointer font-bold hover:bg-green-600 mb-10 inline-block text-center" >Cargar Producto</a>
        {children}
    </div>
    )
}