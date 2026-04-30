import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import client from '../api/client';

type OptionItem = Record<string, any>;

export default function NuevaEmpresa() {
  const navigate = useNavigate();

  const [membresias, setMembresias] = useState<OptionItem[]>([]);
  const [organizaciones, setOrganizaciones] = useState<OptionItem[]>([]);
  const [formData, setFormData] = useState({
    nombre_comercial: '',
    razon_social: '',
    rfc: '',
    correo_electronico: '',
    telefono: '',
    sitio_web: '',
    membresia_id: '',
    tipo_organizacion_id: '',
    ciudad: '',
    domicilio_completo: '',
    giro: '',
    descripcion: '',
    anio_fundacion: '',
    rango_empleados: '',
    fabrica_para_automotriz: false,
  });
  const [logo, setLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, String(value));
    });
    if (logo) data.append('logo', logo);

    try {
      await client.post('/empresas', data);
      navigate('/admin');
    } catch (err: any) {
      alert(`Error: ${err.response?.data?.message || 'Error al crear empresa'}`);
    } finally {
      setLoading(false);
    }
  };

  const field = (
    label: string,
    key: keyof typeof formData,
    options: { type?: string; required?: boolean } = {},
  ) => (
    <div className="min-w-0">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={options.type || 'text'}
        required={options.required}
        value={String(formData[key])}
        onChange={e => updateField(key, e.target.value)}
        className="w-full min-w-0 border border-gray-300 rounded-lg p-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-primary"
      />
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
            <button type="button" onClick={() => navigate('/admin')} className="px-5 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-600">
              Volver
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  <label className="block text-sm font-medium text-gray-700">Membresía</label>
                  <select
                    required
                    value={formData.membresia_id}
                    onChange={e => updateField('membresia_id', e.target.value)}
                    className="w-full min-w-0 border border-gray-300 rounded-lg p-2 mt-1 text-sm bg-white outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Seleccionar...</option>
                    {membresias.map((m) => (
                      <option key={m.id_membresia} value={m.id_membresia}>{m.nombre_membresia}</option>
                    ))}
                  </select>
                </div>

                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-700">Tipo de Organización</label>
                  <select
                    required
                    value={formData.tipo_organizacion_id}
                    onChange={e => updateField('tipo_organizacion_id', e.target.value)}
                    className="w-full min-w-0 border border-gray-300 rounded-lg p-2 mt-1 text-sm bg-white outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Seleccionar...</option>
                    {organizaciones.map((o) => (
                      <option key={o.id_tipo} value={o.id_tipo}>{o.nombre_tipo}</option>
                    ))}
                  </select>
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
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.fabrica_para_automotriz}
                  onChange={e => updateField('fabrica_para_automotriz', e.target.checked)}
                />
                Fabrica para automotriz
              </label>

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
              <button type="button" onClick={() => navigate('/admin')} className="px-6 py-2 bg-gray-200 rounded-lg font-semibold text-gray-700">
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
