import { useState, type ChangeEvent } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import {
  AdjustmentsHorizontalIcon,
  ArrowsUpDownIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';

import type {
  DirectoryCategory,
  DirectorySortDirection,
} from '../types/directory';

type DirectoryToolbarProps = {
  searchValue: string;
  categoryValues: string[];
  tierValues: string[];
  sortDirection: DirectorySortDirection;
  categories: DirectoryCategory[];
  tiers: DirectoryCategory[];
  onSearchChange: (value: string) => void;
  onCategoryToggle: (value: string) => void;
  onTierToggle: (value: string) => void;
  onSortDirectionToggle: () => void;
  onClearFilters: () => void;
};

function FilterChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={[
        'inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border px-4 py-2 text-left text-[14px] font-bold leading-tight transition focus:outline-none focus:ring-4 focus:ring-sky-100',
        selected
          ? 'border-[#12284b] bg-[#12284b] text-white shadow-[0_10px_24px_rgba(18,40,75,0.18)]'
          : 'border-[#dbe4ef] bg-white text-[#334155] hover:border-[#b7d8ff] hover:bg-[#f5f9ff]',
      ].join(' ')}
    >
      {selected ? (
        <CheckIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
      ) : null}
      <span className="break-words">{label}</span>
    </button>
  );
}

function FilterGroup({
  title,
  description,
  options,
  selectedValues,
  onToggle,
}: {
  title: string;
  description: string;
  options: DirectoryCategory[];
  selectedValues: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <section className="min-w-0 rounded-[24px] border border-[#e5edf7] bg-[#f8fbff] p-5">
      <div className="flex flex-col gap-1">
        <h3 className="text-[18px] font-bold leading-tight text-[#12284b]">
          {title}
        </h3>
        <p className="text-[13px] leading-[1.5] text-[#64748b]">
          {description}
        </p>
      </div>

      <div className="mt-4 flex max-h-[220px] min-w-0 flex-wrap gap-2 overflow-y-auto pr-1">
        {options.map((option) => (
          <FilterChip
            key={option.id}
            label={option.label}
            selected={selectedValues.includes(option.id)}
            onClick={() => onToggle(option.id)}
          />
        ))}

        {options.length === 0 ? (
          <p className="text-[14px] font-semibold text-[#94a3b8]">
            No hay opciones disponibles.
          </p>
        ) : null}
      </div>
    </section>
  );
}

export default function DirectoryToolbar({
  searchValue,
  categoryValues,
  tierValues,
  sortDirection,
  categories,
  tiers,
  onSearchChange,
  onCategoryToggle,
  onTierToggle,
  onSortDirectionToggle,
  onClearFilters,
}: DirectoryToolbarProps) {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    onSearchChange(event.target.value);
  }

  function handleFilterPanelOpen() {
    setIsFilterPanelOpen(true);
  }

  function handleFilterPanelClose() {
    setIsFilterPanelOpen(false);
  }

  function handleSortDirectionToggle() {
    onSortDirectionToggle();
  }

  function handleClearFilters() {
    onClearFilters();
  }

  const sortDirectionLabel = sortDirection === 'asc' ? 'A-Z' : 'Z-A';
  const sortDirectionAriaLabel =
    sortDirection === 'asc'
      ? 'Cambiar orden a descendente'
      : 'Cambiar orden a ascendente';

  const filterCategories = categories.filter((category) => category.id !== 'all');
  const activeFilterCount =
    categoryValues.length + tierValues.length + (sortDirection !== 'asc' ? 1 : 0);

  return (
    <>
      <section className="rounded-[28px] border border-[#e7edf5] bg-white p-6! shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
        <div className="grid grid-cols-1 gap-4.5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
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
              placeholder="Buscar por empresa, ciudad, rubro, descripción o tipo"
              className="block h-13.5 w-full min-w-0 rounded-[18px] border border-[#dbe4ef] bg-white px-4.5! text-[16px] leading-none text-[#334155] shadow-none outline-none placeholder:text-[#94a3b8] focus:outline-none focus:ring-4 focus:ring-sky-100"
            />
          </div>

          <button
            type="button"
            onClick={handleFilterPanelOpen}
            className="flex h-13.5 items-center justify-center gap-2 rounded-[18px] border border-[#dbe4ef] bg-white px-5 text-[15px] font-bold leading-none text-[#17304f] shadow-none outline-none transition hover:bg-[#eef6ff] focus:outline-none focus:ring-4 focus:ring-sky-100"
          >
            <AdjustmentsHorizontalIcon
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-[#64748b]"
            />
            <span>Filtros</span>
            {activeFilterCount > 0 ? (
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#1390ff] px-2 text-[12px] font-bold text-white">
                {activeFilterCount}
              </span>
            ) : null}
          </button>
        </div>
      </section>

      <Dialog
        open={isFilterPanelOpen}
        onClose={handleFilterPanelClose}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-[#0f172a]/30 backdrop-blur-[6px]" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="max-h-[calc(100vh-32px)] w-full max-w-[920px] overflow-hidden rounded-[34px] border border-[#e5edf7] bg-white shadow-[0_28px_90px_rgba(15,23,42,0.22)]">
            <div className="flex items-start justify-between gap-6 border-b border-[#e5edf7] px-7 py-6">
              <div className="min-w-0">
                <DialogTitle className="text-[34px] font-bold leading-none tracking-[-0.04em] text-[#12284b]">
                  Filtros
                </DialogTitle>
                <p className="mt-2 max-w-[620px] text-[15px] leading-[1.55] text-[#64748b]">
                  Selecciona una o varias categorías y tipos. Los resultados
                  deben coincidir con al menos una opción de cada grupo activo.
                </p>
              </div>

              <button
                type="button"
                aria-label="Cerrar filtros"
                onClick={handleFilterPanelClose}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#dbe4ef] text-[#64748b] transition hover:bg-[#eef6ff] focus:outline-none focus:ring-4 focus:ring-sky-100"
              >
                <XMarkIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[calc(100vh-220px)] overflow-y-auto px-7 py-6">
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.9fr)]">
                <FilterGroup
                  title="Categorías"
                  description="Rubros públicos asociados a las empresas."
                  options={filterCategories}
                  selectedValues={categoryValues}
                  onToggle={onCategoryToggle}
                />

                <div className="grid gap-5">
                  <FilterGroup
                    title="Tipos"
                    description="Selecciona uno o varios niveles."
                    options={tiers}
                    selectedValues={tierValues}
                    onToggle={onTierToggle}
                  />

                  <section className="rounded-[24px] border border-[#e5edf7] bg-[#f8fbff] p-5">
                    <h3 className="text-[18px] font-bold leading-tight text-[#12284b]">
                      Orden
                    </h3>
                    <p className="mt-1 text-[13px] leading-[1.5] text-[#64748b]">
                      Cambia la dirección del orden alfabético.
                    </p>

                    <button
                      type="button"
                      aria-label={sortDirectionAriaLabel}
                      onClick={handleSortDirectionToggle}
                      className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-[18px] border border-[#dbe4ef] bg-white px-4 text-[15px] font-bold leading-none text-[#17304f] shadow-none outline-none transition hover:bg-[#eef6ff] focus:outline-none focus:ring-4 focus:ring-sky-100"
                    >
                      <ArrowsUpDownIcon
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0 text-[#64748b]"
                      />
                      <span>{sortDirectionLabel}</span>
                    </button>
                  </section>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-[#e5edf7] bg-white px-7 py-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleClearFilters}
                className="h-12 rounded-[16px] border border-[#dbe4ef] px-5 text-[14px] font-bold text-[#334155] transition hover:bg-[#eef6ff] focus:outline-none focus:ring-4 focus:ring-sky-100"
              >
                Limpiar filtros
              </button>

              <button
                type="button"
                onClick={handleFilterPanelClose}
                className="h-12 rounded-[16px] bg-[#12284b] px-5 text-[14px] font-bold text-white transition hover:bg-[#1d3b6d] focus:outline-none focus:ring-4 focus:ring-sky-100"
              >
                Aplicar filtros
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}