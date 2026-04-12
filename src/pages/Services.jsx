import { useState, useEffect } from "react"
import { getCustomServices } from "../utils/localStorage"
import ServiceCard from "../components/ServiceCard"

/**
 * Componente principal para visualizar y filtrar el catálogo de servicios.
 */
function Services() {
  const [services, setServices] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  // Sincroniza el estado con los datos almacenados localmente al cargar la vista.
  useEffect(() => {
    const data = getCustomServices()
    setServices(data)
  }, [])

  // Gestiona la búsqueda reactiva basada en el nombre o categoría del servicio.
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Explora nuestros servicios</h2>
        
        {/* Captura la entrada del usuario para actualizar el término de búsqueda. */}
        <input 
          type="text" 
          placeholder="Buscar por nombre o categoría..." 
          className="p-2 border rounded-lg w-full md:w-80 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Renderizado condicional: muestra un mensaje de vacío o la cuadrícula de tarjetas de servicio. */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">No se encontraron servicios que coincidan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Services