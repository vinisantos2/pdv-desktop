import { Navigate, Outlet } from "react-router-dom";
import { ROTAS } from "../constanst/rotas";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/loading/Loading";

interface RotaPrivadaProps {
  apenasAdmin?: boolean;
}

export default function RotaPrivada({ apenasAdmin = false }: RotaPrivadaProps) {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return <Loading />;
  }

  if (!usuario) {
    return <Navigate to={ROTAS.LOGIN} replace />;
  }

  if (apenasAdmin && usuario.perfil !== "admin") {
    return <Navigate to={ROTAS.DASHBOARD.INDEX} replace />;
  }

  return <Outlet />;
}
