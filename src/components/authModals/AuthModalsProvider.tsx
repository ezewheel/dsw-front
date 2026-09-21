import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AuthModalsContext } from "./auth-modals-context";
import LoginModal from "../loginModal/LoginModal";
import RegisterModal from "../registerModal/RegisterModal";

export const AuthModalsProvider = ({ children }: { children: ReactNode }) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const openLogin = useCallback(() => {
    setRegisterOpen(false);
    setLoginOpen(true);
  }, []);

  const openRegister = useCallback(() => {
    setLoginOpen(false);
    setRegisterOpen(true);
  }, []);

  const value = useMemo(
    () => ({ openLogin, openRegister }),
    [openLogin, openRegister],
  );

  return (
    <AuthModalsContext.Provider value={value}>
      {children}
      {loginOpen && <LoginModal show={loginOpen} onHide={() => setLoginOpen(false)} />}
      {registerOpen && <RegisterModal show={registerOpen} onHide={() => setRegisterOpen(false)} />}
    </AuthModalsContext.Provider>
  );
};