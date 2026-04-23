export default function Footer() {
  return (
    <footer className="bg-footer text-white pt-[50px] px-20 pb-[30px] max-md:pt-10 max-md:px-6 max-md:pb-5">
      <div className="grid grid-cols-3 gap-10 mb-10 max-md:grid-cols-1">
        <div>
          <div className="font-heading font-bold text-[28px] text-[#FFF5F5] mb-1">CLAS</div>
          <div className="font-heading font-light text-[13px] text-text-muted mb-4">Cluster Automotriz De Sonora</div>
          <p className="font-body text-base text-[#B3B3B3] leading-[1.6]">
            Fortaleciendo la industria automotriz en Sonora a través de la colaboración y la innovación.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-bold text-2xl text-white mb-5 uppercase">Contacto</h4>
          <p className="font-body text-base text-[#B3B3B3] font-bold block mb-2">Email: contacto@clas-sonora.mx</p>
          <p className="font-body text-base text-[#B3B3B3] font-bold block mb-2">Teléfono: +52 (662) 123-4567</p>
          <p className="font-body text-base text-[#B3B3B3] font-bold block mb-2">Hermosillo, Sonora, México</p>
        </div>

        <div>
          <h4 className="font-heading font-bold text-2xl text-white mb-5 uppercase">Enlaces</h4>
          <a href="#" className="font-body text-base text-[#B3B3B3] font-bold block mb-2 no-underline text-center hover:text-white">Acerca de CLAS</a>
          <a href="#" className="font-body text-base text-[#B3B3B3] font-bold block mb-2 no-underline text-center hover:text-white">Beneficios</a>
          <a href="#" className="font-body text-base text-[#B3B3B3] font-bold block mb-2 no-underline text-center hover:text-white">Eventos</a>
        </div>
      </div>

      <div className="border-t border-[#333] pt-5 text-center text-xs text-white font-body">
        © 2026 CLAS - Cluster Automotriz de Sonora. Todos los derechos reservados.
      </div>
    </footer>
  )
}
