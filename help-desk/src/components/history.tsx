import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"

interface HistoryItem {
  ticketId: string
  action: string
  user: string
  date: string
  details: string
}

export function History() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Modificaciones</CardTitle>
        <CardDescription>Registro de cambios realizados en los tickets.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID Ticket</TableHead>
                <TableHead>Acción</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Detalles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historyData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.ticketId}</TableCell>
                  <TableCell>
                    <Badge variant={getVariantByAction(item.action)}>{item.action}</Badge>
                  </TableCell>
                  <TableCell>{item.user}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{item.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

function getVariantByAction(
  action: string,
): "default" | "secondary" | "destructive" | "outline" | "success" | "warning" {
  switch (action) {
    case "Creación":
      return "default"
    case "Actualización":
      return "secondary"
    case "Asignación":
      return "outline"
    case "Comentario":
      return "warning"
    case "Resolución":
      return "success"
    default:
      return "outline"
  }
}

const historyData: HistoryItem[] = [
  {
    ticketId: "TK-005",
    action: "Resolución",
    user: "Técnico 2",
    date: "2023-02-27 15:30",
    details: "Se resolvió el problema actualizando el software a la versión más reciente.",
  },
  {
    ticketId: "TK-003",
    action: "Actualización",
    user: "Técnico 1",
    date: "2023-02-28 10:15",
    details: "Se cambió el estado a 'En Progreso'. Se está evaluando el equipo necesario.",
  },
  {
    ticketId: "TK-004",
    action: "Comentario",
    user: "Administrador",
    date: "2023-02-28 09:45",
    details: "Se requiere aprobación del departamento de seguridad para otorgar acceso.",
  },
  {
    ticketId: "TK-002",
    action: "Asignación",
    user: "Supervisor",
    date: "2023-03-01 08:30",
    details: "Asignado a Técnico 3 por la criticidad del problema. Se requiere solución urgente.",
  },
  {
    ticketId: "TK-001",
    action: "Creación",
    user: "Carlos Pérez",
    date: "2023-03-01 09:15",
    details: "Ticket creado para resolver problema con impresora que no responde.",
  },
  {
    ticketId: "TK-007",
    action: "Resolución",
    user: "Técnico 1",
    date: "2023-02-26 14:20",
    details: "Se configuró correctamente el cliente de correo y se verificó su funcionamiento.",
  },
  {
    ticketId: "TK-006",
    action: "Actualización",
    user: "Técnico 2",
    date: "2023-02-27 11:45",
    details: "Se identificó problema con el certificado VPN. Se está trabajando en su renovación.",
  },
  {
    ticketId: "TK-008",
    action: "Creación",
    user: "Sofía Díaz",
    date: "2023-02-26 16:30",
    details: "Reporte de error en la aplicación móvil al intentar acceder al módulo de reportes.",
  },
]

