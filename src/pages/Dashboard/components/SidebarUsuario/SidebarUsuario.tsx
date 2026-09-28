import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../../contexts/AuthContext";
import { ROTAS } from "../../../../constanst/rotas";

import "./sidebar-usuario.css";

export default function SidebarUsuario() {
  const { usuario } = useAuth();

  const navigate = useNavigate();

  const isAdmin = usuario?.perfil === "admin";

  function sair() {
    // Depois vamos colocar o logout do Firebase aqui
    navigate(ROTAS.LOGIN);
  }

  return (
    <div className="sidebar-bottom">

      <div className="user-info">

        <div className="user-avatar">
          {usuario?.nome?.charAt(0).toUpperCase() || "U"}
        </div>

        <div className="user-data">

          <strong>
            {usuario?.nome || "Usuário"}
          </strong>

          <span>
            {isAdmin ? "Administrador" : "Operador"}
          </span>

        </div>

      </div>


      <button
        className="logout-button"
        onClick={sair}
      >
        Sair
      </button>

    </div>
  );
}

