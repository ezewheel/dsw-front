import { createContext, useContext } from "react";

export interface AuthModalsContextValue {
  openLogin: () => void;
  openRegister: () => void;
}

export const AuthModalsContext =
  createContext<AuthModalsContextValue | undefined>(undefined);

export const useAuthModals = (): AuthModalsContextValue => {
  const ctx = useContext(AuthModalsContext);

  if (!ctx) {
    throw new Error("useAuthModals debe usarse dentro de un AuthModalsProvider");
  }

  return ctx;
};