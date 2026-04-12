import { useParams } from "react-router-dom"
import services from "../data/services.json"
import { getFavorites, saveFavorites } from "../utils/localStorage"

/**
 * Componente para mostrar la información detallada de un servicio específico.
 */
function ServiceDetail() {
  // Extrae el identificador del servicio desde los parámetros de la URL.
  const { id } = useParams()

  // Busca el servicio correspondiente dentro del archivo de datos local.
  const service = services.find(
    (item) => item.id === parseInt(id)
  )

  // Gestiona la validación y el almacenamiento del servicio en la lista de favoritos.
  const handleFavorite = () => {
    const favorites = getFavorites()

    const exists = favorites.find(fav => fav.id === service.id)

    if (exists) {
      alert("Ya está en favoritos")
      return
    }

    const updated = [...favorites, service]
    saveFavorites(updated)

    alert("Agregado a favoritos")
  }

  // Renderiza una vista de error si el ID no coincide con ningún registro.
  if (!service) {
    return <h2 className="p-6">Servicio no encontrado</h2>
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img src={service.image} alt={service.name} className="w-full h-64 object-cover rounded" />

      <h2 className="text-2xl font-bold mt-4">{service.name}</h2>

      <p className="mt-4 text-gray-700">{service.description}</p>

      {/* Disparador para la acción de guardado en favoritos. */}
      <button
        onClick={handleFavorite}
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded"
      >
        Agregar a favoritos
      </button>
    </div>
  )
}

export default ServiceDetail