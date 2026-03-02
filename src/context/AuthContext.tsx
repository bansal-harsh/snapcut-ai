import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { migrateGuestHistoryToUser } from "@/lib/history";

export type AuthUser = {
  email: string;
  name?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (params: { email: string; password?: string }) => void;
  register: (params: { name: string; email: string; password?: string }) => void;
  logout: () => void;
};

const STORAGE_KEY = "snapcut.auth.user";

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    if (!parsed?.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(readStoredUser());
  }, []);

  const persist = useCallback((next: AuthUser | null) => {
    setUser(next);
    try {
      if (!next) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  }, []);

  const login = useCallback(({ email }: { email: string }) => {
    const normalized = email.trim().toLowerCase();
    if (!normalized) return;
    migrateGuestHistoryToUser(normalized);
    persist({ email: normalized });
  }, [persist]);

  const register = useCallback(({ name, email }: { name: string; email: string }) => {
    const normalized = email.trim().toLowerCase();
    if (!normalized) return;
    migrateGuestHistoryToUser(normalized);
    persist({ name: name.trim(), email: normalized });
  }, [persist]);

  const logout = useCallback(() => {
    persist(null);
  }, [persist]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
  }), [user, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

