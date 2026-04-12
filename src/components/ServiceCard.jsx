import { Link } from "react-router-dom"

function ServiceCard({ service, onDelete }) {
  return (
    <div className="border rounded-xl shadow p-4">
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-40 object-cover rounded"
      />

      <h3 className="text-lg font-bold mt-2">{service.name}</h3>

      <p className="text-sm text-gray-600">
        {service.description}
      </p>

      <div className="flex justify-between mt-4">
        <Link
          to={`/service/${service.id}`}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Ver más
        </Link>

        <button
          onClick={() => onDelete(service.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default ServiceCard