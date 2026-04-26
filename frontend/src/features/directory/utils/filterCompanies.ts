import type { DirectoryCompany, DirectoryFilters } from '../types/directory';

export function filterCompanies(
  companies: DirectoryCompany[],
  filters: DirectoryFilters,
): DirectoryCompany[] {
  const normalizedSearch = filters.search.trim().toLowerCase();
  const hasSearch = normalizedSearch.length > 0;
  const hasCategoryFilter =
    filters.categoryId.trim().length > 0 && filters.categoryId !== 'all';

  return companies.filter((company) => {
    const matchesCategory = hasCategoryFilter
      ? company.categoryId === filters.categoryId
      : true;

    if (!matchesCategory) {
      return false;
    }

    if (!hasSearch) {
      return true;
    }

    const searchableValues = [
      company.name,
      company.city,
      company.state,
      company.categoryLabel,
      ...company.specialties,
    ];

    return searchableValues.some((value) =>
      value.toLowerCase().includes(normalizedSearch),
    );
  });
}
