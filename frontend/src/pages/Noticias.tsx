/* Página de listado de noticias y eventos */
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Noticias() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '70vh', padding: '48px 24px' }}>
        <h1>Noticias</h1>
        <p>Últimas noticias y eventos del sector automotriz en Sonora.</p>
      </main>
      <Footer />
    </>
  );
}
