import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import client from '../api/client';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function MiCuenta() {
  const { usuarioActual } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    correo_electronico: '',
    contrasena: '',
  });

  useEffect(() => {
    async function loadUser() {
      if (!usuarioActual?.id_usuario || usuarioActual.rol_id !== 3) {
        return;
      }

      try {
        setLoading(true);
        setError('');
        const response = await client.get(`/usuarios/${usuarioActual.id_usuario}`);
        setFormData({
          nombre_usuario: response.data.nombre_usuario || '',
          correo_electronico: response.data.correo_electronico || '',
          contrasena: '',
        });
      } catch (loadError: any) {
        setError(loadError.response?.data?.message || 'No se pudo cargar tu cuenta');
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [usuarioActual?.id_usuario, usuarioActual?.rol_id]);

  if (!usuarioActual) {
    return <Navigate to="/login" />;
  }

  if (usuarioActual.rol_id !== 3) {
    return <Navigate to="/directorio" />;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    const payload: Record<string, string> = {
      nombre_usuario: formData.nombre_usuario,
      correo_electronico: formData.correo_electronico,
    };

    if (formData.contrasena.trim()) {
      payload.contrasena = formData.contrasena;
    }

    try {
      await client.patch(`/usuarios/${usuarioActual.id_usuario}`, payload);
      setFormData((current) => ({ ...current, contrasena: '' }));
      setMessage('Cuenta actualizada correctamente');
    } catch (saveError: any) {
      setError(saveError.response?.data?.message || 'No se pudo actualizar tu cuenta');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 px-6 py-12">
        <section className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">Mi cuenta</h1>
          <p className="mt-2 text-sm text-gray-500">
            Actualiza tus datos de acceso. La contraseña solo cambia si escribes una nueva.
          </p>

          {loading ? (
            <p className="mt-8 text-sm text-gray-400">Cargando...</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {message ? (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                  {message}
                </div>
              ) : null}

              {error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              ) : null}

              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  value={formData.nombre_usuario}
                  onChange={(event) => setFormData({ ...formData, nombre_usuario: event.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                <input
                  type="email"
                  value={formData.correo_electronico}
                  onChange={(event) => setFormData({ ...formData, correo_electronico: event.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Nueva contraseña</label>
                <input
                  type="password"
                  value={formData.contrasena}
                  onChange={(event) => setFormData({ ...formData, contrasena: event.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Dejar vacío para conservar la actual"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-primary px-6 py-2 font-semibold text-white disabled:opacity-60"
                >
                  {saving ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
