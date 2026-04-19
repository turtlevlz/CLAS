import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] px-6 py-12">
        <h1>Iniciar Sesión</h1>
        <p>Formulario de autenticación para usuarios registrados.</p>
      </main>
      <Footer />
    </>
  );
}
