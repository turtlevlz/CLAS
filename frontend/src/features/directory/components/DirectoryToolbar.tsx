import DirectoryCategorySelect from './DirectoryCategorySelect';
import DirectorySearchInput from './DirectorySearchInput';
import type { DirectoryCategory } from '../types/directory';

type DirectoryToolbarProps = {
  searchValue: string;
  categoryValue: string;
  categories: DirectoryCategory[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

export default function DirectoryToolbar({
  searchValue,
  categoryValue,
  categories,
  onSearchChange,
  onCategoryChange,
}: DirectoryToolbarProps) {
  return (
    <section className="directory-toolbar" aria-label="Filtros del directorio">
      <DirectorySearchInput value={searchValue} onChange={onSearchChange} />
      <DirectoryCategorySelect
        value={categoryValue}
        categories={categories}
        onChange={onCategoryChange}
      />
    </section>
  );
}
