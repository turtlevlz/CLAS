import type { ChangeEvent } from 'react';

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
  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    onSearchChange(event.target.value);
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    onCategoryChange(event.target.value);
  }

  return (
    <section className="!rounded-[28px] !border !border-[#e7edf5] !bg-white !p-[24px] !shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
      <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)] lg:items-end">
        <div className="min-w-0">
          <label
            htmlFor="directory-search"
            className="!mb-[12px] !block !pl-[2px] !text-[14px] !leading-[1.2] !font-bold !text-[#17304f]"
          >
            Buscar miembros
          </label>

          <input
            id="directory-search"
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Buscar por empresa, ciudad, categoría o especialidad"
            className="!block !h-[54px] !w-full !min-w-0 !rounded-[18px] !border !border-[#dbe4ef] !bg-white !px-[18px] !text-[16px] !leading-none !text-[#334155] !shadow-none !outline-none placeholder:!text-[#94a3b8] focus:!outline-none focus:!ring-4 focus:!ring-sky-100"
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="directory-category"
            className="!mb-[12px] !block !pl-[2px] !text-[14px] !leading-[1.2] !font-bold !text-[#17304f]"
          >
            Categoría
          </label>

          <select
            id="directory-category"
            value={categoryValue}
            onChange={handleCategoryChange}
            className="!block !h-[54px] !w-full !min-w-0 !rounded-[18px] !border !border-[#dbe4ef] !bg-white !px-[18px] !text-[16px] !leading-none !text-[#334155] !shadow-none !outline-none focus:!outline-none focus:!ring-4 focus:!ring-sky-100"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
