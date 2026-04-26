import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import services from "../data/services.json";
import { getFavorites, saveFavorites } from "../utils/localStorage";

/**
 * Componente ServiceDetail: Renderiza la vista detallada de un servicio específico
 * utilizando parámetros dinámicos de la URL.
 */
function ServiceDetail() {
  // --- HOOKS DE NAVEGACIÓN Y PARÁMETROS ---

  // Obtiene el 'id' desde la ruta (ej: /service/1).
  const { id } = useParams();
  
  // Hook para manipular el historial de navegación del navegador.
  const navigate = useNavigate(); 

  // --- ESTADO LOCAL ---

  // Estado booleano para manejar la apariencia del botón de favoritos en esta vista.
  const [isFavorite, setIsFavorite] = useState(false);

  // --- LÓGICA DE BÚSQUEDA ---

  // Busca el objeto del servicio que coincida con el ID de la URL (conversión a entero necesaria).
  const service = services.find((item) => item.id === parseInt(id));

  // --- EFECTOS (LIFECYCLE) ---

  /**
   * Verifica la existencia del servicio en LocalStorage al cargar el componente.
   * Esto asegura que el estado 'isFavorite' sea coherente con los datos guardados.
   */
  useEffect(() => {
    if (service) {
      const favorites = getFavorites();
      const exists = favorites.some(fav => fav.id === service.id);
      setIsFavorite(exists);
    }
  }, [service]); // Dependencia del servicio actual.

  // --- MANEJADORES DE EVENTOS ---

  /**
   * Gestiona la adición o eliminación del servicio actual en la lista de favoritos.
   * Actualiza el estado local para reflejar el cambio visual inmediato.
   */
  const toggleFavorite = () => {
    const favorites = getFavorites();
    let updated;

    if (isFavorite) {
      // Caso: Eliminación por filtrado.
      updated = favorites.filter(fav => fav.id !== service.id);
      setIsFavorite(false);
    } else {
      // Caso: Inserción mediante el operador spread.
      updated = [...favorites, service];
      setIsFavorite(true);
    }

    // Persistencia de la lista actualizada.
    saveFavorites(updated);
  };

  // --- RENDERIZADO CONDICIONAL DE SEGURIDAD ---

  // Manejo de error en caso de que el ID en la URL no corresponda a ningún servicio existente.
  if (!service) return <h2 className="p-6 text-center">Servicio no encontrado</h2>;

  // --- ESTRUCTURA DE LA INTERFAZ (JSX) ---

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">
      
      {/* BOTÓN REGRESAR:
          Utiliza navigate(-1) para enviar al usuario a la página anterior en su historial. */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 text-blue-600 font-medium hover:underline flex items-center gap-1"
      >
        ← Regresar
      </button>

      {/* Imagen destacada del servicio con estilos de bordes redondeados y sombra. */}
      <img 
        src={service.image} 
        alt={service.name} 
        className="w-full h-80 object-cover rounded-2xl shadow-md" 
      />

      <div className="mt-6">
        {/* Título y descripción detallada del servicio solicitado. */}
        <h2 className="text-3xl font-bold text-gray-800">{service.name}</h2>
        <p className="mt-4 text-gray-600 leading-relaxed text-lg">
          {service.description}
        </p>
      </div>
    </div>
  );
}

export default ServiceDetail;