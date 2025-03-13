import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Label } from "./label";

export function PrioritySelect() {
  return (
    <div className="space-y-2">
      <Label htmlFor="priority">Prioridad</Label>
      <Select required>
        <SelectTrigger
          id="priority"
          className="border-gray-300 hover:border-blue-500 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <SelectValue placeholder="Seleccionar prioridad" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-lg rounded-md border border-gray-300 mt-1 w-full">
          <SelectItem value="1" className="hover:bg-blue-100">Solicito orientación u asistencia</SelectItem>
          <SelectItem value="2" className="hover:bg-blue-100">Este incidente dificulta mi trabajo</SelectItem>
          <SelectItem value="3" className="hover:bg-blue-100">Este incidente me impide realizar mi trabajo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
