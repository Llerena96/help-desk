import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Search, Filter, UserCheck, XCircle, Repeat, List } from "lucide-react";

interface Ticket {
  id: string;
  title: string;
  requester: string;
  date: string;
  status: string;
}

export function TicketList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="bg-gray-700 text-white rounded-t-md mb-7">
            <CardTitle className="flex items-center gap-2">
              <List className="w-5 h-5" /> {/* Icono de lista */}
              <span className="text-lg">Listado de Tickets</span> {/* Texto */}
            </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-100 dark:text-gray-300" />
              <Input
                placeholder="Buscar por ID o título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-400 text-white font-bold h-10 border border-gray-600 rounded-md dark:bg-gray-700"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-2.5 w-5 h-5 text-white dark:text-gray-300" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="pl-10 bg-gray-400 font-bold text-white h-10 border border-gray-600 rounded-md dark:bg-gray-700">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black dark:bg-gray-800">
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

          <div className="overflow-x-auto mt-10">
            <Table className="w-full text-sm">
              <TableHeader className="text-white bg-gray-700 dark:bg-gray-900">
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
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="hover:bg-gray-700 hover:text-white font-bold">
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>
                        <Link to={`/tickets/${ticket.id}`} className="text-blue-400 hover:underline">
                          {ticket.title}
                        </Link>
                      </TableCell>
                      <TableCell>{ticket.requester}</TableCell>
                      <TableCell>{ticket.date}</TableCell>
                      <TableCell>
                        <Badge className={getBadgeColor(ticket.status)}>{ticket.status}</Badge>
                      </TableCell>
                      <TableCell className="text-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          title="Reasignar"
                          className="px-4 py-2  border-blue-500 bg-blue-500 font-bold text-white hover:bg-blue-400 hover:text-white transition-all rounded-md shadow-sm hover:shadow-md"
                        >
                          <UserCheck className="w-4 h-4 mr-1" />                         
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          title="Cambiar estado"
                          className="px-4 py-2 border-yellow-500 bg-yellow-500 font-bold text-white hover:bg-yellow-400 hover:text-white transition-all rounded-md shadow-sm hover:shadow-md"
                        >
                          <Repeat className="w-4 h-4 mr-1" />
                        </Button>
                        
                        <Button
                          size="sm"
                          title="Cerrar"
                          variant="outline"
                          className="px-4 py-2 border-red-500 bg-red-500 font-bold text-white hover:bg-red-400 hover:text-white transition-all rounded-md shadow-sm hover:shadow-md"
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
function getBadgeColor(status: string) {
  const colors: Record<string, string> = {
    Abierto: "bg-blue-500 text-white",
    "En Progreso": "bg-yellow-500 text-white",
    Pendiente: "bg-orange-500 text-white",
    Resuelto: "bg-green-500 text-white",
    Crítico: "bg-red-500 text-white",
  };
  return colors[status] || "bg-gray-500 text-white";
}

export const tickets: Ticket[] = [
  { id: "TK-001", title: "Problema con impresora", requester: "Carlos Pérez", date: "2023-03-01", status: "Abierto" },
  { id: "TK-002", title: "Error en sistema de facturación", requester: "María López", date: "2023-03-01", status: "Crítico" },
  { id: "TK-003", title: "Solicitud de nuevo equipo", requester: "Juan Pérez", date: "2023-02-28", status: "En Progreso" },
  { id: "TK-004", title: "Acceso a sistema CRM", requester: "Ana Rodríguez", date: "2023-02-28", status: "Pendiente" },
  { id: "TK-005", title: "Actualización de software", requester: "Pedro Sánchez", date: "2023-02-27", status: "Resuelto" },
  { id: "TK-006", title: "Problema con VPN", requester: "Laura Martínez", date: "2023-02-27", status: "En Progreso" },
  { id: "TK-007", title: "Configuración de correo", requester: "Roberto Gómez", date: "2023-02-26", status: "Resuelto" },
  { id: "TK-008", title: "Error en aplicación móvil", requester: "Sofía Díaz", date: "2023-02-26", status: "Abierto" },
]
