import { Link, NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'font-body text-xl font-normal text-primary bg-[rgba(17,129,229,0.1)] px-4 py-1.5 rounded-[10px] no-underline'
    : 'font-body text-xl font-normal text-text-muted no-underline transition-colors duration-200 hover:text-primary'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-[100] flex items-center justify-between px-10 h-[90px] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.08)] max-md:px-5">
      <Link to="/" className="flex items-center gap-3 no-underline">
        <div className="w-[50px] h-[50px] border-[3px] border-black flex items-center justify-center relative before:content-[''] before:absolute before:w-[65px] before:h-[3px] before:bg-black before:rotate-45 after:content-[''] after:absolute after:w-[65px] after:h-[3px] after:bg-black after:-rotate-45" />
        <div className="flex flex-col">
          <span className="font-heading font-bold text-[28px] text-black leading-none">CLAS</span>
          <span className="font-heading font-light text-xs text-text-muted">Cluster Automotriz De Sonora</span>
        </div>
      </Link>

      <ul className="flex items-center gap-10 list-none max-md:hidden">
        <li><NavLink to="/" className={linkClass} end>Inicio</NavLink></li>
        <li><NavLink to="/directorio" className={linkClass}>Directorio</NavLink></li>
        <li><NavLink to="/noticias" className={linkClass}>Noticias</NavLink></li>
      </ul>

      <Link
        to="/login"
        className="bg-primary-dark text-white font-body text-lg font-semibold px-7 py-3 rounded-[15px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] no-underline transition-opacity duration-200 hover:opacity-90"
      >
        Iniciar Sesión
      </Link>
    </nav>
  )
}