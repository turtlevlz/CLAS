import type { DirectoryCategory } from '../types/directory';

type DirectoryCategorySelectProps = {
  value: string;
  categories: DirectoryCategory[];
  onChange: (value: string) => void;
};

export default function DirectoryCategorySelect({
  value,
  categories,
  onChange,
}: DirectoryCategorySelectProps) {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value);
  }

  return (
    <div className="directory-category-select">
      <label className="directory-field-label" htmlFor="directory-category">
        Categoría
      </label>
      <select
        id="directory-category"
        value={value}
        onChange={handleChange}
        className="directory-select"
        aria-label="Filtrar miembros por categoría"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
}
