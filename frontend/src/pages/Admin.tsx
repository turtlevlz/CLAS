import React, { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import client from '../api';

// IMPORTAMOS LAS NUEVAS APIS DE TUS COMPAS
import { getAllUsers, getUsersByEmpresa, createUser, updateUser, deleteUser } from '../api/userApi';
import { createProductoFabricado, updateProductoFabricado, deleteProductoFabricado } from '../api/productoFabricadoApi';

type CatalogItem = Record<string, any>;

type CompanyForm = {
  nombre_comercial: string; razon_social: string; rfc: string; correo_electronico: string;
  telefono: string; membresia_id: string; tipo_organizacion_id: string; ciudad: string;
  domicilio_completo: string; giro: string; sitio_web: string; descripcion: string;
  anio_fundacion: string; rango_empleados: string; fabrica_para_automotriz: boolean;
};

type ProductForm = { nombre_producto: string; clientes: string; porcentaje_produccion: string; };
type ContactForm = { nombre_completo: string; puesto: string; telefono_celular: string; correo: string; funcion_id: string; };

const emptyCompanyForm: CompanyForm = {
  nombre_comercial: '', razon_social: '', rfc: '', correo_electronico: '', telefono: '',
  membresia_id: '', tipo_organizacion_id: '', ciudad: '', domicilio_completo: '',
  giro: '', sitio_web: '', descripcion: '', anio_fundacion: '', rango_empleados: '',
  fabrica_para_automotriz: false,
};

const emptyProductForm: ProductForm = { nombre_producto: '', clientes: '', porcentaje_produccion: '' };
const emptyContactForm: ContactForm = { nombre_completo: '', puesto: '', telefono_celular: '', correo: '', funcion_id: '' };

const relationConfigs = [
  { title: 'Rubros', catalogKey: 'rubros', assignedKey: 'rubros', idKey: 'id_rubro', labelKey: 'nombre_rubro', addEndpoint: '/empresa-rubros', payloadKey: 'rubro_id' },
  { title: 'Certificaciones', catalogKey: 'certificaciones', assignedKey: 'certificaciones', idKey: 'id_certificacion', labelKey: 'nombre_certificacion', addEndpoint: '/empresa-certificaciones', payloadKey: 'certificacion_id' },
  { title: 'Procesos', catalogKey: 'procesos', assignedKey: 'procesos', idKey: 'id_proceso', labelKey: 'nombre_proceso', addEndpoint: '/empresa-procesos', payloadKey: 'proceso_id' },
  { title: 'Industrias', catalogKey: 'industrias', assignedKey: 'industrias', idKey: 'id_industria', labelKey: 'nombre_industria', addEndpoint: '/empresa-industrias', payloadKey: 'industria_id' },
  { title: 'Necesidades', catalogKey: 'necesidades', assignedKey: 'necesidades', idKey: 'id_necesidad', labelKey: 'nombre_necesidad', addEndpoint: '/empresa-necesidades', payloadKey: 'necesidad_id' },
];

const normalizeList = (data: any, pascalKey: string, camelKey: string) => data?.[pascalKey] || data?.[camelKey] || [];

const catalogosMeta = [
  { label: 'Membresías', endpoint: '/membresias', labelKey: 'nombre_membresia' },
  { label: 'Rubros', endpoint: '/rubros', labelKey: 'nombre_rubro' },
  { label: 'Certificaciones', endpoint: '/certificaciones', labelKey: 'nombre_certificacion' },
  { label: 'Industrias', endpoint: '/industrias', labelKey: 'nombre_industria' },
  { label: 'Necesidades', endpoint: '/necesidades', labelKey: 'nombre_necesidad' },
  { label: 'Procesos', endpoint: '/procesos', labelKey: 'nombre_proceso' },
  // CORRECCIÓN: La ruta correcta según sus APIs
  { label: 'Organizaciones', endpoint: '/tipos-organizacion', labelKey: 'nombre_tipo' },
  { label: 'Funciones', endpoint: '/funciones', labelKey: 'nombre_funcion' },
];

function PanelUsuarios() {
  const { usuarioActual: user } = useAuth(); 
  const esAdminClas = user?.rol_id === 1;
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [empresasLista, setEmpresasLista] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    nombre_usuario: '', correo_electronico: '', contrasena: '', rol_id: 3, empresa_id: user?.empresa_id || null
  });

  const fetchUsuarios = async () => {
    try {
      // Usamos la API de tus compas
      const data = esAdminClas ? await getAllUsers() : await getUsersByEmpresa(user?.empresa_id as number);
      setUsuarios(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsuarios(); }, []);

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
    if (!window.confirm("¿Estás seguro de borrar este usuario?")) return;
    try {
      await deleteUser(id);
      setUsuarios(prev => prev.filter(u => u.id_usuario !== id));
    } catch (err: any) {
      alert('Error al eliminar usuario.');
    }
  };

  const abrirEdicion = (usuario: any) => {
    setSelectedUser(usuario);
    setFormData({
      nombre_usuario: usuario.nombre_usuario, correo_electronico: usuario.correo_electronico,
      contrasena: '', rol_id: usuario.rol_id, empresa_id: usuario.empresa_id
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        nombre_usuario: formData.nombre_usuario,
        correo_electronico: formData.correo_electronico
      };
      
      if (formData.contrasena && formData.contrasena.trim() !== '') {
        payload.contrasena = formData.contrasena;
      }

      await updateUser(selectedUser.id_usuario, payload);
      setShowEditModal(false);
      fetchUsuarios();
    } catch (err: any) {
      alert('Error al actualizar usuario.');
    }
  };

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({
        nombre_usuario: formData.nombre_usuario,
        correo_electronico: formData.correo_electronico,
        contrasena: formData.contrasena,
        rol_id: formData.rol_id,
        empresa_id: formData.empresa_id
      });
      setShowCreateModal(false);
      fetchUsuarios();
    } catch (err: any) {
      alert('Error al crear usuario.');
    }
  };

  const filtrados = usuarios.filter(u =>
    u.nombre_usuario?.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.correo_electronico?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const miId = user?.id_usuario || user?.id;

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 mb-1">Panel de Usuarios</h1>
           <p className="text-gray-500 text-sm">Gestión de Perfiles Socio de CLAS.</p>
        </div>
        <button
          onClick={() => {
            setFormData({ nombre_usuario: '', correo_electronico: '', contrasena: '', rol_id: 3, empresa_id: user?.empresa_id || null });
            setShowCreateModal(true);
          }}
          className="bg-[#10b981] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold"
        >
          <PlusIcon className="w-5 h-5" /> Agregar Usuario
        </button>
      </div>

      <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-72 mb-6 bg-white">
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 shrink-0" />
          <input type="text" placeholder="Buscar Usuarios..." value={busqueda} onChange={e => setBusqueda(e.target.value)} className="outline-none text-sm w-full" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Correo Electrónico</th>
              <th className="px-6 py-4 font-medium">Nombre</th>
              <th className="px-6 py-4 font-medium">Rol</th>
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? ( <tr><td colSpan={4} className="p-10 text-center text-gray-400">Cargando...</td></tr> ) 
            : filtrados.length === 0 ? ( <tr><td colSpan={4} className="p-10 text-center text-gray-400">No hay usuarios registrados.</td></tr> ) 
            : filtrados.map(u => (
              <tr key={u.id_usuario} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-700">{u.correo_electronico}</td>
                <td className="px-6 py-4 text-gray-700">{u.nombre_usuario}</td>
                <td className="px-6 py-4 text-gray-700">
                  <span className={`font-semibold px-2 py-1 rounded-md text-xs ${
                      u.rol_id === 1 ? 'bg-purple-100 text-purple-700' :
                      u.rol_id === 2 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {u.rol_id === 1 ? 'Admin CLAS' : u.rol_id === 2 ? 'Admin Empresa' : 'Usuario Empresa'}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-end gap-3">
                  {u.id_usuario !== miId && (
                    <button onClick={() => handleBorrar(u.id_usuario)} className="text-red-500 hover:text-red-700" title="Eliminar">
                      <TrashIcon className="w-5 h-5"/>
                    </button>
                  )}
                  <button onClick={() => abrirEdicion(u)} className="text-orange-500 hover:text-orange-700" title="Editar">
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
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{showEditModal ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
            <form onSubmit={showEditModal ? handleUpdate : handleCrear} className="space-y-4">
              <input type="text" placeholder="Nombre completo" value={formData.nombre_usuario} onChange={e => setFormData({...formData, nombre_usuario: e.target.value})} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
              <input type="email" placeholder="Correo electrónico" value={formData.correo_electronico} onChange={e => setFormData({...formData, correo_electronico: e.target.value})} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />

              {esAdminClas && !showEditModal && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rol del Usuario</label>
                  <select value={formData.rol_id} onChange={e => setFormData({...formData, rol_id: Number(e.target.value)})} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white" required>
                    <option value={1}>Admin CLAS</option>
                    <option value={2}>Admin Empresa</option>
                    <option value={3}>Usuario Empresa</option>
                  </select>
                </div>
              )}

              {esAdminClas && formData.rol_id !== 1 && !showEditModal && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Empresa Asignada</label>
                  <select value={formData.empresa_id || ''} onChange={e => setFormData({...formData, empresa_id: e.target.value === '' ? null : Number(e.target.value)})} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white" required>
                    <option value="">Selecciona una empresa...</option>
                    {empresasLista.map(emp => ( <option key={emp.id_empresa} value={emp.id_empresa}>{emp.nombre_comercial}</option> ))}
                  </select>
                </div>
              )}

              <input type="password" placeholder={showEditModal ? "Nueva contraseña (vacío para no cambiar)" : "Contraseña provisional"} onChange={e => setFormData({...formData, contrasena: e.target.value})} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required={!showEditModal} />

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => {setShowCreateModal(false); setShowEditModal(false)}} className="px-6 py-2 rounded-xl bg-gray-100 font-semibold text-gray-600">Cancelar</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700">Guardar</button>
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
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? ( <tr><td colSpan={5} className="p-10 text-center text-gray-400">Cargando...</td></tr> ) 
            : empresas.length === 0 ? ( <tr><td colSpan={5} className="p-10 text-center text-gray-400">No hay empresas registradas.</td></tr> ) 
            : empresas.map(e => (
              <tr key={e.id_empresa} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-700 font-medium">{e.nombre_comercial}</td>
                <td className="px-6 py-4 text-gray-700">{e.ciudad || '—'}</td>
                <td className="px-6 py-4 text-gray-700">{e.Membresia?.nombre_membresia ?? '—'}</td>
                <td className="px-6 py-4 text-gray-700">{e.TipoOrganizacion?.nombre_tipo ?? '—'}</td>
                <td className="px-6 py-4 flex justify-end gap-3">
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
              <button onClick={() => setEmpresaAEliminar(null)} className="px-5 py-2 rounded-xl bg-gray-100 font-semibold text-gray-600">Cancelar</button>
              <button onClick={handleEliminar} className="px-5 py-2 rounded-xl bg-red-500 text-white font-semibold">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PanelMiEmpresa() {
  const { usuarioActual: user } = useAuth();
  const empresaId = user?.empresa_id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<CompanyForm>(emptyCompanyForm);
  const [logo, setLogo] = useState<File | null>(null);
  const [catalogs, setCatalogs] = useState<Record<string, CatalogItem[]>>({
    membresias: [], organizaciones: [], rubros: [], certificaciones: [],
    procesos: [], industrias: [], necesidades: [], funciones: [],
  });
  const [assigned, setAssigned] = useState<Record<string, CatalogItem[]>>({
    rubros: [], certificaciones: [], procesos: [], industrias: [], necesidades: [],
  });
  const [products, setProducts] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  
  const [productForm, setProductForm] = useState<ProductForm>(emptyProductForm);
  const [contactForm, setContactForm] = useState<ContactForm>(emptyContactForm);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editingContactId, setEditingContactId] = useState<number | null>(null);
  const [editingProductForm, setEditingProductForm] = useState<ProductForm>(emptyProductForm);
  const [editingContactForm, setEditingContactForm] = useState<ContactForm>(emptyContactForm);

  const loadData = async () => {
    if (!empresaId) return;
    const [
      empresaRes, membresiasRes, organizacionesRes, rubrosRes,
      certificacionesRes, procesosRes, industriasRes, necesidadesRes, funcionesRes,
    ] = await Promise.all([
      client.get(`/empresas/${empresaId}`), 
      client.get('/membresias'), 
      client.get('/tipos-organizacion'), // CORRECCIÓN AQUÍ
      client.get('/rubros'), 
      client.get('/certificaciones'), 
      client.get('/procesos'),
      client.get('/industrias'), 
      client.get('/necesidades'), 
      client.get('/funciones'),
    ]);

    const data = empresaRes.data;
    setFormData({
      nombre_comercial: data.nombre_comercial || '', razon_social: data.razon_social || '',
      rfc: data.rfc || '', correo_electronico: data.correo_electronico || '',
      telefono: data.telefono || '', membresia_id: String(data.membresia_id || ''),
      tipo_organizacion_id: String(data.tipo_organizacion_id || ''), ciudad: data.ciudad || '',
      domicilio_completo: data.domicilio_completo || '', giro: data.giro || '',
      sitio_web: data.sitio_web || '', descripcion: data.descripcion || '',
      anio_fundacion: data.anio_fundacion ? String(data.anio_fundacion) : '',
      rango_empleados: data.rango_empleados || '', fabrica_para_automotriz: Boolean(data.fabrica_para_automotriz),
    });

    setCatalogs({
      membresias: membresiasRes.data || [], organizaciones: organizacionesRes.data || [],
      rubros: rubrosRes.data || [], certificaciones: certificacionesRes.data || [],
      procesos: procesosRes.data || [], industrias: industriasRes.data || [],
      necesidades: necesidadesRes.data || [], funciones: funcionesRes.data || [],
    });

    setAssigned({
      rubros: normalizeList(data, 'Rubros', 'rubros'), certificaciones: normalizeList(data, 'Certificaciones', 'certificaciones'),
      procesos: normalizeList(data, 'Procesos', 'procesos'), industrias: normalizeList(data, 'Industrias', 'industrias'),
      necesidades: normalizeList(data, 'Necesidades', 'necesidades'),
    });

    setProducts(normalizeList(data, 'ProductoFabricados', 'productosFabricados'));
    setContacts(normalizeList(data, 'Contactos', 'contactos'));
  };

  useEffect(() => {
    if (empresaId) {
      loadData().catch((error) => {
        console.error(error);
      }).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [empresaId]);

  const updateField = (key: keyof CompanyForm, value: string | boolean) => setFormData((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => { data.append(key, String(value)); });
    if (logo) data.append('logo', logo);

    try {
      await client.patch(`/empresas/${empresaId}`, data);
      await loadData();
    } catch (error: any) {
      alert('Error al actualizar empresa.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddRelation = async (config: typeof relationConfigs[number], relatedId: string) => {
    if (!relatedId) return;
    try {
      await client.post(config.addEndpoint, {
        empresa_id: empresaId,
        id_empresa: empresaId,
        [config.payloadKey]: Number(relatedId),
        [config.idKey]: Number(relatedId)
      });
      await loadData();
    } catch (error: any) {
      alert('Error al registrar la relación.');
    }
  };

  const handleRemoveRelation = async (config: typeof relationConfigs[number], relatedId: number) => {
    try {
      await client.delete(`${config.addEndpoint}/${empresaId}/${relatedId}`);
      await loadData();
    } catch (error: any) {
      try {
        await client.delete(config.addEndpoint, {
          data: {
            empresa_id: empresaId,
            id_empresa: empresaId,
            [config.payloadKey]: relatedId,
            [config.idKey]: relatedId
          }
        });
        await loadData();
      } catch (fallbackError: any) {
        alert('Error al remover el registro.');
      }
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Usamos la API de Producto Fabricado
      await createProductoFabricado({
        empresa_id: empresaId as number,
        nombre_producto: productForm.nombre_producto,
        clientes: productForm.clientes,
        porcentaje_produccion: productForm.porcentaje_produccion ? Number(productForm.porcentaje_produccion) : undefined
      });
      setProductForm(emptyProductForm);
      await loadData();
    } catch (error: any) {
      alert('Error al agregar producto.');
    }
  };

  const handleUpdateProduct = async (productId: number) => {
    try {
      // Usamos la API de Producto Fabricado
      await updateProductoFabricado(productId, {
        nombre_producto: editingProductForm.nombre_producto,
        clientes: editingProductForm.clientes,
        porcentaje_produccion: editingProductForm.porcentaje_produccion ? Number(editingProductForm.porcentaje_produccion) : undefined
      });
      setEditingProductId(null);
      setEditingProductForm(emptyProductForm);
      await loadData();
    } catch (error: any) {
      alert('Error al actualizar el producto.');
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!window.confirm('¿Eliminar producto o servicio?')) return;
    try {
      await deleteProductoFabricado(productId);
      await loadData();
    } catch (error: any) {
      alert('Error al eliminar.');
    }
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await client.post('/contactos', { 
        empresa_id: empresaId, 
        ...contactForm, 
        funcion_id: Number(contactForm.funcion_id) 
      });
      setContactForm(emptyContactForm);
      await loadData();
    } catch (error: any) {
      alert('Error al agregar contacto.');
    }
  };

  const handleUpdateContact = async (contactId: number) => {
    try {
      await client.patch(`/contactos/${contactId}`, { 
        ...editingContactForm, 
        funcion_id: Number(editingContactForm.funcion_id) 
      });
      setEditingContactId(null);
      setEditingContactForm(emptyContactForm);
      await loadData();
    } catch (error: any) {
      alert('Error al actualizar contacto.');
    }
  };

  const handleDeleteContact = async (contactId: number) => {
    if (!window.confirm('¿Eliminar contacto?')) return;
    try {
      await client.delete(`/contactos/${contactId}`);
      await loadData();
    } catch (error: any) {
      alert('Error al eliminar.');
    }
  };

  const startEditProduct = (product: any) => {
    setEditingProductId(product.id_producto);
    setEditingProductForm({
      nombre_producto: product.nombre_producto || '',
      clientes: product.clientes || '',
      porcentaje_produccion: product.porcentaje_produccion ? String(product.porcentaje_produccion) : '',
    });
  };

  const startEditContact = (contact: any) => {
    setEditingContactId(contact.id_contacto);
    setEditingContactForm({
      nombre_completo: contact.nombre_completo || '',
      puesto: contact.puesto || '',
      telefono_celular: contact.telefono_celular || '',
      correo: contact.correo || '',
      funcion_id: contact.funcion_id ? String(contact.funcion_id) : '',
    });
  };

  const field = (label: string, key: keyof CompanyForm, type = 'text') => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input type={type} value={String(formData[key])} onChange={e => updateField(key, e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
  );

  if (!empresaId) {
    return <div className="text-center py-20 text-gray-500">Tu usuario no tiene ninguna empresa vinculada.</div>;
  }

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Cargando perfil de empresa...</div>;
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Perfil Avanzado de Empresa</h1>
        <p className="text-gray-500 text-sm">Gestiona toda la información pública, relaciones, productos y contactos.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Datos principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {field('Nombre Comercial', 'nombre_comercial')}
            {field('Razón Social', 'razon_social')}
            {field('RFC', 'rfc')}
            {field('Correo Electrónico', 'correo_electronico', 'email')}
            {field('Teléfono', 'telefono')}
            {field('Sitio Web', 'sitio_web')}
            {field('Ciudad', 'ciudad')}
            {field('Giro', 'giro')}
            {field('Año de Fundación', 'anio_fundacion', 'number')}
            {field('Rango de Empleados', 'rango_empleados')}

            <div>
              <label className="block text-sm font-medium text-gray-700">Membresía</label>
              <select value={formData.membresia_id} onChange={e => updateField('membresia_id', e.target.value)} disabled className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm bg-gray-50 text-gray-500 cursor-not-allowed">
                <option value="">Seleccionar...</option>
                {catalogs.membresias.map((item) => ( <option key={item.id_membresia} value={item.id_membresia}>{item.nombre_membresia}</option> ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo de Organización</label>
              <select value={formData.tipo_organizacion_id} onChange={e => updateField('tipo_organizacion_id', e.target.value)} disabled className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm bg-gray-50 text-gray-500 cursor-not-allowed">
                <option value="">Seleccionar...</option>
                {catalogs.organizaciones.map((item) => ( <option key={item.id_tipo} value={item.id_tipo}>{item.nombre_tipo}</option> ))}
              </select>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Domicilio Completo</label>
            <textarea value={formData.domicilio_completo} onChange={e => updateField('domicilio_completo', e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción / Acerca de</label>
            <textarea value={formData.descripcion} onChange={e => updateField('descripcion', e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input type="checkbox" checked={formData.fabrica_para_automotriz} onChange={e => updateField('fabrica_para_automotriz', e.target.checked)} className="accent-blue-600" />
            Fábrica para sector automotriz
          </label>
          <div className="rounded-xl border border-dashed border-blue-300 bg-blue-50 p-4">
            <label className="block text-sm font-bold text-gray-800 mb-2">Logo de la Empresa</label>
            <label className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
              Seleccionar logo
              <input type="file" accept="image/*" onChange={e => setLogo(e.target.files?.[0] || null)} className="hidden" />
            </label>
            <span className="ml-3 text-sm font-medium text-gray-600 break-all">{logo ? logo.name : 'Ningún archivo nuevo seleccionado'}</span>
          </div>
        </section>

        <div className="flex justify-end pt-2">
          <button type="submit" disabled={saving} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-lg shadow-blue-200">
            {saving ? 'Guardando...' : 'Guardar datos generales'}
          </button>
        </div>
      </form>

      <hr className="border-gray-200" />

      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Catálogos Asignados</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {relationConfigs.map((config) => {
            const selectedIds = new Set((assigned[config.assignedKey] || []).map((item) => item[config.idKey]));
            const available = (catalogs[config.catalogKey] || []).filter((item) => !selectedIds.has(item[config.idKey]));
            return (
              <div key={config.assignedKey} className={`bg-gray-50 border border-gray-100 rounded-xl p-5 ${config.assignedKey === 'necesidades' ? 'lg:col-span-2' : ''}`}>
                <h3 className="text-md font-bold text-gray-800 mb-3">{config.title}</h3>
                <select value="" onChange={e => handleAddRelation(config, e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white mb-3 outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Agregar nuevo...</option>
                  {available.map((item) => ( <option key={item[config.idKey]} value={item[config.idKey]}>{item[config.labelKey]}</option> ))}
                </select>
                <div className="flex flex-wrap gap-2">
                  {(assigned[config.assignedKey] || []).map((item) => (
                    <button key={item[config.idKey]} type="button" onClick={() => handleRemoveRelation(config, item[config.idKey])} className="rounded-full bg-white border border-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200">
                      {item[config.labelKey]} &times;
                    </button>
                  ))}
                  {(assigned[config.assignedKey] || []).length === 0 && ( <p className="text-sm text-gray-400 italic">Sin registros.</p> )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <hr className="border-gray-200" />

      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Productos y Servicios</h2>
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_150px_auto] gap-3 mb-5">
          <input required placeholder="Producto o servicio" value={productForm.nombre_producto} onChange={e => setProductForm({ ...productForm, nombre_producto: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          <input placeholder="Clientes principales" value={productForm.clientes} onChange={e => setProductForm({ ...productForm, clientes: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="number" min="0" max="100" placeholder="% de producción" value={productForm.porcentaje_produccion} onChange={e => setProductForm({ ...productForm, porcentaje_produccion: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-semibold">Agregar</button>
        </form>
        <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg bg-gray-50">
          {products.map((product) => (
            <div key={product.id_producto} className="p-4 text-sm">
              {editingProductId === product.id_producto ? (
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_140px_auto_auto] gap-3">
                  <input value={editingProductForm.nombre_producto} onChange={e => setEditingProductForm({ ...editingProductForm, nombre_producto: e.target.value })} className="border border-gray-300 rounded-lg p-2 text-sm" />
                  <input value={editingProductForm.clientes} onChange={e => setEditingProductForm({ ...editingProductForm, clientes: e.target.value })} className="border border-gray-300 rounded-lg p-2 text-sm" />
                  <input type="number" min="0" max="100" value={editingProductForm.porcentaje_produccion} onChange={e => setEditingProductForm({ ...editingProductForm, porcentaje_produccion: e.target.value })} className="border border-gray-300 rounded-lg p-2 text-sm" />
                  <button type="button" onClick={() => handleUpdateProduct(product.id_producto)} className="text-blue-600 font-semibold">Guardar</button>
                  <button type="button" onClick={() => setEditingProductId(null)} className="text-gray-500 font-semibold">Cancelar</button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                  <div>
                    <p className="font-bold text-gray-800">{product.nombre_producto}</p>
                    <p className="text-gray-500 mt-1">{product.clientes || 'Sin clientes'} {product.porcentaje_produccion ? `• ${product.porcentaje_produccion}%` : ''}</p>
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => startEditProduct(product)} className="text-blue-600 font-semibold">Editar</button>
                    <button type="button" onClick={() => handleDeleteProduct(product.id_producto)} className="text-red-500 font-semibold">Eliminar</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {products.length === 0 && <p className="p-4 text-center text-gray-400 italic">No hay productos registrados.</p>}
        </div>
      </section>

      <hr className="border-gray-200" />

      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Directorio de Contactos</h2>
        <form onSubmit={handleAddContact} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 mb-5">
          <input required placeholder="Nombre completo" value={contactForm.nombre_completo} onChange={e => setContactForm({ ...contactForm, nombre_completo: e.target.value })} className="border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          <input required placeholder="Puesto" value={contactForm.puesto} onChange={e => setContactForm({ ...contactForm, puesto: e.target.value })} className="border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          <input required placeholder="Teléfono" value={contactForm.telefono_celular} onChange={e => setContactForm({ ...contactForm, telefono_celular: e.target.value })} className="border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" placeholder="Correo electrónico" value={contactForm.correo} onChange={e => setContactForm({ ...contactForm, correo: e.target.value })} className="border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          <select required value={contactForm.funcion_id} onChange={e => setContactForm({ ...contactForm, funcion_id: e.target.value })} className="border border-gray-300 rounded-lg p-2 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Función...</option>
            {catalogs.funciones.map((item) => ( <option key={item.id_funcion} value={item.id_funcion}>{item.nombre_funcion}</option> ))}
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-semibold md:col-span-5">Agregar contacto</button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts.map((contact) => (
            <div key={contact.id_contacto} className="border border-gray-200 bg-gray-50 rounded-xl p-4 text-sm">
              {editingContactId === contact.id_contacto ? (
                <div className="grid grid-cols-1 gap-3">
                  <input value={editingContactForm.nombre_completo} onChange={e => setEditingContactForm({ ...editingContactForm, nombre_completo: e.target.value })} className="border border-gray-300 rounded-lg p-2 text-sm" />
                  <input value={editingContactForm.puesto} onChange={e => setEditingContactForm({ ...editingContactForm, puesto: e.target.value })} className="border border-gray-300 rounded-lg p-2 text-sm" />
                  <input value={editingContactForm.telefono_celular} onChange={e => setEditingContactForm({ ...editingContactForm, telefono_celular: e.target.value })} className="border border-gray-300 rounded-lg p-2 text-sm" />
                  <input type="email" value={editingContactForm.correo} onChange={e => setEditingContactForm({ ...editingContactForm, correo: e.target.value })} className="border border-gray-300 rounded-lg p-2 text-sm" />
                  <select value={editingContactForm.funcion_id} onChange={e => setEditingContactForm({ ...editingContactForm, funcion_id: e.target.value })} className="border border-gray-300 rounded-lg p-2 text-sm bg-white">
                    <option value="">Función...</option>
                    {catalogs.funciones.map((item) => ( <option key={item.id_funcion} value={item.id_funcion}>{item.nombre_funcion}</option> ))}
                  </select>
                  <div className="flex gap-4 pt-2">
                    <button type="button" onClick={() => handleUpdateContact(contact.id_contacto)} className="text-blue-600 font-semibold">Guardar</button>
                    <button type="button" onClick={() => setEditingContactId(null)} className="text-gray-500 font-semibold">Cancelar</button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full justify-between gap-3">
                  <div className="space-y-1">
                    <p className="font-bold text-gray-900 text-base">{contact.nombre_completo}</p>
                    <p className="text-gray-600">{contact.puesto}</p>
                    <p className="text-gray-500">{contact.correo || 'Sin correo'}</p>
                    <p className="text-gray-500">{contact.telefono_celular}</p>
                  </div>
                  <div className="flex gap-4 pt-2">
                    <button type="button" onClick={() => startEditContact(contact)} className="text-blue-600 font-semibold">Editar</button>
                    <button type="button" onClick={() => handleDeleteContact(contact.id_contacto)} className="text-red-500 font-semibold">Eliminar</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {contacts.length === 0 && <p className="text-sm text-gray-400 md:col-span-2 text-center italic p-4">No hay contactos registrados.</p>}
        </div>
      </section>
    </div>
  );
}

function PanelCatalogo({ endpoint, labelKey, titulo }: { endpoint: string; labelKey: string; titulo: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [nuevo, setNuevo] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try { const res = await client.get(endpoint); setItems(res.data); } catch (e) { console.error(e); } finally { setLoading(false); }
  };
  useEffect(() => { fetchItems(); }, [endpoint]);

  const handleAgregar = async () => {
    if (!nuevo.trim()) return;
    try { await client.post(endpoint, { [labelKey]: nuevo }); setNuevo(''); fetchItems(); } catch (e) { console.error(e); }
  };
  const handleEliminar = async (item: any) => {
    if (!window.confirm(`¿Eliminar "${item[labelKey]}"?`)) return;
    const idKey = Object.keys(item).find(k => k.startsWith('id_'));
    if (!idKey) return;
    try { await client.delete(`${endpoint}/${item[idKey]}`); setItems(prev => prev.filter(i => i[idKey] !== item[idKey])); } catch (e) { console.error(e); }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input type="text" value={nuevo} onChange={e => setNuevo(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAgregar()} placeholder={`Nuevo ${titulo.toLowerCase()}...`} className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 max-w-xs outline-none focus:ring-2 focus:ring-blue-500" />
        <button onClick={handleAgregar} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1">
          <PlusIcon className="w-4 h-4" /> Agregar
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 border-b">
            <tr><th className="px-6 py-3 font-medium">{titulo}</th><th className="px-6 py-3" /></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? ( <tr><td colSpan={2} className="p-8 text-center text-gray-400">Cargando...</td></tr> ) 
            : items.length === 0 ? ( <tr><td colSpan={2} className="p-8 text-center text-gray-400">No hay registros.</td></tr> ) 
            : items.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 text-gray-700">{item[labelKey]}</td>
                <td className="px-6 py-3 text-right">
                  <button onClick={() => handleEliminar(item)} className="text-red-500 hover:text-red-700"><TrashIcon className="w-4 h-4" /></button>
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
  const [seleccionado, setSeleccionado] = useState(catalogosMeta[0]);
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Catálogos</h1>
          <p className="text-gray-500 text-sm">Gestiona los valores globales del sistema.</p>
        </div>
        <select value={seleccionado.endpoint} onChange={e => setSeleccionado(catalogosMeta.find(c => c.endpoint === e.target.value)!)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white">
          {catalogosMeta.map(c => ( <option key={c.endpoint} value={c.endpoint}>{c.label}</option> ))}
        </select>
      </div>
      <PanelCatalogo key={seleccionado.endpoint} endpoint={seleccionado.endpoint} labelKey={seleccionado.labelKey} titulo={seleccionado.label} />
    </div>
  );
}

export default function Admin() {
  const { usuarioActual: user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.rol_id !== 1 && user.rol_id !== 2) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="bg-red-50 border border-red-200 text-red-600 p-8 rounded-2xl text-center shadow-sm max-w-md">
            <h2 className="text-2xl font-bold mb-2">Acceso Denegado</h2>
            <p className="text-sm">Tu cuenta de empleado no tiene permisos para ver el panel de administración.</p>
            <Link to="/directorio" className="mt-6 inline-block bg-red-600 text-white font-semibold px-6 py-2 rounded-xl transition-colors">Ir al Directorio</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const esAdminClas = user.rol_id === 1;
  const tabs = esAdminClas
    ? [ { id: 'usuarios', label: 'Usuarios' }, { id: 'empresas', label: 'Empresas' }, { id: 'catalogos', label: 'Catálogos' } ]
    : [ { id: 'usuarios', label: 'Usuarios' }, { id: 'mi-empresa', label: 'Mi Empresa' } ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
             {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 px-6 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
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