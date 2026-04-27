/* Página de inicio de sesión */
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import photo from '../assets/img/login-stock-photo.jpg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo_electronico: email,
          contrasena: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      login(data.token);
      navigate('/directorio');

    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <>
      <Navbar />
      <main className='bg-gray-50 p-10'>
        <a href="/" className='inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-8'>← Volver al inicio</a>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
          <div>

            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
              <div className='flex items-center gap-3 mb-5'>
                <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='#378ADD' strokeWidth='2'>
                  <rect x='2' y='7' width='20' height='14' rx='3'/>
                  <path d='M16 7V5a4 4 0 0 0-8 0v2'/>
                  <circle cx='12' cy='14' r='2'/>
                </svg>
                <div>
                  <p className='font-medium text-base'>Iniciar Sesión</p>
                  <p className='text-xs text-gray-400'>Accede a tu cuenta de CLAS</p>
                </div>
              </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            <label className='block text-xs text-gray-500 mb-1'>Correo Electrónico</label>
            <input 
            type='email' 
            placeholder='usuario@dominio.com' 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            className='w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400'/>

            <div className='flex justify-between items-center mt-3 mb-1'>
              <label className='text-xs text-gray-500'>Contraseña</label>
              <a href="/contrasena_reset" className='text-xs text-blue-500 hover:underline'>
                ¿Olvidaste tu contraseña?
              </a>
            </div>
              <input
              type='password'
              placeholder='contraseña'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400'/>

              <label className='flex items-center gap-2 mt-3 text-xs text-gray-500 cursor-pointer'>
                <input
                type='checkbox'
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className='accent-blue-500'/>
                Recordar mis datos
              </label>

              <button onClick={handleSubmit} className='w-full mt-4 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors'>
                Iniciar Sesión
              </button>

              <p className='text-center text-xs text-gray-400 mt-3'>
                ¿No tienes cuenta?{' '}
                <a href="/" className='text-blue-500 hover:underline'>
                Solicita tu membresía
                </a>
              </p>
            </div>

            <div className='grid grid-cols-2 gap-3 mt-3'>
              <div className='bg-white rounded-xl border border-gray-100 p-3'>
                <div className='bg-blue-50 rounded-lg p-2 w-8 h-8 flex items-center justify-center mb-2'>
                  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#378ADD' strokeWidth='2'>
                    <rect x='2' y='7' width='20' height='14' rx='2'/>
                    <path d='M16 3H8v4h8V3z'/>
                  </svg>
                </div>
                <p className='font-medium text-sm'>Para Empresas</p>
                <p className='text-xs text-gray-400'>Accede a herramientas exclusivas para miembros</p>
              </div>

              <div className='bg-white rounded-xl border border-gray-100 p-3'>
                <div className='bg-green-50 rounded-lg p-2 w-8 h-8 flex items-center justify-center mb-2'>
                  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#3B6D11' strokeWidth='2'>
                    <circle cx='12' cy='8' r='4'/>
                    <path d='M4 20c0-4 3.6-7 8-7s8 3 8 7'/>
                  </svg>
                </div>
                <p className='font-medium text-sm'>Visitantes</p>
                <p className='text-xs text-gray-400'>Explora el directorio sin necesidad de cuenta</p>
              </div>
            </div>
          </div>

          <div>
            <span className='inline-block text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100 mb-3'>
              Portal de Miembros CLAS
            </span>
            <h1 className='text-2xl font-semibold leading-tight mb-2'>
              Bienvenido al Cluster Automotriz de Sonora
            </h1>
            <p className='text-sm text-gray-500 mb-4'>
              Accede a recursos exclusivos, networking y oportunidades de crecimiento
            </p>

            <div className='relative rounded-xl overflow-hidden h-80'>
              <img src={photo} alt='' className='absolute inset-0 w-full h-full object-cover'/>
              <div className='absolute inset-0 bg-gradient-to-b from-transparent to-blue-800'/>
              <div className='absolute bottom-0 left-0 p-4 z-10 text-white'>
                <p className='font-medium text-sm'>Únete a mas de 150 empresas</p>
                <p className='text-xs opacity-80'>Formando parte del ecosistema automotriz mas importante de Sonora</p>
              </div>
            </div>

            <div className='bg-white rounded-xl border border-gray-100 p-4 mt-4 shadow-sm'>
              <p className='font-medium text-sm mb-3'>Beneficios de tu cuenta</p>
              {[
                'Acceso al directorio completo de miembros',
                'Participación de eventos y capacitaciones',
                'Oportunidades de networking y colaboración',
                'Noticias y actualizaciones del sector',
                'Soporte técnico y consultoría especializada',
              ].map(beneficios => (
                <div key={beneficios} className='flex items-center gap-2 text-sm text-gray-500 py-1'>
                  <span className='text-green-600 font-medium text-xs'>✓</span>
                  {beneficios}
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}