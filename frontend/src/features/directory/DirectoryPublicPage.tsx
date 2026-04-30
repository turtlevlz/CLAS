import { useEffect, useMemo, useState } from 'react';

import client from '../../api/client';
import CompanyCard from './components/CompanyCard';
import DirectoryPagination from './components/DirectoryPagination';
import DirectoryToolbar from './components/DirectoryToolbar';
import EmptyState from './components/EmptyState';
import ResultsSummary from './components/ResultsSummary';
import type {
  DirectoryCategory,
  DirectoryCompany,
  DirectoryCompanyTier,
  DirectoryFilters,
  DirectorySortDirection,
} from './types/directory';
import { filterCompanies } from './utils/filterCompanies';
import { sortCompaniesByName } from './utils/sortCompaniesByName';

const TIER_MAP: Record<string, DirectoryCompanyTier> = {
  'OEM': 'OEM',
  'Tier 1': 'Tier 1',
  'Tier 2': 'Tier 2',
  'Tier 3': 'Tier 3',
  'Gobierno': 'Gobierno',
};

function mapEmpresa(e: any): DirectoryCompany {
  const rubros = e.Rubros || e.rubros || [];
  const tipoOrganizacion = e.TipoOrganizacion || e.tipoOrganizacion || e.tipo_organizacion;
  const specialties = rubros.map((r: any) => r.nombre_rubro).filter(Boolean);

  return {
    id: e.id_empresa,
    name: e.nombre_comercial,
    tierLabel: TIER_MAP[tipoOrganizacion?.nombre_tipo] ?? 'Otro',
    shortDescription: e.giro || '',
    city: e.ciudad || '',
    state: 'Sonora',
    publicEmail: '',
    publicPhone: '',
    specialties,
    employeeRange: '',
    categoryId: String(tipoOrganizacion?.id_tipo || ''),
    categoryLabel: tipoOrganizacion?.nombre_tipo || '',
    logoUrl: e.logo || e.logo_url || undefined,
    detail: {
      address: e.domicilio_completo || '',
      businessLine: e.giro || '',
      about: '',
      foundedYear: '',
      website: e.sitio_web || '',
      certifications: [],
      industries: [],
      productsAndServices: [],
      manufacturingCapabilities: [],
      supplierNeeds: [],
      contacts: [],
    },
  };
}

const initialFilters: DirectoryFilters = {
  search: '',
  categoryId: 'all',
};

const companiesPerPage = 9;

export default function DirectoryPublicPage() {
  const [companies, setCompanies] = useState<DirectoryCompany[]>([]);
  const [categories, setCategories] = useState<DirectoryCategory[]>([
    { id: 'all', label: 'Todas las categorías' },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<DirectoryFilters>(initialFilters);
  const [sortDirection, setSortDirection] = useState<DirectorySortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resEmpresas = await client.get('/empresas/public');

        const empresasData = resEmpresas.data.data ?? resEmpresas.data;
        const mappedCompanies = empresasData.map(mapEmpresa);
        setCompanies(mappedCompanies);

        const categoryMap = new Map<string, string>();
        mappedCompanies.forEach((company: DirectoryCompany) => {
          if (company.categoryId && company.categoryLabel) {
            categoryMap.set(company.categoryId, company.categoryLabel);
          }
        });
        const categoriesFromCompanies = Array.from(categoryMap.entries()).map(([id, label]) => ({ id, label }));
        setCategories([{ id: 'all', label: 'Todas las categorías' }, ...categoriesFromCompanies]);
      } catch (e) {
        setError('No se pudo cargar el directorio. Intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  if (loading) {
    return (
      <main className="overflow-x-clip bg-[radial-gradient(circle_at_top_right,rgba(17,129,229,0.14),transparent_38%),#ffffff]">
        <div className="relative mx-auto w-[min(1180px,calc(100%-48px))] pb-24 pt-6">
          <p className="mt-20 text-center text-gray-400">Cargando directorio...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="overflow-x-clip bg-[radial-gradient(circle_at_top_right,rgba(17,129,229,0.14),transparent_38%),#ffffff]">
        <div className="relative mx-auto w-[min(1180px,calc(100%-48px))] pb-24 pt-6">
          <p className="mt-20 text-center text-red-400">{error}</p>
        </div>
      </main>
    );
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
            categories={categories}
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

        {!hasCompanies ? (
          <section className="mt-7!">
            <EmptyState
              title="No encontramos miembros con esos filtros"
              description="Ajusta la búsqueda o selecciona otra categoría para ver más resultados."
            />
          </section>
        ) : (
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
        )}
      </div>
    </main>
  );
}
