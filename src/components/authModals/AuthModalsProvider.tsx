import { useMemo, useState, type ReactNode } from "react";
import { AuthModalsContext } from "./auth-modals-context";
import LoginModal from "../loginModal/LoginModal";
import RegisterModal from "../registerModal/RegisterModal";

type OpenModal = "login" | "register" | null;

export const AuthModalsProvider = ({ children }: { children: ReactNode }) => {
  const [openModal, setOpenModal] = useState<OpenModal>(null);

  const value = useMemo(
    () => ({
      openLogin: () => setOpenModal("login"),
      openRegister: () => setOpenModal("register"),
    }),
    [],
  );

  const close = () => setOpenModal(null);

  return (
    <AuthModalsContext.Provider value={value}>
      {children}
      {openModal === "login" && <LoginModal onClose={close} />}
      {openModal === "register" && <RegisterModal onClose={close} />}
    </AuthModalsContext.Provider>
  );
};
