import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuarioActual, setUsuarioActual] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  const login = (token: string) => {
    localStorage.setItem('token_clas', token);
    const decoded: any = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
        logout();
    } else {
        setUsuarioActual(decoded);
    }
  };

  const logout = () => {
    localStorage.removeItem('token_clas');
    setUsuarioActual(null);
  };

  useEffect(() => {
    const tokenStored = localStorage.getItem('token_clas');
    if (tokenStored) {
      try {
        const decoded: any = jwtDecode(tokenStored);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token_clas');
        } else {
          setUsuarioActual(decoded);
        }
      } catch (e) {
        localStorage.removeItem('token_clas');
      }
    }
    setCargando(false);
  }, []);

  return (
    <AuthContext.Provider value={{ usuarioActual, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);