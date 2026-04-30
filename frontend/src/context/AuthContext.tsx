import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuarioActual, setUsuarioActual] = useState<any>(null);

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
          logout();
          return;
        }

        setUsuarioActual(decoded);
      } catch (e) {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ usuarioActual, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);