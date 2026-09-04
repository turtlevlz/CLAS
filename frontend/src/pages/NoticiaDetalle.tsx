import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import newsPartnership from '../assets/img/news-partnership.svg'
import newsInvestment from '../assets/img/news-investment.svg'
import newsSummit from '../assets/img/news-summit.svg'

const noticias = [
  {
    id: '1',
    categoria: 'Tecnología',
    titulo: 'Directorio Demo Firma Convenio con Universidad Regional para Desarrollo de Talento',
    resumen:
      'Se establece alianza estratégica para crear programas especializados en ingeniería automotriz y formación de profesionales del sector.',
    fecha: '15 de Febrero, 2026',
    autor: 'Dirección Directorio Demo',
    imagen: newsPartnership,
    contenido: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in ex maximus, suscipit magna eget, volutpat tortor.',
      'Suspendisse luctus lobortis sapien id mattis. Donec non lobortis elit, et tristique mauris.',
      'Etiam ac velit non quam vestibulum sagittis. Suspendisse tincidunt libero at mi tempus.',
      'Morbi ornare tincidunt varius. Duis eu eros ut mi tempor pharetra.',
      'Suspendisse vestibulum fringilla neque ut pellentesque. Vestibulum iaculis, purus quis ultricies mollis.',
    ],
  },
]

const otrasNoticias = [
  {
    id: '2',
    titulo: 'Inversión de $50 Millones USD en Nueva Planta de Autopartes',
    descripcion:
      'Empresa internacional anuncia la instalación de su planta en Hermosillo.',
    imagen: newsInvestment,
  },
  {
    id: '3',
    titulo: 'Cumbre Automotriz 2026: Innovación y Sustentabilidad',
    descripcion:
      'Más de 300 empresarios se reunirán en marzo para discutir el futuro del sector.',
    imagen: newsSummit,
  },
]

export default function NoticiaDetalle() {
  const { id } = useParams()

  const noticia = noticias.find((n) => n.id === id) || noticias[0]

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12">

        {/* Header */}
        <section className="mb-10 border-b border-gray-300 pb-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <span className="text-2xl font-bold text-gray-900">
              {noticia.categoria}
            </span>

            <div className="flex gap-6 text-sm text-gray-500">
              <span>{noticia.fecha}</span>
              <span>{noticia.autor}</span>
            </div>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold text-gray-900 leading-tight md:text-5xl">
            {noticia.titulo}
          </h1>

          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            {noticia.resumen}
          </p>
        </section>

        {/* Imagen */}
        <section className="mb-12">
          <img
            src={noticia.imagen}
            alt={noticia.titulo}
            className="w-full h-[350px] md:h-[450px] object-cover border border-gray-300"
          />
        </section>

        {/* Contenido */}
        <section className="mb-16 max-w-4xl mx-auto space-y-6 text-gray-600 leading-8 text-[17px]">
          {noticia.contenido.map((parrafo, index) => (
            <p key={index}>{parrafo}</p>
          ))}
        </section>

        {/* Otras Noticias */}
        <section>
          <div className="mb-6 border-b border-gray-400">
            <h2 className="inline-block border-b-4 border-gray-700 pb-2 text-2xl font-bold">
              Otras Noticias
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {otrasNoticias.map((n) => (
              <div
                key={n.id}
                className="flex gap-4 border border-gray-300 rounded-xl p-4 bg-white hover:shadow-md transition"
              >
                <img
                  src={n.imagen}
                  alt={n.titulo}
                  className="w-28 h-28 object-cover border"
                />

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {n.titulo}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {n.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}