import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/services/api";

interface User {
  id: string;
  nome: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("finanvision_token");
    if (token) {
      setIsAuthenticated(true);
      verifyToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async () => {
    try {
      const { data } = await api.get("/api/Auth/me");
      setUser(data);
    } catch (error) {
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = (token: string) => {
    localStorage.setItem("finanvision_token", token);
    setIsAuthenticated(true);
    verifyToken();
  };

  const logout = () => {
    localStorage.removeItem("finanvision_token");
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
