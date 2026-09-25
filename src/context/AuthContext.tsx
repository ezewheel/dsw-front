import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./auth-context";
import { getToken } from "../api/client";
import {
  login as loginRequest,
  logout as logoutRequest,
  me,
  register as registerRequest,
  type LoginRequest,
  type RegisterRequest,
  type User,
} from "../api/auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(() => getToken() !== null);

  useEffect(() => {
    const storedToken = getToken();

    if (!storedToken) return;

    let active = true;
    const isSameSession = () => active && getToken() === storedToken;

    me()
      .then((currentUser) => {
        if (isSameSession()) setUser(currentUser);
      })
      .catch(() => {
        if (isSameSession()) logoutRequest();
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
    setUser(result.user);
  };

  const register = async (credentials: RegisterRequest) => {
    const result = await registerRequest(credentials);
    setUser(result.user);
  };

  const logout = () => {
    logoutRequest();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
