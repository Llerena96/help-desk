import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export function TicketFormIncident() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedsubCategory, setSelectedsubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);

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
  ];

  const handleCategorySelect = (id) => {
    const findCategory = (list, id) => {
      for (const cat of list) {
        if (cat.id === id) return cat;
        if (cat.sub) {
          const found = findCategory(cat.sub, id);
          if (found) return found;
        }
      }
      return null;
    };
    const category = findCategory(categories, id);
    setSelectedCategory(category.name);
    setSubCategories(category.sub || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Ticket creado: El ticket ha sido creado exitosamente.");
      e.currentTarget.reset();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md text-gray-900 dark:text-white">
      <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">Crear Incidente</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" placeholder="Título del incidente" required />
        </div>
        <div className="flex flex-col py-2">
          <Label>Categoría</Label>
          <Select onValueChange={handleCategorySelect}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setIsModalOpen(true)}>cambiar a icono</Button>
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seleccionar Categoría</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="priority">Prioridad</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar prioridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Baja</SelectItem>
              <SelectItem value="medium">Media</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="critical">Crítica</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="assignee">Asignar a</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar responsable" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Asignación automática</SelectItem>
              <SelectItem value="tech1">Técnico 1</SelectItem>
              <SelectItem value="tech2">Técnico 2</SelectItem>
              <SelectItem value="tech3">Técnico 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" placeholder="Describa el problema en detalle" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="attachment">Adjuntos (opcional)</Label>
        <Input id="attachment" type="file" multiple />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creando ticket..." : "Crear ticket"}
      </Button>
    </form>
  );
}
