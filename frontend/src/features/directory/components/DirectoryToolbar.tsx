import type { ChangeEvent } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import {
  ArrowsUpDownIcon,
  CheckIcon,
  ChevronDownIcon,
} from '@heroicons/react/20/solid';

import type {
  DirectoryCategory,
  DirectorySortDirection,
} from '../types/directory';

type DirectoryToolbarProps = {
  searchValue: string;
  categoryValue: string;
  sortDirection: DirectorySortDirection;
  categories: DirectoryCategory[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortDirectionToggle: () => void;
};

export default function DirectoryToolbar({
  searchValue,
  categoryValue,
  sortDirection,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortDirectionToggle,
}: DirectoryToolbarProps) {
  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    onSearchChange(event.target.value);
  }

  function handleCategoryChange(value: string) {
    onCategoryChange(value);
  }

  function handleSortDirectionToggle() {
    onSortDirectionToggle();
  }

  const selectedCategory = categories.find(
    (category) => category.id === categoryValue,
  );

  const sortDirectionLabel = sortDirection === 'asc' ? 'A-Z' : 'Z-A';
  const sortDirectionAriaLabel =
    sortDirection === 'asc'
      ? 'Cambiar orden a descendente'
      : 'Cambiar orden a ascendente';

  return (
    <section className="rounded-[28px] border border-[#e7edf5] bg-white p-6! shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
      <div className="grid grid-cols-1 gap-4.5 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)_auto] lg:items-end">
        <div className="min-w-0">
          <label
            htmlFor="directory-search"
            className="mb-3! block pl-0.5! text-[14px] leading-[1.2] font-bold text-[#17304f]"
          >
            Buscar miembros
          </label>

          <input
            id="directory-search"
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Buscar por empresa, ciudad, categoría o especialidad"
            className="block h-13.5 w-full min-w-0 rounded-[18px] border border-[#dbe4ef] bg-white px-4.5! text-[16px] leading-none text-[#334155] shadow-none outline-none placeholder:text-[#94a3b8] focus:outline-none focus:ring-4 focus:ring-sky-100"
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="directory-category"
            className="mb-3! block pl-0.5! text-[14px] leading-[1.2] font-bold text-[#17304f]"
          >
            Categoría
          </label>

          <Listbox value={categoryValue} onChange={handleCategoryChange}>
            <div className="relative">
              <ListboxButton
                id="directory-category"
                className="flex h-13.5 w-full min-w-0 items-center justify-between rounded-[18px] border border-[#dbe4ef] bg-white px-4.5 text-left text-[16px] leading-none text-[#334155] shadow-none outline-none transition focus:outline-none focus:ring-4 focus:ring-sky-100"
              >
                <span className="truncate">
                  {selectedCategory?.label ?? 'Todas las categorías'}
                </span>

                <ChevronDownIcon
                  aria-hidden="true"
                  className="ml-3 h-5 w-5 shrink-0 text-[#64748b]"
                />
              </ListboxButton>
              <ListboxOptions className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-[18px] border border-[#dbe4ef] bg-white p-2 shadow-[0_18px_40px_rgba(15,23,42,0.12)] focus:outline-none">
                {categories.map((category) => (
                  <ListboxOption
                    key={category.id}
                    value={category.id}
                    className={({ focus, selected }) =>
                      [
                        'flex cursor-pointer items-center justify-between rounded-[14px] px-3.5 py-3 text-[15px] font-semibold transition',
                        focus ? 'bg-[#eef6ff] text-[#09487f]' : 'text-[#334155]',
                        selected ? 'bg-[#e5effa] text-[#09487f]' : '',
                      ].join(' ')
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className="truncate">{category.label}</span>

                        {selected ? (
                          <CheckIcon
                            aria-hidden="true"
                            className="ml-3 h-5 w-5 shrink-0 text-[#1390ff]"
                          />
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
        <div>
          <label className="mb-3! block pl-0.5! text-[14px] leading-[1.2] font-bold text-[#17304f]">
            Orden
          </label>

          <button
            type="button"
            aria-label={sortDirectionAriaLabel}
            onClick={handleSortDirectionToggle}
            className="flex h-13.5 min-w-[104px] items-center justify-center gap-2 rounded-[18px] border border-[#dbe4ef] bg-white px-4.5 text-[15px] font-bold leading-none text-[#17304f] shadow-none outline-none transition hover:bg-[#eef6ff] focus:outline-none focus:ring-4 focus:ring-sky-100"
          >
            <ArrowsUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-[#64748b]"
            />
            <span>{sortDirectionLabel}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
