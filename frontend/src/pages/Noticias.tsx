import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const noticias = [
  {
    id: '1',
    categoria: 'Inversión',
    titulo: 'Inversión de $50 Millones USD en Nueva Planta de Autopartes',
    descripcion:
      'Empresa internacional anuncia la instalación de su planta en Hermosillo.',
    fecha: '10 Febrero, 2026',
    imagen:
      'https://images.unsplash.com/photo-1581090700227-1e37b190418e',
  },
  {
    id: '2',
    categoria: 'Tecnología',
    titulo: 'CLAS Firma Convenio con Universidad de Sonora para Desarrollo de Talento',
    descripcion:
      'Se establece alianza estratégica para crear programas especializados en ingeniería automotriz.',
    fecha: '15 Febrero, 2026',
    autor: 'Dirección CLAS',
    imagen:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
  },
  {
    id: '3',
    categoria: 'Eventos',
    titulo: 'Cumbre Automotriz 2026: Innovación y Sustentabilidad',
    descripcion:
      'Más de 300 empresarios se reunirán en marzo para discutir el futuro del sector.',
    fecha: '5 Febrero, 2026',
    imagen:
      'https://images.unsplash.com/photo-1515169067868-5387ec356754',
  },
  {
    id: '4',
    categoria: 'Certificación',
    titulo: 'Certificación IATF 16949 para 15 Empresas Miembro',
    descripcion:
      'CLAS apoya proceso que fortalece la competitividad de empresas locales.',
    fecha: '28 Enero, 2026',
    imagen:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df',
  },
  {
    id: '5',
    categoria: 'Economía',
    titulo: 'Exportaciones del Sector Crecen 18% en 2025',
    descripcion:
      'El cluster automotriz de Sonora registra cifras récord en exportaciones.',
    fecha: '20 Enero, 2026',
    imagen:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
  },
]

export default function Noticias() {
  const navigate = useNavigate()
  const destacada = noticias[0]

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">

        {/* HEADER */}
        <section className="mb-14">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
            Noticias y Actualizaciones
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Mantente informado sobre los últimos acontecimientos del cluster automotriz.
          </p>
        </section>

        {/* DESTACADA */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">

            <img
              src={destacada.imagen}
              alt={destacada.titulo}
              className="h-full w-full object-cover"
            />

            <div className="p-10 flex flex-col justify-center">
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium w-fit mb-5">
                {destacada.categoria}
              </span>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {destacada.titulo}
              </h2>

              <p className="text-gray-600 mb-6">
                {destacada.descripcion}
              </p>

              <div className="flex gap-6 text-sm text-gray-400 mb-6">
                <span>{destacada.fecha}</span>
                <span>{destacada.autor}</span>
              </div>

              <button
                onClick={() => navigate(`/noticias/${destacada.id}`)}
                className="bg-[#052440] text-white px-6 py-3 rounded-lg w-fit hover:opacity-90 transition"
              >
                Leer más →
              </button>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
            Noticias Recientes
          </h2>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {noticias.slice(1).map((noticia) => (
              <article
                key={noticia.id}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <div className="overflow-hidden">
                  <img
                    src={noticia.imagen}
                    alt={noticia.titulo}
                    className="h-52 w-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-6">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs mb-3 inline-block">
                    {noticia.categoria}
                  </span>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {noticia.titulo}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">
                    {noticia.descripcion}
                  </p>

                  <p className="text-xs text-gray-400 mb-4">
                    {noticia.fecha}
                  </p>

                  <button
                    onClick={() => navigate(`/noticias/${noticia.id}`)}
                    className="w-full border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-50 transition"
                  >
                    Leer más
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="bg-[#0F4C81] text-white rounded-2xl p-10 text-center">
          <h3 className="text-3xl font-bold mb-2">
            Suscríbete a Nuestro Boletín
          </h3>
          <p className="text-blue-200 mb-6">
            Recibe las últimas noticias directamente en tu correo
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded-md text-black"
            />
            <button className="bg-white text-black px-5 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
              Suscribirme
            </button>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}