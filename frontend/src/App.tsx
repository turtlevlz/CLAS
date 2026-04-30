import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { ToastProvider } from './components/Toast';
import Home from './pages/Home';
import Directorio from './pages/Directorio';
import Noticias from './pages/Noticias';
import NoticiaDetalle from './pages/NoticiaDetalle';
import Login from './pages/Login';
import EmpresaDetalle from './pages/EmpresaDetalle';
import Admin from './pages/Admin';
import ForgotPswd from './pages/ForgotPswd';
import NuevaEmpresa from './pages/NuevaEmpresa';
import EditarEmpresa from './pages/EditarEmpresa';
import ErrorPage from './pages/ErrorPage';
import Membresias from './pages/Membresias';
import MiCuenta from './pages/MiCuenta';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const RutaAdmin = ({ children }: { children: any }) => {
  const { usuarioActual, cargando } = useAuth();
  if (cargando) return null;
  if (!usuarioActual) return <Navigate to="/login" />;
  if (![1, 2].includes(usuarioActual.rol_id)) return <Navigate to="/directorio" />;
  return children;
};

const RutaAdminClas = ({ children }: { children: any }) => {
  const { usuarioActual, cargando } = useAuth();
  if (cargando) return null;
  if (!usuarioActual) return <Navigate to="/login" />;
  if (usuarioActual.rol_id !== 1) return <Navigate to="/directorio" />;
  return children;
};

const RutaUsuario = ({ children }: { children: any }) => {
  const { usuarioActual, cargando } = useAuth();
  if (cargando) return null;
  if (!usuarioActual) return <Navigate to="/login" />;
  return children;
};

export default function App() {
  return (
    <ToastProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/directorio" element={<Directorio />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticias/:id" element={<NoticiaDetalle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/empresa/:id" element={<EmpresaDetalle />} />
        <Route path="/contrasena_reset" element={<ForgotPswd />} />

        {/* Rutas Protegidas (Requieren Login) */}
        <Route
          path="/admin"
          element={
            <RutaAdmin>
              <Admin />
            </RutaAdmin>
          }
        />

        <Route
          path="/admin/nueva-empresa"
          element={
            <RutaAdminClas>
              <NuevaEmpresa />
            </RutaAdminClas>
          }
        />

        <Route
          path="/admin/empresas/:id/editar"
          element={
            <RutaAdmin>
              <EditarEmpresa />
            </RutaAdmin>
          }
        />

        <Route path="/membresias" element={<Membresias />} />

        <Route
          path="/mi-cuenta"
          element={
            <RutaUsuario>
              <MiCuenta />
            </RutaUsuario>
          }
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
    </ToastProvider>
  );
}
