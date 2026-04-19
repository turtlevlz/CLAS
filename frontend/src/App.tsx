import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Directorio from './pages/Directorio';
import Noticias from './pages/Noticias';
import NoticiaDetalle from './pages/NoticiaDetalle';
import Login from './pages/Login';
import EmpresaDetalle from './pages/EmpresaDetalle';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminEmpresa from './pages/admin/AdminEmpresa';

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
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/empresa" element={<AdminEmpresa />} />
      </Routes>
    </BrowserRouter>
  );
}
