import { useEffect, useMemo, useState } from 'react';

import CompanyCard from './components/CompanyCard';
import DirectoryToolbar from './components/DirectoryToolbar';
import EmptyState from './components/EmptyState';
import ResultsSummary from './components/ResultsSummary';
import { mockCategories } from './data/mockCategories';
import type {
  DirectoryCompany,
  DirectoryFilters,
  DirectorySortDirection,
} from './types/directory';
import { filterCompanies } from './utils/filterCompanies';
import { sortCompaniesByName } from './utils/sortCompaniesByName';
import DirectoryPagination from './components/DirectoryPagination';
import { getPublicCompanies } from './api/directoryApi';
import { mapPublicCompanyApi } from './utils/mapPublicCompanyApi';

const initialFilters: DirectoryFilters = {
  search: '',
  categoryId: 'all',
};

const companiesPerPage = 9;

export default function DirectoryPublicPage() {
  const [filters, setFilters] = useState<DirectoryFilters>(initialFilters);
  const [sortDirection, setSortDirection] =
    useState<DirectorySortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [companies, setCompanies] = useState<DirectoryCompany[]>([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [companiesError, setCompaniesError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadCompanies() {
      try {
        setIsLoadingCompanies(true);
        setCompaniesError('');

        const publicCompanies = await getPublicCompanies();
        const mappedCompanies = publicCompanies.map(mapPublicCompanyApi);

        if (!isMounted) {
          return;
        }

        setCompanies(mappedCompanies);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setCompanies([]);
        setCompaniesError(
          'No se pudo conectar con el backend. Intenta de nuevo mas tarde.',
        );
      } finally {
        if (isMounted) {
          setIsLoadingCompanies(false);
        }
      }
    }

    loadCompanies();

    return () => {
      isMounted = false;
    };
  }, []);


  const filteredCompanies = useMemo(() => {
    const companiesMatchingFilters = filterCompanies(companies, filters);

    return sortCompaniesByName(companiesMatchingFilters, sortDirection);
  }, [companies, filters, sortDirection]);

  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * companiesPerPage;
    const endIndex = startIndex + companiesPerPage;

    return filteredCompanies.slice(startIndex, endIndex);
  }, [currentPage, filteredCompanies]);


  const totalCompanies = companies.length;
  const visibleCompanies = filteredCompanies.length;
  const hasCompanies = visibleCompanies > 0;

  function handleSearchChange(value: string) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      search: value,
    }));
    setCurrentPage(1);
  }

  function handleCategoryChange(value: string) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      categoryId: value,
    }));
    setCurrentPage(1);
  }

  function handleSortDirectionToggle() {
    setSortDirection((currentDirection) => {
      if (currentDirection === 'asc') {
        return 'desc';
      }

      return 'asc';
    });

    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
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

        {isLoadingCompanies ? (
          <p className="mt-4! text-[15px] font-semibold text-[#64748b]">
            Cargando empresas...
          </p>
        ) : null}

        {companiesError ? (
          <p className="mt-4! rounded-[16px] border border-[#fde68a] bg-[#fffbeb] px-4! py-3! text-[14px] font-semibold text-[#92400e]">
            {companiesError}
          </p>
        ) : null}

        <section className="mt-6.5!">
          <ResultsSummary
            visibleCount={visibleCompanies}
            totalCount={totalCompanies}
          />
        </section>

        {!hasCompanies && !companiesError ? (
          <section className="mt-7!">
            <EmptyState
              title="No encontramos miembros con esos filtros"
              description="Ajusta la búsqueda o selecciona otra categoría para ver más resultados."
            />
          </section>
        ) : null}

        {hasCompanies ? (
          <>
            <section className="mt-7! grid! grid-cols-1! gap-6! md:grid-cols-2! xl:grid-cols-3!">
              {paginatedCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </section>

            <DirectoryPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : null}
      </div>
    </main>
  );
}
