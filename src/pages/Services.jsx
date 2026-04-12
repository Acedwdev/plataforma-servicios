import { useState, useEffect } from "react"
import data from "../data/services.json"
import ServiceCard from "../components/ServiceCard"
import { getCustomServices } from "../utils/localStorage"

function Services() {
  const [services, setServices] = useState([])

  useEffect(() => {
    const custom = getCustomServices()
    setServices([...data, ...custom])
  }, [])

  const handleDelete = (id) => {
    const filtered = services.filter(service => service.id !== id)
    setServices(filtered)
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Nuestros Servicios
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default Services