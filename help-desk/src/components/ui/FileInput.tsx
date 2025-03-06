import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function FileInput({ id, label }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type="file" multiple />
    </div>
  );
}
