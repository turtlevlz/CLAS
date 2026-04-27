import type { DirectoryCompany } from '../types/directory';

export function sortCompaniesByName(
  companies: DirectoryCompany[],
): DirectoryCompany[] {
  return [...companies].sort((firstCompany, secondCompany) =>
    firstCompany.name.localeCompare(secondCompany.name, 'es', {
      sensitivity: 'base',
    }),
  );
}