/* Página de detalle de una empresa del directorio */
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function EmpresaDetalle() {
  /* useParams extrae el :id de la URL */
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '70vh', padding: '48px 24px' }}>
        <h1>Empresa #{id}</h1>
        <p>Información detallada de la empresa seleccionada.</p>
      </main>
      <Footer />
    </>
  );
}
