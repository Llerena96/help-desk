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

  return (
    <form onSubmit={(e) => { e.preventDefault(); setIsSubmitting(true); setTimeout(() => { setIsSubmitting(false); alert("Ticket creado"); e.currentTarget.reset(); }, 1500) }} 
          className="space-y-6 max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg  shadow-md text-black-900 dark:text-gray-200">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">Crear Ticket</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" placeholder="Título del ticket" required className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
        </div>
        <div className="flex flex-col py-2">
          <Label>Categoría</Label>
          <Select onValueChange={handleCategorySelect}>
            <SelectTrigger className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <SelectValue placeholder="Seleccione una categoría" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              {categories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
          <DialogHeader>
            <DialogTitle>Seleccionar Categoría</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {categories.map(cat => (
              <button key={cat.id} className="w-full text-left p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" onClick={() => handleCategorySelect(cat.id)}>
                {cat.name}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" placeholder="Describa el problema en detalle" required className="min-h-[120px] border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
      </div>

      <Button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        {isSubmitting ? "Creando ticket..." : "Crear ticket"}
      </Button>
    </form>
  )
}