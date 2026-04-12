import { useState } from "react"
import { getCustomServices, saveCustomServices } from "../utils/localStorage"

function CreateService() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: ""
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name || !form.description || !form.image) {
      setError("Todos los campos son obligatorios")
      setSuccess("")
      return
    }

    const existing = getCustomServices()

    const newService = {
      id: Date.now(), // ID único
      ...form
    }

    const updated = [...existing, newService]

    saveCustomServices(updated)

    setSuccess("Servicio creado correctamente 🎉")
    setError("")

    setForm({
      name: "",
      description: "",
      image: ""
    })
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Crear Servicio
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Nombre del servicio"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="URL de imagen"
          value={form.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Crear Servicio
        </button>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

      </form>
    </div>
  )
}

export default CreateService