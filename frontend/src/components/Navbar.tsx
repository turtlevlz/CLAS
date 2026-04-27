import { Link, NavLink, useNavigate } from 'react-router-dom'
import claslogo from '../assets/img/clas-logo-name.png'
import { useAuth } from '../context/AuthContext'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'font-body text-xl font-normal text-primary bg-[rgba(17,129,229,0.1)] px-4 py-1.5 rounded-[10px] no-underline'
    : 'font-body text-xl font-normal text-text-muted no-underline transition-colors duration-200 hover:text-primary'

export default function Navbar() {
  const { usuarioActual, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-[100] flex items-center justify-between px-10 h-[90px] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.08)] max-md:px-5">
      <Link to="/" className="flex items-center gap-3 no-underline">
        <img src={claslogo} alt="Logo CLAS" className="max-h-15"/>
      </Link>

      <ul className="flex items-center gap-10 list-none max-md:hidden">
        <li><NavLink to="/" className={linkClass} end>Inicio</NavLink></li>
        <li><NavLink to="/directorio" className={linkClass}>Directorio</NavLink></li>
        <li><NavLink to="/noticias" className={linkClass}>Noticias</NavLink></li>
        {usuarioActual && (
          <li><NavLink to="/admin" className={linkClass}>Panel Admin</NavLink></li>
        )}
      </ul>

      {usuarioActual ? (
        <button
          onClick={handleLogout}
          className="bg-primary-dark text-white font-body text-lg font-semibold px-7 py-3 rounded-[15px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] no-underline transition-opacity duration-200 hover:opacity-90 cursor-pointer"
        >
          Cerrar Sesión
        </button>
      ) : (
        <Link
          to="/login"
          className="bg-primary-dark text-white font-body text-lg font-semibold px-7 py-3 rounded-[15px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] no-underline transition-opacity duration-200 hover:opacity-90"
        >
          Iniciar Sesión
        </Link>
      )}
    </nav>
  )
}