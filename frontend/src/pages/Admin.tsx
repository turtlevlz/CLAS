import React, { useState, useEffect } from 'react';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  PencilSquareIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

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
      const token = localStorage.getItem('token_clas');
      const url = esAdminClas 
        ? 'http://localhost:3000/usuarios' 
        : `http://localhost:3000/usuarios/empresa/${usuarioActual?.empresa_id}`;
      
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setUsuarios(await res.json());
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
          const res = await fetch('http://localhost:3000/empresas');
          if (res.ok) {
            const json = await res.json();
            setEmpresasLista(json.data || []);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchEmpresas();
  }, [esAdminClas]);

  const handleBorrar = async (id: string) => {
    if (!window.confirm("¿Borrar usuario?")) return;
    const res = await fetch(`http://localhost:3000/usuarios/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token_clas')}` }
    });
    if (res.ok) {
      setUsuarios(prev => prev.filter(u => u.id_usuario !== id));
      alert("Eliminado correctamente");
    } else {
      const err = await res.json();
      alert(`Error: ${err.message}`);
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
    const res = await fetch(`http://localhost:3000/usuarios/${selectedUser.id_usuario}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token_clas')}` 
      },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      setShowEditModal(false);
      fetchUsuarios();
    } else {
      const err = await res.json();
      alert(`Error: ${err.message}`);
    }
  };

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${localStorage.getItem('token_clas')}` 
      },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      setShowCreateModal(false);
      fetchUsuarios();
    } else {
      const err = await res.json();
      alert(`Error: ${err.message}`);
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
            
            {activeTab === 'empresas' && (
              <div className="text-center py-20">
                <BuildingOfficeIcon className="w-16 h-16 mx-auto text-gray-200 mb-4" />
                <h3 className="text-xl font-bold text-gray-400">Gestión de Empresas</h3>
                <Link to="/admin/nueva-empresa" className="mt-4 inline-block bg-primary text-white px-6 py-2 rounded-xl font-bold no-underline">
                  Registrar Nueva Empresa
                </Link>
              </div>
            )}

            {activeTab === 'mi-empresa' && <div className="text-center py-20 text-gray-400">Perfil de tu empresa en desarrollo.</div>}
            {activeTab === 'catalogos' && <div className="text-center py-20 text-gray-400">Mantenimiento de catálogos en desarrollo.</div>}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}