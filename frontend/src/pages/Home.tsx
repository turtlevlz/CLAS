import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { StatCounter } from '../components/StatCounter';
import { useState, useEffect, useRef } from 'react';
import { 
  ArrowRightIcon, 
  UserGroupIcon, 
  LightBulbIcon, 
  AcademicCapIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

export default function Home() {
  const stats = [
    { label: "Empresas Miembro", value: "150+" },
    { label: "Empleos Generados", value: "12k+" },
    { label: "Años de Experiencia", value: "25+" },
    { label: "Valor Agregado Anual", value: "$2.5B" },
  ];

  const ctaRef = useRef(null);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCtaVisible(true);
        }
      },
      { threshold: 0.3 } 
    );

    if (ctaRef.current) observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a0/Ford_Motor_Company_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d8/Schnellecke_Logistics_Logo.svg",
  "https://recruiting.paylocity.com/recruiting/jobs/GetLogoFile?moduleId=37188",
  "https://static.cdnlogo.com/logos/m/36/monta-plast.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/02/Lear_Corporation_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/41/Faurecia_logo-RVB.jpg",
  "https://media.licdn.com/dms/image/v2/D560BAQFevtTBnPINug/company-logo_200_200/company-logo_200_200/0/1736454120166/suppliers_city_logo?e=2147483647&v=beta&t=6sr2haV6Dbq-CLJXZg7wV8JEhjT0KlhanH7wIr20i9c",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5oqIN_X46q5DDEYQv6IUd8X8r4mPG_0sDOw&s"
];

  const benefits = [
    { 
      title: "Networking", 
      desc: "Conecte con más de 150 empresas del sector automotriz en Sonora.", 
      icon: UserGroupIcon 
    },
    { 
      title: "Desarrollo", 
      desc: "Acceso a oportunidades de colaboración y proyectos conjuntos.", 
      icon: LightBulbIcon 
    },
    { 
      title: "Capacitación", 
      desc: "Programas de formación y actualización para su equipo técnico.", 
      icon: AcademicCapIcon 
    },
    { 
      title: "Certificaciones", 
      desc: "Apoyo en procesos de certificación y mejora de estándares.", 
      icon: ShieldCheckIcon 
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* --- SECCIÓN HERO --- */}
        <section className="bg-linear-to-r from-[rgb(20,140,180)] to-[rgb(44,65,154)] py-20 lg:py-18 px-10">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-white">
              <h1 className="text-4xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-5">
                Impulsando la Industria Automotriz de Sonora
              </h1>
              <p className="text-xl opacity-90 mb-10 leading-relaxed max-w-xl font-medium">
                CLAS es el principal cluster automotriz del estado, promoviendo la competitividad, innovación y crecimiento sostenible del sector.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/directorio" className="bg-white text-[#005bb7] px-8 py-4 rounded-xl font-black text-lg flex items-center gap-3 shadow-xl hover:bg-slate-50 transition-all">
                  Ver Directorio <ArrowRightIcon className="w-6 h-6 stroke-[3]" />
                </Link>
                <button onClick={() => document.getElementById('seccion-quienes-somos')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                  Quiénes Somos
                </button>
              </div>
            </div>
            
            <div className="flex-1 w-full">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop" 
                  alt="Industria Automotriz"
                  className="rounded-[3rem] shadow-2xl border-4 border-white/10 w-full object-cover h-[500px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- SECCIÓN STATS ACTUALIZADA --- */}
        <section className="py-20 bg-white">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="px-10 grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <StatCounter value={stat.value}/>
                <div className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em] ">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECCIÓN BENEFICIOS (CARDS) --- */}
        <section className="bg-slate-50/50 py-20 border-y border-slate-100">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="px-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Beneficios de ser Miembro</h2>
              <p className="text-slate-500 font-medium text-lg">Únase a la red más importante de empresas automotrices en Sonora.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((b, idx) => (
                <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-blue-50 text-[rgb(68,111,182)] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[rgb(44,65,154)] group-hover:text-white transition-colors duration-300">
                    <b.icon className="w-7 h-7 stroke-[2]" />
                  </div>
                  <h3 className="font-black text-xl mb-4 text-slate-900">{b.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm font-medium">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECCIÓN CARRUSEL DE EMPRESAS --- */}
        <section className="py-20 bg-slate-50/50 overflow-hidden">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-2">Alianzas Estratégicas</h2>
            <p className="text-3xl font-black text-primary-dark italic">Empresas Asociadas</p>
          </div>

          <div className="w-full overflow-hidden flex">
            <div className="animate-carousel cursor-pointer">
              
              {[...logos, ...logos].map((src, index) => (
                <div key={index} className="logo-container">
                  <img 
                  src={src} 
                  alt="Logo" 
                  className="h-18 w-40 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all object-contain" 
                />
                </div>
              ))}
              
            </div>
          </div>
        </section>

        {/* --- SECCIÓN MISIÓN Y VISIÓN --- */}
        <section className="py-20 bg-neutral-100">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="px-10 flex flex-col md:flex-row items-center gap-16">
            
            <div className="flex-1 w-full">
              <div className="relative group">
                <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] -z-10 group-hover:bg-blue-50 transition-colors"></div>
                <img 
                  src="https://mecaluxmx.cdnwm.com/img/blog/logistica-industria-automotriz.1.11.jpg" 
                  alt="Mecánico trabajando en motor" 
                  className="rounded-[2.5rem] shadow-2xl w-full h-[450px] object-cover border-4 border-white"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-12">
                <h2 className="text-4xl font-black text-primary-dark mb-6 tracking-tight">Nuestra Misión</h2>
                <p className="text-text-muted text-lg leading-relaxed font-medium">
                  Fortalecer la competitividad del sector automotriz en Sonora mediante la colaboración entre empresas, 
                  gobierno y academia, impulsando la innovación, el desarrollo de talento y la atracción de inversiones.
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-black text-primary-dark mb-6 tracking-tight">Visión 2030</h2>
                <p className="text-text-muted text-lg leading-relaxed font-medium">
                  Ser el cluster automotriz más innovador y competitivo de México, reconocido internacionalmente 
                  por su excelencia operativa y contribución al desarrollo económico sustentable de la región.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* --- SECCIÓN QUIÉNES SOMOS / EQUIPO --- */}
        <section id="seccion-quienes-somos" className="py-20 bg-white">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="px-10">
            
            {/* Encabezado */}
            <div className="text-center max-w-4xl mx-auto mb-20">
              <h2 className="text-5xl font-black text-primary-dark mb-8">¿Quiénes Somos?</h2>
              <p className="text-text-muted text-lg leading-relaxed font-medium">
                En CLAS (Clúster Automotriz de Sonora) trabajamos para fortalecer y conectar el ecosistema automotriz del estado. 
                Somos un equipo multidisciplinario comprometido con impulsar la colaboración entre empresas, proveedores, 
                instituciones académicas y organismos gubernamentales.
              </p>
            </div>

            {/* Grid de Equipo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {[
                { name: "Juan Carlos Campoy Ramos", role: "Presidente", empresa: "New Concept Technology", correo: "presidencia@clas.com.mx", image:"https://img1.wsimg.com/isteam/ip/dcf17818-4267-46ce-a60c-cfa6c45c9047/blob-8fa2f20.png/:/cr=t:14.81%25,l:5.78%25,w:84.75%25,h:51.43%25/rs=w:730,h:730,cg:true,m" },
                { name: "Mario Alberto Montiel Guzmán", role: "Vicepresidente", empresa: "Schnellecke Logistics México", correo: "vicepresidencia@clas.com.mx", image:"https://img1.wsimg.com/isteam/ip/dcf17818-4267-46ce-a60c-cfa6c45c9047/Imagen%20de%20WhatsApp%202025-07-09%20a%20las%2013.07.50_b.jpg/:/cr=t:0%25,l:15.14%25,w:66.81%25,h:70.43%25/rs=w:730,h:730,cg:true,m" },
                { name: "Diego Cacho Campillo", role: "Tesorero", empresa: "Grupo Industrial ESD", correo: "tesoreria@clas.com.mx", image:"https://img1.wsimg.com/isteam/ip/dcf17818-4267-46ce-a60c-cfa6c45c9047/Diego%20Cacho.jpg/:/cr=t:2.17%25,l:0%25,w:100%25,h:71.41%25/rs=w:730,h:730,cg:true" },
                { name: "Margarita Bejarano Celaya", role: "Directora", empresa: "CLAS", correo: "direccion@clas.com.mx", image:"https://img1.wsimg.com/isteam/ip/dcf17818-4267-46ce-a60c-cfa6c45c9047/blob-074403d.png/:/cr=t:0%25,l:15.07%25,w:48.08%25,h:32.04%25/rs=w:730,h:730,cg:true,m"}
              ].map((member, idx) => (
                <div key={idx} className="group bg-white border border-slate-200 rounded-[2rem] p-8 shadow-lg text-center hover:-translate-y-2 transition-transform duration-300">
                  
                  {/* Avatar */}
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner bg-slate-100">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="text-2xl font-black text-primary-dark mb-2">{member.name}</h3>
                  <p className="text-text-muted font-bold text-sm mb-5 h-8 flex items-center justify-center">
                    {member.role}
                  </p>
                  <p className='text-text-muted font-bold text-sm mb-10 h-2 flex items-center justify-center'>
                    {member.empresa}
                  </p>

                  {/* CORREO COMO TEXTO */}
                  <a 
                    href={`mailto:${member.correo}`} 
                    className="block text-primary font-medium text-sm mb-8 hover:text-primary-dark transition-colors duration-300"
                  >
                    {member.correo}
                  </a>

                  {/* Redes Sociales */}
                  <div className="flex justify-center gap-3">
                    {/* LinkedIn */}
                    <a href="#" className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-[#0077b5] hover:text-white transition-all shadow-sm group/icon">
                      <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>

                    {/* X (Twitter) */}
                    <a href="#" className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-gray-500 hover:text-white transition-all shadow-sm">
                      <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a href="#" className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-[#e4405f] hover:text-white transition-all shadow-sm">
                      <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA FINAL --- */}
        <section ref={ctaRef} className="bg-linear-to-r from-[rgb(20,140,180)] to-[rgb(44,65,154)] py-20 text-center overflow-hidden">
          <div className="max-w-4xl mx-auto px-10">
            <h2 
              className={`text-5xl font-black text-white mb-8 tracking-tight italic transform transition-all duration-1000 ease-out
                ${ctaVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}
              `}
            >
              ¿Listo para unirse a CLAS?
            </h2>
            <p 
              className={`text-white/80 text-xl mb-12 font-medium transform transition-all duration-1000 delay-300 ease-out
                ${ctaVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
              `}
            >
              Forma parte del ecosistema automotriz más dinámico de Sonora.
            </p>
            <div 
              className={`transform transition-all duration-1000 delay-500 ease-out
                ${ctaVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
              `}
            >
              <button className="bg-white text-[#004a99] px-14 py-5 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 transition-transform duration-300">
                Solicitar membresía
              </button>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}