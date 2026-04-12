import { Link } from "react-router-dom"

/**
 * Componente de interfaz reutilizable para mostrar un resumen del servicio y controles de gestión.
 */
function ServiceCard({ service, onDelete, onEdit, showAdminButtons = false }) {
  return (
    <div className="border rounded-xl shadow p-4 bg-white">
      {/* Representación visual y títulos informativos del servicio. */}
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-40 object-cover rounded"
      />

      <h3 className="text-lg font-bold mt-2">{service.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>

      <div className="flex flex-wrap gap-2 justify-between mt-4">
        {/* Navegación hacia la vista detallada del elemento. */}
        <Link
          to={`/service/${service.id}`}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm flex-grow text-center"
        >
          Ver más
        </Link>

        {/* Bloque administrativo condicional: Activa las funciones de edición y borrado según el contexto. */}
        {showAdminButtons && (
          <div className="flex gap-2 w-full mt-2">
            <button
              onClick={() => onEdit(service)}
              className="bg-yellow-500 text-white px-3 py-1 rounded text-sm flex-1"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(service.id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm flex-1"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceCard