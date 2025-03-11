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
import WorkFlowIncident from "./ui/workFlowIncident"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
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
    resolutionDate: "2023-10-16 10:15",
    closeDate: "2023-10-16 10:15",
    assignedTo: "Carlos Méndez",
    currentState: "clasificacion",
    category: "Software",
    history: [
      { date: "2023-10-15 09:30", action: "Ticket creado por Juan Pérez" },
      { date: "2023-10-15 10:15", action: "Asignado a Carlos Méndez" },
      { date: "2023-10-15 11:20", action: "Estado cambiado a 'En progreso'" },
    ],
  },
]

const categories = [
  {
    id: "1", name: "AD Administrativo", sub: [
      {
        id: "1-1", name: "Usuario", sub: [
          { id: "1-1-1", name: "Reset de Password" }
        ]
      }
    ]
  },
  {
    id: "2", name: "Hardware", sub: [
      { id: "2-1", name: "Fallas" },
      { id: "2-2", name: "Reemplazos" }
    ]
  }
]

export function TicketDetailIncident() {
  const { ticketId } = useParams<{ ticketId: string }>()
  const ticket = tickets.find((ticket) => ticket.id === ticketId) || tickets[0] // Fallback al primer ticket para demo

  const [formData, setFormData] = useState({
    title: ticket.title,
    description: ticket.description,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedsubCategory, setSelectedsubCategory] = useState("")
  const [subCategories, setSubCategories] = useState([])
  const [resolution, setResolution] = useState("")
  const [completionCode, setCompletionCode] = useState("")
  const [comments, setComments] = useState([
    {
      text: "He revisado el problema y parece ser un error de conexión con el servidor de base de datos.",
      date: "2023-10-15 11:45",
      user: "Carlos Méndez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])
  const [newComment, setNewComment] = useState("")

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


  const handleCategorySelect = (id) => {
    const findCategory = (list, id) => {
      for (const cat of list) {
        if (cat.id === id) return cat
        if (cat.sub) {
          const found = findCategory(cat.sub, id)
          if (found) return found
        }
      }
      return null
    }
    const category = findCategory(categories, id)
    setSelectedCategory(category.name)
    setSubCategories(category.sub || [])
  }

  const renderCategoryOptions = (category, prefix = "") => (
    <>
      <SelectItem key={category.id} value={category.id}>
        {prefix + category.name}
      </SelectItem>
      {category.sub?.map(sub => renderCategoryOptions(sub, prefix + category.name + "/"))}
    </>
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Ticket creado: El ticket ha sido creado exitosamente.")
      e.currentTarget.reset()
    }, 1500)
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
      <div className="tabs tabs-box">
        <input type="radio" name="my_tabs_6" className="tab" aria-label="Resumen" defaultChecked />
        <div className="tab-content bg-base-100 border-base-300 p-6">
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

                <div className="grid grid-cols-2 gap-4 ">
                  <div className="flex flex-col py-2 ">
                    <Label className="text-gray-800 dark:text-white ">Categoría</Label>
                    <div className="space-y-2s ">
                      <Select onValueChange={handleCategorySelect}>
                        <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:bg-transparent">
                          <SelectValue placeholder="Seleccione una categoría" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-700 dark:text-white shadow-lg rounded-md border border-gray-300 dark:border-gray-600">
                          {categories.map(cat => renderCategoryOptions(cat))}
                        </SelectContent>
                      </Select>
                      <Button onClick={() => setIsModalOpen(true)}>cambiar a icono</Button>
                    </div>
                  </div>
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-gray-800 dark:text-white">Seleccionar Categoría</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2">
                        {categories.map(cat => (
                          <div key={cat.id}>
                            <button
                              className="w-full text-left p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                              onClick={() => handleCategorySelect(cat.id)}
                            >
                              {cat.name}
                            </button>

                            {selectedCategory === cat.name && (
                              <div className="pl-4 mt-2 space-y-2">
                                {subCategories.map(sub => (
                                  <div key={sub.id}>
                                    <button
                                      className="w-full text-left p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                                      onClick={() => setSelectedsubCategory(sub.name)}
                                    >
                                      {sub.name}
                                    </button>

                                    {selectedsubCategory === sub.name && sub.sub && (
                                      <div className="pl-4 mt-2 space-y-2">
                                        {sub.sub.map(subsub => (
                                          <button
                                            key={subsub.id}
                                            className="w-full text-left p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                                          >
                                            {subsub.name}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div>
                    <label className="text-sm font-medium">Estado</label>
                    <Select defaultValue={ticket.status.toLowerCase().replace(" ", "-")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-700">
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
            <Card>
              <CardHeader>
                <CardTitle>Detalles adicionales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Sitio:</span>
                  <Input
                    id="site"
                    name="site"
                    value={ticket.site}
                    onChange={handleChange}
                    className="text-sm"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">ID del Componente:</span>
                  <Input
                    id="componentId"
                    name="componentId"
                    value={ticket.componentId}
                    onChange={handleChange}
                    className="text-sm"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Asignado a:</span>
                  <Input
                    id="assignedTo"
                    name="assignedTo"
                    value={ticket.assignedTo}
                    onChange={handleChange}
                    className="text-sm"
                  />
                </div>

                <Separator />

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Fecha de Inicio:</span>
                  <Input
                    type="string"
                    id="startDate"
                    name="startDate"
                    value={ticket.startDate}
                    onChange={handleChange}
                    className="text-sm"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Fecha de Resolución:</span>
                  <Input
                    type="string"
                    id="resolutionDate"
                    name="resolutionDate"
                    value={ticket.resolutionDate || ""}
                    onChange={handleChange}
                    className="text-sm"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Fecha de Cierre:</span>
                  <Input
                    type="strisng"
                    id="closeDate"
                    name="closeDate"
                    value={ticket.closeDate || ""}
                    onChange={handleChange}
                    className="text-sm"
                  />
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

        {/*Flujo de trabajo*/}
        <input type="radio" name="my_tabs_6" className="tab" aria-label="Flujo del ticket" />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <WorkFlowIncident currentStage="validacion" />
        </div>
        <input type="radio" name="my_tabs_6" className="tab" aria-label="Conversación" />
        <div className="tab-content bg-base-100 border-base-300 p-6">
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
        </div>
        <input type="radio" name="my_tabs_6" className="tab" aria-label="Historial"/>
        <div className="tab-content bg-base-100 border-base-300 p-6">
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
        </div>
      </div>
    </div >
  )
}

