import { ArrowLeftIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="relative overflow-hidden bg-linear-to-r from-[rgb(20,140,180)] to-[rgb(44,65,154)] px-6 py-24 text-white lg:px-10 lg:py-28">
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-160px] right-[-100px] h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <section className="relative mx-auto flex max-w-[1200px] flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.35em] text-white/70">
              Error 404
            </p>

            <h1 className="mb-6 text-5xl font-black leading-[1.05] tracking-tight lg:text-7xl">
              Esta ruta no existe.
            </h1>

            <p className="max-w-xl text-lg font-medium leading-relaxed text-white/85 lg:text-xl">
              La página que buscas no existe o fue movida. Puedes volver al inicio o explorar el directorio de empresas.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/"
                aria-label="Volver al inicio"
                className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-black text-[#005bb7] shadow-xl transition-all hover:bg-slate-50"
              >
                <ArrowLeftIcon aria-hidden="true" className="h-6 w-6 stroke-[3]" />
                Volver al inicio
              </Link>

              <Link
                to="/directorio"
                aria-label="Ir al directorio de empresas"
                className="inline-flex items-center gap-3 rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/10"
              >
                <BuildingOffice2Icon aria-hidden="true" className="h-6 w-6 stroke-[2.5]" />
                Ver directorio
              </Link>
            </div>
          </div>

          <div className="select-none text-[9rem] font-black leading-none text-white/10 max-lg:hidden lg:text-[14rem]">
            404
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}