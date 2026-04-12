import { useParams } from "react-router-dom"
import services from "../data/services.json"
import { getFavorites, saveFavorites } from "../utils/localStorage"

function ServiceDetail() {
  const { id } = useParams()

  const service = services.find(
    (item) => item.id === parseInt(id)
  )

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

  if (!service) {
    return <h2 className="p-6">Servicio no encontrado</h2>
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img src={service.image} alt={service.name} className="w-full h-64 object-cover rounded" />

      <h2 className="text-2xl font-bold mt-4">{service.name}</h2>

      <p className="mt-4 text-gray-700">{service.description}</p>

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