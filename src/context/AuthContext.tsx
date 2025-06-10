import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
type User = { id: number; name: string; email: string };
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const DUMMY_USER = {
  id: 1,
  name: 'Tilin',
  email: 'tilin@demo.com',
  password: '1234'
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 500)); // Simula API
    if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
      const { password: _, ...userData } = DUMMY_USER;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      throw new Error('Credenciales incorrectas');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
