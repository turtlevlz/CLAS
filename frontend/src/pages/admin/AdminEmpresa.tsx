import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AdminEmpresa() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] px-6 py-12">
        <h1>Admin — Empresas</h1>
        <p>Gestión y edición de empresas registradas en el sistema.</p>
      </main>
      <Footer />
    </>
  );
}
