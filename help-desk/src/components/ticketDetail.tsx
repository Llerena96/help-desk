import { useParams } from "react-router-dom" // Correcto import de useParams
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { ArrowLeftCircle } from "lucide-react" // Un ícono para el botón de regresar
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "./ui/dropdown-menu"

// Suponiendo que los tickets están disponibles en el mismo archivo o importados
import { tickets } from "./ticket-list"

export function TicketDetail() {
  const { ticketId } = useParams<{ ticketId: string }>() // Usamos el ticketId desde la URL
  const ticket = tickets.find((ticket) => ticket.id === ticketId) // Buscamos el ticket por ID

  if (!ticket) {
    return (
      <div className="text-center">
        <p>Ticket no encontrado</p>
      </div>
    )
  }

  return (
    <Card className="max-w-4xl mx-auto mt-10 shadow-xl">
      <CardHeader className="bg-gray-800 text-white p-6">
        <CardTitle className="text-2xl font-semibold">Detalles del Ticket {ticket.id}</CardTitle>
        {/* Usando el DropdownMenu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-green-500 text-white hover:bg-green-600 p-2 rounded-lg">
            Opciones
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-900 text-white p-4 rounded-lg shadow-2xl">
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
            <strong className="block text-gray-600">Título:</strong>
            <p className="text-lg font-medium">{ticket.title}</p>
          </div>
          <div>
            <strong className="block text-gray-600">Solicitante:</strong>
            <p>{ticket.requester}</p>
          </div>
          <div>
            <strong className="block text-gray-600">Fecha:</strong>
            <p>{ticket.date}</p>
          </div>
          <div>
            <strong className="block text-gray-600">Estado:</strong>
            <Badge variant={getVariantByStatus(ticket.status)}>{ticket.status}</Badge>
          </div>
        </div>

        {/* Descripción adicional o notas del ticket */}
        <div>
          <strong className="block text-gray-600">Descripción:</strong>
          <p className="text-sm text-gray-700 mt-2">
            Este ticket tiene como objetivo resolver el problema relacionado con el {ticket.title}. El estado actual es {ticket.status} y se está esperando una solución a la brevedad posible.
          </p>
        </div>

        {/* Botón para volver a la lista */}
        <div className="mt-4 flex justify-start">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
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
