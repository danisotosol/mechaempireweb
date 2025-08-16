import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Carrito from './pages/Carrito/Carrito.jsx'
import PerfilUsuario from './pages/usuario/Usuario.jsx'

function App() {
    return (
        <div>
            <nav className="p-4 bg-gray-200">
                <Link to="/" className="mr-4">Home</Link>
                <Link to="/carrito" className="mr-4">Carrito</Link>
                <Link to="/perfil">Perfil</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/perfil" element={<PerfilUsuario />} />

                <Route path={ "*"} element={<div className="container py-4">Página no encontrada</div>} />
            </Routes>
        </div>
    )
}

export default App
