import { Link } from "react-router-dom"

/**
 * Componente de navegación global que proporciona acceso a las distintas rutas de la aplicación.
 */
function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
      {/* Identidad visual o título principal de la plataforma. */}
      <h1 className="text-xl font-bold">Servicios Digitales</h1>

      {/* Menú de navegación: Define los puntos de entrada para las vistas de usuario y administración. */}
      <nav className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/services">Servicios</Link>
        <Link to="/favorites">Favoritos</Link>
        <Link to="/contact">Contacto</Link>
        <Link to="/create">Admin</Link>
      </nav>
    </header>
  )
}

export default Header