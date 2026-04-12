import { useState, useEffect } from "react"
import initialServices from "../data/services.json" 
import { getCustomServices, saveCustomServices } from "../utils/localStorage"
import ServiceCard from "../components/ServiceCard"

/**
 * Componente administrativo para la gestión integral (CRUD) de servicios.
 */
function CreateService() {
  const [services, setServices] = useState([])
  const [form, setForm] = useState({ name: "", description: "", image: "", category: "Tecnología" })
  const [editingId, setEditingId] = useState(null)

  // --- SECCIÓN: PERSISTENCIA Y CARGA DE DATOS ---

  // Inicializa la lista de servicios cargando datos desde LocalStorage o el JSON base si está vacío.
  useEffect(() => {
    const stored = getCustomServices()
    if (stored.length === 0) {
      saveCustomServices(initialServices)
      setServices(initialServices)
    } else {
      setServices(stored)
    }
  }, [])

  // --- SECCIÓN: MANEJO DE FORMULARIO ---

  // Actualiza los valores del estado local del formulario conforme el usuario escribe.
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Procesa el envío del formulario para crear un nuevo registro o actualizar uno existente.
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.description || !form.image) return alert("Campos incompletos")

    let updated
    if (editingId) {
      updated = services.map(s => s.id === editingId ? { ...form, id: editingId } : s)
      setEditingId(null)
    } else {
      updated = [...services, { ...form, id: Date.now() }]
    }

    saveCustomServices(updated)
    setServices(updated)
    setForm({ name: "", description: "", image: "", category: "Tecnología" })
  }

  // --- SECCIÓN: ACCIONES DE GESTIÓN ---

  // Elimina un servicio del listado y actualiza el almacenamiento local.
  const handleDelete = (id) => {
    const updated = services.filter(s => s.id !== id)
    saveCustomServices(updated)
    setServices(updated)
  }

  // Carga los datos de un servicio en el formulario y desplaza la vista al inicio para editar.
  const handleEdit = (service) => {
    setForm({ 
      name: service.name, 
      description: service.description, 
      image: service.image,
      category: service.category || "General" 
    })
    setEditingId(service.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // --- SECCIÓN: RENDERIZADO DE INTERFAZ ---

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      
      {/* Formulario Dinámico: Alterna entre modo creación y edición */}
      <div className="bg-white p-8 rounded-2xl shadow-lg mb-10 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {editingId ? "✏️ Editar Servicio" : "🚀 Crear Nuevo Servicio"}
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Nombre del servicio" value={form.name} onChange={handleChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          
          <select name="category" value={form.category} onChange={handleChange} className="p-3 border rounded-lg bg-white">
            <option value="Educación">Educación</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Turismo">Turismo</option>
            <option value="Comercial">Comercial</option>
          </select>

          <input type="text" name="image" placeholder="URL de la imagen" value={form.image} onChange={handleChange} className="p-3 border rounded-lg md:col-span-2" />
          
          <textarea name="description" placeholder="Descripción breve" value={form.description} onChange={handleChange} className="p-3 border rounded-lg md:col-span-2 h-24" />
          
          <div className="md:col-span-2 flex gap-3">
            <button type="submit" className={`flex-grow py-3 rounded-lg font-bold text-white transition-all ${editingId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"}`}>
              {editingId ? "Actualizar Información" : "Registrar Servicio"}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setForm({name:"", description:"", image:"", category:"Tecnología"}) }} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Cabecera del Listado: Proporciona herramientas de limpieza y conteo total */}
      <div className="flex justify-between items-center mb-8">
        <button className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors" 
        onClick={() => { localStorage.clear(); window.location.reload(); }}>
          Restablecer
        </button>
        <h3 className="text-2xl font-bold text-gray-800">Panel de Administración</h3>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {services.length} servicios totales
        </span>
      </div>

      {/* Visualización de Servicios: Genera la cuadrícula con opciones de edición y borrado habilitadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            onDelete={handleDelete} 
            onEdit={handleEdit}
            showAdminButtons={true} 
          />
        ))}
      </div>
    </div>
  )
}

export default CreateService