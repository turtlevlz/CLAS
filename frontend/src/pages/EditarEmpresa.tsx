import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';

type CatalogItem = Record<string, any>;

type CompanyForm = {
  nombre_comercial: string;
  razon_social: string;
  rfc: string;
  correo_electronico: string;
  telefono: string;
  membresia_id: string;
  tipo_organizacion_id: string;
  ciudad: string;
  domicilio_completo: string;
  giro: string;
  sitio_web: string;
  descripcion: string;
  anio_fundacion: string;
  rango_empleados: string;
  fabrica_para_automotriz: boolean;
};

type ProductForm = {
  nombre_producto: string;
  clientes: string;
  porcentaje_produccion: string;
};

type ContactForm = {
  nombre_completo: string;
  puesto: string;
  telefono_celular: string;
  correo: string;
  funcion_id: string;
};

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

export default function EditarEmpresa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const empresaId = Number(id);
  const { usuarioActual: user } = useAuth();

  // Seguridad estricta: Si Admin Empresa entra a una URL ajena o un Rol 3 se cuela, lo botamos
  if (user?.rol_id === 2 && user.empresa_id !== empresaId) return <Navigate to="/admin" replace />;
  if (user?.rol_id === 3) return <Navigate to="/directorio" replace />;

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
      empresaRes, membresiasRes, organizacionesRes, rubrosRes, certificacionesRes,
      procesosRes, industriasRes, necesidadesRes, funcionesRes,
    ] = await Promise.all([
      client.get(`/empresas/${empresaId}`), client.get('/membresias'), client.get('/organizaciones'),
      client.get('/rubros'), client.get('/certificaciones'), client.get('/procesos'),
      client.get('/industrias'), client.get('/necesidades'), client.get('/funciones'),
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
    loadData().catch((error) => { console.error(error); alert('No se pudo cargar la empresa'); }).finally(() => setLoading(false));
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
      alert('Datos guardados exitosamente');
      await loadData();
    } catch (error: any) { alert(error.response?.data?.message || 'Error al actualizar empresa'); } finally { setSaving(false); }
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
      console.error("Error backend (Agregar Relación):", error.response?.data || error);
      alert(`Error: ${error.response?.data?.message || 'No se pudo asignar. Revisa la consola (F12).'}`);
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
        console.error(" Error backend (Quitar Relación):", fallbackError.response?.data || fallbackError);
        alert('Error: No se pudo quitar el registro. Revisa la consola (F12).');
      }
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        empresa_id: empresaId,
        id_empresa: empresaId,
        nombre_producto: productForm.nombre_producto,
        clientes: productForm.clientes,
        porcentaje_produccion: productForm.porcentaje_produccion ? Number(productForm.porcentaje_produccion) : null,
      };
      await client.post('/productos', payload);
      setProductForm(emptyProductForm);
      await loadData();
    } catch (error: any) {
      console.error(" Error backend (Agregar Producto):", error.response?.data || error);
      alert(`Error: ${error.response?.data?.message || 'Error al agregar producto. Revisa consola (F12).'}`);
    }
  };

  const handleUpdateProduct = async (productId: number) => {
    try {
      const payload = {
        nombre_producto: editingProductForm.nombre_producto,
        clientes: editingProductForm.clientes,
        porcentaje_produccion: editingProductForm.porcentaje_produccion ? Number(editingProductForm.porcentaje_produccion) : null,
      };
      await client.patch(`/productos/${productId}`, payload);
      setEditingProductId(null);
      setEditingProductForm(emptyProductForm);
      await loadData();
    } catch (error: any) {
      console.error(" Error backend (Actualizar Producto):", error.response?.data || error);
      alert('Error al actualizar el producto');
    }
  };
  const handleDeleteProduct = async (productId: number) => {
    if (!window.confirm('¿Eliminar producto o servicio?')) return;
    try { await client.delete(`/productos/${productId}`); await loadData(); } catch (error: any) { alert('Error al eliminar'); }
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await client.post('/contactos', { empresa_id: empresaId, ...contactForm, funcion_id: Number(contactForm.funcion_id) }); setContactForm(emptyContactForm); await loadData(); } catch (error: any) { alert('Error al agregar el contacto'); }
  };
  const handleUpdateContact = async (contactId: number) => {
    try { await client.patch(`/contactos/${contactId}`, { ...editingContactForm, funcion_id: Number(editingContactForm.funcion_id) }); setEditingContactId(null); setEditingContactForm(emptyContactForm); await loadData(); } catch (error: any) { alert('Error al actualizar'); }
  };
  const handleDeleteContact = async (contactId: number) => {
    if (!window.confirm('¿Eliminar contacto?')) return;
    try { await client.delete(`/contactos/${contactId}`); await loadData(); } catch (error: any) { alert('Error al eliminar'); }
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

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-100 py-12 px-6">
          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-400">Cargando datos de la empresa...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Editar Empresa</h1>
                <p className="text-sm text-gray-500 mt-1">Datos generales, perfil público, relaciones, productos y contactos.</p>
              </div>
              <button type="button" onClick={() => navigate('/admin')} className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold text-gray-600 transition-colors">
                Volver al Panel
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Datos principales</h2>
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
                    <select value={formData.membresia_id} onChange={e => updateField('membresia_id', e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Seleccionar...</option>
                      {catalogs.membresias.map((item) => ( <option key={item.id_membresia} value={item.id_membresia}>{item.nombre_membresia}</option> ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo de Organización</label>
                    <select value={formData.tipo_organizacion_id} onChange={e => updateField('tipo_organizacion_id', e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500">
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
                  <span className="ml-3 text-sm font-medium text-gray-600 break-all">
                    {logo ? logo.name : 'Ningún archivo nuevo seleccionado'}
                  </span>
                </div>
              </section>

              <div className="flex justify-end pt-4">
                <button type="submit" disabled={saving} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg font-bold shadow-lg shadow-blue-200">
                  {saving ? 'Guardando...' : 'Guardar datos generales'}
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {relationConfigs.map((config) => {
              const selectedIds = new Set((assigned[config.assignedKey] || []).map((item) => item[config.idKey]));
              const available = (catalogs[config.catalogKey] || []).filter((item) => !selectedIds.has(item[config.idKey]));

              return (
                <section key={config.assignedKey} className={`bg-white rounded-xl shadow-sm p-6 ${config.assignedKey === 'necesidades' ? 'lg:col-span-2' : ''}`}>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">{config.title}</h2>
                  <select value="" onChange={e => handleAddRelation(config, e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white mb-4 outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Agregar nuevo...</option>
                    {available.map((item) => ( <option key={item[config.idKey]} value={item[config.idKey]}>{item[config.labelKey]}</option> ))}
                  </select>
                  <div className="flex flex-wrap gap-2">
                    {(assigned[config.assignedKey] || []).map((item) => (
                      <button key={item[config.idKey]} type="button" onClick={() => handleRemoveRelation(config, item[config.idKey])} className="rounded-full bg-blue-50 border border-blue-100 px-3 py-1.5 text-sm font-semibold text-blue-800 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">
                        {item[config.labelKey]} &times;
                      </button>
                    ))}
                    {(assigned[config.assignedKey] || []).length === 0 && ( <p className="text-sm text-gray-400 italic">Sin registros asignados.</p> )}
                  </div>
                </section>
              );
            })}
          </div>

          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Productos y servicios</h2>
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_150px_auto] gap-3 mb-5">
              <input required placeholder="Producto o servicio" value={productForm.nombre_producto} onChange={e => setProductForm({ ...productForm, nombre_producto: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              <input placeholder="Clientes principales" value={productForm.clientes} onChange={e => setProductForm({ ...productForm, clientes: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="number" min="0" max="100" placeholder="% de producción" value={productForm.porcentaje_produccion} onChange={e => setProductForm({ ...productForm, porcentaje_produccion: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg px-4 py-2 text-sm font-semibold">Agregar</button>
            </form>
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg">
              {products.map((product) => (
                <div key={product.id_producto} className="p-4 text-sm min-w-0 overflow-hidden">
                  {editingProductId === product.id_producto ? (
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_140px_auto_auto] gap-3">
                      <input value={editingProductForm.nombre_producto} onChange={e => setEditingProductForm({ ...editingProductForm, nombre_producto: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm" />
                      <input value={editingProductForm.clientes} onChange={e => setEditingProductForm({ ...editingProductForm, clientes: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm" />
                      <input type="number" min="0" max="100" value={editingProductForm.porcentaje_produccion} onChange={e => setEditingProductForm({ ...editingProductForm, porcentaje_produccion: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm" />
                      <button type="button" onClick={() => handleUpdateProduct(product.id_producto)} className="text-blue-600 hover:text-blue-800 font-semibold">Guardar</button>
                      <button type="button" onClick={() => setEditingProductId(null)} className="text-gray-500 hover:text-gray-700 font-semibold">Cancelar</button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-800 break-words [overflow-wrap:anywhere]">{product.nombre_producto}</p>
                        <p className="text-gray-500 mt-1 break-words [overflow-wrap:anywhere]">{product.clientes || 'Sin clientes registrados'} {product.porcentaje_produccion ? `• ${product.porcentaje_produccion}% de producción` : ''}</p>
                      </div>
                      <div className="flex shrink-0 gap-4 mt-2 md:mt-0">
                        <button type="button" onClick={() => startEditProduct(product)} className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">Editar</button>
                        <button type="button" onClick={() => handleDeleteProduct(product.id_producto)} className="text-red-500 hover:text-red-700 font-semibold transition-colors">Eliminar</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {products.length === 0 && <p className="p-5 text-sm text-center text-gray-400 italic">No hay productos o servicios registrados.</p>}
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Directorio de Contactos</h2>
            <form onSubmit={handleAddContact} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 mb-5">
              <input required placeholder="Nombre completo" value={contactForm.nombre_completo} onChange={e => setContactForm({ ...contactForm, nombre_completo: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              <input required placeholder="Puesto de trabajo" value={contactForm.puesto} onChange={e => setContactForm({ ...contactForm, puesto: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              <input required placeholder="Teléfono" value={contactForm.telefono_celular} onChange={e => setContactForm({ ...contactForm, telefono_celular: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="email" placeholder="Correo electrónico" value={contactForm.correo} onChange={e => setContactForm({ ...contactForm, correo: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              <select required value={contactForm.funcion_id} onChange={e => setContactForm({ ...contactForm, funcion_id: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Función...</option>
                {catalogs.funciones.map((item) => ( <option key={item.id_funcion} value={item.id_funcion}>{item.nombre_funcion}</option> ))}
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg px-4 py-2.5 text-sm font-semibold md:col-span-5 shadow-sm">Agregar contacto</button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contacts.map((contact) => (
                <div key={contact.id_contacto} className="min-w-0 overflow-hidden border border-gray-200 bg-gray-50 rounded-xl p-4 text-sm">
                  {editingContactId === contact.id_contacto ? (
                    <div className="grid grid-cols-1 gap-3">
                      <input value={editingContactForm.nombre_completo} onChange={e => setEditingContactForm({ ...editingContactForm, nombre_completo: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm" />
                      <input value={editingContactForm.puesto} onChange={e => setEditingContactForm({ ...editingContactForm, puesto: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm" />
                      <input value={editingContactForm.telefono_celular} onChange={e => setEditingContactForm({ ...editingContactForm, telefono_celular: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm" />
                      <input type="email" value={editingContactForm.correo} onChange={e => setEditingContactForm({ ...editingContactForm, correo: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm" />
                      <select value={editingContactForm.funcion_id} onChange={e => setEditingContactForm({ ...editingContactForm, funcion_id: e.target.value })} className="min-w-0 border border-gray-300 rounded-lg p-2 text-sm bg-white">
                        <option value="">Función...</option>
                        {catalogs.funciones.map((item) => ( <option key={item.id_funcion} value={item.id_funcion}>{item.nombre_funcion}</option> ))}
                      </select>
                      <div className="flex gap-4 pt-2">
                        <button type="button" onClick={() => handleUpdateContact(contact.id_contacto)} className="text-blue-600 hover:text-blue-800 font-semibold">Guardar cambios</button>
                        <button type="button" onClick={() => setEditingContactId(null)} className="text-gray-500 hover:text-gray-700 font-semibold">Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full gap-3 sm:flex-row sm:justify-between">
                      <div className="min-w-0 flex-1 space-y-1">
                        <p className="font-bold text-gray-900 break-words [overflow-wrap:anywhere] text-base">{contact.nombre_completo}</p>
                        <p className="text-gray-600 font-medium break-words [overflow-wrap:anywhere]">{contact.puesto}</p>
                        <p className="text-gray-500 break-words [overflow-wrap:anywhere]">{contact.correo || 'Sin correo'}</p>
                        <p className="text-gray-500 break-words [overflow-wrap:anywhere]">{contact.telefono_celular}</p>
                      </div>
                      <div className="flex sm:flex-col shrink-0 gap-3 sm:gap-2 self-start mt-2 sm:mt-0">
                        <button type="button" onClick={() => startEditContact(contact)} className="text-blue-600 hover:text-blue-800 font-semibold transition-colors text-right">Editar</button>
                        <button type="button" onClick={() => handleDeleteContact(contact.id_contacto)} className="text-red-500 hover:text-red-700 font-semibold transition-colors text-right">Eliminar</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {contacts.length === 0 && <p className="text-sm text-gray-400 md:col-span-2 p-4 text-center italic">No hay contactos registrados para esta empresa.</p>}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}