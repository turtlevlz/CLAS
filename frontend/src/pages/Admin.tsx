import { useState } from 'react'
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
  TrashIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const usuarios = [
  { id: 1, email: 'LuisHernandez@gmail.com', nombre: 'Luis Ignacio', apellidos: 'Hernandez Lopez', empresa: 'Ford Motor Company' },
  { id: 2, email: 'LuisHernandez@gmail.com', nombre: 'Luis Ignacio', apellidos: 'Hernandez Lopez', empresa: 'Ford Motor Company' },
  { id: 3, email: 'LuisHernandez@gmail.com', nombre: 'Luis Ignacio', apellidos: 'Hernandez Lopez', empresa: 'Ford Motor Company' },
  { id: 4, email: 'LuisHernandez@gmail.com', nombre: 'Luis Ignacio', apellidos: 'Hernandez Lopez', empresa: 'Ford Motor Company' },
  { id: 5, email: 'LuisHernandez@gmail.com', nombre: 'Luis Ignacio', apellidos: 'Hernandez Lopez', empresa: 'Ford Motor Company' },
  { id: 6, email: 'LuisHernandez@gmail.com', nombre: 'Luis Ignacio', apellidos: 'Hernandez Lopez', empresa: 'Ford Motor Company' },
  { id: 7, email: 'LuisHernandez@gmail.com', nombre: 'Luis Ignacio', apellidos: 'Hernandez Lopez', empresa: 'Ford Motor Company' },
  { id: 8, email: 'LuisHernandez@gmail.com', nombre: 'Luis Ignacio', apellidos: 'Hernandez Lopez', empresa: 'Ford Motor Company' },
  { id: 9, email: 'LuisHernandez@gmail.com', nombre: 'Luis Ignacio', apellidos: 'Hernandez Lopez', empresa: 'Ford Motor Company' },
  { id: 10, email: 'LuisHernandez@gmail.com', nombre: 'Luis Ignacio', apellidos: 'Hernandez Lopez', empresa: 'Ford Motor Company' },
]

function PanelUsuarios() {
  const [busqueda, setBusqueda] = useState('')

  const filtrados = usuarios.filter(u =>
    u.email.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.empresa.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Panel de administrador</h1>
      <p className="text-text-muted mb-6">Gestión y Administración de los Perfiles Socio de CLAS.</p>

      <div className="flex items-center justify-between mb-4">
        <button className="flex items-center gap-2 bg-success text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
          <PlusIcon className="w-5 h-5" />
          Agregar Usuario
        </button>

        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-72">
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Buscar Usuarios..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="outline-none text-sm w-full text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 w-fit mb-4 cursor-pointer hover:bg-gray-50">
        <FunnelIcon className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">Agregar Filtros</span>
        <ChevronDownIcon className="w-4 h-4 text-gray-500" />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Correo Electrónico</th>
              <th className="px-4 py-3 font-medium">Nombre(s)</th>
              <th className="px-4 py-3 font-medium">Apellidos</th>
              <th className="px-4 py-3 font-medium">Empresa</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtrados.map(u => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">{u.email}</td>
                <td className="px-4 py-3 text-gray-700">{u.nombre}</td>
                <td className="px-4 py-3 text-gray-700">{u.apellidos}</td>
                <td className="px-4 py-3 text-gray-700">{u.empresa}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-end">
                    <button className="flex items-center gap-1.5 bg-[#EF4444] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity">
                      <TrashIcon className="w-3.5 h-3.5" />
                      Borrar
                    </button>
                    <button className="flex items-center gap-1.5 bg-[#F97316] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity">
                      <PencilSquareIcon className="w-3.5 h-3.5" />
                      Modificar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <span>Usuarios Por Página: 10</span>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <button className="hover:text-primary">‹</button>
          <span>Página 1 de 1</span>
          <button className="hover:text-primary">›</button>
        </div>
      </div>
    </div>
  )
}

function PanelEmpresa() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Mi Empresa</h1>
      <p className="text-text-muted mb-6">Información de tu organización registrada en CLAS.</p>

      <div className="grid grid-cols-2 gap-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la empresa</label>
          <input defaultValue="Ford Motor Company" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rubro</label>
          <input defaultValue="Manufactura automotriz" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo de contacto</label>
          <input defaultValue="contacto@ford.com.mx" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input defaultValue="+52 (662) 555-1234" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
          <input defaultValue="Hermosillo, Sonora, México" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary" />
        </div>
      </div>

      <button className="mt-6 bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
        Guardar cambios
      </button>
    </div>
  )
}

export default function Admin() {
  const [tab, setTab] = useState<'usuarios' | 'empresa'>('usuarios')

  const tabClass = (t: string) =>
    tab === t
      ? 'px-5 py-2 text-sm font-semibold text-primary border-b-2 border-primary'
      : 'px-5 py-2 text-sm text-text-muted hover:text-primary transition-colors'

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-gray-100 py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="flex border-b border-gray-200 px-2 pt-2">
              <button onClick={() => setTab('usuarios')} className={tabClass('usuarios')}>Usuarios</button>
              <button onClick={() => setTab('empresa')} className={tabClass('empresa')}>Mi Empresa</button>
            </div>
            <div className="p-6">
              {tab === 'usuarios' ? <PanelUsuarios /> : <PanelEmpresa />}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
