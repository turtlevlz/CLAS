import React, { useState, useEffect } from 'react';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';

function PanelUsuarios() {
  const { usuarioActual } = useAuth();
  const esAdminClas = usuarioActual?.rol_id === 1;

  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [empresasLista, setEmpresasLista] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    nombre_usuario: '',
    correo_electronico: '',
    contrasena: '',
    rol_id: 3,
    empresa_id: usuarioActual?.empresa_id || null
  });

  const fetchUsuarios = async () => {
    try {
      const url = esAdminClas ? '/usuarios' : `/usuarios/empresa/${usuarioActual?.empresa_id}`;
      const res = await client.get(url);
      setUsuarios(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  useEffect(() => {
    const fetchEmpresas = async () => {
      if (esAdminClas) {
        try {
          const res = await client.get('/empresas');
          setEmpresasLista(res.data.data || []);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchEmpresas();
  }, [esAdminClas]);

  const handleBorrar = async (id: string) => {
    if (!window.confirm("¿Borrar usuario?")) return;
    try {
      await client.delete(`/usuarios/${id}`);
      setUsuarios(prev => prev.filter(u => u.id_usuario !== id));
      alert("Eliminado correctamente");
    } catch (err: any) {
      alert(`Error: ${err.response?.data?.message || 'Error al eliminar'}`);
    }
  };

  const abrirEdicion = (usuario: any) => {
    setSelectedUser(usuario);
    setFormData({
      nombre_usuario: usuario.nombre_usuario,
      correo_electronico: usuario.correo_electronico,
      contrasena: '',
      rol_id: usuario.rol_id,
      empresa_id: usuario.empresa_id
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await client.patch(`/usuarios/${selectedUser.id_usuario}`, formData);
      setShowEditModal(false);
      fetchUsuarios();
    } catch (err: any) {
      alert(`Error: ${err.response?.data?.message || 'Error al actualizar'}`);
    }
  };

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await client.post('/auth/register', formData);
      setShowCreateModal(false);
      fetchUsuarios();
    } catch (err: any) {
      alert(`Error: ${err.response?.data?.message || 'Error al crear usuario'}`);
    }
  };

  const filtrados = usuarios.filter(u =>
    u.nombre_usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.correo_electronico.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 mb-1">Panel de administrador</h1>
           <p className="text-gray-500 text-sm">Gestión de Perfiles Socio de CLAS.</p>
        </div>
        <button
          onClick={() => {
            setFormData({
              nombre_usuario: '',
              correo_electronico: '',
              contrasena: '',
              rol_id: 3,
              empresa_id: usuarioActual?.empresa_id || null
            });
            setShowCreateModal(true);
          }}
          className="bg-[#10b981] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold"
        >
          <PlusIcon className="w-5 h-5" /> Agregar Usuario
        </button>
      </div>

      <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-72 mb-6 bg-white">
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Buscar Usuarios..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="outline-none text-sm w-full"
          />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Correo Electrónico</th>
              <th className="px-6 py-4 font-medium">Nombre</th>
              <th className="px-6 py-4 font-medium">Rol</th>
              <th className="px-6 py-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={4} className="p-10 text-center text-gray-400">Cargando...</td></tr>
            ) : filtrados.length === 0 ? (
              <tr><td colSpan={4} className="p-10 text-center text-gray-400">No hay usuarios registrados.</td></tr>
            ) : filtrados.map(u => (
              <tr key={u.id_usuario} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-700">{u.correo_electronico}</td>
                <td className="px-6 py-4 text-gray-700">{u.nombre_usuario}</td>
                <td className="px-6 py-4 text-gray-700">
                  <span className={`font-semibold px-2 py-1 rounded-md text-xs ${
                      u.rol_id === 1 ? 'bg-purple-100 text-purple-700' :
                      u.rol_id === 2 ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                    }`}>
                      {u.rol_id === 1 ? 'Admin CLAS' : u.rol_id === 2 ? 'Admin Empresa' : 'Usuario Empresa'}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button onClick={() => handleBorrar(u.id_usuario)} className="text-red-500 hover:text-red-700">
                    <TrashIcon className="w-5 h-5"/>
                  </button>
                  <button onClick={() => abrirEdicion(u)} className="text-orange-500 hover:text-orange-700">
                    <PencilSquareIcon className="w-5 h-5"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[200]">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {showEditModal ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h2>
            <form onSubmit={showEditModal ? handleUpdate : handleCrear} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                value={formData.nombre_usuario}
                onChange={e => setFormData({...formData, nombre_usuario: e.target.value})}
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                required
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={formData.correo_electronico}
                onChange={e => setFormData({...formData, correo_electronico: e.target.value})}
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                required
              />

              {esAdminClas && !showEditModal && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rol del Usuario</label>
                  <select
                    value={formData.rol_id}
                    onChange={e => setFormData({...formData, rol_id: Number(e.target.value)})}
                    className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-white"
                    required
                  >
                    <option value={1}>Admin CLAS</option>
                    <option value={2}>Admin Empresa</option>
                    <option value={3}>Usuario Empresa</option>
                  </select>
                </div>
              )}

              {esAdminClas && formData.rol_id !== 1 && !showEditModal && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Empresa Asignada</label>
                  <select
                    value={formData.empresa_id || ''}
                    onChange={e => setFormData({...formData, empresa_id: e.target.value === '' ? null : Number(e.target.value)})}
                    className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-white"
                    required
                  >
                    <option value="">Selecciona una empresa...</option>
                    {empresasLista.map(emp => (
                      <option key={emp.id_empresa} value={emp.id_empresa}>
                        {emp.nombre_comercial}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <input
                type="password"
                placeholder={showEditModal ? "Nueva contraseña (dejar vacío para no cambiar)" : "Contraseña provisional"}
                onChange={e => setFormData({...formData, contrasena: e.target.value})}
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                required={!showEditModal}
              />

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {setShowCreateModal(false); setShowEditModal(false)}}
                  className="px-6 py-2 rounded-xl bg-gray-100 font-semibold text-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-blue-200"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function PanelEmpresas() {
  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [empresaAEliminar, setEmpresaAEliminar] = useState<any>(null);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const res = await client.get('/empresas?limit=500');
        setEmpresas(res.data.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchEmpresas();
  }, []);

  const handleEliminar = async () => {
    try {
      await client.delete(`/empresas/${empresaAEliminar.id_empresa}`);
      setEmpresas(prev => prev.filter(e => e.id_empresa !== empresaAEliminar.id_empresa));
      setEmpresaAEliminar(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Empresas</h1>
          <p className="text-gray-500 text-sm">Empresas registradas en CLAS.</p>
        </div>
        <Link to="/admin/nueva-empresa" className="bg-[#10b981] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold no-underline">
          <PlusIcon className="w-5 h-5" /> Registrar Empresa
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Nombre</th>
              <th className="px-6 py-4 font-medium">Ciudad</th>
              <th className="px-6 py-4 font-medium">Membresía</th>
              <th className="px-6 py-4 font-medium">Tipo</th>
              <th className="px-6 py-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={5} className="p-10 text-center text-gray-400">Cargando...</td></tr>
            ) : empresas.length === 0 ? (
              <tr><td colSpan={5} className="p-10 text-center text-gray-400">No hay empresas registradas.</td></tr>
            ) : empresas.map(e => (
              <tr key={e.id_empresa} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-700 font-medium">{e.nombre_comercial}</td>
                <td className="px-6 py-4 text-gray-700">{e.ciudad}</td>
                <td className="px-6 py-4 text-gray-700">{e.Membresia?.nombre_membresia ?? '—'}</td>
                <td className="px-6 py-4 text-gray-700">{e.TipoOrganizacion?.nombre_tipo ?? '—'}</td>
                <td className="px-6 py-4 flex gap-3">
                  <button onClick={() => navigate(`/admin/empresas/${e.id_empresa}/editar`)} className="text-orange-500 hover:text-orange-700">
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button onClick={() => setEmpresaAEliminar(e)} className="text-red-500 hover:text-red-700">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {empresaAEliminar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[200]">
          <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl">
            <h2 className="text-lg font-bold text-gray-800 mb-2">¿Eliminar empresa?</h2>
            <p className="text-gray-500 text-sm mb-6">{empresaAEliminar.nombre_comercial}</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setEmpresaAEliminar(null)} className="px-5 py-2 rounded-xl bg-gray-100 font-semibold text-gray-600">
                Cancelar
              </button>
              <button onClick={handleEliminar} className="px-5 py-2 rounded-xl bg-red-500 text-white font-semibold">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PanelMiEmpresa() {
  const { usuarioActual } = useAuth();

  const camposVacios = {
    nombre_comercial: '',
    correo_electronico: '',
    telefono: '',
    ciudad: '',
    domicilio_completo: '',
    giro: '',
    sitio_web: '',
  };

  const [original, setOriginal] = useState(camposVacios);
  const [formData, setFormData] = useState(camposVacios);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const res = await client.get(`/empresas/${usuarioActual?.empresa_id}`);
        const data = {
          nombre_comercial:   res.data.nombre_comercial   || '',
          correo_electronico: res.data.correo_electronico || '',
          telefono:           res.data.telefono           || '',
          ciudad:             res.data.ciudad             || '',
          domicilio_completo: res.data.domicilio_completo || '',
          giro:               res.data.giro               || '',
          sitio_web:          res.data.sitio_web          || '',
        };
        setOriginal(data);
        setFormData(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchEmpresa();
  }, []);

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    const cambios = Object.fromEntries(
      Object.entries(formData).filter(([k, v]) => v !== original[k as keyof typeof original])
    );
    if (Object.keys(cambios).length === 0) return;
    setSaving(true);
    try {
      await client.patch(`/empresas/${usuarioActual?.empresa_id}`, cambios);
      setOriginal(formData);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (usuarioActual?.rol_id === 1) {
    return <p className="text-center py-20 text-gray-400">Esta sección es para administradores de empresa.</p>;
  }

  if (loading) {
    return <p className="text-center py-20 text-gray-400">Cargando...</p>;
  }

  const campo = (label: string, key: keyof typeof formData, type = 'text') => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={formData[key]}
        onChange={e => setFormData({ ...formData, [key]: e.target.value })}
        className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Mi Empresa</h1>
      <p className="text-gray-500 text-sm mb-6">Información de tu organización registrada en CLAS.</p>

      <form onSubmit={handleGuardar} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-6">
          {campo('Nombre Comercial',  'nombre_comercial')}
          {campo('Correo Electrónico','correo_electronico', 'email')}
          {campo('Teléfono',          'telefono')}
          {campo('Ciudad',            'ciudad')}
          {campo('Sitio Web',         'sitio_web')}
          {campo('Giro',              'giro')}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Domicilio Completo</label>
          <input
            type="text"
            value={formData.domicilio_completo}
            onChange={e => setFormData({ ...formData, domicilio_completo: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-white font-semibold px-6 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity"
        >
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  );
}

const catalogos = [
  { label: 'Membresías',      endpoint: '/membresias',      labelKey: 'nombre_membresia'      },
  { label: 'Rubros',          endpoint: '/rubros',          labelKey: 'nombre_rubro'          },
  { label: 'Certificaciones', endpoint: '/certificaciones', labelKey: 'nombre_certificacion'  },
  { label: 'Industrias',      endpoint: '/industrias',      labelKey: 'nombre_industria'      },
  { label: 'Necesidades',     endpoint: '/necesidades',     labelKey: 'nombre_necesidad'      },
  { label: 'Procesos',        endpoint: '/procesos',        labelKey: 'nombre_proceso'        },
  { label: 'Organizaciones',  endpoint: '/organizaciones',  labelKey: 'nombre_tipo'           },
  { label: 'Funciones',       endpoint: '/funciones',       labelKey: 'nombre_funcion'        },
];

function PanelCatalogo({ endpoint, labelKey, titulo }: { endpoint: string; labelKey: string; titulo: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [nuevo, setNuevo] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await client.get(endpoint);
      setItems(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleAgregar = async () => {
    if (!nuevo.trim()) return;
    try {
      await client.post(endpoint, { [labelKey]: nuevo });
      setNuevo('');
      fetchItems();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEliminar = async (item: any) => {
    if (!window.confirm(`¿Eliminar "${item[labelKey]}"?`)) return;
    const idKey = Object.keys(item).find(k => k.startsWith('id_'));
    if (!idKey) return;
    try {
      await client.delete(`${endpoint}/${item[idKey]}`);
      setItems(prev => prev.filter(i => i[idKey] !== item[idKey]));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={nuevo}
          onChange={e => setNuevo(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAgregar()}
          placeholder={`Nuevo ${titulo.toLowerCase()}...`}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 max-w-xs outline-none"
        />
        <button onClick={handleAgregar} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1">
          <PlusIcon className="w-4 h-4" /> Agregar
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 border-b">
            <tr>
              <th className="px-6 py-3 font-medium">{titulo}</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={2} className="p-8 text-center text-gray-400">Cargando...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={2} className="p-8 text-center text-gray-400">No hay registros.</td></tr>
            ) : items.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 text-gray-700">{item[labelKey]}</td>
                <td className="px-6 py-3 text-right">
                  <button onClick={() => handleEliminar(item)} className="text-red-500 hover:text-red-700">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PanelCatalogos() {
  const [seleccionado, setSeleccionado] = useState(catalogos[0]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Catálogos</h1>
          <p className="text-gray-500 text-sm">Gestiona los valores de cada catálogo del sistema.</p>
        </div>
        <select
          value={seleccionado.endpoint}
          onChange={e => setSeleccionado(catalogos.find(c => c.endpoint === e.target.value)!)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
        >
          {catalogos.map(c => (
            <option key={c.endpoint} value={c.endpoint}>{c.label}</option>
          ))}
        </select>
      </div>
      <PanelCatalogo
        key={seleccionado.endpoint}
        endpoint={seleccionado.endpoint}
        labelKey={seleccionado.labelKey}
        titulo={seleccionado.label}
      />
    </div>
  );
}

export default function Admin() {
  const { usuarioActual } = useAuth();
  const esAdminClas = usuarioActual?.rol_id === 1;

  const tabs = esAdminClas
    ? [{ id: 'usuarios', label: 'Usuarios' }, { id: 'empresas', label: 'Empresas' }, { id: 'catalogos', label: 'Catálogos' }]
    : [{ id: 'usuarios', label: 'Usuarios' }, { id: 'mi-empresa', label: 'Mi Empresa' }];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-4 mb-8 border-b border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 text-sm font-bold transition-all ${activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            {activeTab === 'usuarios' && <PanelUsuarios />}
            {activeTab === 'empresas' && <PanelEmpresas />}
            {activeTab === 'mi-empresa' && <PanelMiEmpresa />}
            {activeTab === 'catalogos' && <PanelCatalogos />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
