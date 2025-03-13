import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export function RecentTickets() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Tickets Recientes</CardTitle>
        <CardDescription>Se han creado 5 tickets en las últimas 24 horas.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentTickets.map((ticket) => (
            <div className="flex items-center" key={ticket.id}>
              <Avatar className="h-9 w-9">
                <AvatarImage src={ticket.avatar} alt="Avatar" />
                <AvatarFallback>{ticket.initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{ticket.title}</p>
                <p className="text-sm text-muted-foreground">{ticket.email}</p>
              </div>
              <div className="ml-auto font-medium">
                <Badge variant={getVariantByStatus(ticket.status)}>{ticket.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function getVariantByStatus(status) {
  switch (status) {
    case "Abierto":
      return "default";
    case "En Progreso":
      return "secondary";
    case "Pendiente":
      return "warning";
    case "Resuelto":
      return "success";
    case "Crítico":
      return "destructive";
    default:
      return "outline";
  }
}

const recentTickets = [
  {
    id: "1",
    title: "Problema con impresora",
    email: "sirjoseph@ejemplo.com",
    status: "Abierto",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "CP",
  },
  {
    id: "2",
    title: "Error en sistema de facturación",
    email: "maria@ejemplo.com",
    status: "Crítico",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "ML",
  },
  {
    id: "3",
    title: "Solicitud de nuevo equipo",
    email: "juan@ejemplo.com",
    status: "En Progreso",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JP",
  },
  {
    id: "4",
    title: "Acceso a sistema CRM",
    email: "ana@ejemplo.com",
    status: "Pendiente",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "AR",
  },
  {
    id: "5",
    title: "Actualización de software",
    email: "pedro@ejemplo.com",
    status: "Resuelto",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "PS",
  },
];
