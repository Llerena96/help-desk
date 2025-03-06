import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function AssigneeSelect() {
  return (
    <div className="space-y-2">
      <Label>Asignar a</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar responsable" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-lg rounded-md border border-gray-300 mt-1 w-full">
          {["Asignación automática", "Técnico 1", "Técnico 2", "Técnico 3"].map((assignee) => (
            <SelectItem className="hover:bg-blue-100" key={assignee} value={assignee.toLowerCase().replace(" ", "_")}>
              {assignee}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
