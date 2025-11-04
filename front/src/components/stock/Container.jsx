export const Container = ({ children }) => {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200">
            {children}
        </div>
    )
}