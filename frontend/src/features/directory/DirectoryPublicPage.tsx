import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import CompanyCard from './components/CompanyCard';
import DirectoryToolbar from './components/DirectoryToolbar';
import EmptyState from './components/EmptyState';
import ResultsSummary from './components/ResultsSummary';
import { mockCategories } from './data/mockCategories';
import { mockCompanies } from './data/mockCompanies';
import type { DirectoryFilters } from './types/directory';
import { filterCompanies } from './utils/filterCompanies';

const initialFilters: DirectoryFilters = {
  search: '',
  categoryId: 'all',
};

export default function DirectoryPublicPage() {
  const [filters, setFilters] = useState<DirectoryFilters>(initialFilters);

  const filteredCompanies = useMemo(() => {
    return filterCompanies(mockCompanies, filters);
  }, [filters]);

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

  return (
    <main className="!overflow-x-clip !bg-[radial-gradient(circle_at_top_right,_rgba(17,129,229,0.14),_transparent_38%),#ffffff]">
      <div className="!relative !mx-auto !w-[min(1180px,calc(100%-48px))] !pb-[96px] !pt-[48px]">
        <div className="!flex !justify-end">
          <Link
            to="/"
            aria-label="Cerrar directorio"
            className="!inline-flex !h-[60px] !w-[60px] !items-center !justify-center !rounded-full !border !border-[#e5e7eb] !bg-white !text-[38px] !font-light !leading-none !text-[#334155] !shadow-[0_8px_20px_rgba(15,23,42,0.08)] focus:!outline-none focus:!ring-4 focus:!ring-sky-100"
          >
            ×
          </Link>
        </div>

        <section className="!pt-[20px]">
          <span className="!inline-flex !items-center !rounded-full !bg-[#e5effa] !px-[18px] !py-[8px] !text-[13px] !font-bold !leading-none !tracking-[0.08em] !text-[#213854] !uppercase">
            CLAS SONORA
          </span>

          <h1 className="!mt-[22px] !max-w-[650px] !text-[clamp(72px,7vw,88px)] !font-bold !leading-[0.92] !tracking-[-0.05em] !text-[#12284b]">
            Directorio de
            <br />
            Miembros
          </h1>

          <p className="!mt-[22px] !max-w-[860px] !text-[18px] !leading-[1.65] !text-[#64748b]">
            Explora la red de empresas del Cluster Automotriz de Sonora. Actualmente hay{' '}
            <span className="!font-semibold !text-[#334155]">{totalCompanies} empresas</span>{' '}
            visibles en esta versión pública.
          </p>
        </section>

        <section className="!mt-[38px]">
          <DirectoryToolbar
            searchValue={filters.search}
            categoryValue={filters.categoryId}
            categories={mockCategories}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
          />
        </section>

        <section className="!mt-[26px]">
          <ResultsSummary
            visibleCount={visibleCompanies}
            totalCount={totalCompanies}
          />
        </section>

        {visibleCompanies === 0 ? (
          <section className="!mt-[28px]">
            <EmptyState
              title="No encontramos miembros con esos filtros"
              description="Ajusta la búsqueda o selecciona otra categoría para ver más resultados."
            />
          </section>
        ) : (
          <section className="!mt-[28px] !grid !grid-cols-1 !gap-[24px] md:!grid-cols-2 xl:!grid-cols-3">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
