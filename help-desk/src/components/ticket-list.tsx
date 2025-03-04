import { MainNav } from "./main-nav"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Search, Filter, Eye } from "lucide-react"
import { Link } from "react-router-dom"

interface Ticket {
  id: string
  title: string
  requester: string
  date: string
  status: string
}

export function TicketList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          </div>
    <Card>
      <CardHeader>
        <CardTitle>Listado de Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 w-full max-w-sm">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por ID o título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Abierto">Abierto</SelectItem>
                <SelectItem value="En Progreso">En Progreso</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="Resuelto">Resuelto</SelectItem>
                <SelectItem value="Crítico">Crítico</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell><Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link></TableCell> 
                    <TableCell>{ticket.requester}</TableCell>
                    <TableCell>{ticket.date}</TableCell>
                    <TableCell>
                      <Badge variant={getVariantByStatus(ticket.status)}>{ticket.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No se encontraron tickets.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

function getVariantByStatus(
  status: string,
): "default" | "secondary" | "destructive" | "outline" | "success" | "warning" {
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

export const tickets: Ticket[] = [
  {
    id: "TK-001",
    title: "Problema con impresora",
    requester: "Carlos Pérez",
    date: "2023-03-01",
    status: "Abierto",
  },
  {
    id: "TK-002",
    title: "Error en sistema de facturación",
    requester: "María López",
    date: "2023-03-01",
    status: "Crítico",
  },
  {
    id: "TK-003",
    title: "Solicitud de nuevo equipo",
    requester: "Juan Pérez",
    date: "2023-02-28",
    status: "En Progreso",
  },
  {
    id: "TK-004",
    title: "Acceso a sistema CRM",
    requester: "Ana Rodríguez",
    date: "2023-02-28",
    status: "Pendiente",
  },
  {
    id: "TK-005",
    title: "Actualización de software",
    requester: "Pedro Sánchez",
    date: "2023-02-27",
    status: "Resuelto",
  },
  {
    id: "TK-006",
    title: "Problema con VPN",
    requester: "Laura Martínez",
    date: "2023-02-27",
    status: "En Progreso",
  },
  {
    id: "TK-007",
    title: "Configuración de correo",
    requester: "Roberto Gómez",
    date: "2023-02-26",
    status: "Resuelto",
  },
  {
    id: "TK-008",
    title: "Error en aplicación móvil",
    requester: "Sofía Díaz",
    date: "2023-02-26",
    status: "Abierto",
  },
]

