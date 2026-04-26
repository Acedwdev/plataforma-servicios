import { useState, useEffect } from "react"
import { getCustomServices, getFavorites, saveFavorites } from "../utils/localStorage"
import ServiceCard from "../components/ServiceCard"

/**
 * Componente Services: Representa el catálogo completo de la plataforma.
 * Permite visualizar todos los servicios disponibles y gestionarlos como favoritos.
 */
function Services() {
  // --- ESTADOS DEL COMPONENTE ---

  // Lista completa de servicios cargados desde la persistencia.
  const [services, setServices] = useState([])
  
  // Lista de servicios marcados por el usuario para sincronizar el estado visual de las Cards.
  const [favorites, setFavorites] = useState([])

  // --- SINCRONIZACIÓN DE DATOS (useEffect) ---

  /**
   * Se ejecuta al montar el componente. 
   * Recupera la fuente de verdad (LocalStorage) para poblar la interfaz.
   */
  useEffect(() => {
    setServices(getCustomServices())
    setFavorites(getFavorites())
  }, [])

  // --- LÓGICA DE INTERACCIÓN ---

  /**
   * Procesa la acción de agregar o remover un servicio de la lista de favoritos.
   * Utiliza una lógica de "Toggle" (alternancia) basada en la existencia del ID.
   */
  const handleToggleFavorite = (service) => {
    // Verificación de pertenencia: comprueba si el servicio ya está en el arreglo de favoritos.
    const isAlreadyFavorite = favorites.some((fav) => fav.id === service.id);
    let updatedFavorites;

    if (isAlreadyFavorite) {
      // Si ya es favorito, se crea un nuevo arreglo excluyendo este servicio (Remover).
      updatedFavorites = favorites.filter((fav) => fav.id !== service.id);
    } else {
      // Si no es favorito, se añade al arreglo existente usando el operador de propagación (Agregar).
      updatedFavorites = [...favorites, service];
    }

    // Actualización del estado local para reflejar cambios en la UI de forma reactiva.
    setFavorites(updatedFavorites);
    
    // Persistencia de los cambios para mantener los datos tras recargar la página.
    saveFavorites(updatedFavorites);
  };

  // --- ESTRUCTURA DE RENDERIZADO ---

  return (
    <div className="p-6">
      {/* Título de la sección de catálogo */}
      <h2 className="text-2xl font-bold mb-6">Todos nuestros servicios</h2>
      
      {/* Contenedor Grid: Organiza las tarjetas de forma responsiva (1 col en móvil, 3 en escritorio). */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Iteración sobre el arreglo de servicios para generar los componentes hijos. */}
        {services.map((service) => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            // Determina dinámicamente si el botón de favorito debe aparecer activo.
            isFavorite={favorites.some(fav => fav.id === service.id)}
            // Inyecta la función de manejo de favoritos hacia el componente ServiceCard.
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  )
}

export default Services