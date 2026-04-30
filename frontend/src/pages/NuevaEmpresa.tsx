import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import client from '../api/client';
import { useToast } from '../components/Toast';

type OptionItem = Record<string, any>;

// Estándares mexicanos SAT/LADA
const RFC_REGEX    = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/i;
const EMAIL_REGEX  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX  = /^[\d\s\-()+]{10,15}$/;
const URL_REGEX    = /^(https?:\/\/)?(www\.)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i;
const CURRENT_YEAR = new Date().getFullYear();

export default function NuevaEmpresa() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [membresias, setMembresias]       = useState<OptionItem[]>([]);
  const [organizaciones, setOrganizaciones] = useState<OptionItem[]>([]);
  const [formData, setFormData] = useState({
    nombre_comercial:      '',
    razon_social:          '',
    rfc:                   '',
    correo_electronico:    '',
    telefono:              '',
    sitio_web:             '',
    membresia_id:          '',
    tipo_organizacion_id:  '',
    ciudad:                '',
    domicilio_completo:    '',
    giro:                  '',
    descripcion:           '',
    anio_fundacion:        '',
    rango_empleados:       '',
    fabrica_para_automotriz: false,
  });
  const [logo, setLogo]             = useState<File | null>(null);
  const [loading, setLoading]       = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resMem, resOrg] = await Promise.all([
          client.get('/membresias'),
          client.get('/organizaciones'),
        ]);
        setMembresias(resMem.data);
        setOrganizaciones(resOrg.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const updateField = (key: keyof typeof formData, value: string | boolean) => {
    setFormData((current) => ({ ...current, [key]: value }));
    // Limpiar error al editar
    if (fieldErrors[key]) setFieldErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validateField = (key: string, value: string): string => {
    switch (key) {
      case 'nombre_comercial':
        if (!value.trim()) return 'El nombre comercial es obligatorio';
        break;
      case 'rfc':
        if (!value.trim()) return 'El RFC es obligatorio';
        if (!RFC_REGEX.test(value.trim()))
          return 'RFC inválido. Ej: ABC123456DE1 (persona moral) o ABCD123456DE1 (persona física)';
        break;
      case 'correo_electronico':
        if (!value.trim()) return 'El correo electrónico es obligatorio';
        if (!EMAIL_REGEX.test(value.trim())) return 'Correo electrónico inválido';
        break;
      case 'telefono':
        if (value && !PHONE_REGEX.test(value.trim()))
          return 'Teléfono inválido (incluye lada, ej: 6621234567)';
        break;
      case 'sitio_web':
        if (value && !URL_REGEX.test(value.trim()))
          return 'URL inválida. Ej: https://empresa.com';
        break;
      case 'anio_fundacion':
        if (value) {
          const year = Number(value);
          if (isNaN(year) || year < 1800 || year > CURRENT_YEAR)
            return `Año inválido (entre 1800 y ${CURRENT_YEAR})`;
        }
        break;
    }
    return '';
  };

  const handleBlur = (key: string, value: string) => {
    const error = validateField(key, value);
    if (error) setFieldErrors((prev) => ({ ...prev, [key]: error }));
  };

  const validateAll = (): boolean => {
    const errors: Record<string, string> = {};
    const fieldsToCheck = ['nombre_comercial', 'rfc', 'correo_electronico', 'telefono', 'sitio_web', 'anio_fundacion'];

    fieldsToCheck.forEach((key) => {
      const value = String(formData[key as keyof typeof formData]);
      const error = validateField(key, value);
      if (error) errors[key] = error;
    });

    if (!formData.membresia_id)         errors.membresia_id         = 'Selecciona una membresía';
    if (!formData.tipo_organizacion_id) errors.tipo_organizacion_id = 'Selecciona un tipo de organización';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, String(value));
    });
    if (logo) data.append('logo', logo);

    try {
      await client.post('/empresas', data);
      navigate('/admin', { state: { tab: 'empresas' } });
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Error al crear empresa');
    } finally {
      setLoading(false);
    }
  };

  // Clases dinámicas según error
  const inputCls = (key: string) =>
    `w-full min-w-0 border rounded-lg p-2 mt-1 text-sm outline-none focus:ring-2 ${
      fieldErrors[key]
        ? 'border-red-400 bg-red-50 focus:ring-red-300'
        : 'border-gray-300 focus:ring-primary'
    }`;

  const field = (
    label: string,
    key: keyof typeof formData,
    options: { type?: string; required?: boolean } = {},
  ) => (
    <div className="min-w-0">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {options.required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={options.type || 'text'}
        value={String(formData[key])}
        onChange={e => updateField(key, e.target.value)}
        onBlur={e => handleBlur(String(key), e.target.value)}
        className={inputCls(String(key))}
      />
      {fieldErrors[String(key)] && (
        <p className="text-xs text-red-500 mt-1">{fieldErrors[String(key)]}</p>
      )}
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 py-12 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Registrar Empresa</h1>
              <p className="mt-1 text-sm text-gray-500">Completa los datos obligatorios para crear la ficha de empresa.</p>
            </div>
            <button type="button" onClick={() => navigate('/admin', { state: { tab: 'empresas' } })} className="px-5 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-600">
              Volver
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <p className="text-xs text-gray-400">
              Los campos marcados con <span className="text-red-500 font-semibold">*</span> son obligatorios.
            </p>
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Datos principales</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {field('Nombre Comercial', 'nombre_comercial', { required: true })}
                {field('Razón Social', 'razon_social')}
                {field('RFC', 'rfc', { required: true })}
                {field('Correo Electrónico', 'correo_electronico', { type: 'email', required: true })}
                {field('Teléfono', 'telefono')}
                {field('Sitio Web', 'sitio_web')}
                {field('Ciudad', 'ciudad')}
                {field('Giro', 'giro')}
                {field('Año de Fundación', 'anio_fundacion', { type: 'number' })}
                {field('Rango de Empleados', 'rango_empleados')}

                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-700">
                    Membresía<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <select
                    value={formData.membresia_id}
                    onChange={e => updateField('membresia_id', e.target.value)}
                    className="mt-1 h-11 w-full min-w-0 rounded-[16px] border border-[#dbe4ef] bg-white px-4 text-sm font-medium text-[#334155] shadow-none outline-none transition focus:outline-none focus:ring-4 focus:ring-sky-100"
                  >
                    <option value="">Seleccionar...</option>
                    {membresias.map((m) => (
                      <option key={m.id_membresia} value={m.id_membresia}>{m.nombre_membresia}</option>
                    ))}
                  </select>
                  {fieldErrors.membresia_id && (
                    <p className="text-xs text-red-500 mt-1">{fieldErrors.membresia_id}</p>
                  )}
                </div>

                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-700">
                    Tipo de Organización<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <select
                    value={formData.tipo_organizacion_id}
                    onChange={e => { updateField('tipo_organizacion_id', e.target.value); }}
                    className={inputCls('tipo_organizacion_id') + ' bg-white'}
                  >
                    <option value="">Seleccionar...</option>
                    {organizaciones.map((o) => (
                      <option key={o.id_tipo} value={o.id_tipo}>{o.nombre_tipo}</option>
                    ))}
                  </select>
                  {fieldErrors.tipo_organizacion_id && (
                    <p className="text-xs text-red-500 mt-1">{fieldErrors.tipo_organizacion_id}</p>
                  )}
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-700">Domicilio Completo</label>
                <textarea
                  value={formData.domicilio_completo}
                  onChange={e => updateField('domicilio_completo', e.target.value)}
                  rows={3}
                  className="w-full min-w-0 border border-gray-300 rounded-lg p-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-700">Descripción / Acerca de</label>
                <textarea
                  value={formData.descripcion}
                  onChange={e => updateField('descripcion', e.target.value)}
                  rows={3}
                  className="w-full min-w-0 border border-gray-300 rounded-lg p-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
              <div className="rounded-xl border border-dashed border-blue-300 bg-blue-50 p-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">Logo</label>
                <label className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90">
                  Seleccionar logo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setLogo(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
                <span className="ml-3 text-sm font-medium text-gray-600 break-all">
                  {logo ? logo.name : 'Ningún archivo seleccionado'}
                </span>
              </div>
            </section>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button type="button" onClick={() => navigate('/admin', { state: { tab: 'empresas' } })} className="px-6 py-2 bg-gray-200 rounded-lg font-semibold text-gray-700">
                Cancelar
              </button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-primary text-white rounded-lg font-semibold disabled:opacity-60">
                {loading ? 'Guardando...' : 'Registrar empresa'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
