import type React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export function TicketForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulación de envío
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

        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Select required>
            <SelectTrigger id="category">
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg rounded-md border border-gray-300 mt-1 w-full">
              <SelectItem value="hardware" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md">
                Hardware
              </SelectItem>
              <SelectItem value="software" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md">
                Software
              </SelectItem>
              <SelectItem value="network" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md">
                Red
              </SelectItem>
              <SelectItem value="access" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md">
                Accesos
              </SelectItem>
              <SelectItem value="other" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md">
                Otro
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="priority">Prioridad</Label>
          <Select required>
            <SelectTrigger id="priority">
              <SelectValue placeholder="Seleccionar prioridad" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg rounded-md border border-gray-300 mt-1 w-full">
              <SelectItem value="low" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md">
                Baja
              </SelectItem>
              <SelectItem value="medium" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md">
                Media
              </SelectItem>
              <SelectItem value="high" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md">
                Alta
              </SelectItem>
              <SelectItem value="critical" className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white rounded-md">
                Crítica
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
      </div>

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
