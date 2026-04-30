import { BuildingOffice2Icon, HomeIcon, MegaphoneIcon, UserIcon } from '@heroicons/react/20/solid';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import claslogo from '../assets/img/clas-logo-name.png';
import { useAuth } from '../context/AuthContext';

const navItems = [
  {
    label: 'Inicio',
    to: '/',
    icon: HomeIcon,
    end: true,
  },
  {
    label: 'Directorio',
    to: '/directorio',
    icon: BuildingOffice2Icon,
  },
  {
    label: 'Noticias',
    to: '/noticias',
    icon: MegaphoneIcon,
  },
];

// Estilo del equipo conservado
const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'font-body inline-flex min-w-[150px] items-center justify-center gap-2 rounded-[10px] px-4 py-1.5 text-xl font-normal no-underline transition-colors duration-200',
    isActive
      ? 'bg-[rgba(17,129,229,0.1)] text-primary'
      : 'text-text-muted hover:text-primary',
  ].join(' ');

export default function Navbar() {
  const { usuarioActual, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-[100] grid h-[90px] grid-cols-[1fr_auto_1fr] items-center bg-white px-10 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] max-md:px-5">
      <Link to="/" className="flex items-center justify-self-start gap-3 no-underline">
        <img src={claslogo} alt="Logo CLAS" className="max-h-15" />
      </Link>

      <ul className="flex list-none items-center gap-4 justify-self-center max-md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.to}>
              <NavLink to={item.to} className={linkClass} end={item.end}>
                <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          );
        })}

        {/* Lógica de Seguridad de Carlos */}
        {usuarioActual && [1, 2].includes(usuarioActual.rol_id) && (
          <li>
            <NavLink to="/admin" className={linkClass}>
              <span>Panel Admin</span>
            </NavLink>
          </li>
        )}

        {usuarioActual?.rol_id === 3 && (
          <li>
            <NavLink to="/mi-cuenta" className={linkClass}>
            <UserIcon aria-hidden="true" className="h-5 w-5 shrink-0"/>
              <span>Mi cuenta</span>
            </NavLink>
          </li>
        )}
      </ul>

      <div className="justify-self-end">
        {/* Botón dinámico con clases del equipo */}
        {usuarioActual ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 font-body rounded-[15px] px-7 py-3 text-lg font-semibold text-white no-underline shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-opacity duration-200 hover:opacity-90"
          >
            Cerrar Sesión
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-primary-dark font-body rounded-[15px] px-7 py-3 text-lg font-semibold text-white no-underline shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-opacity duration-200 hover:opacity-90"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
}
