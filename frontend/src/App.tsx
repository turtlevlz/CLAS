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

const RutaProtegida = ({ children }: { children: any }) => {
  const { usuarioActual, cargando } = useAuth();

  if (cargando) return null;

  if (!usuarioActual) {
    return <Navigate to="/login" />;
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

        {/* Rutas Protegidas (Requieren Login) */}
        <Route 
          path="/admin" 
          element={
            <RutaProtegida>
              <Admin />
            </RutaProtegida>
          } 
        />

        <Route
          path="/admin/nueva-empresa"
          element={
            <RutaProtegida>
              <NuevaEmpresa />
            </RutaProtegida>
          }
        />

        <Route
          path="/admin/empresas/:id/editar"
          element={
            <RutaProtegida>
              <EditarEmpresa />
            </RutaProtegida>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}