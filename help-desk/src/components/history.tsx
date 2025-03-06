import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { UserCheck, Repeat, XCircle } from "lucide-react"  // Asegúrate de tener estas importaciones

interface HistoryItem {
  ticketId: string
  title: string
  requester: string
  date: string
  status: string
  action: string
}

export function History() {
  return (
    <div className="overflow-x-auto mt-10">
      <CardHeader>
        <CardTitle className="dark:text-white">Historial de Modificaciones</CardTitle>
        <CardDescription className="dark:text-gray-300">
          Registro de cambios realizados en los tickets.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="w-full text-sm text-white bg-gray-700 dark:bg-gray-900">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Solicitante</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyData.length > 0 ? (
              historyData.map((item) => (
                <TableRow key={item.ticketId} className="hover:bg-gray-700 hover:text-white font-bold">
                  <TableCell className="font-medium">{item.ticketId}</TableCell>
                  <TableCell>
                    <a href={`/tickets/${item.ticketId}`} className="text-blue-400 hover:underline">
                      {item.title}
                    </a>
                  </TableCell>
                  <TableCell>{item.requester}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <Badge className={getBadgeColor(item.status)}>{item.status}</Badge>
                  </TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      title="Reasignar"
                      className="px-4 py-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all rounded-md shadow-sm hover:shadow-md"
                    >
                      <UserCheck className="w-4 h-4 mr-1" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      title="Cambiar estado"
                      className="px-4 py-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all rounded-md shadow-sm hover:shadow-md"
                    >
                      <Repeat className="w-4 h-4 mr-1" />
                    </Button>
                    <Button
                      size="sm"
                      title="Cerrar"
                      variant="outline"
                      className="px-4 py-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded-md shadow-sm hover:shadow-md"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-gray-900 dark:text-gray-300">
                  No se encontraron tickets.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </div>
  )
}

function getBadgeColor(status: string): string {
  switch (status) {
    case "Abierto":
      return "bg-green-500 text-white"
    case "En Progreso":
      return "bg-yellow-500 text-white"
    case "Cerrado":
      return "bg-red-500 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

const historyData: HistoryItem[] = [
  {
    ticketId: "TK-005",
    title: "Problema con el sistema de login",
    requester: "Juan Pérez",
    date: "2023-03-01 15:30",
    status: "Cerrado",
    action: "Resolución",
  },
  {
    ticketId: "TK-003",
    title: "Error en la página principal",
    requester: "Sofía Díaz",
    date: "2023-02-28 10:15",
    status: "En Progreso",
    action: "Actualización",
  },
  {
    ticketId: "TK-004",
    title: "Problema de acceso a VPN",
    requester: "Carlos Pérez",
    date: "2023-02-28 09:45",
    status: "Abierto",
    action: "Comentario",
  },
  {
    ticketId: "TK-002",
    title: "Asignación de técnico",
    requester: "Supervisor",
    date: "2023-03-01 08:30",
    status: "Abierto",
    action: "Asignación",
  },
]
