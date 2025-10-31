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
        {/*RUTAS PÚBLICAS (Login / Registro) */}
        <Route element={<Public />} path="/">
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/*RUTAS PRIVADAS (requieren login) */}
        <Route element={<Private />} path="/private">
          <Route index element={<ProductList />} />
          <Route path="product" element={<ProductForm />} />
          <Route path="product/:id" element={<ProductForm />} />
        </Route>

        {/*404 */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>

      <ToastContainer theme="colored" />
    </BrowserRouter>
  )
}

export default App