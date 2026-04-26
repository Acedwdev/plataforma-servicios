import { useState, useEffect } from "react"
import { getCustomServices, getFavorites, saveFavorites } from "../utils/localStorage"
import ServiceCard from "../components/ServiceCard"
import Testimonials from "../components/testimonials"

/**
 * Componente Home: Punto de entrada principal que muestra servicios destacados 
 * y testimonios de usuarios.
 */
function Home() {
  // --- DEFINICIÓN DE ESTADOS ---

  // Almacena el catálogo completo de servicios obtenidos del sistema.
  const [services, setServices] = useState([])
  
  // Mantiene la lista de servicios que el usuario ha marcado como favoritos.
  const [favorites, setFavorites] = useState([])

  /**
   * Hook de efecto que se dispara al montar el componente.
   * Recupera tanto los servicios disponibles como las preferencias guardadas en LocalStorage.
   */
  useEffect(() => { 
    setServices(getCustomServices())
    setFavorites(getFavorites()) 
  }, [])

  // --- LÓGICA DE NEGOCIO (MANEJO DE FAVORITOS) ---

  /**
   * Alterna el estado de favorito de un servicio (Toggle).
   * Si existe, lo elimina mediante filtrado; si no, lo añade al arreglo. */
  
  const handleToggleFavorite = (service) => {
    // Verifica la existencia del servicio en la lista de favoritos actual.
    const isAlreadyFavorite = favorites.some((fav) => fav.id === service.id);
    let updatedFavorites;

    if (isAlreadyFavorite) {
      // Caso: Eliminar (Crea un nuevo arreglo excluyendo el ID coincidente).
      updatedFavorites = favorites.filter((fav) => fav.id !== service.id);
    } else {
      // Caso: Agregar (Crea un nuevo arreglo esparciendo los anteriores y añadiendo el nuevo).
      updatedFavorites = [...favorites, service];
    }

    // Sincroniza el estado de la UI y persiste los datos en el almacenamiento local.
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  // --- ESTRUCTURA DE LA INTERFAZ (JSX) ---

  return (
    <div className="p-6">
      {/* Sección encabezado de la galería */}
      <h2 className="text-2xl font-bold mb-4">Servicios destacados</h2>
      
      {/* Grid responsivo para las tarjetas de servicios. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Transformación del arreglo de servicios: 
            Se limita a los primeros 3 elementos mediante .slice() para la sección destacada. */}
        {services.slice(0, 3).map((service) => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            // Inyección de Props dinámicas:
            // 1. Determina si el corazón debe mostrarse activo/lleno.
            isFavorite={favorites.some(fav => fav.id === service.id)}
            // 2. Provee la función de callback para el manejo del clic.
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      {/* Componente complementario para mostrar pruebas sociales del servicio. */}
      <Testimonials />
    </div>
  )
}

export default Home