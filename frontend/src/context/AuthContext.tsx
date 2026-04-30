import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import client from '../api/client';

const AuthContext = createContext<any>(null);

function decodeRaw(token: string): any {
  const decoded: any = jwtDecode(token);
  // Lee nombre desde localStorage si el token no lo trae
  if (!decoded.nombre_usuario) {
    decoded.nombre_usuario = localStorage.getItem('nombre_clas') || '';
  }
  return decoded;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuarioActual, setUsuarioActual] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  const login = (token: string) => {
    localStorage.setItem('token_clas', token);
    const decoded = decodeRaw(token);
    if (decoded.exp * 1000 < Date.now()) {
      logout();
    } else {
      setUsuarioActual(decoded);
    }
  };

  const logout = () => {
    localStorage.removeItem('token_clas');
    localStorage.removeItem('nombre_clas');
    setUsuarioActual(null);
  };

  useEffect(() => {
    const tokenStored = localStorage.getItem('token_clas');
    if (!tokenStored) {
      setCargando(false);
      return;
    }
    try {
      const decoded = decodeRaw(tokenStored);
      if (decoded.exp * 1000 < Date.now()) {
        logout();
        setCargando(false);
        return;
      }
      // Si ya tiene nombre (token nuevo o localStorage) no hace falta el fetch
      if (decoded.nombre_usuario) {
        setUsuarioActual(decoded);
        setCargando(false);
        return;
      }
      // Sesión antigua sin nombre: lo pide una sola vez y lo guarda
      client.get(`/usuarios/${decoded.id_usuario}`)
        .then(res => {
          const nombre = res.data.nombre_usuario || '';
          localStorage.setItem('nombre_clas', nombre);
          setUsuarioActual({ ...decoded, nombre_usuario: nombre });
        })
        .catch(() => setUsuarioActual(decoded))
        .finally(() => setCargando(false));
    } catch {
      logout();
      setCargando(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ usuarioActual, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
