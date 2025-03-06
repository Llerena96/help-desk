import { useParams } from "react-router-dom"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { ArrowLeftCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "./ui/dropdown-menu"

// Suponiendo que los tickets están disponibles en el mismo archivo o importados
import { tickets } from "./ticket-list"
import { format } from "path/posix"

export function TicketDetail() {
  const { ticketId } = useParams<{ ticketId: string }>()
  const ticket = tickets.find((ticket) => ticket.id === ticketId)

  if (!ticket) {
    return (
      <div className="text-center text-gray-900 dark:text-gray-300">
        <p>Ticket no encontrado</p>
      </div>
    )
  }

  return (
    <Card className="max-w-4xl mx-auto mt-10 text-white shadow-xl dark:bg-gray-800">
      <CardHeader className="bg-gray-800 text-white p-6 dark:bg-gray-700">
        <CardTitle className="text-2xl font-semibold text-gray-100 dark:text-gray-200">
          Detalles del Ticket {ticket.id}
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-lg">
            Opciones
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-900 text-white p-4 rounded-lg shadow-2xl dark:bg-gray-700">
            <DropdownMenuLabel className="text-lg font-semibold text-yellow-400">
              Acciones
            </DropdownMenuLabel>
            <DropdownMenuItem className="text-green-200 hover:bg-green-700 hover:text-white">
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-200 hover:bg-red-700 hover:text-white">
              Borrar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <strong className="block text-gray-400 dark:text-gray-300">Título:</strong>
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{ticket.title}</p>
          </div>
          <div>
            <strong className="block text-gray-400 dark:text-gray-300">Solicitante:</strong>
            <p className="text-gray-900 dark:text-gray-100">{ticket.requester}</p>
          </div>
          <div>
            <strong className="block text-gray-400 dark:text-gray-300">Fecha:</strong>
            <p className="text-gray-900 dark:text-gray-100">{ticket.date}</p>
          </div>
          <div>
            <strong className="block text-gray-400 dark:text-gray-300">Estado:</strong>
            <Badge variant={getVariantByStatus(ticket.status)}>{ticket.status}</Badge>
          </div>
        </div>

        {/* Descripción adicional o notas del ticket */}
        <div>
          <strong className="block text-gray-400 dark:text-gray-300">Descripción:</strong>
          <p className="text-sm text-gray-800 dark:text-gray-300 mt-2">
            Este ticket tiene como objetivo resolver el problema relacionado con el {ticket.title}. El estado actual es {ticket.status} y se está esperando una solución a la brevedad posible.
          </p>
        </div>

        {/* Botón para volver a la lista */}
        <div className="mt-4 flex justify-start">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            <ArrowLeftCircle className="w-4 h-4" /> Volver a la lista
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function getVariantByStatus(status: string) {
  switch (status) {
    case "Abierto":
      return "default"
    case "En Progreso":
      return "secondary"
    case "Pendiente":
      return "warning"
    case "Resuelto":
      return "success"
    case "Crítico":
      return "destructive"
    default:
      return "outline"
  }
}
