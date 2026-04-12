import { useEffect, useState } from "react"
import { getFavorites, saveFavorites } from "../utils/localStorage"
import ServiceCard from "../components/ServiceCard"

function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setFavorites(getFavorites())
  }, [])

  const handleDelete = (id) => {
    const updated = favorites.filter(item => item.id !== id)
    setFavorites(updated)
    saveFavorites(updated)
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Mis Favoritos
      </h2>

      {favorites.length === 0 ? (
        <p>No tienes favoritos aún</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {favorites.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites