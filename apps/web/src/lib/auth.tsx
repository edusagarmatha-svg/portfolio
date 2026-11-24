import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "./api";

type User = { id: string; email: string; role: string };
type Portfolio = { id: string; fullName: string; slug: string | null };
type AuthState = {
  user: User | null;
  portfolio: Portfolio | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await api<{ user: User; portfolio: Portfolio }>("/api/v1/auth/me");
      setUser(data.user);
      setPortfolio(data.portfolio);
    } catch {
      setUser(null);
      setPortfolio(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const data = await api<{ id: string; email: string; role: string }>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setUser({ id: data.id, email: data.email, role: data.role });
    await refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    await api("/api/v1/auth/logout", { method: "POST" });
    setUser(null);
    setPortfolio(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, portfolio, loading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}