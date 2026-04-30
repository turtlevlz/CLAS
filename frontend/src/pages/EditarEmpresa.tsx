import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import client from '../api/client';

export default function EditarEmpresa() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nombre_comercial: '',
    correo_electronico: '',
    telefono: '',
    ciudad: '',
    domicilio_completo: '',
    giro: '',
    sitio_web: '',
  });

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const res = await client.get(`/empresas/${id}`);
        const data = res.data;
        setFormData({
          nombre_comercial: data.nombre_comercial || '',
          correo_electronico: data.correo_electronico || '',
          telefono: data.telefono || '',
          ciudad: data.ciudad || '',
          domicilio_completo: data.domicilio_completo || '',
          giro: data.giro || '',
          sitio_web: data.sitio_web || '',
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchEmpresa();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await client.patch(`/empresas/${id}`, formData);
      navigate('/admin');
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const field = (label: string, key: keyof typeof formData, type = 'text') => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={formData[key]}
        onChange={e => setFormData({ ...formData, [key]: e.target.value })}
        className="w-full border border-gray-300 rounded-lg p-2 mt-1"
      />
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 py-12 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Editar Empresa</h1>

          {loading ? (
            <p className="text-gray-400">Cargando...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {field('Nombre Comercial', 'nombre_comercial')}
                {field('Correo Electrónico', 'correo_electronico', 'email')}
                {field('Teléfono', 'telefono')}
                {field('Ciudad', 'ciudad')}
                {field('Sitio Web', 'sitio_web')}
                {field('Giro', 'giro')}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Domicilio Completo</label>
                <input
                  type="text"
                  value={formData.domicilio_completo}
                  onChange={e => setFormData({ ...formData, domicilio_completo: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => navigate('/admin')} className="px-6 py-2 bg-gray-200 rounded-lg">
                  Cancelar
                </button>
                <button type="submit" disabled={saving} className="px-6 py-2 bg-primary text-white rounded-lg">
                  {saving ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
