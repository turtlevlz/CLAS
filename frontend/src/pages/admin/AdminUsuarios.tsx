/* Página de administración de usuarios (solo admin) */
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AdminUsuarios() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '70vh', padding: '48px 24px' }}>
        <h1>Admin — Usuarios</h1>
        <p>Gestión de usuarios del sistema.</p>
      </main>
      <Footer />
    </>
  );
}
