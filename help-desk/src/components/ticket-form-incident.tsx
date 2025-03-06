import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { CategorySelect } from "../components/ui/CategorySelect";
import { PrioritySelect } from "../components/ui/PrioritySelect";
import { AssigneeSelect } from "../components/ui/AssigneeSelect";
import { TextInput } from "../components/ui/TextInput";
import { FileInput } from "../components/ui/FileInput";

export function TicketFormIncident() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

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

      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Crear Incidente</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput id="title" label="Título" placeholder="Título del incidente" required />
        <CategorySelect categories={categories} onCategoryChange={setSelectedCategory} />
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

      <Button type="submit" className="w-full py-3 bg-blue-500 text-white hover:bg-gray-500 font-semibold rounded-lg" disabled={isSubmitting}>
        {isSubmitting ? "Creando ticket..." : "Crear ticket"}
      </Button>
    </form>
  );
}
