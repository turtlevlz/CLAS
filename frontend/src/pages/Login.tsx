/* Página de inicio de sesión */
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '70vh', padding: '48px 24px' }}>
        <h1>Iniciar Sesión</h1>
        <p>Formulario de autenticación para usuarios registrados.</p>
      </main>
      <Footer />
    </>
  );
}
