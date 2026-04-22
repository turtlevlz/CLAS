import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Noticias() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] px-6 py-12">
        <h1>Noticias</h1>
        <p>Últimas noticias y eventos del sector automotriz en Sonora.</p>
      </main>
      <Footer />
    </>
  );
}
