/**
 * Obtiene la lista de favoritos desde el localStorage.
 *
 * @returns {Array} Lista de favoritos almacenados.
 * Si no existe información, retorna un arreglo vacío.
 */
export const getFavorites = () => {
  // Obtiene el string almacenado bajo la clave "favorites"
  const data = localStorage.getItem("favorites")

  // Si hay datos, los convierte de JSON a objeto; si no, retorna []
  return data ? JSON.parse(data) : []
}

/**
 * Guarda la lista de favoritos en el localStorage.
 *
 * @param {Array} favorites - Lista de elementos favoritos a guardar.
 */
export const saveFavorites = (favorites) => {
  // Convierte el arreglo a string JSON y lo guarda en localStorage
  localStorage.setItem("favorites", JSON.stringify(favorites))
}

/**
 * Obtiene los servicios personalizados desde el localStorage.
 *
 * @returns {Array} Lista de servicios personalizados.
 * Si no existe información, retorna un arreglo vacío.
 */
export const getCustomServices = () => {
  // Obtiene el string almacenado bajo la clave "customServices"
  const data = localStorage.getItem("customServices")

  // Convierte el JSON a objeto si existe, de lo contrario retorna []
  return data ? JSON.parse(data) : []
}

/**
 * Guarda los servicios personalizados en el localStorage.
 *
 * @param {Array} services - Lista de servicios a guardar.
 */
export const saveCustomServices = (services) => {
  // Serializa el arreglo a JSON y lo almacena
  localStorage.setItem("customServices", JSON.stringify(services))
}