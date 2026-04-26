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

export type DirectoryContactPerson = {
  name: string;
  role: string;
  email: string;
  phone: string;
};

export type DirectoryCompanyDetail = {
  displayName?: string;
  address: string;
  businessLine: string;
  about: string;
  foundedYear: string;
  website: string;
  certifications: string[];
  industries: string[];
  productsAndServices: string[];
  manufacturingCapabilities: string[];
  supplierNeeds: string[];
  contacts: DirectoryContactPerson[];
};

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
  detail: DirectoryCompanyDetail;
};

export type DirectoryFilters = {
  search: string;
  categoryId: string;
};
