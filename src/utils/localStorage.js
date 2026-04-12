export const getFavorites = () => {
  const data = localStorage.getItem("favorites")
  return data ? JSON.parse(data) : []
}

export const saveFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites))
}

export const getCustomServices = () => {
  const data = localStorage.getItem("customServices")
  return data ? JSON.parse(data) : []
}

export const saveCustomServices = (services) => {
  localStorage.setItem("customServices", JSON.stringify(services))
}