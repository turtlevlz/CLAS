// Footer principal de CLAS
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Columna 1: Logo y descripción */}
        <div className="footer-col">
          <div className="footer-logo-title">CLAS</div>
          <div className="footer-logo-subtitle">Cluster Automotriz De Sonora</div>
          <p className="footer-description">
            Fortaleciendo la industria automotriz en Sonora a través de la colaboración y la innovación.
          </p>
        </div>

        {/* Columna 2: Contacto */}
        <div className="footer-col">
          <h4>Contacto</h4>
          <p>Email: contacto@clas-sonora.mx</p>
          <p>Teléfono: +52 (662) 123-4567</p>
          <p>Hermosillo, Sonora, México</p>
        </div>

        {/* Columna 3: Enlaces */}
        <div className="footer-col">
          <h4>Enlaces</h4>
          <a href="#">Acerca de CLAS</a>
          <a href="#">Beneficios</a>
          <a href="#">Eventos</a>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 CLAS - Cluster Automotriz de Sonora. Todos los derechos reservados.
      </div>
    </footer>
  )
}
