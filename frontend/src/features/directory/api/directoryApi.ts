import { API_BASE_URL } from '../../../api/config';

export type PublicCompanyApi = {
  id_empresa: number;
  nombre_comercial: string;
  ciudad?: string | null;
  descripcion?: string | null;
  logo?: string | null;
  Membresia?: {
    nombre_membresia: string;
  } | null;
  TipoOrganizacion?: {
    nombre_tipo: string;
  } | null;
  Rubros?: {
    nombre_rubro: string;
  }[];
};

type PublicCompaniesResponse = {
  total: number;
  data: PublicCompanyApi[];
};

export async function getPublicCompanies(): Promise<PublicCompanyApi[]> {
  const response = await fetch(`${API_BASE_URL}/empresas/public`);

  if (!response.ok) {
    throw new Error('No se pudo cargar el directorio de empresas');
  }

  const data = (await response.json()) as PublicCompaniesResponse;

  return data.data;
}

export async function getPublicCompanyById(
  id: number,
): Promise<PublicCompanyApi> {
  const response = await fetch(`${API_BASE_URL}/empresas/public/${id}`);

  if (!response.ok) {
    throw new Error('No se pudo cargar el detalle de la empresa');
  }

  return (await response.json()) as PublicCompanyApi;
}