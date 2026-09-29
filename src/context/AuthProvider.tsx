import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./auth-context";
import api, { getToken, isAccountSuspended } from "../api/client";
import SuspendedAccountModal from "../components/suspendedAccountModal/SuspendedAccountModal";
import {
  login as loginRequest,
  logout as logoutRequest,
  me,
  register as registerRequest,
  type LoginRequest,
  type RegisterRequest,
  type User,
} from "../api/auth";
import {
  updateProfile as updateProfileRequest,
  type UpdateProfileInput,
} from "../api/user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(() => getToken() !== null);
  const [suspended, setSuspended] = useState(false);

  useEffect(() => {
    const interceptor = api.interceptors.response.use(undefined, (error) => {
      if (isAccountSuspended(error) && getToken()) {
        logoutRequest();
        setUser(null);
        setSuspended(true);
      }
      return Promise.reject(error);
    });

    return () => api.interceptors.response.eject(interceptor);
  }, []);

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

  const updateProfile = async (input: UpdateProfileInput) => {
    const { nickname } = await updateProfileRequest(input);
    setUser((current) => current && { ...current, nickname });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateProfile }}
    >
      {children}
      {suspended && (
        <SuspendedAccountModal onClose={() => setSuspended(false)} />
      )}
    </AuthContext.Provider>
  );
};
