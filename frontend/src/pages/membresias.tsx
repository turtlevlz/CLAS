import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingCard from '../components/MembresiaCard';
import { useNavigate } from 'react-router-dom';


const Membresias = () => {
  const [ctaVisible, setCtaVisible] = useState(false);
  const ctaRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCtaVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ctaRef.current) observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  const pricingData = [
    { tier: "Gobierno", price: 400, description: "Para organismos públicos enfocados en la atracción de inversión, políticas de desarrollo y fortalecimiento del ecosistema económico.", color: "bg-cyan-400", features: [{text: "Acceso a indicadores estadísticos del sector.", included: true}, {text: "Presencia de marca en eventos institucionales.", included: true}, {text: "Participación en mesas de desarrollo económico.", included: true}] },
    { tier: "Afiliados", price: 300, description: "Para consultoras y universidades que desean vincular su talento y servicios con las necesidades reales de las plantas automotrices." ,color: "bg-blue-600", features: [{text: "Espacio para talleres y transferencia de conocimiento.", included: true}, {text: "Acceso al directorio general de asociados.", included: true}, {text: "Acceso al directorio general de asociados.", included: true}] },
    { tier: "Asociados", price: 200, description: "Para fabricantes y proveedores que buscan optimizar su cadena de suministro, acceder a certificaciones y potenciar su competitividad global.", color: "bg-indigo-900", features: [{text: "Vinculación directa en encuentros B2B (Tier 1 & 2).", included: true}, {text: "Subsidios en certificaciones de calidad (ISO/IATF).", included: true}, {text: "Representación en misiones comerciales internacionales.", included: true}] },
  ];

  const navigate = useNavigate();

return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      <section className="bg-linear-to-r from-[rgb(20,140,180)] to-[rgb(44,65,154)] pt-16 pb-40 px-4 text-center">
        <button onClick={() => navigate('/')} className="text-white mb-8 hover:opacity-80 flex items-center mx-auto gap-2">
          ← Volver al inicio
        </button>
        <h1 className="text-white text-5xl font-bold mb-6">Conoce los Tiers de Asociados</h1>
        <p className="text-white/90 max-w-2xl mx-auto text-lg leading-relaxed">
          Contamos con diferentes tiers para el Clúster acorde a las necesidades de cada uno de nuestros socios.
        </p>
      </section>

      <main className="flex-grow bg-white relative">
        <div 
          ref={ctaRef}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 -mt-24 mb-10"
        >
          {pricingData.map((data) => (
            <PricingCard key={data.tier} {...data} isVisible={ctaVisible} />
          ))}
        </div>

        <div className="text-center mb-20">
          <p className="text-gray-600 mb-4">Ponte en contacto y solicita tu membresia</p>
          <a 
            href="mailto:direccion@clas.com.mx?subject=Información sobre Membresías CLAS"
            className="inline-block bg-[rgb(44,65,154)] hover:bg-[rgb(20,140,180)] text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg"
          >
            Contactar por correo
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Membresias;