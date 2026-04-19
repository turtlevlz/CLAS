import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function EmpresaDetalle() {
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] px-6 py-12">
        <h1>Empresa #{id}</h1>
        <p>Información detallada de la empresa seleccionada.</p>
      </main>
      <Footer />
    </>
  );
}
