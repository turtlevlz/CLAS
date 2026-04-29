import { BuildingOffice2Icon, HomeIcon, MegaphoneIcon } from '@heroicons/react/20/solid';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import claslogo from '../assets/img/clas-logo-name.png';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Inicio', to: '/', icon: HomeIcon, end: true },
  { label: 'Directorio', to: '/directorio', icon: BuildingOffice2Icon },
  { label: 'Noticias', to: '/noticias', icon: MegaphoneIcon },
];

export default function Navbar() {
  const { usuarioActual, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-[100] grid h-[90px] grid-cols-[1fr_auto_1fr] items-center bg-white px-10 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] max-md:px-5">
      
      {/* Logo */}
      <Link to="/" className="flex items-center justify-self-start gap-3 no-underline">
        <img src={claslogo} alt="Logo CLAS" className="max-h-15" />
      </Link>

      {/* Links Centrales con Íconos */}
      <ul className="flex list-none items-center gap-4 justify-self-center max-md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <NavLink 
                to={item.to} 
                className={({ isActive }) => `flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} 
                end={item.end}
              >
                <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
        
        {/* Tu lógica: Solo mostrar Panel Admin si hay usuario */}
        {usuarioActual && (
          <li>
            <NavLink 
              to="/admin" 
              className={({ isActive }) => `flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-600'}`}
            >
              <span>Panel Admin</span>
            </NavLink>
          </li>
        )}
      </ul>

      {/* Tu lógica: Botón Dinámico de Login/Logout */}
      <div className="justify-self-end">
        {usuarioActual ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 font-body rounded-[15px] px-7 py-3 text-sm font-semibold text-white no-underline shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition hover:bg-red-700"
          >
            Cerrar Sesión
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-[#1a2b4c] font-body rounded-[15px] px-7 py-3 text-sm font-semibold text-white no-underline shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition hover:bg-blue-900"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
}