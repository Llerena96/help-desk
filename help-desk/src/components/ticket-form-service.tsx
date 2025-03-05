import type React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"

export function TicketForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedsubCategory, setSelectedsubCategory] = useState("")
  const [subCategories, setSubCategories] = useState([])

  const categories = [
    { id: "1", name: "AD Administrativo", sub: [
      { id: "1-1", name: "Usuario", sub: [
        { id: "1-1-1", name: "Reset de Password" }
      ] }
    ]},
    { id: "2", name: "Hardware", sub: [
      { id: "2-1", name: "Fallas" },
      { id: "2-2", name: "Reemplazos" }
    ]}
  ]

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
  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Crear Ticket</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" placeholder="Título del ticket" required className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
        </div>
        <div className="flex flex-col py-2">
          <Label>Categoría</Label>
          <div className="space-y-2">
            <Select onValueChange={handleCategorySelect}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => renderCategoryOptions(cat))}
              </SelectContent>
            </Select>
            <Button onClick={() => setIsModalOpen(true)}>cambiar a icono</Button> 
          </div>
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Seleccionar Categoría</DialogTitle>
    </DialogHeader>
    <div className="space-y-2">
      {categories.map(cat => (
        <div key={cat.id}>
          <button
            className="w-full text-left p-2 border rounded-lg"
            onClick={() => handleCategorySelect(cat.id)}
          >
            {cat.name}
          </button>

          {selectedCategory === cat.name && (
            <div className="pl-4 mt-2 space-y-2">
              {subCategories.map(sub => (
                <div key={sub.id}>
                  <button
                    className="w-full text-left p-2 border rounded-lg"
                    onClick={() => setSelectedsubCategory(sub.name)}
                  >
                    {sub.name}
                  </button>

                  {selectedsubCategory === sub.name && sub.sub && (
                    <div className="pl-4 mt-2 space-y-2">
                      {sub.sub.map(subsub => (
                        <button
                          key={subsub.id}
                          className="w-full text-left p-2 border rounded-lg"
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
                    
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="priority">Prioridad</Label>
          <Select required>
            <SelectTrigger id="priority">
              <SelectValue placeholder="Seleccionar prioridad" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg rounded-md border border-gray-300 mt-1 w-full">
              <SelectItem value="low" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md">
              Solicito orientacion u asistencia
              </SelectItem>
              <SelectItem value="medium" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md">
              Este incidente dificulta mi trabajo
              </SelectItem>
              <SelectItem value="high" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md">
              Este incidente me impide realizar mi trabajo
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignee">Asignar a</Label>
          <Select>
            <SelectTrigger id="assignee">
              <SelectValue placeholder="Seleccionar responsable" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg rounded-md border border-gray-300 mt-1 w-full">
              <SelectItem value="auto" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md">
                Asignación automática
              </SelectItem>
              <SelectItem value="tech1" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md">
                Técnico 1
              </SelectItem>
              <SelectItem value="tech2" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md">
                Técnico 2
              </SelectItem>
              <SelectItem value="tech3" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md">
                Técnico 3
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" placeholder="Describa el problema en detalle" required className="min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
      </div>{
        //poner aqui un enlace al FAQ para orientar en la levantacion de incidentes / solicitud de servicio
      }

      <div className="space-y-2">
        <Label htmlFor="attachment">Adjuntos (opcional)</Label>
        <Input id="attachment" type="file" multiple className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
      </div>

      <Button 
        type="submit" 
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creando ticket..." : "Crear ticket"}
      </Button>
    </form>
  )
}