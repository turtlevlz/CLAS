/* Página principal del sitio */
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '70vh', padding: '48px 24px' }}>
        <h1>Inicio</h1>
        <p>Bienvenido al portal del Clúster de la Industria Automotriz de Sonora.</p>
      </main>
      <Footer />
    </>
  );
}
