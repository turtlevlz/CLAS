// Navbar principal de CLAS
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <div className="navbar-logo-icon"></div>
        <div className="navbar-logo-text">
          <span className="navbar-logo-title">CLAS</span>
          <span className="navbar-logo-subtitle">Cluster Automotriz De Sonora</span>
        </div>
      </Link>

      {/* Links de navegación */}
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''} end>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/directorio" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Directorio
          </NavLink>
        </li>
        <li>
          <NavLink to="/noticias" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Noticias
          </NavLink>
        </li>
      </ul>

      {/* Botón login */}
      <Link to="/login" className="navbar-btn">
        Iniciar Sesión
      </Link>
    </nav>
  )
}
