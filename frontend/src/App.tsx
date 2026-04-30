import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
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
import MiCuenta from './pages/MiCuenta';

const RutaAdmin = ({ children }: { children: any }) => {
  const { usuarioActual } = useAuth();

  if (!usuarioActual) {
    return <Navigate to="/login" />;
  }

  if (![1, 2].includes(usuarioActual.rol_id)) {
    return <Navigate to="/directorio" />;
  }

  return children;
};

const RutaAdminClas = ({ children }: { children: any }) => {
  const { usuarioActual } = useAuth();

  if (!usuarioActual) {
    return <Navigate to="/login" />;
  }

  if (usuarioActual.rol_id !== 1) {
    return <Navigate to="/directorio" />;
  }

  return children;
};

const RutaUsuarioEmpresa = ({ children }: { children: any }) => {
  const { usuarioActual } = useAuth();

  if (!usuarioActual) {
    return <Navigate to="/login" />;
  }

  if (usuarioActual.rol_id !== 3) {
    return <Navigate to="/directorio" />;
  }

  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/directorio" element={<Directorio />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticias/:id" element={<NoticiaDetalle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/empresa/:id" element={<EmpresaDetalle />} />
        <Route path="/contrasena_reset" element={<ForgotPswd />} />
        <Route
          path="/mi-cuenta"
          element={
            <RutaUsuarioEmpresa>
              <MiCuenta />
            </RutaUsuarioEmpresa>
          }
        />

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
        
      </Routes>
    </BrowserRouter>
  );
}
