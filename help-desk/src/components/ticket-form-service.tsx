import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { CategorySelect } from "../components/ui/CategorySelect";
import { PrioritySelect } from "../components/ui/PrioritySelect";
import { AssigneeSelect } from "../components/ui/AssigneeSelect";
import { TextInput } from "../components/ui/TextInput";
import { FileInput } from "../components/ui/FileInput";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export function TicketForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  const categories = [
    {
      id: "1",
      name: "AD Administrativo",
      sub: [
        { id: "1-1", name: "Usuario", sub: [{ id: "1-1-1", name: "Reset de Password" }] },
      ],
    },
    {
      id: "2",
      name: "Hardware",
      sub: [{ id: "2-1", name: "Fallas" }, { id: "2-2", name: "Reemplazos" }],
    },
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-2xl backdrop-blur-sm">

      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Crear Ticket</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput id="title" label="Título" placeholder="Título del ticket" required />
        <CategorySelect categories={categories} onCategoryChange={handleCategorySelect} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PrioritySelect />
        <AssigneeSelect />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" placeholder="Describa el problema en detalle" required />
      </div>

      <FileInput id="attachment" label="Adjuntos (opcional)" />

      <Button type="submit" className="w-full py-3 bg-blue-500 text-white font-semibold hover:bg-gray-500 rounded-lg" disabled={isSubmitting}>
        {isSubmitting ? "Creando ticket..." : "Crear ticket"}
      </Button>
    </form>
  );
}
