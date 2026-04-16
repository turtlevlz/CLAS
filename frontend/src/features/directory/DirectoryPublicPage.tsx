import { useMemo, useState } from 'react';
import CompanyCard from './components/CompanyCard';
import DirectoryToolbar from './components/DirectoryToolbar';
import EmptyState from './components/EmptyState';
import ResultsSummary from './components/ResultsSummary';
import { mockCategories } from './data/mockCategories';
import { mockCompanies } from './data/mockCompanies';
import type { DirectoryFilters } from './types/directory';
import { filterCompanies } from './utils/filterCompanies';
import './directory.css';

const initialFilters: DirectoryFilters = {
  search: '',
  categoryId: 'all',
};

export default function DirectoryPublicPage() {
  const [filters, setFilters] = useState<DirectoryFilters>(initialFilters);

  const filteredCompanies = useMemo(() => {
    return filterCompanies(mockCompanies, filters);
  }, [filters]);

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

  const totalCompanies = mockCompanies.length;
  const visibleCompanies = filteredCompanies.length;

  return (
    <main className="directory-page">
      <section className="directory-hero">
        <div className="directory-shell">
          <p className="directory-hero__eyebrow">CLAS Sonora</p>
          <h1 className="directory-hero__title">Directorio de Miembros</h1>
          <p className="directory-hero__subtitle">
            Explora la red de empresas del Cluster Automotriz de Sonora.
            Actualmente hay <strong>{totalCompanies}</strong> empresas visibles
            en esta versión pública.
          </p>
        </div>
      </section>

      <section className="directory-content">
        <div className="directory-shell">
          <DirectoryToolbar
            searchValue={filters.search}
            categoryValue={filters.categoryId}
            categories={mockCategories}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
          />

          <ResultsSummary
            visibleCount={visibleCompanies}
            totalCount={totalCompanies}
          />

          {visibleCompanies === 0 ? (
            <EmptyState
              title="No encontramos miembros con esos filtros"
              description="Ajusta la búsqueda o selecciona otra categoría para ver más resultados."
            />
          ) : (
            <div className="directory-grid">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
