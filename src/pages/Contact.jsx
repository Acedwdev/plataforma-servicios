import { useState } from "react"

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const validate = () => {
    let newErrors = {}

    if (!form.name.trim()) {
      newErrors.name = "El nombre es obligatorio"
    }

    if (!form.email.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email inválido"
    }

    if (!form.message.trim()) {
      newErrors.message = "El mensaje es obligatorio"
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSuccess("")
    } else {
      setErrors({})
      setSuccess("Mensaje enviado correctamente 🎉")

      // limpiar formulario
      setForm({
        name: "",
        email: "",
        message: ""
      })
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Contáctanos
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Mensaje"
            value={form.message}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Enviar
        </button>

        {success && (
          <p className="text-green-600 mt-2">{success}</p>
        )}

      </form>
    </div>
  )
}

export default Contact