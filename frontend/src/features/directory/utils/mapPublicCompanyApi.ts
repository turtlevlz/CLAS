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
  const membresia = company.Membresia ?? company.membresia;
  const tipoOrganizacion =
    company.TipoOrganizacion ?? company.tipoOrganizacion;
  const rubros = company.Rubros ?? company.rubros ?? [];
  const certificaciones =
    company.Certificaciones ?? company.certificaciones ?? [];
  const contactos = company.Contactos ?? company.contactos ?? [];

  const categoryLabel = tipoOrganizacion?.nombre_tipo ?? 'Sin categoría';
  const specialties = rubros.map((rubro) => rubro.nombre_rubro);

  return {
    id: company.id_empresa,
    name: company.nombre_comercial,
    tierLabel: mapTierLabel(membresia?.nombre_membresia),
    shortDescription: company.descripcion ?? '',
    city: company.ciudad ?? 'Sonora',
    state: 'Sonora',
    publicEmail: '',
    publicPhone: '',
    specialties,
    employeeRange: company.rango_empleados ?? '',
    categoryId: createCategoryId(categoryLabel),
    categoryLabel,
    logoUrl: company.logo ?? undefined,
    detail: {
      displayName: company.razon_social ?? company.nombre_comercial,
      address: company.domicilio_completo ?? '',
      businessLine: company.giro ?? categoryLabel,
      about: company.descripcion ?? '',
      foundedYear:
        company.anio_fundacion !== undefined && company.anio_fundacion !== null
          ? String(company.anio_fundacion)
          : '',
      website: company.sitio_web ?? '',
      certifications: certificaciones.map(
        (certification) => certification.nombre_certificacion,
      ),
      industries: [],
      productsAndServices: [],
      manufacturingCapabilities: [],
      supplierNeeds: [],
      contacts: contactos.map((contact) => {
        const contactFunction = contact.FuncionContacto ?? contact.funcion;

        return {
          name: contact.nombre_completo ?? '',
          role: contact.puesto ?? contactFunction?.nombre_funcion ?? '',
          email: contact.correo ?? '',
          phone: contact.telefono_celular ?? '',
        };
      }),
    },
  };
}
