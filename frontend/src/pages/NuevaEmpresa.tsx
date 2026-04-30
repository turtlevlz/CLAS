import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import client from '../api/client';

export default function NuevaEmpresa() {
  const navigate = useNavigate();

  const [membresias, setMembresias] = useState([]);
  const [organizaciones, setOrganizaciones] = useState([]);
  const [formData, setFormData] = useState({
    nombre_comercial: '',
    rfc: '',
    correo_electronico: '',
    telefono: '',
    membresia_id: '',
    tipo_organizacion_id: '',
    ciudad: '',
    domicilio_completo: '',
    giro: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.toString());
    });
    if (logo) data.append('logo', logo);

    try {
      await client.post('/empresas', data);
      alert("Empresa creada exitosamente");
      navigate('/admin');
    } catch (err: any) {
      alert(`Error: ${err.response?.data?.message || 'Error al crear empresa'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 py-12 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Registrar Empresa</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre Comercial</label>
                <input type="text" required onChange={e => setFormData({...formData, nombre_comercial: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">RFC</label>
                <input type="text" required onChange={e => setFormData({...formData, rfc: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Membresía</label>
                <select required onChange={e => setFormData({...formData, membresia_id: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 mt-1">
                  <option value="">Seleccionar...</option>
                  {membresias.map((m: any) => <option key={m.id_membresia} value={m.id_membresia}>{m.nombre_membresia}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo de Organización</label>
                <select required onChange={e => setFormData({...formData, tipo_organizacion_id: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 mt-1">
                  <option value="">Seleccionar...</option>
                  {organizaciones.map((o: any) => <option key={o.id_tipo} value={o.id_tipo}>{o.nombre_tipo}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Logo</label>
              <input type="file" accept="image/*" onChange={e => setLogo(e.target.files?.[0] || null)} className="w-full mt-1" />
            </div>

            <div className="flex justify-end gap-4">
              <button type="button" onClick={() => navigate('/admin')} className="px-6 py-2 bg-gray-200 rounded-lg">Cancelar</button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-primary text-white rounded-lg">
                {loading ? 'Guardando...' : 'Crear Empresa'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
