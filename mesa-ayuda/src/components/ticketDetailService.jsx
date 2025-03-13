import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Save, RefreshCw, Clock, Building, Calendar, CheckCircle, User, Tag, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import WorkFlowService from "./ui/workFlowService"

// Datos de ejemplo - en una aplicación real, estos vendrían de una API
const tickets = [
  {
    id: "TK-1234",
    title: "Error en sistema de facturación",
    description:
      "Al intentar generar una factura para el cliente XYZ, el sistema muestra un error de conexión con la base de datos.",
    priority: "critica",
    status: "En progreso",
    createdAt: "2023-10-15 09:30",
    site: "Sede Central",
    componentId: "FACT-001",
    startDate: "2023-10-15 10:15",
    resolutionDate: "",
    closeDate: "",
    assignedTo: "Carlos Méndez",
    category: "Software",
    history: [
      { date: "2023-10-15 09:30", action: "Ticket creado por Juan Pérez" },
      { date: "2023-10-15 10:15", action: "Asignado a Carlos Méndez" },
      { date: "2023-10-15 11:20", action: "Estado cambiado a 'En progreso'" },
    ],
  },
]

export function TicketDetailService() {
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    // Lógica para guardar los cambios
    console.log("Guardando cambios:", formData)
  }

  const handleSaveAndClose = () => {
    // Lógica para guardar y cerrar el ticket
    console.log("Guardando y cerrando ticket:", formData)
  }

  const addComment = () => {
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        {
          text: newComment,
          date: new Date().toLocaleString(),
          user: "Tú",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ])
      setNewComment("")
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority.toLowerCase()) {
      case "critica":
        return <Badge variant="destructive">{priority}</Badge>
      case "alta":
        return <Badge variant="warning">{priority}</Badge>
      case "media":
        return <Badge variant="secondary">{priority}</Badge>
      case "baja":
        return <Badge variant="default">{priority}</Badge>
      default:
        return <Badge>{priority}</Badge>
    }
  }

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "abierto":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            {status}
          </Badge>
        )
      case "en progreso":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
            {status}
          </Badge>
        )
      case "resuelto":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            {status}
          </Badge>
        )
      case "cerrado":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
            {status}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-6xl">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center">
            <Link to="/tickets">
              <Button variant="ghost" size="icon" className=" h-8 w-8 hover:bg-blue-500">
                <ArrowLeft className="h-7 w-7" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">
              {ticket.id}: {formData.title}
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-2">
            {getPriorityBadge(ticket.priority)}
            {getStatusBadge(ticket.status)}
            <div className="text-sm text-muted-foreground">Creado el {ticket.createdAt}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1 hover:bg-blue-500">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Actualizar</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1 hover:bg-blue-500" onClick={handleSave}>
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">Guardar</span>
          </Button>
          <Button variant="default" size="sm" className="border gap-1 hover:bg-blue-500" onClick={handleSaveAndClose}>
            <CheckCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Guardar y cerrar</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="grid grid-cols-4 md:w-[800px]">
          <TabsTrigger value="details" className="tab-trigger">
            Detalles
          </TabsTrigger>
          <TabsTrigger value="flow" className="tab-trigger">
            Flujo de trabajo
          </TabsTrigger>
          <TabsTrigger value="conversation" className="tab-trigger">
            Conversación
          </TabsTrigger>
          <TabsTrigger value="history" className="tab-trigger">
            Historial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Información principal */}
            <Card>
              <CardHeader>
                <CardTitle>Información del Ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium" htmlFor="title">
                    Título
                  </label>
                  <Input id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium" htmlFor="description">
                    Descripción
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Categoría</label>
                    <Select defaultValue={ticket.category || "software"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hardware">Hardware</SelectItem>
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="network">Red</SelectItem>
                        <SelectItem value="access">Accesos</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Estado</label>
                    <Select defaultValue={ticket.status.toLowerCase().replace(" ", "-")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abierto">Abierto</SelectItem>
                        <SelectItem value="en-progreso">En progreso</SelectItem>
                        <SelectItem value="resuelto">Resuelto</SelectItem>
                        <SelectItem value="cerrado">Cerrado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Información adicional */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Detalles adicionales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Sitio:</span>
                    <span className="text-sm">{ticket.site}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">ID del Componente:</span>
                    <span className="text-sm">{ticket.componentId}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Asignado a:</span>
                    <span className="text-sm">{ticket.assignedTo}</span>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Fecha de Inicio:</span>
                    <span className="text-sm">{ticket.startDate}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Fecha de Resolución:</span>
                    <span className="text-sm">{ticket.resolutionDate || "Pendiente"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Fecha de Cierre:</span>
                    <span className="text-sm">{ticket.closeDate || "Pendiente"}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resolución</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    placeholder="Describe la resolución del problema..."
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    rows={3}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Código de finalización</label>
                      <Input
                        placeholder="Ej: RES-001"
                        value={completionCode}
                        onChange={(e) => setCompletionCode(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div className="flex items-end">
                      <Button className="w-full">Guardar Resolución</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        {/*Flujo de trabajo*/}
        <TabsContent value="flow" className="mt-4">
          <WorkFlowService currentStage="validacion" />
        </TabsContent>

        <TabsContent value="conversation" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div key={index} className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={comment.avatar} alt={comment.user} />
                      <AvatarFallback>{comment.user.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.user}</span>
                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="mt-1 text-sm">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full gap-2">
                <Textarea
                  placeholder="Escribe un comentario..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={addComment} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de cambios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {ticket.history?.map((change, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className="mt-0.5">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm">{change.action}</p>
                      <p className="text-xs text-muted-foreground">{change.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

