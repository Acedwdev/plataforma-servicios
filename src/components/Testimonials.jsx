import testimonials from "../data/testimonials.json";

/**
 * Componente que renderiza una sección de reseñas de clientes mediante un carrusel interactivo.
 */
function Testimonials() {
  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Encabezado descriptivo de la sección de pruebas sociales. */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Lo que dicen nuestros clientes</h2>
          <p className="text-gray-600">Miles de personas y empresas confían en nosotros</p>
        </div>

        {/* Estructura de carrusel con scroll horizontal y ajuste de posición (snap) para las tarjetas. */}
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((t) => (
            <div 
              key={t.id} 
              className="min-w-[300px] md:min-w-[350px] bg-white p-6 rounded-2xl shadow-lg border border-gray-100 snap-center flex flex-col justify-between"
            >
              <div>
                {/* Genera dinámicamente la calificación visual basada en el número de estrellas. */}
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{t.comment}"</p>
              </div>

              {/* Información de identidad del autor del testimonio. */}
              <div className="flex items-center gap-4 mt-4 border-t pt-4">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full border-2 border-blue-500"
                />
                <div>
                  <h4 className="font-bold text-gray-900 leading-none">{t.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Guía visual para indicar la funcionalidad de desplazamiento al usuario. */}
        <p className="text-center text-xs text-gray-400 mt-4 animate-pulse">
          Desliza para ver más →
        </p>
      </div>
    </section>
  );
}

export default Testimonials