import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] px-6 py-12">
        <h1>Inicio</h1>
        <p>Bienvenido al portal del Clúster de la Industria Automotriz de Sonora.</p>
      </main>
      <Footer />
    </>
  );
}
