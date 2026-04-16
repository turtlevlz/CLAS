/* Página de detalle de una noticia individual */
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NoticiaDetalle() {
  /* useParams extrae el :id de la URL */
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '70vh', padding: '48px 24px' }}>
        <h1>Noticia #{id}</h1>
        <p>Contenido detallado de la noticia seleccionada.</p>
      </main>
      <Footer />
    </>
  );
}
