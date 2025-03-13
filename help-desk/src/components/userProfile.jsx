import { useState } from "react"

export const UserProfile = () => {
  // Estado de datos del usuario (esto puede venir de una API o del estado global)
  const [user, setUser] = useState({
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    role: "Soporte",
    tickets: [
      { id: 1, title: "Problema de login", status: "Abierto" },
      { id: 2, title: "Error en la página principal", status: "Cerrado" },
    ],
  })

  // Función para manejar la edición del perfil (por ejemplo, abrir un modal o redirigir)
  const handleEditProfile = () => {
    alert("Función para editar perfil.")
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl p-4 max-w-3xl mx-auto">
      <div className="flex items-center space-x-4">
        {/* Avatar del usuario */}
        <div className="h-20 w-20 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
          <span className="text-xl font-semibold text-white">{user.name.charAt(0)}</span>
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">{user.role}</p>
        </div>
      </div>

      {/* Información de contacto */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Información de contacto</h3>
        <div className="mt-2">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Correo electrónico: </span>{user.email}
          </p>
        </div>
      </div>

      {/* Botón para editar el perfil */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleEditProfile}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Editar Perfil
        </button>
      </div>

      {/* Tickets recientes */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Tickets Recientes</h3>
        <div className="mt-4 space-y-4">
          {user.tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm"
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 dark:text-white">{ticket.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-300">Estado: {ticket.status}</p>
              </div>
              <span
                className={`text-sm font-semibold ${
                  ticket.status === "Cerrado" ? "text-red-500" : "text-green-500"
                }`}
              >
                {ticket.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
