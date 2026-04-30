import { api } from '../../../api/http';

export type PublicCompanyApi = {
  id_empresa: number;
  nombre_comercial: string;
  razon_social?: string | null;
  rfc?: string | null;
  correo_electronico?: string | null;
  telefono?: string | null;
  membresia_id?: number | null;
  tipo_organizacion_id?: number | null;
  activo?: boolean | null;
  fecha_registro?: string | null;
  ciudad?: string | null;
  domicilio_completo?: string | null;
  giro?: string | null;
  fabrica_para_automotriz?: boolean | null;
  descripcion?: string | null;
  anio_fundacion?: number | null;
  rango_empleados?: string | null;
  sitio_web?: string | null;
  logo?: string | null;

  Membresia?: { nombre_membresia: string } | null;
  membresia?: { nombre_membresia: string } | null;

  TipoOrganizacion?: { nombre_tipo: string } | null;
  tipoOrganizacion?: { nombre_tipo: string } | null;

  Rubros?: { nombre_rubro: string }[];
  rubros?: { nombre_rubro: string }[];

  Certificaciones?: { nombre_certificacion: string }[];
  certificaciones?: { nombre_certificacion: string }[];

  Contactos?: {
    nombre_completo?: string | null;
    puesto?: string | null;
    telefono_celular?: string | null;
    correo?: string | null;
    FuncionContacto?: { nombre_funcion: string } | null;
    funcion?: { nombre_funcion: string } | null;
  }[];

  contactos?: {
    nombre_completo?: string | null;
    puesto?: string | null;
    telefono_celular?: string | null;
    correo?: string | null;
    FuncionContacto?: { nombre_funcion: string } | null;
    funcion?: { nombre_funcion: string } | null;
  }[];
};

type PublicCompaniesResponse = {
  data: PublicCompanyApi[];
  total: number;
};

export async function getPublicCompanies(): Promise<PublicCompanyApi[]> {
  const response = await api.get<PublicCompaniesResponse>('/empresas/public');

  return response.data.data;
}

export async function getPublicCompanyById(
  id: number,
): Promise<PublicCompanyApi> {
  const response = await api.get<PublicCompanyApi>(`/empresas/public/${id}`);

  return response.data;
}

export async function getPrivateCompanyById(
  id: number,
): Promise<PublicCompanyApi> {
  const response = await api.get<PublicCompanyApi>(`/empresas/${id}`);

  return response.data;
}

export type RubroApi = {
  id_rubro: number;
  nombre_rubro: string;
};

export async function getRubros(): Promise<RubroApi[]> {
  const response = await api.get<RubroApi[]>('/rubros');
  return response.data;
}
