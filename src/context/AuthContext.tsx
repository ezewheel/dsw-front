import { useEffect, useRef, useState, type ReactNode } from "react";
import { AuthContext } from "./auth-context";
import {
  getToken,
  login as loginRequest,
  logout as logoutRequest,
  me,
  register as registerRequest,
} from "../services/auth.service";
import type { LoginRequest, RegisterRequest, User } from "../types/auth.types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(getToken());
  const tokenRef = useRef<string | null>(getToken());
  const [loading, setLoading] = useState(() => getToken() !== null);

  useEffect(() => {
    const storedToken = tokenRef.current;

    if (!storedToken) return;

    let active = true;

    me()
      .then((currentUser) => {
        if (!active || tokenRef.current !== storedToken) return;
        setUser(currentUser);
        setToken(storedToken);
      })
      .catch(() => {
        if (!active || tokenRef.current !== storedToken) return;
        logoutRequest();
        setUser(null);
        setToken(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const login = async (credentials: LoginRequest) => {
    const result = await loginRequest(credentials);
    tokenRef.current = result.token;
    setToken(result.token);
    setUser(result.user);
  };

  const register = async (credentials: RegisterRequest) => {
    const result = await registerRequest(credentials);
    tokenRef.current = result.token;
    setToken(result.token);
    setUser(result.user);
  };

  const logout = () => {
    logoutRequest();
    tokenRef.current = null;
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};