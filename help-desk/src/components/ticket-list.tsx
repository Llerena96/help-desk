import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Search, Filter, List } from "lucide-react";
import { Progress } from "./ui/Progress";

interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: string;
  createdAt: string;
  site: string;
  componentId: string;
  startDate: string;
  resolutionDate: string;
  closeDate: string;
  requester: string;
  assignedTo: string;
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

  // Función para obtener el porcentaje de progreso basado en el estado
  function getProgress(status: string) {
    const progress: Record<string, number> = {
      Abierto: 10,
      Progreso: 50,
      Pendiente: 30,
      Resuelto: 100,
      Crítico: 20,
    };
    return progress[status] || 0;
  }

  return (
    <div className="p-6 space-y-6 container mx-auto">
      <Card>
        <CardHeader className="bg-gray-700 text-white rounded-t-md mb-7">
          <CardTitle className="flex items-center gap-2">
            <List className="w-5 h-5" />
            <span className="text-lg">Listado de Tickets</span>
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
            <div className="relative mb-7">
              <Filter className="absolute left-3 top-2.5 w-5 h-5 text-white dark:text-gray-300" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="pl-10 bg-gray-400 font-bold text-white h-10 border border-gray-600 rounded-md dark:bg-gray-700">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black dark:text-white dark:bg-gray-800">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Abierto">Abierto</SelectItem>
                  <SelectItem value="Progreso">Progreso</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Resuelto">Resuelto</SelectItem>
                  <SelectItem value="Crítico">Crítico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md overflow-hidden">
            <Table className="w-full border border-gray-700 text-sm">
              <TableHeader className="text-white bg-gray-700 dark:bg-gray-900">
                <TableRow>
                  <TableHead className="text-center font-bold">ID</TableHead>
                  <TableHead className="text-center font-bold">Título</TableHead>
                  <TableHead className="text-center font-bold">Asignado a</TableHead>
                  <TableHead className="text-center font-bold">Solicitante</TableHead>
                  <TableHead className="text-center font-bold">Fecha</TableHead>
                  <TableHead className="text-center font-bold">Estado</TableHead>
                  <TableHead className="text-center font-bold">Progreso</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="hover:bg-gray-700 hover:text-white font-bold">
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell className="text-blue-400 hover:underline text-center">
                        <Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                      </TableCell>
                      <TableCell className="text-center">
                        <Link to={`/tickets/${ticket.id}`}>{ticket.assignedTo}</Link>
                      </TableCell>
                      <TableCell className="text-center">{ticket.requester}</TableCell>
                      <TableCell className="text-center">{ticket.date}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={getBadgeColor(ticket.status)}>{ticket.status}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Progress 
                          value={getProgress(ticket.status)} 
                          startDate={ticket.startDate} 
                          expectedEndDate={ticket.resolutionDate} 
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-gray-900 dark:text-gray-300">
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
    Progreso: "bg-yellow-500 text-white",
    Pendiente: "bg-orange-500 text-white",
    Resuelto: "bg-green-500 text-white",
    Crítico: "bg-red-500 text-white",
  };
  return colors[status] || "bg-gray-500 text-white";
}

export const tickets: Ticket[] = [
  {
    id: "TK-001",
    title: "Problema con impresora",
    description: "prueba descripcion",
    requester: "Carlos Pérez",
    date: "2023-03-01",
    status: "Crítico",
    site: "c2p",
    priority: "high",
    createdAt: "06/03/2025",
    componentId: "wks-c4i-des-01",
    startDate: "10/03/2025",
    resolutionDate: "15/03/2025",
    closeDate: "15/03/2025",
    assignedTo: "Juan Pérez",
  },
  {
    id: "TK-002",
    title: "Error en sistema de facturación",
    description: "prueba descripcion",
    requester: "María López",
    date: "2023-03-01",
    status: "Pendiente",
    site: "c5",
    priority: "high",
    createdAt: "06/03/2025",
    componentId: "wks-c4i-des-01",
    startDate: "10/03/2025",
    resolutionDate: "15/03/2025",
    closeDate: "15/03/2025",
    assignedTo: "Pedro Sánchez",
  },
  {
    id: "TK-003",
    title: "Solicitud de nuevo equipo",
    description: "prueba descripcion",
    requester: "Juan Pérez",
    date: "2023-02-28",
    status: "Progreso",
    site: "c2n",
    priority: "high",
    createdAt: "06/03/2025",
    componentId: "wks-c4i-des-01",
    startDate: "10/03/2025",
    resolutionDate: "15/03/2025",
    closeDate: "15/03/2025",
    assignedTo: "Ana Rodríguez",
  },
  {
    id: "TK-004",
    title: "Acceso a sistema CRM",
    description: "prueba descripcion",
    requester: "Ana Rodríguez",
    date: "2023-02-28",
    status: "Abierto",
    site: "c2o",
    priority: "high",
    createdAt: "06/03/2025",
    componentId: "wks-c4i-des-01",
    startDate: "10/03/2025",
    resolutionDate: "15/03/2025",
    closeDate: "15/03/2025",
    assignedTo: "Carlos Pérez",
  },
  {
    id: "TK-005",
    title: "Actualización de software",
    description: "prueba descripcion",
    requester: "Pedro Sánchez",
    date: "2023-02-27",
    status: "Abierto",
    site: "c2c",
    priority: "high",
    createdAt: "06/03/2025",
    componentId: "wks-c4i-des-01",
    startDate: "10/03/2025",
    resolutionDate: "15/03/2025",
    closeDate: "15/03/2025",
    assignedTo: "Roberto Gómez",
  },
  {
    id: "TK-006",
    title: "Problema con VPN",
    description: "prueba descripcion",
    requester: "Laura Martínez",
    date: "2023-02-27",
    status: "Progreso",
    site: "c2s",
    priority: "high",
    createdAt: "06/03/2025",
    componentId: "wks-c4i-des-01",
    startDate: "10/03/2025",
    resolutionDate: "15/03/2025",
    closeDate: "15/03/2025",
    assignedTo: "Sofía Díaz",
  },
  {
    id: "TK-007",
    title: "Configuración de correo",
    description: "prueba descripcion",
    requester: "Roberto Gómez",
    date: "2023-02-26",
    status: "Resuelto",
    site: "c2n",
    priority: "high",
    createdAt: "06/03/2025",
    componentId: "wks-c4i-des-01",
    startDate: "10/03/2025",
    resolutionDate: "15/03/2025",
    closeDate: "15/03/2025",
    assignedTo: "Carlos Pérez",
  },
  {
    id: "TK-008",
    title: "Error en aplicación móvil",
    description: "prueba descripcion",
    requester: "Sofía Díaz",
    date: "2023-02-26",
    status: "Abierto",
    site: "c5",
    priority: "high",
    createdAt: "06/03/2025",
    componentId: "wks-c24-asd-1",
    startDate: "10/03/2025",
    resolutionDate: "15/03/2025",
    closeDate: "15/03/2025",
    assignedTo: "Juan Pérez",
  },
];
