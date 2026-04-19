import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AdminUsuarios() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] px-6 py-12">
        <h1>Admin — Usuarios</h1>
        <p>Gestión de usuarios del sistema.</p>
      </main>
      <Footer />
    </>
  );
}
