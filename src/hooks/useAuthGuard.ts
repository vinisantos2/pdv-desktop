import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function useAuthGuard() {
  const { usuario, carregando } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (carregando) return;

    if (!usuario) {
      navigate("/login", { replace: true });
    }
  }, [usuario, carregando]);

  return {
    user: usuario,
    carregando,
    autenticado: !!usuario,
  };
}
