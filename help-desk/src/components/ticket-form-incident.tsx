import type React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"

export function TicketFormIncident() {
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md text-gray-900 dark:text-white">
      <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">Crear Incidente</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-gray-800 dark:text-white">Título</Label>
          <Input id="title" placeholder="Título del incidente" required className="border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
        </div>
        <div className="flex flex-col py-2">
          <Label className="text-gray-800 dark:text-white">Categoría</Label>
          <div className="space-y-2">
            <Select onValueChange={handleCategorySelect}>
              <SelectTrigger className="dark:bg-gray-700 dark:text-white">
                <SelectValue placeholder="Seleccione una categoría" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-700 dark:text-white shadow-lg rounded-md border border-gray-300 dark:border-gray-600">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="priority" className="text-gray-800 dark:text-white">Prioridad</Label>
          <Select required className="dark:bg-gray-700 dark:text-white">
            <SelectTrigger id="priority">
              <SelectValue placeholder="Seleccionar prioridad" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-700 dark:text-white shadow-lg rounded-md border border-gray-300 dark:border-gray-600">
              <SelectItem value="low" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md dark:text-white dark:hover:bg-blue-500">
                Baja
              </SelectItem>
              <SelectItem value="medium" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md dark:text-white dark:hover:bg-blue-500">
                Media
              </SelectItem>
              <SelectItem value="high" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md dark:text-white dark:hover:bg-blue-500">
                Alta
              </SelectItem>
              <SelectItem value="critical" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md dark:text-white dark:hover:bg-blue-500">
                Crítica
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignee" className="text-gray-800 dark:text-white">Asignar a</Label>
          <Select className="dark:bg-gray-700 dark:text-white">
            <SelectTrigger id="assignee">
              <SelectValue placeholder="Seleccionar responsable" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-700 dark:text-white shadow-lg rounded-md border border-gray-300 dark:border-gray-600">
              <SelectItem value="auto" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md dark:text-white dark:hover:bg-blue-500">
                Asignación automática
              </SelectItem>
              <SelectItem value="tech1" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md dark:text-white dark:hover:bg-blue-500">
                Técnico 1
              </SelectItem>
              <SelectItem value="tech2" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md dark:text-white dark:hover:bg-blue-500">
                Técnico 2
              </SelectItem>
              <SelectItem value="tech3" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md dark:text-white dark:hover:bg-blue-500">
                Técnico 3
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-gray-800 dark:text-white">Descripción</Label>
        <Textarea id="description" placeholder="Describa el problema en detalle" required className="min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="attachment" className="text-gray-800 dark:text-white">Adjuntos (opcional)</Label>
        <Input id="attachment" type="file" multiple className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
      </div>

      <Button 
        type="submit" 
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creando ticket..." : "Crear ticket"}
      </Button>
    </form>
  )
}
