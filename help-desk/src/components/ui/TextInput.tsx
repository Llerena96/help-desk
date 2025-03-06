import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function TextInput({ id, label, placeholder, required = false }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} placeholder={placeholder} required={required} />
    </div>
  );
}
