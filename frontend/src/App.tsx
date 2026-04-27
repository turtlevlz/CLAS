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

const RutaProtegida = ({ children }: { children: any }) => {
  const { usuarioActual } = useAuth();
  
  if (!usuarioActual) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/directorio" element={<Directorio />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticias/:id" element={<NoticiaDetalle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/empresa/:id" element={<EmpresaDetalle />} />
        <Route path="/contrasena_reset" element={<ForgotPswd />} />
        <Route 
          path="/admin" 
          element={
            <RutaProtegida>
              <Admin />
            </RutaProtegida>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}