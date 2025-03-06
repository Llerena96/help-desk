import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Label } from "./label";

export function CategorySelect({ categories, onCategoryChange }) {
  const renderCategoryOptions = (category, prefix = "") => (
    <>
      <SelectItem className="hover:bg-blue-100" key={category.id} value={category.id}>
        {prefix + category.name}
      </SelectItem>
      {category.sub?.map((sub) => renderCategoryOptions(sub, prefix + category.name + "/"))}
    </>
  );

  return (
    <div className="space-y-2">
      <Label>Categoría</Label>
      <Select onValueChange={onCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Seleccione una categoría" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-lg rounded-md border border-gray-300 mt-1 w-full">
          {categories.map((cat) => renderCategoryOptions(cat))}
        </SelectContent>
      </Select>
    </div>
  );
}
