/**
 * Componente que muestra la información institucional, enlaces rápidos y datos de contacto al final del sitio.
 */
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-auto">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Descripción general: Resume la propuesta de valor y propósito de la marca. */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">Servicios Digitales</h2>
          <p className="text-sm leading-relaxed">
            Tu plataforma de confianza para explorar experiencias educativas, 
            tecnológicas y turísticas.
          </p>
        </div>

        {/* Mapa del sitio: Ofrece acceso directo a las secciones principales de la aplicación. */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navegación</h3>
          <nav className="flex flex-col gap-2 text-sm">
            <a href="/" className="hover:text-blue-400 transition">Inicio</a>
            <a href="/services" className="hover:text-blue-400 transition">Servicios</a>
            <a href="/contact" className="hover:text-blue-400 transition">Contacto</a>
          </nav>
        </div>

        {/* Información de soporte: Proporciona canales de comunicación y ubicación física. */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contacto</h3>
          <p className="text-sm">📧 soporte@plataforma.com</p>
          <p className="text-sm mt-2">📍 Medellín, Colombia</p>
        </div>
      </div>

      {/* Créditos y copyright: Contiene los derechos reservados y la fecha de vigencia. */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
        <p>© 2026 Plataforma de Servicios</p>
      </div>
    </footer>
  );
}

export default Footer;