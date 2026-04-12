import services from "../data/services.json"
import ServiceCard from "../components/ServiceCard"

function Home() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Bienvenido a nuestra plataforma
      </h2>

      <p className="mb-6">
        Explora servicios digitales, educativos y turísticos.
      </p>

      <h3 className="text-xl font-semibold mb-4">
        Servicios destacados
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.slice(0, 2).map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}

export default Home