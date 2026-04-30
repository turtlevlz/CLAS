import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import clasLogo from '../assets/img/clas-logo.png';

export default function Footer() {
  return (
    <footer className="bg-footer text-white">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          <div className="md:col-span-1">
            <div className="flex items-start gap-3 mb-4">
              <img src={clasLogo} alt="CLAS" className="h-14 w-auto" />
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Cluster Automotriz de Sonora. Fortaleciendo la industria automotriz regional a través de la colaboración.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/clusterautomotrizdesonora/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary flex items-center justify-center transition-colors no-underline"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61568197160101"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary flex items-center justify-center transition-colors no-underline"
                aria-label="Facebook"
              >
                <FaFacebook size={16} />
              </a>
              <a
                href="https://www.instagram.com/clusterautomotrizsonora/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary flex items-center justify-center transition-colors no-underline"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-white/40 mb-5">Navegación</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-sm text-white/60 hover:text-white transition-colors no-underline">Inicio</a></li>
              <li><a href="/directorio" className="text-sm text-white/60 hover:text-white transition-colors no-underline">Directorio</a></li>
              <li><a href="/noticias" className="text-sm text-white/60 hover:text-white transition-colors no-underline">Noticias</a></li>
              <li><a href="/login" className="text-sm text-white/60 hover:text-white transition-colors no-underline">Iniciar sesión</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-white/40 mb-5">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span className="text-sm text-white/60">contacto@clas-sonora.mx</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span className="text-sm text-white/60">+52 (662) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="text-sm text-white/60">Hermosillo, Sonora, México</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-white/40 mb-5">Membresía</h4>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              ¿Tu empresa forma parte del sector automotriz de Sonora? Únete a la red.
            </p>
            <a
              href="/membresias"
              className="inline-block bg-primary hover:opacity-90 transition-opacity text-white text-sm font-semibold px-4 py-2.5 rounded-lg no-underline"
            >
              Solicitar membresía
            </a>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-xs text-white/30">
            © 2026 CLAS — Cluster Automotriz de Sonora. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
            <span className="text-xs text-white/30">Hermosillo, Sonora</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
