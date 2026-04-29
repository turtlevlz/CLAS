import type { PublicCompanyApi } from '../api/directoryApi';
import type {
  DirectoryCompany,
  DirectoryCompanyTier,
} from '../types/directory';

function mapTierLabel(value?: string | null): DirectoryCompanyTier {
  if (value === 'Tier 1') {
    return 'Tier 1';
  }

  if (value === 'Tier 2') {
    return 'Tier 2';
  }

  if (value === 'OEM') {
    return 'OEM';
  }

  return 'Otro';
}

function createCategoryId(label: string) {
  return label
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function mapPublicCompanyApi(
  company: PublicCompanyApi,
): DirectoryCompany {
  const categoryLabel =
    company.TipoOrganizacion?.nombre_tipo ?? 'Sin categoría';
  const specialties = company.Rubros?.map((rubro) => rubro.nombre_rubro) ?? [];

  return {
    id: company.id_empresa,
    name: company.nombre_comercial,
    tierLabel: mapTierLabel(company.Membresia?.nombre_membresia),
    shortDescription: company.descripcion ?? '',
    city: company.ciudad ?? 'Sonora',
    state: 'Sonora',
    publicEmail: '',
    publicPhone: '',
    specialties,
    employeeRange: '',
    categoryId: createCategoryId(categoryLabel),
    categoryLabel,
    logoUrl: company.logo ?? undefined,
    detail: {
      displayName: company.nombre_comercial,
      address: '',
      businessLine: categoryLabel,
      about: company.descripcion ?? '',
      foundedYear: '',
      website: '',
      certifications: [],
      industries: [],
      productsAndServices: [],
      manufacturingCapabilities: [],
      supplierNeeds: [],
      contacts: [],
    },
  };
}
