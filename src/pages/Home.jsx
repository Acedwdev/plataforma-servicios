import { useState, useEffect } from "react"
import { getCustomServices } from "../utils/localStorage"
import ServiceCard from "../components/ServiceCard"
import Testimonials from "../components/testimonials"

/**
 * Componente de la página de inicio que presenta una vista previa de la plataforma.
 */
function Home() {
  const [services, setServices] = useState([])

  // Carga la lista global de servicios disponibles al inicializar la aplicación.
  useEffect(() => {
    setServices(getCustomServices())
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Servicios destacados</h2>
      
      {/* Muestra los servicios de la lista general. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.slice(0, 3).map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Renderiza la sección de opiniones y experiencias de usuarios. */}
      <Testimonials />
    </div>
  )
}

export default Home