/* Página de directorio de empresas asociadas */
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Directorio() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '70vh', padding: '48px 24px' }}>
        <h1>Directorio</h1>
        <p>Listado de empresas asociadas al clúster.</p>
      </main>
      <Footer />
    </>
  );
}
