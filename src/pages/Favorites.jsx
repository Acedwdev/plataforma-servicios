import { useState, useEffect } from "react"
import { getFavorites, saveFavorites } from "../utils/localStorage"
import ServiceCard from "../components/ServiceCard"

/**
 * Componente Favorites: Gestiona y visualiza la lista de servicios guardados por el usuario.
 */
function Favorites() {
  
  // Almacena el arreglo de servicios marcados como favoritos.
  const [favorites, setFavorites] = useState([])

  // --- EFECTOS (LIFECYCLE) ---

  // Se ejecuta una sola vez al montar el componente para sincronizar el estado con LocalStorage.
  useEffect(() => {
    setFavorites(getFavorites())
  }, [])

  // --- CONTROLADORES DE EVENTOS (HANDLERS) ---

  /**
   * Maneja la eliminación de un servicio de la lista de favoritos.
   * Incluye una ventana de confirmación para mejorar la experiencia de usuario (UX).
   */
  const handleRemoveFavorite = (service) => {
    // Validación de seguridad mediante alerta nativa del navegador.
    const confirmDelete = window.confirm(
      `¿Estás seguro de que quieres eliminar "${service.name}" de tus favoritos?`
    );
    
    if (confirmDelete) {
      // Filtra la lista actual para excluir el servicio seleccionado por su ID.
      const updated = favorites.filter(fav => fav.id !== service.id);
      
      // Actualiza el estado de la interfaz y persiste los cambios en LocalStorage.
      setFavorites(updated);
      saveFavorites(updated);
    }
  };

  // --- RENDERIZADO DE INTERFAZ ---

  return (
    <div className="p-6 min-h-screen">
      {/* Título principal de la sección */}
      <h2 className="text-2xl font-bold mb-6">Mis Favoritos</h2>
      
      {/* Renderizado Condicional: Si no hay favoritos, muestra un mensaje informativo. 
          Si los hay, genera la cuadrícula de tarjetas. */}
      {favorites.length === 0 ? (
        <p className="text-gray-500">Aún no has agregado favoritos.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mapeo del arreglo de favoritos para renderizar componentes ServiceCard reutilizables. */}
          {favorites.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              // Propiedades de control: En esta vista todos son favoritos por defecto.
              isFavorite={true} 
              onToggleFavorite={handleRemoveFavorite} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites