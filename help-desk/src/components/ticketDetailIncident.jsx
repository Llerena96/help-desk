import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Save, RefreshCw, Clock, Building, Calendar, CheckCircle, User, Tag, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { Input } from "../components/ui/input"
import { Separator } from "../components/ui/separator"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
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
  const { ticketId } = useParams()
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

  const handleSubmit = (e) => {
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
            <span className="hidden sm:inline">Guardar y Cerrar</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="details">
        <TabsList className="flex space-x-4 border-b">
          <TabsTrigger value="details">Detalles</TabsTrigger>
          <TabsTrigger value="comments">Comentarios</TabsTrigger>
          <TabsTrigger value="workflow">Flujo de Trabajo</TabsTrigger>
          <TabsTrigger value="resolution">Resolución</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Detalles del Ticket</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Título del Ticket</Label>
                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="flex gap-2">
                  <div>
                    <Label>Categoria</Label>
                    <Select onValueChange={handleCategorySelect} value={selectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar Categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => renderCategoryOptions(category))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comments">
          <Card>
            <CardHeader>
              <CardTitle>Comentarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comments.map((comment, idx) => (
                  <div key={idx} className="flex space-x-4">
                    <Avatar>
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback>{comment.user[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{comment.user}</p>
                      <p>{comment.text}</p>
                      <div className="text-sm text-muted-foreground">{comment.date}</div>
                    </div>
                  </div>
                ))}
                <Textarea
                  placeholder="Agregar un comentario"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button onClick={addComment}>Agregar Comentario</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="workflow">
          <WorkFlowIncident />
        </TabsContent>
        
        <TabsContent value="resolution">
          <Card>
            <CardHeader>
              <CardTitle>Resolución</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="resolution">Descripción de la Resolución</Label>
                <Textarea
                  id="resolution"
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="completionCode">Código de Resolución</Label>
                <Input
                  id="completionCode"
                  value={completionCode}
                  onChange={(e) => setCompletionCode(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
