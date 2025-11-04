import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"

//LOGIN / AUTH
import Public from "./components/login/Public"
import Private from "./components/login/Private"
import Login from "./components/login/Login"
import Register from "./components/login/Register"

//STOCK
import { ProductForm } from "./components/stock/ProductForm"
import { ProductList } from "./components/stock/ProductList"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*RUTAS PÚBLICAS */}
        <Route path="/" element={<ProductList />} />
        {/* Login / Register */}
        <Route element={<Public />} path="/login">
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/*RUTAS PRIVADAS (requieren login)*/}
        <Route element={<Private />} path="/product">
          <Route path="new" element={<ProductForm />} />
          <Route path="edit/:id" element={<ProductForm />} />
        </Route>

        {/*404 */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>

      <ToastContainer 
        theme="colored" 
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
      />
    </BrowserRouter>
  )
}

export default App