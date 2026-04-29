import type {
  DirectoryCompany,
  DirectorySortDirection,
} from '../types/directory';

export function sortCompaniesByName(
  companies: DirectoryCompany[],
  direction: DirectorySortDirection,
): DirectoryCompany[] {
  const sortedCompanies = [...companies].sort((firstCompany, secondCompany) =>
    firstCompany.name.localeCompare(secondCompany.name, 'es', {
      sensitivity: 'base',
    }),
  );

  if (direction === 'desc') {
    return sortedCompanies.reverse();
  }

  return sortedCompanies;
}
