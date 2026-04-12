import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Servicios Digitales</h1>

      <nav className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/services">Servicios</Link>
        <Link to="/favorites">Favoritos</Link>
        <Link to="/contact">Contacto</Link>
        <Link to="/create">Crear</Link>
      </nav>
    </header>
  )
}

export default Header