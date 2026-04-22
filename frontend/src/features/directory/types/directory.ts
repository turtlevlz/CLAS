export type DirectoryCategory = {
  id: string;
  label: string;
};

export type DirectoryCompanyTier =
  | 'Tier 1'
  | 'Tier 2'
  | 'Tier 3'
  | 'OEM'
  | 'Gobierno'
  | 'Otro';

export type DirectoryCompany = {
  id: number;
  name: string;
  tierLabel: DirectoryCompanyTier;
  shortDescription: string;
  city: string;
  state: string;
  publicEmail: string;
  publicPhone: string;
  specialties: string[];
  employeeRange: string;
  categoryId: string;
  categoryLabel: string;
  logoUrl?: string;
};

export type DirectoryFilters = {
  search: string;
  categoryId: string;
};
