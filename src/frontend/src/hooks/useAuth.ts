import { useEffect, useState } from "react";
import type { AuthUser } from "../types";

const STORAGE_KEY = "mechtools_user";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (username: string, _password: string): boolean => {
    if (!username.trim()) return false;
    const authUser: AuthUser = { username: username.trim() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
    return true;
  };

  const register = (username: string, _password: string): boolean => {
    if (!username.trim()) return false;
    const authUser: AuthUser = { username: username.trim() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return { user, login, register, logout };
}
