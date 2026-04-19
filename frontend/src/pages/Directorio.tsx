import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Directorio() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] px-6 py-12">
        <h1>Directorio</h1>
        <p>Listado de empresas asociadas al clúster.</p>
      </main>
      <Footer />
    </>
  );
}
