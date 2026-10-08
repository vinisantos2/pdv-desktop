import type { Empresa } from "../../../../../../types/Empresa";
import type { Usuario } from "../../../../../../types/Usuario";
import './headerInicio.css'
interface Props {
  usuario: Usuario | null;
  empresa: Empresa | null;
}
export default function HeaderInicio({ usuario, empresa }: Props) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-welcome">
        <h1>Olá, {usuario?.nome || "Usuário"}!</h1>

        <p>Bem-vindo ao {empresa?.nome || "seu PDV"}.</p>
      </div>

      <div className="dashboard-date">
        <span>Hoje</span>

        <strong>{new Date().toLocaleDateString("pt-BR")}</strong>
      </div>
    </header>
  );
}
