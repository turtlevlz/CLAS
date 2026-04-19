import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NoticiaDetalle() {
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] px-6 py-12">
        <h1>Noticia #{id}</h1>
        <p>Contenido detallado de la noticia seleccionada.</p>
      </main>
      <Footer />
    </>
  );
}
