import { Navigate, Outlet } from "react-router-dom";
import { ROTAS } from "../constanst/rotas";
import { useAuth } from "../contexts/AuthContext";

export default function RotaPrivada() {
  const { usuario, carregando } = useAuth();

  // Enquanto verifica o Firebase
  if (carregando) {
    return <div>Carregando...</div>;
  }

  // Não autenticado
  if (!usuario) {
    return <Navigate to={ROTAS.LOGIN} replace />;
  }

  // Autenticado
  return <Outlet />;
}