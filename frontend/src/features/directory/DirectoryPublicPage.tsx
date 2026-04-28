import { useMemo, useState } from 'react';

import CompanyCard from './components/CompanyCard';
import DirectoryToolbar from './components/DirectoryToolbar';
import EmptyState from './components/EmptyState';
import ResultsSummary from './components/ResultsSummary';
import { mockCategories } from './data/mockCategories';
import { mockCompanies } from './data/mockCompanies';
import type {
  DirectoryFilters,
  DirectorySortDirection,
} from './types/directory';
import { filterCompanies } from './utils/filterCompanies';
import { sortCompaniesByName } from './utils/sortCompaniesByName';

const initialFilters: DirectoryFilters = {
  search: '',
  categoryId: 'all',
};

export default function DirectoryPublicPage() {
  const [filters, setFilters] = useState<DirectoryFilters>(initialFilters);
  const [sortDirection, setSortDirection] =
    useState<DirectorySortDirection>('asc');

  const filteredCompanies = useMemo(() => {
    const companiesMatchingFilters = filterCompanies(mockCompanies, filters);

    return sortCompaniesByName(companiesMatchingFilters, sortDirection);
  }, [filters, sortDirection]);

  const totalCompanies = mockCompanies.length;
  const visibleCompanies = filteredCompanies.length;

  function handleSearchChange(value: string) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      search: value,
    }));
  }

  function handleCategoryChange(value: string) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      categoryId: value,
    }));
  }

  function handleSortDirectionToggle() {
    setSortDirection((currentDirection) => {
      if (currentDirection === 'asc') {
        return 'desc';
      }

      return 'asc';
    });
  }

  return (
    <main className="overflow-x-clip bg-[radial-gradient(circle_at_top_right,rgba(17,129,229,0.14),transparent_38%),#ffffff]">
      <div className="relative mx-auto w-[min(1180px,calc(100%-48px))] pb-24 pt-6">

        <section className="pt-5!">
          <span className="inline-flex items-center rounded-full bg-[#e5effa] px-4.5! py-2! text-[13px] font-bold leading-none tracking-[0.08em] text-[#213854] uppercase">
            CLAS SONORA
          </span>

          <h1 className="mt-5.5! max-w-162.5 text-[clamp(72px,7vw,88px)]! font-bold leading-[0.92] tracking-tighter text-[#12284b]">
            Directorio de
            <br />
            Miembros
          </h1>

          <p className="mt-5.5! max-w-215 text-[18px] leading-[1.65] text-[#64748b]">
            Explora la red de empresas del Cluster Automotriz de Sonora.
          </p>
        </section>

        <section className="mt-9.5!">
          <DirectoryToolbar
            searchValue={filters.search}
            categoryValue={filters.categoryId}
            sortDirection={sortDirection}
            categories={mockCategories}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onSortDirectionToggle={handleSortDirectionToggle}
          />
        </section>

        <section className="mt-6.5!">
          <ResultsSummary
            visibleCount={visibleCompanies}
            totalCount={totalCompanies}
          />
        </section>

        {visibleCompanies === 0 ? (
          <section className="mt-7!">
            <EmptyState
              title="No encontramos miembros con esos filtros"
              description="Ajusta la búsqueda o selecciona otra categoría para ver más resultados."
            />
          </section>
        ) : (
          <section className="mt-7! grid! grid-cols-1! gap-6! md:grid-cols-2! xl:grid-cols-3!">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
