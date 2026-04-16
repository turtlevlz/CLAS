/* Página de administración de empresas (solo admin) */
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AdminEmpresa() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '70vh', padding: '48px 24px' }}>
        <h1>Admin — Empresas</h1>
        <p>Gestión y edición de empresas registradas en el sistema.</p>
      </main>
      <Footer />
    </>
  );
}
