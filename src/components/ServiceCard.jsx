import { Link } from "react-router-dom";

/**
 * Componente ServiceCard: Representación visual modular de un servicio.
 * Se adapta dinámicamente para mostrar controles de usuario (favoritos) o controles de administrador (editar/eliminar).
 * service - Objeto con la información del servicio (id, name, description, image).
 * onDelete - Callback para eliminar el servicio (uso en Admin).
 * onEdit - Callback para cargar el servicio en el formulario (uso en Admin).
 * showAdminButtons - Flag para alternar entre vista de usuario y vista de gestión.
 * isFavorite - Estado visual del botón de favoritos.
 * onToggleFavorite - Callback para agregar/quitar de la lista de favoritos.
 */
function ServiceCard({ 
  service, 
  onDelete, 
  onEdit, 
  showAdminButtons = false, 
  isFavorite = false, 
  onToggleFavorite 
}) {
  return (
    // CONTENEDOR PRINCIPAL: Usa Flexbox para mantener una altura uniforme (h-full) y efectos de hover.
    <div className="border rounded-xl shadow p-4 bg-white flex flex-col h-full hover:shadow-lg transition-shadow">
      
      {/* SECCIÓN VISUAL: Renderizado de la imagen del servicio con ajuste de cobertura (object-cover) */}
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-40 object-cover rounded"
      />

      {/* INFORMACIÓN DEL SERVICIO:
          line-clamp-2 limita la descripción a dos líneas para mantener la simetría visual. */}
      <h3 className="text-lg font-bold mt-2">{service.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2 flex-grow mb-4">
        {service.description}
      </p>

      {/* CONTENEDOR DE ACCIONES: Alineado al final de la tarjeta (mt-auto) */}
      <div className="flex flex-col gap-2 mt-auto">
        
        {/* FILA DE BOTONES DE USUARIO: Aparecen siempre que no sea modo administrador */}
        <div className="flex items-center gap-2">
          {/* Navegación hacia el detalle del servicio mediante rutas dinámicas */}
          <Link
            to={`/service/${service.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex-grow text-center hover:bg-blue-700 transition"
          >
            Ver más
          </Link>

          {/* BOTÓN DE FAVORITOS:
              Renderizado condicional. Cambia estilos (colores y bordes) según el estado 'isFavorite'. */}
          {!showAdminButtons && (
            <button
              onClick={() => onToggleFavorite(service)}
              className={`p-2 rounded-lg border transition-all text-xl ${
                isFavorite 
                  ? "bg-red-50 border-red-200 text-red-500" 
                  : "bg-gray-50 border-gray-200 text-gray-400"
              }`}
              title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              {isFavorite ? "❤️" : "❤︎"}
            </button> 
          )}
        </div> 

        {/* SECCIÓN ADMINISTRATIVA:
            Se activa únicamente mediante la prop 'showAdminButtons'. 
            Incluye separador visual (border-t) y botones de gestión CRUD. */}
        {showAdminButtons && (
          <div className="flex gap-2 pt-2 border-t mt-1">
            <button 
              onClick={() => onEdit(service)} 
              className="bg-yellow-500 text-white px-3 py-1 rounded text-xs flex-1 hover:bg-yellow-600"
            >
              Editar
            </button>
            <button 
              onClick={() => onDelete(service.id)} 
              className="bg-red-500 text-white px-3 py-1 rounded text-xs flex-1 hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceCard;